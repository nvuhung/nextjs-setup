import Router from "next/router";
import NProgress from "nprogress";
import { CustomWindow } from "./declarations/window";

declare let window: CustomWindow;

NProgress.configure({ showSpinner: false });

Router.onRouteChangeStart = () => {
  NProgress.start();
};
Router.onRouteChangeComplete = () => {
  NProgress.done();
  if (window.gtag) {
    window.gtag("config", window.gaTrackingId, {
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: window.document.title,
    });
  }
};
Router.onRouteChangeError = () => {
  NProgress.done();
};

if (typeof window !== "undefined") {
  const oldOnError = window.onerror;
  window.onerror = (message, file, line) => {
    try {
      if (oldOnError) {
        oldOnError.apply(arguments);
      }
    } catch (e) {
      // Nothing to do
    }
    if (window.gtag) {
      window.gtag("event", "onerror", {
        label: `${file}:${line} ${message}`,
      });
    }
  };
}
