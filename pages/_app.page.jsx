import "./style.scss";
import { func, string, shape } from "prop-types";
import { useStore } from "./utils";

export const useApp = ({ Component, pageProps }) => {
  useStore();

  return (
    <main id="app">
      <Component {...pageProps} />
    </main>
  );
};

useApp.propTypes = {
  Component: func.isRequired,
  pageProps: shape({ root: string }).isRequired,
};

export default useApp;
