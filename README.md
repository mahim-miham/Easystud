# Easystud (v0.0.1)

An AI-powered study app for students -- research, assignments, slides, notes,
quizzes, exam prep and more, in one place.

## Design

**Concept: "The Greenboard Notebook"** -- the deep green chalkboard at the
front of a classroom, paired with the ruled paper of a student's own
notebook. Chalk-yellow is the highlighter color, reached for when something
matters (upgrade prompts, "coming soon" tags).

- **Color** -- 60% chalk/paper neutrals, 30% board green, 10% sprout-green
  and chalk-yellow accents. Tokens live in `src/index.css`.
- **Type** -- Fraunces (display/headings), Plus Jakarta Sans (body/UI),
  IBM Plex Mono (labels, dates, tags -- the "margin note" voice).
- **Signature move** -- the logo (open book + pen) draws itself on the
  home screen, once, like chalk on a board.
- No "Powered by Claude" or any AI-vendor branding appears anywhere in
  the UI, by design.

## Running it

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

The `dist/` folder is a static site -- deploy it the same way you deployed
StudyMate AI and NomNom (Vercel, then wrap with Median.co for the APK if
you want a mobile build).

## Mobile app (Android) -- Direct Code, no 3rd-party wrapper

This uses **Capacitor** (open-source, by Ionic) -- it generates a real
native Android project (`android/` folder, Gradle + Java/Kotlin) around
your own web build. There's no subscription, no 3rd-party service holding
your app hostage -- the `android/` folder is code you own and compile
yourself, which is what "Direct Code -> App" means in practice for a
React/Vite app.

**Already set up for you:**
- App ID: `com.easystud.app` -- App name: `Easystud`
- App icon (adaptive + legacy + round, all densities) using the book+pen
  mark on board green
- Splash screen (all densities, portrait + landscape) on board green

### Prerequisites (one-time)

Install Android Studio (https://developer.android.com/studio) -- it
bundles the Android SDK you need. Free, official Google tooling.

### Workflow -- every time you change the web app

```bash
npm run build        # rebuild the web app into dist/
npx cap sync android  # copy the new build into the native project
```

### Open, run, and build the app

```bash
npx cap open android
```

This opens the project in Android Studio. From there:
- **Run on an emulator or your own phone (USB debugging on):** press the
  green Run button.
- **Build a release APK/AAB to share or publish:** `Build -> Generate
  Signed Bundle / APK`. The first time, you'll create a keystore --
  **back this file up somewhere safe**; you need the same one for every
  future update, and losing it means you can never update that app
  listing again.

### Before publishing to the Play Store

- `com.easystud.app` is a placeholder package ID -- change it in
  `capacitor.config.ts` and re-run `npx cap sync android` if you want
  something more specific, but **only before your first release** -- it
  can't be changed afterward.
- The Play Store has a one-time developer registration fee (Google's,
  not related to this app).


## Architecture -- the "update slot" you asked for

Every feature lives in its own folder under `src/features/<name>/` with an
`index.jsx` (the screen) and, for AI features, an `api.js` (the function
that calls the AI backend).

**`src/features/registry.js` is the single control panel.** It's a plain
array -- one object per feature -- that drives the dashboard grid, the
routing, and the "Pro" / "Coming soon" badges. Nothing else in the app
needs to change when you add a feature.

### To add a new feature later:

1. Duplicate an existing folder in `src/features/` as a starting point.
2. Write the real screen in its `index.jsx`.
3. Add one object to the `FEATURES` array in `registry.js`, pointing
   `component` at your new file.
4. It appears on the Home dashboard automatically -- no other file needs
   touching.

### To turn a "Coming soon" feature into a live one:

Nine features (Assignments, Slides, Video Scripts, Study Notes, Quiz,
Voice Practice, Art Studio, Exam Prep, Freebook) currently render a shared
placeholder because they need an AI backend behind them. Four (Study
Calendar, Image to PDF, Student ID/CV, and now Research) are fully working.

**Research is the template to copy for the rest.** It shows the whole
pattern end to end:
- `api/research.js` — a Vercel serverless function holding the real
  Claude API call and the system prompt for this feature
- `src/features/research/api.js` — the frontend function that calls it
  via the shared `callAI()` helper
- `src/features/research/index.jsx` — the real screen (input, loading,
  error, result, local history)
- `src/components/AIResponse.jsx` — a shared renderer for AI text
  (headings/bullets/paragraphs) that every future feature can reuse

To go live on the next AI feature:

1. Copy `api/research.js` to `api/<feature>.js` and adjust the system
   prompt for that feature.
2. Copy `research/index.jsx` and `research/api.js`'s pattern into that
   feature's own folder, swapping in its real UI.
3. Flip its `status` from `'coming-soon'` to `'active'` in `registry.js`.

No new env variable is needed per feature — every feature shares the same
`ANTHROPIC_API_KEY` once it's set in Vercel (see below).

## Getting Research (and future features) actually live

1. Get a key from the Claude Console: https://console.anthropic.com
2. In your Vercel project → **Settings → Environment Variables**, add:
   `ANTHROPIC_API_KEY = sk-ant-...`
3. Deploy (or redeploy). No other setup needed — the frontend already
   calls `/api/research`, which Vercel serves automatically from the
   `/api` folder.

Note: plain `npm run dev` (Vite) does **not** run the `/api` functions —
use `vercel dev` locally if you want to test Research before deploying,
or just test it after deploying to Vercel.

## Feature list (v0.0.1)

| Feature | Status | Tier |
|---|---|---|
| Study Calendar | Live | Free |
| Image to PDF | Live | Free |
| Student ID / CV | Live | Free |
| Progress | Live | Free |
| Research | Live (needs `ANTHROPIC_API_KEY` set in Vercel) | Free |
| Assignments | Coming soon | Free |
| Study Notes | Coming soon | Free |
| Quiz | Coming soon | Free |
| Freebook | Coming soon | Free |
| Slides | Coming soon | Pro |
| Video Scripts | Coming soon | Pro |
| Art Studio | Coming soon | Pro |
| Exam Prep (IELTS/SAT/GRE/TOEFL) | Coming soon | Pro |
| Voice Practice | Coming soon | Premium |

Pricing on the Upgrade screen (`src/pages/Upgrade.jsx`) uses placeholder
numbers -- swap in your real prices whenever you've settled on them.

## v0.0.1 update -- accounts, theme, notifications

**Fully working now:**
- **Light/Dark mode** -- toggle in Profile -> Appearance. Respects system
  preference on first launch, remembers your choice after that.
- **Login/Signup page** (`/login`) -- email+password or phone number tabs.
  This is currently a **stub**: it stores a mock session in
  `localStorage` so the screens are fully testable, but doesn't check
  passwords or talk to any server yet.
- **Notification preferences** (`/notifications`, from Profile -> Notifications)
  -- toggles for push and email, plus where to send email. Preferences
  save locally; nothing is actually sent yet (see below).

**Needs your setup before it's real -- recommended path: Firebase**

Firebase is the natural fit here because one free project covers three
things you asked for at once:
- Real email/password AND phone-number (OTP) login (Firebase Auth)
- Real push notifications to the phone's notification bar (Firebase
  Cloud Messaging) -- works naturally with the Capacitor Android app
  already set up
- A place to store user data beyond just this device (Firestore), if
  you want study data to sync across devices later

To go live:
1. Create a free project at https://console.firebase.google.com
2. Enable **Authentication** -> Email/Password and Phone sign-in methods
3. `npm install firebase`, then swap the internals of
   `src/lib/authClient.js` for the real Firebase Auth calls -- every
   screen that imports from it (`Login.jsx`, `Profile.jsx`, `Home.jsx`)
   keeps working unchanged as long as the function names and return
   shape stay the same
4. For push: install `@capacitor/push-notifications`, follow Capacitor's
   FCM setup guide (adds a `google-services.json` file to
   `android/app/`), then add a backend route like `api/notify.js`
   (same pattern as `api/research.js`) that triggers a push when needed
5. For email: sign up at a transactional email service (Resend is a
   good, simple fit), add `RESEND_API_KEY` in Vercel the same way as
   `ANTHROPIC_API_KEY`, and add `api/send-email.js` to actually send

None of this blocks anything you've already built -- Research, Study
Calendar, Image to PDF, and Student ID/CV all work exactly the same
whether or not accounts are wired up.

