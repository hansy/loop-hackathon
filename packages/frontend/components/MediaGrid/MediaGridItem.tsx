import { useEffect, useState } from "react";
import VideoPlayer from "../VideoPlayer";
import LockImage from "../LockImage";
import { gweiToMatic } from "../../util/currency";
import { useMoralis } from "react-moralis";
import { ethers } from "ethers";
import ABI from "../../abi/VideoManager.json";

const MediaGridItem = ({ video }: any) => {
  const [purchased, setPurchased] = useState<Boolean>(false);
  const { user } = useMoralis();

  console.log(user?.get("ethAddress"));

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
        nullAddress
      );
      await res.wait();

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
        {purchased && <VideoPlayer videoId={video.id} src={video.src} />}
        {!purchased && (
          <LockImage maticPrice={gweiToMatic(video.price)} onClick={purchase} />
        )}
      </div>
      <p className="mt-2 block text-md font-bold text-gray-900 truncate pointer-events-none">
        {video.title}
      </p>
    </div>
  );
};

export default MediaGridItem;
