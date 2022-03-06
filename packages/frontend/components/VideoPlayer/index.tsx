import videojs from "video.js";
import "video.js/dist/video-js.css";
import "@videojs/themes/dist/fantasy/index.css";
import { useEffect, useRef, FC } from "react";

type VideoPlayerProps = {
  videoId: string;
  src: string;
};

const VideoPlayer: FC<VideoPlayerProps> = ({ videoId, src }) => {
  const playerRef = useRef<any>(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const options = {
      autoplay: false,
      controls: true,
      fluid: true,
      preload: "auto",
      sources: [
        {
          src,
          type: "video/mp4",
        },
      ],
    };

    // make sure Video.js player is only initialized once
    if (!playerRef.current) {
      const videoElement = videoRef.current;

      if (!videoElement) return;

      playerRef.current = videojs(videoElement, options);
    } else {
      // you can update player here [update player through props]
      // const player = playerRef.current;
      // player.autoplay(options.autoplay);
      // player.src(options.sources);
    }
  }, [videoRef, src]);

  useEffect(() => {
    const player = playerRef.current;

    return () => {
      if (player) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <video
      ref={videoRef}
      id={videoId}
      className="video-js vjs-theme-fantasy"
    ></video>
  );
};

export default VideoPlayer;
