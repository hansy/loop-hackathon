export const error = (
  statusCode: number,
  msg: string = "An unexpected error ocurred.",
  details: Array<any> = []
) => {
  return {
    statusCode,
    msg,
    details,
  };
};
