import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
// export { RouteGuard };

const RouteGuard: FC<any> = ({ children }) => {
  const router = useRouter();
  const pathname = router.pathname;
  const { isAuthenticated } = useMoralis();

  const publicPaths = ["/", "/[username]", "/[username]/[videoId]"];

  useEffect(() => {
    // on initial load - run auth check
    // authCheck();

    console.log(isAuthenticated);

    if (!isAuthenticated && !publicPaths.includes(pathname)) {
      router.push({
        pathname: "/",
        query: { returnUrl: router.asPath },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return children;
};

export default RouteGuard;
