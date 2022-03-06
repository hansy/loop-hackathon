import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getVideos } from "../../apiClient/videos";
import ContainerFull from "../../components/Container/Full";
import MediaGrid from "../../components/MediaGrid";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";

const UserPage: NextPage = () => {
  const [videos, setVideos] = useState<any>([]);
  const [userAddress, setUserAddress] = useState<string>("");
  const router = useRouter();
  const queryAddress = router.query.username;
  const { user } = useMoralis();

  useEffect(() => {
    const lookupAddress = async () => {
      const provider = new ethers.providers.StaticJsonRpcProvider(
        `${process.env.NEXT_PUBLIC_INFURA_ENDPOINT}`
      );

      if (queryAddress) {
        const address = await provider.resolveName(`${queryAddress}`);

        if (address) {
          setUserAddress(address);
        } else {
          setUserAddress(`${queryAddress}`);
        }
      }
    };

    lookupAddress();
  }, [queryAddress]);

  useEffect(() => {
    const fetchVideos = async () => {
      let purchaser;

      if (user) {
        purchaser = user.get("ethAddress");
      }

      const v = await getVideos(userAddress, purchaser);
      setVideos(v);
    };

    fetchVideos();
  }, [userAddress, user]);

  return (
    <div>
      <ContainerFull>
        <MediaGrid videos={videos} />
      </ContainerFull>
    </div>
  );
};

export default UserPage;
