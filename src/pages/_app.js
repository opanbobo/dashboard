require("../styles/vendor/antd.less");
import Head from "next/head";
import { useRouter } from "next/router";
import "../styles/globals.scss";
import { Provider } from "react-redux";
import { useStore } from "store";

import { notification } from "components";

import ClientLogo from "assets/images/mock-logo.png";
import staticLogo from "assets/images/logo-icon.png";

import DefaultLayout from "components/layouts/default";
import LoginLayout from "components/layouts/loginLayout";

import cookieCutter from "cookie-cutter";
import { useEffect, useMemo, useState } from "react";
import { feature, routes } from "constant/routes";

const Headers = () => {
  const logoType = useMemo(() => {
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";

		return origin === "https://ojk.media-insight.id";
  }, []);

  return (
    <Head>
      <title>Conventional Media Dashboard</title>
      <meta charset="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <link rel='shortcut icon' href="" type='image/x-icon' />
    </Head>
  );
};

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pageLayout = Component.Layout || ((page) => page);
  const showHeader = router.pathname == "/command" ? true : true;
  const addClass = router.pathname == "/command" ? true : false;
  const showLogo =
    router.pathname == "/admin" ? "/static/logo-icon.png" : ClientLogo;
  const store = useStore(pageProps.initialReduxState);
  const [log, setLog] = useState(false);

  const handleLogout = async () => {
    localStorage.clear();
		notification.info({
			message: 'Thank you for using Conventional Media Dashboard',
		});
    router.push("/login");
  };

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userToken"));

		if (router.pathname === "/login") {
			if (data) {
				router.push(feature.find(e => e.label == data.menu_v3[0])?.link || routes.find(e => e.label == data.menu_v3[0])?.link);
			} else {
				setLog(true);
			}
		} else {
			if (!data) {
				router.push("/login");
			} else {
        let check = feature.find(e => e.link == router.pathname) || routes.find(e => e.link == router.pathname);
        check = data.menu_v3.find(e => e == check?.label);

        if (check || router.pathname == "/dashboard/search") {
          setLog(true);
        } else {
          notification.warn({
            message: "Youre not allowed to enter the page!",
          });

          router.push(feature.find(e => e.label == data.menu_v3[0])?.link || routes.find(e => e.label == data.menu_v3[0])?.link);
        }
			}
		}
  }, [router.pathname]);

  if (log) {
    if (router.pathname === "/login") {
      return (
        <Provider store={store}>
          <LoginLayout logo={staticLogo} {...pageProps}>
            <Headers />
            <Component {...pageProps} />
          </LoginLayout>
        </Provider>
      );
    } else {
      return pageLayout(
        <Provider store={store}>
          <DefaultLayout
            {...pageProps}
            header={showHeader}
            clientLogo={showLogo}
            commandClass={addClass}
            avatar={ClientLogo}
            logout={handleLogout}
          >
            <Headers />
            <Component {...pageProps} />
          </DefaultLayout>
        </Provider>
      );
    }
  } else {
    return <div></div>;
  }
}

export default MyApp;
