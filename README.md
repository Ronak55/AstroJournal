# Astro Journal App

A simple React Native app where you can check your daily horoscope and write your personal journal for the day — all based on your zodiac sign.

---

## What’s inside?

- Pick your zodiac sign once and save it  
- See your horoscope for today  
- Write and save daily journal entries  
- Get reminded with a daily notification to jot down your thoughts  
- Works offline, thanks to local storage  
- Clean and straightforward UI  

---

## How it works (UX flow)

1. When you open the app, you land on the Home screen.  
2. You select your zodiac sign from the dropdown. This choice sticks until you change it.  
3. The app fetches and shows your horoscope for today.  
4. You can tap **Write Journal** to go to your journal page.  
5. Write whatever’s on your mind and save it. Your entries are saved locally, so no worries about losing your thoughts.  
6. If you want, you’ll get a daily push notification in the evening reminding you to write your journal entry.  

---

## Why this app?

People love horoscopes — and combining that with journaling creates a simple habit to check in with yourself every day. It’s personal, and it’s easy to keep up with.

We store everything on your device, so you don’t need to worry about internet all the time. Plus, the app nudges you gently with reminders so you don’t forget.

The app is designed in small pieces — clean, modular, and easy to add more features down the road.

---

## How to get started

You’ll need:

- Node.js installed  
- Expo CLI (`npm install -g expo-cli`)  
- Expo Go app on your phone or an emulator  

Steps:

```bash
git clone https://github.com/your-username/astro-journal.git
cd astro-journal
npm install
npm start
```

## Quick peek at the code structure

components/ — UI building blocks like the sign picker and horoscope card
context/ — global app state like your chosen zodiac sign
hooks/ — handy custom hooks like the one to fetch horoscopes
screens/ — the main screens you see in the app
services/ — API calls and local storage helpers
types/ — TypeScript types for safer code
utils/ — constants and helper stuff

## What’s next? How this app can grow

- Show horoscopes for the week or month, not just today  
- Add a calendar view of your journal entries, with search  
- Let users share their horoscopes or journal snippets with friends  
- Dark mode and other theme options to make it look cooler  
- More personalized astrology reports or premium content
---
