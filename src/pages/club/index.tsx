import Error from "next/error";
import React from "react";

import UserLayout from "~/components/layouts/userLayout";
import { api } from "~/utils/api";

import type { NextPageWithLayout } from "~/pages/_app";

type PropTypes = object;

const AllClubs: NextPageWithLayout = (props: PropTypes) => {
  const { data, isLoading, isError, error } =
    api.clubRouter.getAllClubs.useQuery();

  

  if (isLoading) return <div>Loading...</div>;
  else if (isError)
    return <Error statusCode={error?.data?.httpStatus || 500} />;
  else {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <h1 className="text-gray-800 tracking-none text-center text-4xl font-black uppercase">
          All Clubs
        </h1>
        <Input
        <div className="flex flex-wrap items-center justify-center">
          {data.map((club, index) => (
            <div
              className="m-4 flex flex-col items-center justify-center"
              key={index}
            >
              <h1 className="text-gray-800 tracking-none text-center text-2xl font-black uppercase">
                {club.name}
              </h1>
            </div>
          ))}
        </div>
      </div>
    );
  }
};

AllClubs.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default AllClubs;
