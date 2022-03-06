import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getVideos } from "../../apiClient/videos";
import ContainerFull from "../../components/Container/Full";
import MediaGrid from "../../components/MediaGrid";

const UserPage: NextPage = () => {
  const [videos, setVideos] = useState<any>([]);
  const router = useRouter();
  const userAddress = `${router.query.username}`;

  useEffect(() => {
    const fetchVideos = async () => {
      const v = await getVideos(userAddress);
      setVideos(v);
    };

    fetchVideos();
  }, [userAddress]);

  return (
    <div>
      <ContainerFull>
        <MediaGrid videos={videos} />
      </ContainerFull>
    </div>
  );
};

export default UserPage;
