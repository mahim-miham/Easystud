/**
 * lib/progressStore.js
 * ------------------------------------------------------------------
 * Tracks study activity locally on the device — no backend needed,
 * works the same on web and mobile right now.
 *
 * - Activity log: which calendar days the app was opened (for streaks)
 * - Stats: simple counters (events completed, research queries run)
 *
 * If accounts (Firebase) get wired up later, this is the file to
 * swap so activity syncs across devices instead of staying per-device.
 * ------------------------------------------------------------------
 */

const ACTIVITY_KEY = 'easystud.activityLog'
const STATS_KEY = 'easystud.stats'

function todayKey() {
  return new Date().toISOString().slice(0, 10)
}

function dateKey(d) {
  return d.toISOString().slice(0, 10)
}

export function logActivity() {
  try {
    const log = JSON.parse(localStorage.getItem(ACTIVITY_KEY) || '[]')
    const today = todayKey()
    if (!log.includes(today)) {
      log.push(today)
      localStorage.setItem(ACTIVITY_KEY, JSON.stringify(log))
    }
  } catch {
    /* storage unavailable — streak just won't persist this session */
  }
}

export function getActivityLog() {
  try {
    return JSON.parse(localStorage.getItem(ACTIVITY_KEY) || '[]')
  } catch {
    return []
  }
}

/** Consecutive days up to and including today. */
export function getStreak() {
  const log = new Set(getActivityLog())
  let streak = 0
  const cursor = new Date()
  while (log.has(dateKey(cursor))) {
    streak++
    cursor.setDate(cursor.getDate() - 1)
  }
  return streak
}

/** Last 7 days (oldest to newest) with whether each was active. */
export function getLast7Days() {
  const log = new Set(getActivityLog())
  const days = []
  for (let i = 6; i >= 0; i--) {
    const d = new Date()
    d.setDate(d.getDate() - i)
    days.push({
      date: dateKey(d),
      active: log.has(dateKey(d)),
      label: d.toLocaleDateString(undefined, { weekday: 'narrow' }),
    })
  }
  return days
}

const DEFAULT_STATS = { eventsCompleted: 0, researchRuns: 0 }

function readStats() {
  try {
    return { ...DEFAULT_STATS, ...JSON.parse(localStorage.getItem(STATS_KEY) || '{}') }
  } catch {
    return { ...DEFAULT_STATS }
  }
}

function writeStats(stats) {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(stats))
  } catch {
    /* storage unavailable — counters just won't persist this session */
  }
}

export function getStats() {
  return readStats()
}

/** by can be negative — used to undo a stat when e.g. an event is un-completed. */
export function incrementStat(key, by = 1) {
  const stats = readStats()
  stats[key] = Math.max(0, (stats[key] || 0) + by)
  writeStats(stats)
  return stats
}
