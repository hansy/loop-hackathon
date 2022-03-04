import type { NextPage } from "next";
import { useState, useEffect } from "react";

const DashboardPage: NextPage = () => {
  const [videos, setVideos] = useState<Array<object>>([]);

  useEffect(() => {
    const getVideos = async () => {
      try {
        const res = await fetch("/api/videos");
        const data = await res.json();

        setVideos(data.data);
      } catch (e) {
        console.log(e);
      }
    };

    getVideos();
  }, []);

  return (
    <div>
      <h1>Videos</h1>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Status</th>
            <th>IPFS CID</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {videos.map((v: any) => {
            return (
              <tr key={v.id}>
                <td>{v.metadata.title}</td>
                <td>{v.metadata.description}</td>
                <td>{v.metadata.price}</td>
                <td>{v.status}</td>
                <td>{v.ipfs_cid}</td>
                <td>{v.status === "exported" && <button>Pin video</button>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardPage;
