import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import Container from "@mui/material/Container";
import Providers from "./providers";
import Nav from "./nav";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Treehouse Newsletter",
  description: "Newsletter subscription list",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <AppRouterCacheProvider>
          <Providers>
            <Nav />
            <Container
              component="main"
              maxWidth={false}
              sx={{
                maxWidth: 1040,
                px: { xs: 2, sm: 3 },
                py: { xs: 3, md: 5 },
              }}
            >
              {children}
            </Container>
          </Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
