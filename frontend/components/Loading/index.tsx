import React from "react";
import { ClipLoader, PulseLoader, SyncLoader } from "react-spinners";

type Props = {
  title?: string;
  message?: string;
};

const Loading = ({
  title = "Page Loading",
  message = "Loading content, please wait...",
}: Props) => {
  return (
    <div className="h-96 flex flex-col mt-64 items-center gap-2">
      <h1 className="text-xl font-bold">{title}</h1>
      <p className="text-gray-500 text-sm mb-6">{message}</p>
      <SyncLoader color="#60a5fa" size={15} margin={5} />
    </div>
  );
};

export default Loading;
