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

export type WorkCategory = 'case-study' | 'prd' | 'build' | 'experiment';

/**
 * Generated cover art. Each kind is its own composition in components/work/covers,
 * built around one idea from that project. `label` is the caption top-left.
 */
export type CoverArt =
  | {
      kind: 'dictation';
      label: string;
      /** The key that is held. */
      key: string;
      /** The tab on the dashed outline: where the work stays. */
      boundary: string;
      metric: string;
      metricLabel: string;
    }
  | {
      kind: 'waffle';
      label: string;
      /** Path under /public. */
      logo?: string;
      figure: string;
      caption: string;
      /** Cells lit out of a hundred. 40 reads as 40%. */
      filled: number;
      badge: string;
    }
  | {
      kind: 'matrix';
      label: string;
      /** The environment types, one column each. Three. */
      columns: string[];
      filter: string;
      /** The pattern in the filter field. */
      pattern: string;
      badge: string;
      selected: string;
      action: string;
    }
  | {
      kind: 'transform';
      label: string;
      /** What goes in. Three: drawn as a page, a sheet and notes, in that order. */
      sources: string[];
    }
  | { kind: 'flow'; label: string };

export interface WorkCover {
  /** Path under /public, 16:10. When set it replaces the generated art. */
  image?: string;
  art?: CoverArt;
}

export interface WorkLink {
  label: string;
  href: string;
  /** Opens in a new tab. Path-only hrefs under /public are treated the same way. */
  external?: boolean;
}

export interface WorkSection {
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface WorkFact {
  label: string;
  value: string;
}

/** Case studies, builds and experiments share one shape. */
export interface WorkItem {
  /** Becomes /work/<slug>. */
  slug: string;
  title: string;
  /** Card copy. Two or three lines. */
  summary: string;
  category: WorkCategory;
  /** Who it was for, or whose product it is. Optional. */
  org?: string;
  skills: string[];
  cover: WorkCover;
  /** Small label/value pairs under the title on the detail page. */
  facts?: WorkFact[];
  /** Longer opening paragraph on the detail page. Falls back to `summary`. */
  overview?: string;
  sections?: WorkSection[];
  /** First link is the primary button. */
  links?: WorkLink[];
  /** An inline document preview on the detail page (desktop only). */
  preview?: { src: string; title: string };
  status: Status;
}

export interface WorkIntro {
  label: string;
  heading: string;
  lede: string;
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
