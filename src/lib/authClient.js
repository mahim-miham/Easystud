/**
 * lib/authClient.js
 * ------------------------------------------------------------------
 * STUB AUTH — stores a mock session in localStorage so the Login/Signup
 * screen is fully testable right now, on your phone, with no backend.
 *
 * This is NOT real authentication. Nothing is verified, no password is
 * actually checked, nothing is stored on a server. Anyone can type
 * anything and "sign in."
 *
 * TO MAKE THIS REAL:
 * Swap this file's internals for Firebase Auth. It's the natural choice
 * here because it covers BOTH email/password AND phone-number OTP login
 * in one service, and pairs directly with Firebase Cloud Messaging for
 * the push-notification feature — one Firebase project covers both asks.
 * Every screen that imports from here (Login.jsx, Profile.jsx) keeps
 * working unchanged as long as this file's exported functions keep the
 * same shape (same function names, same { ok, user } return shape).
 * ------------------------------------------------------------------
 */

const SESSION_KEY = 'easystud.session'

function readSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null')
  } catch {
    return null
  }
}

function writeSession(session) {
  try {
    if (session) localStorage.setItem(SESSION_KEY, JSON.stringify(session))
    else localStorage.removeItem(SESSION_KEY)
  } catch {
    /* storage unavailable — session still holds for this tab/session */
  }
}

function fakeDelay() {
  return new Promise((resolve) => setTimeout(resolve, 500))
}

export function getCurrentUser() {
  return readSession()
}

export async function signUpWithEmail(name, email, _password) {
  await fakeDelay()
  if (!name.trim() || !email.trim()) return { ok: false, message: 'Name and email are required.' }
  const user = { method: 'email', name: name.trim(), identifier: email.trim() }
  writeSession(user)
  return { ok: true, user }
}

export async function signInWithEmail(email, _password) {
  await fakeDelay()
  if (!email.trim()) return { ok: false, message: 'Email is required.' }
  const user = { method: 'email', name: email.split('@')[0], identifier: email.trim() }
  writeSession(user)
  return { ok: true, user }
}

export async function signUpWithPhone(name, phone) {
  await fakeDelay()
  if (!name.trim() || !phone.trim()) return { ok: false, message: 'Name and phone number are required.' }
  const user = { method: 'phone', name: name.trim(), identifier: phone.trim() }
  writeSession(user)
  return { ok: true, user }
}

export async function signInWithPhone(phone) {
  await fakeDelay()
  if (!phone.trim()) return { ok: false, message: 'Phone number is required.' }
  const user = { method: 'phone', name: 'Student', identifier: phone.trim() }
  writeSession(user)
  return { ok: true, user }
}

export async function signOut() {
  await fakeDelay()
  writeSession(null)
}
