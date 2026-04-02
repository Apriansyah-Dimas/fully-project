// Test script to verify Supabase connection and data
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

// Load .env.local manually - fix for multiline values
const envLocal = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf-8')
const lines = envLocal.split('\n')
const envVars = {}

let i = 0
while (i < lines.length) {
  const line = lines[i].trim()
  if (line && !line.startsWith('#')) {
    const eqIndex = line.indexOf('=')
    if (eqIndex > 0) {
      const key = line.substring(0, eqIndex).trim()
      let value = line.substring(eqIndex + 1).trim()

      // Handle quoted values
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }

      envVars[key] = value
    }
  }
  i++
}

console.log('Loaded env vars:', Object.keys(envVars))
console.log('SUPABASE_URL:', envVars.NEXT_PUBLIC_SUPABASE_URL)
console.log('ANON_KEY length:', envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY?.length)

const supabase = createClient(
  envVars.NEXT_PUBLIC_SUPABASE_URL || 'missing',
  envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'missing'
)

async function testConnection() {
  console.log('Testing Supabase connection...')
  console.log('URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)

  try {
    // Test connection
    const { data, error, status, statusText } = await supabase
      .from('calendar_events')
      .select('*')

    console.log('Status:', status, statusText)

    if (error) {
      console.error('Error:', error)
      console.error('Error code:', error.code)
      console.error('Error message:', error.message)
      console.error('Error details:', error.details)
      console.error('Error hint:', error.hint)
      return
    }

    console.log('Success! Found', data?.length || 0, 'events:')
    console.log(JSON.stringify(data, null, 2))

    // Test for today's events
    const today = new Date()
    const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
    console.log('\nToday key:', todayKey)

    const { data: todayEvents } = await supabase
      .from('calendar_events')
      .select('*')
      .eq('event_date', todayKey)

    console.log('Today events:', todayEvents?.length || 0)

  } catch (err) {
    console.error('Unexpected error:', err)
  }
}

testConnection()
