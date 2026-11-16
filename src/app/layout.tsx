import "./globals.css";
import { ReactNode } from "react";
import { SiteSettingProvider } from "./_context/SiteSettingContext";
import { StickyContextProvider } from "./_context/StickyContext";
import AppToaster from "./_components/AppToaster";
import { DbThemeProvider } from "./_hooks/useTheme";

export const metadata = {
  title: "Escrow App",
  description: "Hey there",
};

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteSettingProvider>
          <DbThemeProvider>
            <StickyContextProvider>
              <main className="bg-background">
                {children}
                <AppToaster />
              </main>
            </StickyContextProvider>
          </DbThemeProvider>
        </SiteSettingProvider>
      </body>
    </html>
  );
}
