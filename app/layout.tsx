import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/header/navbar";
import { ConfigProvider, ThemeConfig } from "antd";
import AnimatedBlobBackground from "@/components/background/animatedBlobBackground";
import TanstackQueryProvider from "@/providers/tanstackQueryProvider";
import StoreProvider from "@/providers/storeProvider";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const customTheme: ThemeConfig = {
  components: {
    Pagination: {
      colorText: "white",
      colorTextDisabled: "rgba(255,255,255,0.5)",
    },
    Breadcrumb: {
      separatorColor: "rgba(255,255,255,0.6)",
      linkColor: "white",
      linkHoverColor: "#ecc94b",
      colorText: "white",
    },
    Table: {
      headerBg: "#1A202C",
      headerSplitColor: "rgba(255,255,255,0.4)",
      headerColor: "white",
      colorBgContainer: "rgba(255,255,255,0.1)",
      colorText: "white",
      borderColor: "rgba(255,255,255,0.2)",
    },
  },
};

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className + " max-w-[100vw] overflow-x-hidden"}>
        <StoreProvider>
          <TanstackQueryProvider>
            <ConfigProvider theme={customTheme}>
              <Navbar />
              <AnimatedBlobBackground />
              <main className="max-w-[1220px] mx-auto pt-24">{children}</main>
            </ConfigProvider>
          </TanstackQueryProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
