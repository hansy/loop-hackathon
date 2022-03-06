import { FC } from "react";

type LockImageProps = {
  maticPrice: number;
  onClick: () => void;
};

const LockImage: FC<LockImageProps> = ({ maticPrice, onClick }) => {
  return (
    <div>
      <div className="w-full h-full"></div>
      <div className="absolute inset-0 bg-black bg-opacity-80 flex justify-center items-center">
        <button
          onClick={onClick}
          type="button"
          className="absolute focus:outline-none border-white border-2 rounded-md px-6 py-4 text-white hover:bg-white hover:text-black"
        >
          <div className="flex flex-col justify-center items-center">
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="315"
                height="315"
                fill="none"
                viewBox="0 0 315 315"
                className="h-10 w-10 inline-block mr-2 -mt-1"
              >
                <path
                  fill="#2891F9"
                  d="M52.5 96.9238L157.5 157.524V197.924L87.5 157.524V238.324L52.5 218.124V96.9238Z"
                />
                <path
                  fill="#2BBDF7"
                  d="M87.5 238.324V157.524L122.5 177.724V218.124L87.5 238.324Z"
                />
                <path
                  fill="#2B6DEF"
                  d="M52.5 96.9239L87.5 76.7239L192.5 137.324L157.5 157.524L52.5 96.9239Z"
                />
                <path
                  fill="#2BBDF7"
                  d="M157.5 157.524L192.5 137.324V177.724L157.5 197.924V157.524Z"
                />
                <path
                  fill="#2891F9"
                  d="M192.5 96.9238V218.124L227.5 238.324V117.124L192.5 96.9238Z"
                />
                <path
                  fill="#2BBDF7"
                  d="M262.5 96.9238L227.5 117.124V238.324L262.5 218.124V96.9238Z"
                />
                <path
                  fill="#2B6DEF"
                  d="M227.5 76.7239L262.5 96.9239L227.5 117.124L192.5 96.9239L227.5 76.7239Z"
                />
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
