import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Itsara Itsarangkura Na Ayuttaya - Digital Communications Portfolio',
  description:
    'Digital Communications Specialist with expertise in content creation, corporate communications, and social innovation.',
  keywords: [
    'Digital Communications',
    'Public Relations',
    'Content Creation',
    'Social Innovation',
    'Portfolio'
  ],
  authors: [{ name: 'Itsara Itsarangkura Na Ayuttaya' }],
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/logo192.png'
  },
  openGraph: {
    title: 'Itsara Itsarangkura - Digital Communications Portfolio',
    description:
      'Digital Communications Specialist with expertise in content creation, corporate communications, and social innovation.',
    images: ['/profile-image.jpg'],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Itsara Itsarangkura - Digital Communications Portfolio',
    description:
      'Digital Communications Specialist with expertise in content creation, corporate communications, and social innovation.',
    images: ['/profile-image.jpg']
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="th">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
