import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="scroll-smooth">
      <body className="bg-dark-950 text-dark-100 antialiased">
        {children}
      </body>
    </html>
  );
}
