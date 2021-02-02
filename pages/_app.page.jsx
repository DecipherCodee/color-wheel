import "./style.scss";
import { useAppStore } from "./utils";

export function useApp({ Component, pageProps }) {
  const { Header, Footer, Wheel, ref, Head } = useAppStore();

  return (
    <main id="app" ref={ref}>
      <Head>
        <title>ColorWheel</title>
      </Head>

      <Header />
      <Wheel />
      <Component {...pageProps} />
      <Footer />
    </main>
  );
}

export default useApp;
