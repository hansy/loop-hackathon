import { FC } from "react";
import { Video } from "../../../models/video";
import ABI from "../../../../hardhat/artifacts/contracts/VideoManager.sol/VideoManager.json";
import { ethers } from "ethers";

type VideoTableProps = {
  videos: Array<Video>;
};

const VideoTable: FC<VideoTableProps> = ({ videos }) => {
  const storeVideo = async (price: number, ipfsHash: string) => {
    // const provider = new ethers.providers.StaticJsonRpcProvider(
    //   process.env.NUXT_PUBLIC_RPC_PROVIDER
    // );
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    console.log(signer);
    const contract = new ethers.Contract(
      "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      ABI.abi,
      signer
    );
    const p = ethers.utils.parseEther("0.01");
    try {
      const res = await contract.createVideo(p, ipfsHash, 10, 10);
      console.log(res);
      const txReceipt = await res.wait();
      console.log(txReceipt);
    } catch (e) {
      console.log(e);
    }
    // const contract = new web3.eth.Contract(ABI, "0x5FbDB2315678afecb367f032d93F642f64180aa3");
  };

  if (videos.length === 0) {
    return <p className="mt-4">No videos added yet</p>;
  }

  return (
    <div className="flex flex-col my-4">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Title
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Description
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    IPFS CID
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Action</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {videos.map((video: Video, index: number) => (
                  <tr
                    key={video.id}
                    className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {video.metadata.title}
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                      {video.metadata.description}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {video.metadata.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {video.status}
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                      {video.ipfs_cid}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {video.status === "exported" && (
                        <button onClick={() => storeVideo(10, video.ipfs_cid)}>
                          Store video
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoTable;
