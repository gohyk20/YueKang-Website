import { kirang } from "@/app/lib/fonts";
import '@/app/globals.css';

export const metadata = {
  title: 'Yue Kang',
  description: 'my websiteeee',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/Gloves-hit.png" as="image" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
      </head>
      <body className={`${kirang.className} bg-primary overflow-hidden flex flex-col relative h-screen overflow-x-hidden`}>{children}</body>
    </html>
  )
}
