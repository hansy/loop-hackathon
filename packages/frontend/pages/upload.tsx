import type { NextPage } from "next";
import { useState, FormEvent } from "react";
import * as yup from "yup";
import VideoUploader from "../components/VideoUploader";
import { useMoralis } from "react-moralis";
import Container from "../components/Container";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

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
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);

  const { user } = useMoralis();
  const router = useRouter();

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!buttonDisabled) {
      setButtonDisabled(true);

      try {
        const res = await fetch("/api/videos", {
          method: "post",
          body: JSON.stringify({
            price: price * 100,
            title,
            description,
            assetId,
          }),
          headers: {
            "content-type": "application/json",
            "x-loop-wa": user?.get("ethAddress"),
          },
        });
        await res.json();

        setPrice(0);
        setTitle("");
        setDescription("");
        setAssetId("");

        toast.success(
          "Video successfully uploaded! It's being prepped for export, so check back on the status of it (1-2 min) to deploy it!",
          { autoClose: false }
        );
        router.push({ pathname: "/dashboard" });

        console.log("success");
      } catch (e) {
        console.log(e);
      } finally {
        setButtonDisabled(false);
      }
    }
  };

  return (
    <Container>
      <div>
        <h1 className="text-3xl font-bold">Add a video</h1>
        <p className="mt-3">
          Need a video? Grab one at{" "}
          <a
            href="https://pixabay.com/videos/search/nature/"
            target="_blank"
            rel="noreferrer"
            className="text-blue-500"
          >
            Pixabay
          </a>
        </p>
        <form onSubmit={submit} className="space-y-8 divide-y divide-gray-200">
          <div className="space-y-8 divide-y divide-gray-200">
            <div>
              <div className="mt-6 sm:grid gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="mb-4 sm:mb-0 sm:col-span-4">
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <div className="mt-1">
                    <input
                      id="title"
                      name="title"
                      type="text"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    />
                  </div>
                </div>

                <div className="mb-4 sm:mb-0 sm:col-span-4">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <div className="mt-1">
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border border-gray-300 rounded-md"
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    />
                  </div>
                </div>

                <div className="mb-4 sm:mb-0 sm:col-span-2 sm:col-start-1">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Price (in USD)
                  </label>
                  <div className="mt-1">
                    <input
                      type="number"
                      name="price"
                      id="price"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                      value={price}
                      onChange={(e) => setPrice(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="sm:col-start-1 col-span-4">
                  <VideoUploader onVideoUpload={setAssetId} />
                  <p className="text-sm text-gray-500 mt-1">
                    * Currently supporting mp4 videos with AAC audio codec
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-start">
              <button
                type="submit"
                disabled={buttonDisabled}
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add video
              </button>
            </div>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default UploadPage;
