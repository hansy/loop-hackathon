import { useEffect, useState } from "react";
import VideoPlayer from "../VideoPlayer";
import LockImage from "../LockImage";
import { gweiToMatic, maticToUsd } from "../../util/currency";
import { useMoralis } from "react-moralis";

const MediaGridItem = ({ video }: any) => {
  const [purchased, setPurchased] = useState<Boolean>(false);
  const { user } = useMoralis();

  useEffect(() => {
    if (user) {
      if (
        video.creator.id.toLowerCase() === user.get("ethAddress").toLowerCase()
      ) {
        setPurchased(true);
      } else {
        if (video.purchase.length > 0) {
          setPurchased(true);
        }
      }
    }
  }, [user, video]);

  return (
    <div>
      <div className="group w-full bg-gray-100 overflow-hidden relative">
        {purchased && <VideoPlayer videoId={video.id} src={video.src} />}
        {!purchased && <LockImage maticPrice={gweiToMatic(video.price)} />}
      </div>
      <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">
        {video.title}
      </p>
      <p className="block text-sm font-medium text-gray-500 pointer-events-none">
        ${maticToUsd(gweiToMatic(video.price))} ~=
        <span>
          <svg
            className="h-6 w-6 inline-block"
            clipRule="evenodd"
            fillRule="evenodd"
            strokeLinejoin="round"
            strokeMiterlimit="2"
            viewBox="0 0 560 400"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <linearGradient id="a">
              <stop offset="0" stopColor="#00ffa3" />
              <stop offset="1" stopColor="#dc1fff" />
            </linearGradient>
            <linearGradient
              id="b"
              gradientTransform="matrix(-219.666 420.749 -420.749 -219.666 360.879 -37.4553)"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="1"
              xlinkHref="#a"
              y1="0"
              y2="0"
            />
            <linearGradient
              id="c"
              gradientTransform="matrix(-219.666 420.749 -420.749 -219.666 264.829 -87.6014)"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="1"
              xlinkHref="#a"
              y1="0"
              y2="0"
            />
            <linearGradient
              id="d"
              gradientTransform="matrix(-219.666 420.749 -420.749 -219.666 312.548 -62.688)"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="1"
              xlinkHref="#a"
              y1="0"
              y2="0"
            />
            <g
              fillRule="nonzero"
              transform="matrix(.641643 0 0 .641643 152.409 100)"
            >
              <path
                d="m64.6 237.9c2.4-2.4 5.7-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8h-317.4c-5.8 0-8.7-7-4.6-11.1z"
                fill="url(#b)"
              />
              <path
                d="m64.6 3.8c2.5-2.4 5.8-3.8 9.2-3.8h317.4c5.8 0 8.7 7 4.6 11.1l-62.7 62.7c-2.4 2.4-5.7 3.8-9.2 3.8h-317.4c-5.8 0-8.7-7-4.6-11.1z"
                fill="url(#c)"
              />
              <path
                d="m333.1 120.1c-2.4-2.4-5.7-3.8-9.2-3.8h-317.4c-5.8 0-8.7 7-4.6 11.1l62.7 62.7c2.4 2.4 5.7 3.8 9.2 3.8h317.4c5.8 0 8.7-7 4.6-11.1z"
                fill="url(#d)"
              />
            </g>
          </svg>
        </span>
        {gweiToMatic(video.price)}
      </p>
    </div>
  );
};

export default MediaGridItem;
