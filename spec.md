# Biggani Bhai C&R Restaurant Website

## Current State
A full restaurant website exists with name "Spice Garden", generic menu items, and placeholder contact info. Has admin panel with Internet Identity login.

## Requested Changes (Diff)

### Add
- All real menu items from 9 uploaded menu images organized into proper categories
- Real restaurant info: name, location, phone

### Modify
- Restaurant name: "Spice Garden" → "Biggani Bhai C&R" (Biggani Bhai Cafe & Restaurant) across Header, Footer, AdminPage, OurStory
- sampleData.ts: Replace all sample menu items with real menu items from the uploaded images
- MENU_CATEGORIES: update to match the real menu categories
- Location in OurStory/Footer: বৈরাগী বাজার খশির, আব্দুল্লাহপুর
- Phone: 01730564953
- Hero tagline updated to reflect the actual restaurant
- OurStory section updated with actual restaurant story
- Logo image in Header: use the uploaded logo image
- Admin login page name updated

### Remove
- All fake/placeholder menu items

## Implementation Plan
1. Update sampleData.ts with full menu from images
2. Update Header.tsx restaurant name and logo
3. Update Footer.tsx name, address, phone
4. Update Hero.tsx tagline
5. Update OurStory.tsx address, phone
6. Update AdminPage.tsx name references
