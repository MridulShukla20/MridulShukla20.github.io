/**
 * Grapheme-safe scramble pools for the gratitude word.
 *
 * Two rules drive everything here:
 *  - Split by grapheme cluster, never by code unit, so a Devanagari or Arabic
 *    base character never gets separated from its combining marks.
 *  - Scramble a word using its own script. Latin letters flickering inside a
 *    Devanagari word reads as a bug, not as motion.
 */

const segmenter =
  typeof Intl !== 'undefined' && 'Segmenter' in Intl
    ? new Intl.Segmenter(undefined, { granularity: 'grapheme' })
    : null;

/** Grapheme clusters, with a code-point fallback where Intl.Segmenter is absent. */
export function graphemes(value: string): string[] {
  if (!segmenter) return Array.from(value);
  return [...segmenter.segment(value)].map((part) => part.segment);
}

/*
 * Indic pools are base consonants ONLY — no matra, nukta or virama. A combining
 * mark rendered on its own is broken text, and that is exactly what a scramble
 * frame would do with it.
 */
const SCRIPTS: { test: RegExp; pool: string[] }[] = [
  {
    test: /\p{Script=Devanagari}/u,
    pool: 'क ख ग घ च छ ज झ ट ठ ड ढ त थ द ध न प फ ब भ म य र ल व श ष स ह'.split(' '),
  },
  {
    test: /\p{Script=Bengali}/u,
    pool: 'ক খ গ ঘ চ ছ জ ঝ ট ঠ ড ঢ ত থ দ ধ ন প ফ ব ভ ম য র ল শ ষ স হ'.split(' '),
  },
  {
    test: /\p{Script=Gurmukhi}/u,
    pool: 'ਕ ਖ ਗ ਘ ਚ ਛ ਜ ਝ ਟ ਠ ਡ ਢ ਤ ਥ ਦ ਧ ਨ ਪ ਫ ਬ ਭ ਮ ਯ ਰ ਲ ਵ ਸ ਹ'.split(' '),
  },
  {
    test: /\p{Script=Gujarati}/u,
    pool: 'ક ખ ગ ઘ ચ છ જ ઝ ટ ઠ ડ ઢ ત થ દ ધ ન પ ફ બ ભ મ ય ર લ વ શ ષ સ હ'.split(' '),
  },
  {
    test: /\p{Script=Tamil}/u,
    pool: 'க ங ச ஞ ட ண த ந ப ம ய ர ல வ ழ ள ற ன'.split(' '),
  },
  {
    test: /\p{Script=Telugu}/u,
    pool: 'క ఖ గ ఘ చ ఛ జ ఝ ట ఠ డ ఢ త థ ద ధ న ప ఫ బ భ మ య ర ల వ శ ష స హ'.split(' '),
  },
  {
    test: /\p{Script=Kannada}/u,
    pool: 'ಕ ಖ ಗ ಘ ಚ ಛ ಜ ಝ ಟ ಠ ಡ ಢ ತ ಥ ದ ಧ ನ ಪ ಫ ಬ ಭ ಮ ಯ ರ ಲ ವ ಶ ಷ ಸ ಹ'.split(' '),
  },
  {
    test: /\p{Script=Malayalam}/u,
    pool: 'ക ഖ ഗ ഘ ച ഛ ജ ഝ ട ഠ ഡ ഢ ത ഥ ദ ധ ന പ ഫ ബ ഭ മ യ ര ല വ ശ ഷ സ ഹ'.split(' '),
  },
  {
    test: /\p{Script=Arabic}/u,
    pool: 'ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي'.split(' '),
  },
  {
    test: /\p{Script=Hebrew}/u,
    pool: 'א ב ג ד ה ו ז ח ט י כ ל מ נ ס ע פ צ ק ר ש ת'.split(' '),
  },
  {
    test: /\p{Script=Thai}/u,
    pool: 'ก ข ค ง จ ฉ ช ซ ญ ฎ ฏ ฐ ฑ ฒ ณ ด ต ถ ท ธ น บ ป'.split(' '),
  },
  { test: /\p{Script=Han}/u, pool: Array.from('谢感恩心意情好美安和平喜福爱明光') },
  { test: /\p{Script=Hiragana}/u, pool: Array.from('あいうえおかきくけこさしすせそたちつてとなにぬねの') },
  { test: /\p{Script=Katakana}/u, pool: Array.from('あいうえおかきくけこさしすせそたちつてとなにぬねの') },
  { test: /\p{Script=Hangul}/u, pool: Array.from('가나다라마바사아자차카타파하고구그기미비시') },
  { test: /\p{Script=Cyrillic}/u, pool: Array.from('АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЭЮЯ') },
  { test: /\p{Script=Greek}/u, pool: Array.from('ΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩ') },
  { test: /\p{Script=Latin}/u, pool: Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ') },
];

/**
 * The pool for `word`, chosen from its first non-space grapheme. An unrecognised
 * script falls back to the graphemes of the two words in play, so a scramble is
 * always drawn from characters that at least belong to the transition.
 */
export function poolFor(word: string, fallbackSource: string[]): string[] {
  const first = graphemes(word).find((part) => part.trim().length > 0);

  if (first) {
    for (const script of SCRIPTS) {
      if (script.test.test(first)) return script.pool;
    }
  }

  const fallback = [...new Set(fallbackSource)].filter((part) => part.trim().length > 0);
  return fallback.length > 0 ? fallback : Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
}
