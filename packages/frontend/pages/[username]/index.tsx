import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getVideos } from "../../apiClient/videos";

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

  return <div>jello</div>;
};

export default UserPage;
