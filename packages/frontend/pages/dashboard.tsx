import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import Container from "../components/Container";
import VideoTable from "../components/Video/Table";
import { Video } from "../models/video";

const DashboardPage: NextPage = () => {
  const [videos, setVideos] = useState<Array<Video>>([]);
  const { user } = useMoralis();

  useEffect(() => {
    const getVideos = async () => {
      if (user) {
        try {
          const res = await fetch("/api/videos", {
            headers: {
              "x-loop-wa": user?.get("ethAddress"),
            },
          });

          if (res.ok) {
            const data = await res.json();

            setVideos(data.data);
          }
        } catch (e) {
          console.log(e);
        }
      }
    };
    getVideos();
  }, []);

  return (
    <Container>
      <div>
        <h1 className="text-3xl font-bold">Added Videos</h1>
        <VideoTable videos={videos} />
      </div>
    </Container>
  );
};

export default DashboardPage;
