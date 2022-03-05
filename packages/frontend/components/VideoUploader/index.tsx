import { FC, useEffect } from "react";
import Uppy from "@uppy/core";
import XHRUpload from "@uppy/xhr-upload";
import { Dashboard } from "@uppy/react";
import "@uppy/core/dist/style.css";
import "@uppy/dashboard/dist/style.css";

type UploadData = {
  name: string;
};

type VideoUploaderProps = {
  onVideoUpload: (assetId: string) => void;
};

const getRequestURL = async (fileName: string) => {
  try {
    const res: Response = await fetch(
      `${window.location.hostname}/api/upload?fileName=${fileName}`
    );
    return await res.json();
  } catch {
    return {};
  }
};

const uppy = new Uppy({
  restrictions: { maxNumberOfFiles: 1, allowedFileTypes: ["video/mp4"] },
  autoProceed: false,
});

uppy.use(XHRUpload, {
  endpoint: "",
  method: "put",
  formData: false,
});

const VideoUploader: FC<VideoUploaderProps> = ({ onVideoUpload }) => {
  useEffect(() => {
    uppy.on("file-added", async (result: UploadData) => {
      const { url, id } = await getRequestURL(result.name);

      uppy.getPlugin("XHRUpload")?.setOptions({
        endpoint: url,
      });

      uppy
        .upload()
        .then(() => onVideoUpload(id))
        .catch((e) => console.log(e));
    });
  }, [onVideoUpload]);

  return (
    <Dashboard
      uppy={uppy}
      hideUploadButton={true}
      doneButtonHandler={undefined}
      proudlyDisplayPoweredByUppy={false}
      height={200}
      width={0}
    />
  );
};

export default VideoUploader;
