import React from "react";

type Props = {};

const Forbidden = (props: Props) => {
  return (
    <div className="h-screen flex flex-row items-center justify-center">
      <h1 className="text-2xl font-bold">403</h1>
      <div className="mx-6 border-r-2  bg-gray- h-10"></div>
      <h1>You do not have the permission to access this page.</h1>
    </div>
  );
};

export default Forbidden;
