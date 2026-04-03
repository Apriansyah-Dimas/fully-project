# Layout Safe Zone Protocol

## Overview

This protocol ensures that content never overlaps with fixed navigation elements (navbar and login/logout buttons) by defining clear safe zones.

## Layout Structure

```
┌─────────────────────────────────────────┐
│  Navbar (fixed top-8, z-200)            │
├─────────────────────────────────────────┤
│                                         │
│  Safe Zone Top (padding-top: 80px)      │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │                                 │    │
│  │     Page Content                │    │
│  │     (SafeContentZone)           │    │
│  │                                 │    │
│  │  Safe Zone Bottom (padding-bot) │    │
│  └─────────────────────────────────┘    │
│                                         │
├─────────────────────────────────────────┤
│  Login/Logout Button (fixed bottom-8)   │
└─────────────────────────────────────────┘
```

## CSS Variables

Defined in `styles/globals.css`:

```css
:root {
  --safe-zone-top: 5rem;           /* 80px - clears navbar */
  --safe-zone-bottom: 5rem;         /* 80px - clears button */
  --safe-zone-available: calc(100vh - 10rem);
}
```

## Components

### PageShell (Default Wrapper)

Used in layouts. Applies top safe zone only.

```tsx
import { PageShell } from '@/components/templates/PageShell'

<PageShell>
  {children}
</PageShell>
```

### SafeContentZone (Content Wrapper)

Applies BOTH top and bottom safe zones. Use this in individual pages.

```tsx
import { SafeContentZone } from '@/components/templates/SafeContentZone'

<SafeContentZone>
  <YourContent />
</SafeContentZone>
```

## Usage Rules

| Layout Type | Wrapper | Padding Applied |
|-------------|---------|-----------------|
| Public Layout | PageShell | Top only |
| Protected Layout | Layout directly | Bottom only |
| Page content | SafeContentZone | Top + Bottom |

## Example: Protected Calendar Page

```tsx
export default function Calendar() {
  return (
    <>
      <SafeContentZone className="max-w-7xl mx-auto">
        <CalendarGrid />
      </SafeContentZone>
      
      <EventModal />  {/* Fixed modal, outside SafeContentZone */}
    </>
  )
}
```

## Z-Index Reference

| Element | Z-Index |
|---------|---------|
| Navbar | `z-[200]` |
| Page content | `z-10` (default) |
| Login/Logout button | `z-[100]` |
| Modals | `z-[50]` or higher |
