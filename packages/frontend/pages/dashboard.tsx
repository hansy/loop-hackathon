import type { NextPage } from "next";
import { useState, useEffect, useRef, ReactText } from "react";
import { useMoralis } from "react-moralis";
import Container from "../components/Container";
import VideoTable from "../components/Video/Table";
import { Video } from "../models/video";
import ABI from "../abi/VideoManager.json";
import { ethers } from "ethers";
import { usdToGwei, gweiToMatic, maticToUsd } from "../util/currency";
import { getVideos } from "../apiClient/videos";
import { toast } from "react-toastify";

declare var window: any;

const DashboardPage: NextPage = () => {
  const [deployedVideos, setDeployedVideos] = useState([]);
  const [exportedVideos, setExportedVideos] = useState<Array<Video>>([]);
  const { user } = useMoralis();
  const toastId = useRef<any>(null);

  const updateVideoStatus = (videos: Array<Video>, id: any, status: string) => {
    const video = videos.find((video) => video.id === id);

    if (video) {
      video.status = status;
    }

    setExportedVideos(videos);
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
    const gwei = usdToGwei(price);

    try {
      toastId.current = toast.info("Deploying to contract...", {
        autoClose: false,
      });
      await contract.createVideo(gwei, ipfsHash, 10, 10);
      await fetch("/api/videos", {
        method: "PUT",
        body: JSON.stringify({ id }),
        headers: {
          "content-type": "application/json",
        },
      });
      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        render: "Video is deployed! It will now appear on your page!",
      });

      updateVideoStatus([...exportedVideos], id, "deployed");
      console.log("successfully deployed video");
    } catch (e) {
      toast.update(toastId.current, {
        type: toast.TYPE.ERROR,
        render: "Video not deployed",
      });
      console.log(e);
    }
  };

  useEffect(() => {
    const getExportedVideos = async () => {
      if (user) {
        try {
          const res = await fetch("/api/videos", {
            headers: {
              "x-loop-wa": user?.get("ethAddress"),
            },
          });

          if (res.ok) {
            const data = await res.json();

            setExportedVideos(
              data.data.map((v: any) => ({
                ...v,
                metadata: { ...v.metadata, price: v.metadata.price / 100 },
              }))
            );
          }
        } catch (e) {
          console.log(e);
        }
      }
    };
    const getDeployedVideos = async () => {
      if (user) {
        try {
          const deployedVids = await getVideos(user.get("ethAddress"));

          setDeployedVideos(
            deployedVids.map((v: any) => ({
              id: v.id,
              metadata: {
                title: v.title,
                description: v.description,
                price: maticToUsd(gweiToMatic(v.price)),
              },
              ipfs_cid: v.id,
              status: "deployed",
            }))
          );
        } catch (e) {
          console.log(e);
        }
      }
    };

    getDeployedVideos();
    getExportedVideos();
  }, [user]);

  const allVideos = (
    exportedVideos: Array<any>,
    deployedVideos: Array<any>
  ) => {
    return [...deployedVideos, ...exportedVideos];
  };

  return (
    <Container>
      <div>
        <h1 className="text-3xl font-bold">Your Videos</h1>
        <VideoTable
          videos={allVideos(exportedVideos, deployedVideos)}
          onActionClick={handleAction}
        />
      </div>
    </Container>
  );
};

export default DashboardPage;
