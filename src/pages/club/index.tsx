import { Club } from "@prisma/client";
import Error from "next/error";
import { useEffect, useRef, useState } from "react";

import { Input } from "~/components/shadcn_ui/input";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

import type { NextPageWithLayout } from "~/pages/_app";

type PropTypes = object;

const AllClubs: NextPageWithLayout = (props: PropTypes) => {
  const [query, setQuery] = useState("");
  const [clubs, setClubs] = useState<Array<Club>>([]);
  const {
    data: allClubs,
    isLoading: allClubsIsLoading,
    error: allClubsError,
  } = api.clubRouter.getAllClubs.useQuery();

  const { data: queryClubs, error: queryError } =
    api.clubRouter.searchForClubs.useQuery(
      { query },
      { enabled: query.trim() !== "" },
    );

  useEffect(() => {
    if (query.trim() !== "") {
      setClubs(queryClubs || []);
    } else {
      setClubs(allClubs || []);
    }
    return () => {
      return;
    };
  }, [queryClubs, allClubs, query]);

  if (allClubsIsLoading) return <div>Loading...</div>;
  else if (queryError || allClubsError) {
    return (
      <Error
        statusCode={
          queryError?.data?.httpStatus || allClubsError?.data?.httpStatus || 500
        }
      />
    );
  }
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h1 className="text-gray-800 tracking-none text-center text-4xl font-black uppercase">
        All Clubs
      </h1>
      <Input
        placeholder="Search for clubs"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          console.log(query);
        }}
      />
      <div className="flex flex-wrap items-center justify-center">
        {clubs.map((club, index) => (
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
};

AllClubs.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default AllClubs;
