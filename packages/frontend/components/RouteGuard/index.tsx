import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";

const RouteGuard: FC<any> = ({ children }) => {
  const router = useRouter();
  const pathname = router.pathname;
  const { isAuthenticated } = useMoralis();

  const publicPaths = ["/", "/[username]", "/[username]/[videoId]"];

  useEffect(() => {
    if (!isAuthenticated && !publicPaths.includes(pathname)) {
      router.push({
        pathname: "/",
        query: { returnUrl: router.asPath },
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, isAuthenticated]);

  return children;
};

export default RouteGuard;
