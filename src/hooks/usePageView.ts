import { useEffect } from "react";
import { useRouter } from "next/router";
import { pageview } from "src/lib/gtag";

export const usePageView = () => {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (path: string) => {
      pageview(path);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
};
