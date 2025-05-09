import { kirang } from "@/app/lib/fonts";
import '@/app/globals.css';

export const metadata = {
  title: 'Yue Kang',
  description: 'my websiteeee',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${kirang.className} bg-primary overflow-hidden flex flex-col relative`}>{children}</body>
    </html>
  )
}
