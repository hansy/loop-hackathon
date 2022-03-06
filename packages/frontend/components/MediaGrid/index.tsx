import MediaGridItem from "./MediaGridItem";

const MediaGrid = ({ videos }: any) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {videos.map((video: any) => {
        return <MediaGridItem key={video.id} video={video} />;
      })}
    </div>
  );
};

export default MediaGrid;
