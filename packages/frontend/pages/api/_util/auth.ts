import { IncomingHttpHeaders } from "http";

export const getWalletAddress = (headers: IncomingHttpHeaders) => {
  return String(headers["x-loop-wa"]);
};
