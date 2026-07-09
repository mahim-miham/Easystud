/**
 * src/features/registry.js
 * ------------------------------------------------------------------
 * THE UPDATE SLOT.
 *
 * This file is the one place that lists every feature in Easystud.
 * The Home dashboard, routing, and locked/unlocked badges are all
 * driven from this array — nothing else needs to change when you
 * add a feature.
 *
 * TO ADD A NEW FEATURE LATER:
 *   1. Create a folder:  src/features/<yourFeature>/index.jsx
 *      (copy an existing feature folder as a starting point)
 *   2. Import its component below and add one object to FEATURES.
 *   3. Done — it shows up on the dashboard automatically.
 *
 * status: 'active'       -> fully built, tappable
 *         'coming-soon'  -> shows the placeholder screen, still tappable
 * tier:   'free' | 'pro'
 * ------------------------------------------------------------------
 */

import {
  Search, FileText, Presentation, Clapperboard, NotebookPen,
  HelpCircle, CalendarDays, Mic, ImageDown, Sparkles,
  GraduationCap, Library, IdCard, TrendingUp,
} from 'lucide-react'

import Research from './research'
import Assignments from './assignments'
import Slides from './slides'
import VideoScripts from './videoScripts'
import StudyNotes from './studyNotes'
import Quiz from './quiz'
import StudyCalendar from './studyCalendar'
import VoicePractice from './voicePractice'
import ImageToPdf from './imageToPdf'
import ArtStudio from './artStudio'
import ExamPrep from './examPrep'
import Freebook from './freebook'
import IdCardBuilder from './idCard'
import ProgressTracking from './progressTracking'

export const FEATURES = [
  {
    id: 'research',
    name: 'Research',
    blurb: 'Deep, well-sourced explanations on any topic.',
    icon: Search,
    status: 'active',
    tier: 'free',
    component: Research,
  },
  {
    id: 'assignments',
    name: 'Assignments',
    blurb: 'Full essays, reports and case studies, properly structured.',
    icon: FileText,
    status: 'coming-soon',
    tier: 'free',
    component: Assignments,
  },
  {
    id: 'slides',
    name: 'Slides',
    blurb: 'Turn any topic into a presentation outline.',
    icon: Presentation,
    status: 'coming-soon',
    tier: 'pro',
    component: Slides,
  },
  {
    id: 'video-scripts',
    name: 'Video Scripts',
    blurb: 'Scripts for presentations and video assignments.',
    icon: Clapperboard,
    status: 'coming-soon',
    tier: 'pro',
    component: VideoScripts,
  },
  {
    id: 'study-notes',
    name: 'Study Notes',
    blurb: 'Condensed notes from your syllabus or readings.',
    icon: NotebookPen,
    status: 'coming-soon',
    tier: 'free',
    component: StudyNotes,
  },
  {
    id: 'quiz',
    name: 'Quiz',
    blurb: 'Self-test with questions generated from your topic.',
    icon: HelpCircle,
    status: 'coming-soon',
    tier: 'free',
    component: Quiz,
  },
  {
    id: 'study-calendar',
    name: 'Study Calendar',
    blurb: 'Classes, exams and deadlines in one place.',
    icon: CalendarDays,
    status: 'active',
    tier: 'free',
    component: StudyCalendar,
  },
  {
    id: 'voice-practice',
    name: 'Voice Practice',
    blurb: 'Speak with an AI voice for 20 minutes to build fluency.',
    icon: Mic,
    status: 'coming-soon',
    tier: 'pro',
    component: VoicePractice,
  },
  {
    id: 'image-to-pdf',
    name: 'Image to PDF',
    blurb: 'Combine photos of notes into a single PDF.',
    icon: ImageDown,
    status: 'active',
    tier: 'free',
    component: ImageToPdf,
  },
  {
    id: 'art-studio',
    name: 'Art Studio',
    blurb: '3D-styled art and diagrams for your projects.',
    icon: Sparkles,
    status: 'coming-soon',
    tier: 'pro',
    component: ArtStudio,
  },
  {
    id: 'exam-prep',
    name: 'Exam Prep',
    blurb: 'IELTS, SAT, GRE and TOEFL practice questions.',
    icon: GraduationCap,
    status: 'coming-soon',
    tier: 'pro',
    component: ExamPrep,
  },
  {
    id: 'freebook',
    name: 'Freebook',
    blurb: 'Free study materials and e-books, in one library.',
    icon: Library,
    status: 'coming-soon',
    tier: 'free',
    component: Freebook,
  },
  {
    id: 'id-card',
    name: 'Student ID / CV',
    blurb: 'Build a clean student ID card or CV in minutes.',
    icon: IdCard,
    status: 'active',
    tier: 'free',
    component: IdCardBuilder,
  },
  {
    id: 'progress',
    name: 'Progress',
    blurb: 'Your streak, activity, and study stats.',
    icon: TrendingUp,
    status: 'active',
    tier: 'free',
    component: ProgressTracking,
  },
]

export const getFeature = (id) => FEATURES.find((f) => f.id === id)
