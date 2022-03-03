import type { NextPage } from "next";
import { useState, FormEvent } from "react";
import * as yup from "yup";
import VideoUploader from "../components/VideoUploader";

const videoSchema = yup.object().shape({
  price: yup.number().min(0).integer(),
  title: yup.string(),
  description: yup.string(),
  assetId: yup.string().required(),
});

const UploadPage: NextPage = () => {
  const [price, setPrice] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [assetId, setAssetId] = useState<string>("");

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:3000/api/videos", {
        method: "post",
        body: JSON.stringify({ price, title, description, assetId }),
        headers: {
          "content-type": "application/json",
        },
      });
      const video = await res.json();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>Upload video file</h1>
      <form onSubmit={submit}>
        <input
          type="number"
          name="price"
          placeholder="Price in cents"
          onChange={(e) => setPrice(Number(e.target.value))}
        />
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="textarea"
          name="description"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        />
        <VideoUploader onVideoUpload={setAssetId} />
        <button type="submit">Create video</button>
      </form>
    </div>
  );
};

export default UploadPage;
