import { FC } from "react";

type LockImageProps = {
  maticPrice: number;
  onClick: () => void;
};

const LockImage: FC<LockImageProps> = ({ maticPrice, onClick }) => {
  return (
    <div>
      <div></div>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <button
          onClick={onClick}
          type="button"
          className="absolute focus:outline-none border-white border-2 rounded-md px-6 py-4 text-white hover:bg-white hover:text-black"
        >
          <div className="flex flex-col justify-center items-center">
            <div>
              <svg
                className="h-10 w-10 inline-block"
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
              <span className="-ml-1 text-lg">{maticPrice}</span>
            </div>
          </div>
          <div className="text-center font-bold uppercase mt-3">Unlock</div>
        </button>
      </div>
    </div>
  );
};

export default LockImage;
