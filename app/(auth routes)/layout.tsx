import "../globals.css";
import TanStackProvider from "../../components/TanStackProvider/TanStackProvider";
import { roboto } from "../layout";


export default function RootLayout({ children, modal }: Readonly<{ children: React.ReactNode; modal: React.ReactNode; }>) {
  return (
      <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          {children}
          {modal}
        </TanStackProvider>
        </body>
      </html>
  );
}
