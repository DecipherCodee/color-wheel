import Document, { Html, Head, Main, NextScript } from "next/document";

export class App extends Document {
  render() {
    return (
      <Html>
        <Head>
          <title>ColorWheel</title>

          <link
            defer
            async
            rel="apple-touch-icon"
            sizes="180x180"
            href="/icons/apple-touch-icon.png"
          />
          <link
            defer
            async
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/icons/favicon-32x32.png"
          />
          <link
            defer
            async
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/icons/android-chrome-192x192.png"
          />
          <link
            defer
            async
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/icons/favicon-16x16.png"
          />
          <link defer async rel="manifest" href="/site.webmanifest" />
          <link
            defer
            async
            rel="mask-icon"
            href="/icons/safari-pinned-tab.svg"
            // color="#6c4c37"
          />
          <meta
            name="apple-mobile-web-app-title"
            content="ColorWheel"
            defer
            async
          />
          <meta name="application-name" content="ColorWheel" defer async />
          <meta name="msapplication-TileColor" content="#573027" defer async />
          <meta
            name="msapplication-TileImage"
            content="/icons/mstile-144x144.png"
            defer
            async
          />
          <meta name="theme-color" content="#ffffff" defer async />
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

App.getInitialProps = async (ctx) => {
  const initialProps = await Document.getInitialProps(ctx);

  return { ...initialProps };
};

export default App;
