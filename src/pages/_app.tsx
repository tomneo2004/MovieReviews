import React from "react";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../themes/defaultTheme";
import type { AppProps /*, AppContext */ } from "next/app";
import NProgress from "nprogress";
import Router from "next/router";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import ErrorBoundary from "../components/concrete/ErrorBoundary/ErrorBoundary";
import Box from "@material-ui/core/Box";
import { Typography } from "@material-ui/core";
import LinkTo from "../components/concrete/LinkTo/LinkTo";
import { getRoute, RouteType } from "../routes/routesGenerator";

NProgress.configure({ showSpinner: false });
Router.events.on("routeChangeStart", (url) => {
  console.log(`Loading: ${url}`);
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => {
  //scroll page to top
  window.scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });

  NProgress.done();
});
Router.events.on("routeChangeError", () => NProgress.done());

export default function MovieReviewApp(props: AppProps) {
  const { Component, pageProps, router } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>MovieReviews</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
        {/* Import CSS for nprogress */}
        <link rel="stylesheet" type="text/css" href="/nprogress.css" />
      </Head>

      <ErrorBoundary fallback={
        <Box display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
          <Typography variant='h2'>
            Oooops ! Looks like somthing is not right
          </Typography>
          <LinkTo text='Back to home' linkTo={getRoute(RouteType.home, null)} />
        </Box>
      }>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        {/* use for page transition, layoutId is needed for components */}
        <AnimateSharedLayout>
          {/* use for exit animation key is needed for tracking components */}
          <AnimatePresence exitBeforeEnter>
            {/* wrap page component so we can play exit animatoin */}
            <motion.div
              key={router.route}
              variants={{
                init: { opacity: 0.8 },
                enter: { opacity: 1, transition: { when: "beforeChildren" } },
                exit: { opacity: 0.8, transition: { when: "afterChildren" } },
              }}
              initial="init"
              animate="enter"
              exit="exit"
            >
              <Component {...pageProps} />
            </motion.div>
          </AnimatePresence>
        </AnimateSharedLayout>
      </ThemeProvider>
      </ErrorBoundary>
    </React.Fragment>
  );
}
