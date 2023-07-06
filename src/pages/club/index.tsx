import { type Club } from "@prisma/client";
import Error from "next/error";
import { useEffect, useState } from "react";

import ClubCard from "~/components/allClubs/clubCard";
import { Input } from "~/components/shadcn_ui/input";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";

import type { NextPageWithLayout } from "~/pages/_app";

const AllClubs: NextPageWithLayout = () => {
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
    <div className="flex h-full w-full flex-col items-center justify-center ">
      <section className="mb-14 mt-20">
        <h1 className="tracking-none text-center text-4xl font-black uppercase text-black">
          All Clubs
        </h1>
      </section>

      <section className="w-full max-w-2xl px-4">
        <Input
          className="rounded-none border-x-0 border-b-2 border-t-0 border-secondary bg-transparent focus-visible:ring-0"
          placeholder={"Search"}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </section>

      <div className="m-10 flex w-full flex-wrap items-center justify-center">
        {clubs.map((club, index) => (
          <ClubCard clubId={club.id} name={club.name} key={index} />
        ))}
      </div>
    </div>
  );
};

AllClubs.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default AllClubs;
