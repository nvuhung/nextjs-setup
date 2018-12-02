import App, { Container } from "next/app";
import React from "react";

import { appWithTranslation } from "../i18n";

class MyApp extends App {
  public render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Component {...pageProps} />
      </Container>
    );
  }
}

export default appWithTranslation(MyApp);
