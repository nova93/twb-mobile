import Document, { Head, Main, NextScript, Html } from "next/document";
import { ServerStyleSheet } from "styled-components";

import { APP_NAME } from "../config/main";

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="pl-PL">
        <Head>
          {/* Browser */}
          <meta charSet="utf-8" />
          <meta content={APP_NAME} name="application-name" />
          <meta content={APP_NAME} name="apple-mobile-web-app-title" />

          {/* App */}
          <meta content="#312f43" name="theme-color" />
          <meta content="yes" name="mobile-web-app-capable" />
          <meta content="yes" name="apple-mobile-web-app-capable" />
          <meta content="black" name="apple-mobile-web-app-status-bar-style" />

          {/* Meta Icons */}
          {/*
          <link href="/images/32.png" rel="icon" sizes="32x32" />
          <link href="/images/128.png" rel="icon" sizes="128x128" />
          <link href="/images/192.png" rel="icon" sizes="192x192" />
          */}

          {/* PWA */}
          {/*
          <link href="/manifest.json" rel="manifest" />
          */}

          {/* Fonts */}
        </Head>
        <Main />
        <NextScript />
      </Html>
    );
  }
}