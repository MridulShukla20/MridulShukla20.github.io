import type { Metadata, Viewport } from 'next';
import {
  Caveat,
  Fraunces,
  Manrope,
  Noto_Sans_Bengali,
  Noto_Sans_Devanagari,
  Noto_Sans_Gujarati,
  Noto_Sans_Gurmukhi,
  Noto_Sans_Kannada,
  Noto_Sans_Malayalam,
  Noto_Sans_Tamil,
  Noto_Sans_Telugu,
} from 'next/font/google';
import { preloadScript } from '@/components/Preloader';
import { ThemeProvider } from '@/components/ThemeProvider';
import { profile } from '@/content/profile';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-manrope',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  weight: 'variable',
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-fraunces',
});

const caveat = Caveat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['500', '600'],
  variable: '--font-caveat',
});

/*
 * The footer's gratitude ticker spans many scripts. Only the Indic ones get a
 * webfont, each limited to its own subset at a single weight. CJK, Arabic,
 * Hebrew and Thai fall back to system faces in GratitudeTicker.module.css —
 * a whole webfont for one word apiece is not worth the payload.
 */
const notoDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: '500',
  display: 'swap',
  variable: '--font-noto-devanagari',
});

const notoBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: '500',
  display: 'swap',
  variable: '--font-noto-bengali',
});

const notoTamil = Noto_Sans_Tamil({
  subsets: ['tamil'],
  weight: '500',
  display: 'swap',
  variable: '--font-noto-tamil',
});

const notoMalayalam = Noto_Sans_Malayalam({
  subsets: ['malayalam'],
  weight: '500',
  display: 'swap',
  variable: '--font-noto-malayalam',
});

const notoGujarati = Noto_Sans_Gujarati({
  subsets: ['gujarati'],
  weight: '500',
  display: 'swap',
  variable: '--font-noto-gujarati',
});

const notoGurmukhi = Noto_Sans_Gurmukhi({
  subsets: ['gurmukhi'],
  weight: '500',
  display: 'swap',
  variable: '--font-noto-gurmukhi',
});

const notoTelugu = Noto_Sans_Telugu({
  subsets: ['telugu'],
  weight: '500',
  display: 'swap',
  variable: '--font-noto-telugu',
});

const notoKannada = Noto_Sans_Kannada({
  subsets: ['kannada'],
  weight: '500',
  display: 'swap',
  variable: '--font-noto-kannada',
});

const notoVariables = `${notoDevanagari.variable} ${notoBengali.variable} ${notoTamil.variable} ${notoMalayalam.variable} ${notoGujarati.variable} ${notoGurmukhi.variable} ${notoTelugu.variable} ${notoKannada.variable}`;

export const metadata: Metadata = {
  title: profile.name,
  description: profile.subtitle,
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#0e0e0e' },
    { media: '(prefers-color-scheme: light)', color: '#fbfbfa' },
  ],
};

// Runs before first paint so the page never renders in the wrong theme.
const noFlashScript = `(function(){try{var t=localStorage.getItem("theme");if(t!=="dark"&&t!=="light"){t=window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";}document.documentElement.dataset.theme=t;}catch(e){document.documentElement.dataset.theme="dark";}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${manrope.variable} ${fraunces.variable} ${caveat.variable} ${notoVariables}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
        <script dangerouslySetInnerHTML={{ __html: preloadScript }} />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
