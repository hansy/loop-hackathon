import { FC } from "react";
import { Video } from "../../../models/video";

type VideoTableProps = {
  videos: Array<Video>;
  onActionClick: (action: string, data: any) => void;
};

const STATUS_MAP: any = {
  transcoded: "Exporting to IPFS...",
  exported: "Exported",
  deployed: "Deployed",
};

const VideoTable: FC<VideoTableProps> = ({ videos, onActionClick }) => {
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
                      ${video.metadata.price}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {STATUS_MAP[video.status] || video.status}
                    </td>
                    <td className="px-6 py-4 whitespace-normal text-sm text-gray-500">
                      {video.ipfs_cid}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {video.status === "exported" && (
                        <button
                          className="px-2 py-1 text-white bg-green-600 rounded"
                          onClick={() =>
                            onActionClick("deploy", {
                              id: video.id,
                              price: video.metadata.price,
                              ipfsCid: video.ipfs_cid,
                            })
                          }
                        >
                          Deploy
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
