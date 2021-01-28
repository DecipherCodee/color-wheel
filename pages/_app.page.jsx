import "./style.scss";
import { useAppStore } from "./utils";

export function useApp({ Component, pageProps }) {
  const { Header, Footer, Wheel, ref } = useAppStore();

  return (
    <main id="app" ref={ref}>
      <Header />
      <Wheel />
      <Component {...pageProps} />
      <Footer />
    </main>
  );
}

export default useApp;
