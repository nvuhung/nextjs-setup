import Document, {
  DefaultDocumentIProps,
  DocumentProps,
  Head,
  Main,
  NextScript,
} from "next/document";
import React from "react";
import { ServerStyleSheet } from "styled-components";
import { removeCommentsAndSpacing } from "../lib/utils";

export default class MyDocument extends Document<
  DefaultDocumentIProps &
    DocumentProps & {
      locale: string;
      styleTags: string;
      gaTrackingId;
      localeDataScript: string;
      graphqlUri: string;
    }
> {
  public static getInitialProps(ctx: any) {
    const { renderPage, req } = ctx;
    const {
      locale,
      localeDataScript,
      gaTrackingId,
      graphqlUri,
    } = req;

    const sheet = new ServerStyleSheet();
    const page = renderPage((App) => (props) =>
      sheet.collectStyles(<App {...props} />),
    );
    const styleTags = sheet.getStyleElement();

    return {
      ...page,
      styleTags,
      locale,
      localeDataScript,
      gaTrackingId,
      graphqlUri,
    };
  }

  public render() {
    const { locale, styleTags, gaTrackingId, localeDataScript } = this.props;

    return (
      <html lang={locale}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="black-translucent"
          />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content="/static/favicon/favicon-144x144.png"
          />
          <meta name="theme-color" content="#ffffff" />

          <link
            rel="shortcut icon"
            type="images/x-icon"
            href="/static/favicon.ico"
          />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="/static/favicon/favicon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="/static/favicon/favicon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="/static/favicon/favicon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="/static/favicon/favicon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="/static/favicon/favicon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="/static/favicon/favicon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="/static/favicon/favicon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="/static/favicon/favicon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="/static/favicon/favicon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="/static/favicon/favicon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="/static/favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="/static/favicon/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="/static/favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />

          {styleTags}

          {/* Google Analytics */}
          {gaTrackingId ? (
            [
              <script
                key="ga1"
                async={true}
                src={`https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`}
              />,
              <script
                key="ga2"
                dangerouslySetInnerHTML={{
                  __html: removeCommentsAndSpacing(`
          window.dataLayer = window.dataLayer || [];
          window.gaTrackingId = '${gaTrackingId}';
          function gtag(){
          dataLayer.push(arguments)
          }
          gtag('js', new Date());
          gtag('config', window.gaTrackingId);`),
                }}
              />,
            ]
          ) : (
            <script
              dangerouslySetInnerHTML={{
                __html: removeCommentsAndSpacing(`
          function gtag(){
          console.log('dummy gtag call', arguments)
          }`),
              }}
            />
          )}
        </Head>

        <body>
          <div className="next-main">
            <Main />
          </div>
          <script
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{
              __html: localeDataScript,
            }}
          />
          <NextScript />
        </body>
      </html>
    );
  }
}
