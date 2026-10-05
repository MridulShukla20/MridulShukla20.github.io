export type Status = 'draft' | 'live' | 'soon';

export interface Socials {
  linkedin: string;
  github: string;
}

/** A line whose middle phrase is set apart by colour. */
export interface AccentedLine {
  before: string;
  accent: string;
  after: string;
}

/** An outbound link that shows a preview card on hover. */
export interface LinkPreview {
  /** The words that appear in the sentence. */
  label: string;
  href: string;
  /** Card heading. Falls back to `label`. */
  title?: string;
  /** One quiet line under the heading. */
  description?: string;
  /** Path under /public. Without one the card is text only. */
  image?: string;
}

/** A line with one linked phrase in the middle of it. */
export interface LinkedLine {
  before: string;
  link: LinkPreview;
  after: string;
}

export interface Profile {
  name: string;
  /**
   * Home lede. The accent phrase is underlined and the inline tool marquee
   * runs immediately after it, mid-sentence.
   */
  bio: AccentedLine;
  currentWork: LinkedLine;
  offTheClock: string;
  subtitle: string;
  /** Status row role, with the parenthetical dimmed. */
  roleLabelParts: AccentedLine;
  /** Closing quote in the footer. */
  quote: string;
  /** Credit lines, footer left. The subline is the quieter aside. */
  craftedLine: string;
  craftedSublineParts: AccentedLine;
  statusLabel: string;
  available: boolean;
  location: string;
  timezone: string;
  email: string;
  resumeUrl: string;
  socials: Socials;
}

export interface ExperienceEntry {
  /** The handwritten "Next?" row, not a real post. */
  annotation?: boolean;
  id: string;
  company: string;
  /** Path under /public, or a remote URL. */
  logo: string;
  role: string;
  roleShort: string;
  /** Desktop date range. */
  dateLong: string;
  /** Mobile date range. */
  dateShort: string;
  /** ISO months, YYYY-MM. The tenure shown in the experience view is derived from these. */
  start?: string;
  end?: string;
  /** "Full-time", "Internship". PLACEHOLDER leaves the chip out. */
  employment?: string;
  /** "Remote", or a city. PLACEHOLDER leaves it out. */
  location?: string;
  /** What was done there, one line each. An empty list renders no list. */
  bullets?: string[];
  status: Status;
}

export interface StackGroup {
  title: string;
  items: string[];
}

/** Stack header. The accent word in the heading takes the link colour. */
export interface StackIntro {
  label: string;
  heading: AccentedLine;
  lede: string;
}

/** The one number a project card leads with, and where it came from. */
export interface ProjectStat {
  value: string;
  /** What kind of number it is — a shipped result, a research finding. */
  badge: string;
  label: string;
}

export interface Project {
  id: string;
  /** Who it was for. Sits with the logo above the title. */
  org: string;
  /** Path under /public. */
  logo: string;
  title: string;
  description: string;
  /** Optional: a card without one drops the separator and the stat block. */
  stat?: ProjectStat;
  /** Where the card's button goes — the PDF, or a case-study route. */
  href: string;
  ctaLabel: string;
  /** Path under /public, 4:3. Bleeds off the card's right and bottom edges. */
  thumbnail: string;
  tags: string[];
  status: Status;
}

/** Same card, different tab. Case studies and projects share one shape. */
export type CaseStudy = Project;

export interface WorkEntry {
  title: string;
  status: Status;
  slug?: string;
  company?: string;
  hook?: string;
}

export interface About {
  heading: string;
  paragraphs: string[];
}

export interface MarqueeLogo {
  name: string;
  /** Path under /public. */
  src: string;
  /** Defaults to `name` when omitted. */
  alt?: string;
}
