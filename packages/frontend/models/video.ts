import { transferVideotoIPFS } from "../pages/api/_util/livepeer";
import { postGQL } from "../pages/api/_util/request";

type VideoObj = {
  title: string;
  description: string;
  assetId: string;
  price: number;
};

export const createVideo = async (userId: number, video: VideoObj) => {
  try {
    const taskId = await transferVideotoIPFS(video.assetId);
    const variables = {
      video: {
        metadata: {
          title: video.title,
          description: video.description,
          price: video.price,
        },
        livepeer_data: {
          asset_id: video.assetId,
          ipfs_task_id: taskId,
        },
        status: "transcoded",
        user_id: userId,
      },
    };
    const query = `
      mutation($video: videos_insert_input!) {
        insert_videos_one(
          object: $video
        ) {
          id
          metadata
          status
        }
      }
    `;

    return await postGQL(query, variables, "insert_videos_one");
  } catch (e) {
    return Promise.reject(e);
  }
};

export const getVideos = async (userId: number) => {
  const query = `
    query {
      videos(
        where: {
          user_id: { _eq: ${userId} }
        }
        order_by: { created_at: desc }
      ) {
        id
        livepeer_data
        metadata
        status
        ipfs_cid
      }
    }
  `;

  return await postGQL(query, null, "videos");
};
