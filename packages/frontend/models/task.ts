import { getTask } from "../pages/api/_util/livepeer";
import { getUnMigratedVideos, updateVideo } from "./video";
import { pinJSONFile } from "../pages/api/_util/pinata";
import { sleep } from "../pages/api/_util/misc";

export const checkIPFSMigration = async () => {
  try {
    const videos = await getUnMigratedVideos();

    for (let i = 0; i < videos.length; i++) {
      const video = videos[i];
      const taskId = video.task_id;
      const task = await getTask(taskId);

      if (task.status.phase === "completed") {
        const newMetadata = {
          video_url: task.output.export.ipfs.videoFileGatewayUrl,
          ...video.metadata,
        };
        const pinData = await pinJSONFile(newMetadata);

        await updateVideo(video.id, {
          status: "exported",
          metadata: newMetadata,
          ipfs_cid: pinData.IpfsHash,
        });

        await sleep(500);
      }
    }

    return true;
  } catch (e) {
    return Promise.reject(e);
  }
};
