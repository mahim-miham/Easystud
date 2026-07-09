/**
 * lib/notificationsClient.js
 * ------------------------------------------------------------------
 * Stores notification PREFERENCES locally right now (push on/off,
 * email on/off, which email to notify). No notification is actually
 * sent yet — there's no backend trigger for it.
 *
 * TO SEND REAL PUSH NOTIFICATIONS (appear in the phone's notification
 * bar even when the app is closed):
 * 1. Create a Firebase project, add Firebase Cloud Messaging (FCM).
 * 2. Install @capacitor/push-notifications and follow Capacitor's FCM
 *    setup (adds google-services.json to the Android project).
 * 3. Each device registers a push token; save it against the user
 *    (needs the real auth from authClient.js wired to Firebase first).
 * 4. A backend function (e.g. api/notify.js, same pattern as
 *    api/research.js) sends the actual push via the FCM API when an
 *    event happens (new deadline, streak reminder, etc.).
 *
 * TO SEND REAL EMAIL NOTIFICATIONS:
 * 1. Create a free account at a transactional email service (Resend is
 *    a good fit — simple API, generous free tier).
 * 2. Add RESEND_API_KEY as a Vercel environment variable, same way as
 *    ANTHROPIC_API_KEY.
 * 3. A backend function (api/send-email.js) calls Resend's API with
 *    the user's saved email address whenever a notification fires.
 * ------------------------------------------------------------------
 */

const PREFS_KEY = 'easystud.notificationPrefs'

const DEFAULT_PREFS = {
  pushEnabled: true,
  emailEnabled: false,
  notifyEmail: '',
}

export function getPreferences() {
  try {
    return { ...DEFAULT_PREFS, ...JSON.parse(localStorage.getItem(PREFS_KEY) || '{}') }
  } catch {
    return DEFAULT_PREFS
  }
}

export function savePreferences(prefs) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs))
  } catch {
    /* storage unavailable — prefs still hold for this session */
  }
}
