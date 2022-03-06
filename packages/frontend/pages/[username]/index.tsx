import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getVideos } from "../../apiClient/videos";
import ContainerFull from "../../components/Container/Full";
import MediaGrid from "../../components/MediaGrid";
import { useMoralis } from "react-moralis";

const UserPage: NextPage = () => {
  const [videos, setVideos] = useState<any>([]);
  const router = useRouter();
  const userAddress = `${router.query.username}`;
  const { user } = useMoralis();

  useEffect(() => {
    const fetchVideos = async () => {
      let purchaser;

      if (user) {
        purchaser = user.get("ethAddress");
      }

      const v = await getVideos(userAddress, purchaser);
      setVideos(v);
    };

    if (userAddress) {
      fetchVideos();
    }
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
