import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>1KOMMA5 - PV Panele</title>
      </head>
      <body>
          {children}
      </body>
    </html>
  );
}
