import type { NextPage } from "next";
import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import Container from "../components/Container";
import VideoTable from "../components/Video/Table";
import { Video } from "../models/video";
import ABI from "../../hardhat/artifacts/contracts/VideoManager.sol/VideoManager.json";
import { ethers } from "ethers";

const DashboardPage: NextPage = () => {
  const [videos, setVideos] = useState<Array<Video>>([]);
  const { user } = useMoralis();

  const updateVideoStatus = (videos: Array<Video>, id: any, status: string) => {
    const video = videos.find((video) => video.id === id);

    if (video) {
      video.status = status;
    }

    setVideos(videos);
  };

  const handleAction = async (action: string, data: any) => {
    if (action === "deploy") {
      await deployVideo(data.id, data.price, data.ipfsCid);
    }
  };

  const deployVideo = async (id: number, price: number, ipfsHash: string) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x91Aa85a172DD3e7EEA4ad1A4B33E90cbF3B99ed8",
      ABI.abi,
      signer
    );
    const p = ethers.utils.parseEther("0.01");
    try {
      await contract.createVideo(p, ipfsHash, 10, 10);
      await fetch("/api/videos", {
        method: "put",
        body: JSON.stringify({ id }),
      });

      updateVideoStatus([...videos], id, "deployed");
      console.log("successfully deployed video");
    } catch (e) {
      console.log(e);
    }
  };

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
        <h1 className="text-3xl font-bold">Your Videos</h1>
        <VideoTable videos={videos} onActionClick={handleAction} />
      </div>
    </Container>
  );
};

export default DashboardPage;
