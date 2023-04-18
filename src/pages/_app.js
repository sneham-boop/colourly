import '@component/styles/globals.css'
import MainLayout from "../components/MainLayout";
import { Work_Sans } from "next/font/google";
const work = Work_Sans({ subsets: ["latin"] });
export default function App({ Component, pageProps }) {
  return (
    <>
      <main className={work.className}>
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      </main>
    </>
  );
}
