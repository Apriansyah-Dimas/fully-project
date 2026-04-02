// Test insert dengan service role key (bypass RLS)
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')

const envLocal = fs.readFileSync(path.join(__dirname, '../.env.local'), 'utf-8')
const envVars = {}
envLocal.split('\n').forEach(line => {
  const lineTrim = line.trim()
  if (lineTrim && !lineTrim.startsWith('#')) {
    const eqIndex = lineTrim.indexOf('=')
    if (eqIndex > 0) {
      const key = lineTrim.substring(0, eqIndex).trim()
      let value = lineTrim.substring(eqIndex + 1).trim()
      if ((value.startsWith('"') && value.endsWith('"')) || 
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1)
      }
      envVars[key] = value
    }
  }
})

// Service role key - get from Supabase Dashboard -> Settings -> API
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(
  envVars.NEXT_PUBLIC_SUPABASE_URL,
  serviceRoleKey,
  { auth: { persistSession: false } }
)

async function testInsert() {
  console.log('Testing insert...')

  const testEvent = {
    title: 'Test Meeting',
    description: 'Test description',
    category: 'meeting',
    event_date: '2026-04-03',
    event_time: '14:00',
  }

  const result = await supabase
    .from('calendar_events')
    .insert(testEvent)
    .select()

  console.log('Result:', JSON.stringify(result, null, 2))

  if (result.error) {
    console.error('Error:', result.error)
    console.error('Error code:', result.error.code)
    console.error('Error message:', result.error.message)
    console.error('Error details:', result.error.details)
    console.error('Error hint:', result.error.hint)
  } else {
    console.log('Success! Inserted:', result.data)
  }
}

testInsert()