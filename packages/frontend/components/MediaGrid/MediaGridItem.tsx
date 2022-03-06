import { useEffect, useRef, useState } from "react";
import VideoPlayer from "../VideoPlayer";
import LockImage from "../LockImage";
import { gweiToMatic } from "../../util/currency";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import ABI from "../../abi/VideoManager.json";
import { get } from "../../util/request";

declare var window: any;

const getIpfsJson = async (ipfsHash: string) => {
  try {
    return await get(`https://gateway.pinata.cloud/ipfs/${ipfsHash}/`);
  } catch {
    return {};
  }
};

const MediaGridItem = ({ video }: any) => {
  const [v, setV] = useState<any>({});
  const [purchased, setPurchased] = useState<Boolean>(false);
  const { user } = useMoralis();
  const toastId = useRef<any>(null);

  useEffect(() => {
    const getMetadata = async () => {
      if (!video.src) {
        try {
          const json = await getIpfsJson(video.id);

          setV({
            ...video,
            src: json.video_url,
            title: json.title,
            description: json.desription,
          });
        } catch (e) {}
      } else {
        setV(video);
      }
    };

    getMetadata();
  }, [video]);

  const purchase = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      "0x91Aa85a172DD3e7EEA4ad1A4B33E90cbF3B99ed8",
      ABI.abi,
      signer
    );

    try {
      console.log("sending transaction...");
      const nullAddress = "0x0000000000000000000000000000000000000000";
      const res = await contract.getVideoAccess(
        video.id,
        nullAddress,
        nullAddress,
        { value: video.price }
      );
      toastId.current = toast.info("Waiting for transaction confirmation...", {
        autoClose: false,
      });
      await res.wait();
      toast.update(toastId.current, {
        type: toast.TYPE.SUCCESS,
        render: "Video purchased!",
      });

      console.log("transaction approved!");

      setPurchased(true);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (user) {
      if (
        video.creator.id.toLowerCase() === user.get("ethAddress").toLowerCase()
      ) {
        setPurchased(true);
      } else {
        if (video.purchases && video.purchases.length > 0) {
          setPurchased(true);
        }
      }
    }
  }, [user, video]);

  return (
    <div>
      <div className="group w-full bg-gray-100 overflow-hidden relative h-80">
        {purchased && <VideoPlayer videoId={v.id} src={v.src} />}
        {!purchased && (
          <LockImage maticPrice={gweiToMatic(v.price)} onClick={purchase} />
        )}
      </div>
      <p className="mt-2 block text-md font-bold text-gray-900 truncate pointer-events-none">
        {v.title}
      </p>
    </div>
  );
};

export default MediaGridItem;
