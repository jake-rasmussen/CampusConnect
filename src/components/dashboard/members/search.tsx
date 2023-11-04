import "@prisma/client";

import { debounce } from "lodash";
import React, { useEffect, useRef, useState } from "react";

import { api } from "~/utils/api";
import { Input } from "../../shadcn_ui/input";

import type { Member, User } from "@prisma/client";

type PropType = {
  projectId: string;
  members: Member[];
};

const Search = (props: PropType) => {
  // TODO: create confirm add user modal -- if user already exists notify using react toast otherwise notify addition
  const { projectId, members } = props;

  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const [registeredUserIds, setRegisteredUserIds] = useState<string[]>(
    Array.from(members, (member) => member.userId),
  );

  const { data: users } = api.usersRouter.getUsersByQuery.useQuery({
    query: search,
  });

  const queryClient = api.useContext();

  const addMember = api.memberRouter.createMember.useMutation({
    onSuccess() {
      queryClient.invalidate();
    },
  });

  const [queryResult, setQueryResult] = useState<User[]>([]);

  const debouncedSearch = useRef(
    debounce(async (input: string) => {
      setSearch(input);
    }, 200),
  ).current;

  useEffect(() => {
    setQueryResult([]);
    if (users !== undefined) {
      setQueryResult(
        users.filter((user) => !registeredUserIds.includes(user.userId)),
      );
      setRegisteredUserIds(Array.from(members, (member) => member.userId));
    }
  }, [users]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleAddMember = (userId: string) => {
    addMember.mutate({
      projectId,
      userId,
    });
    setSearch("");
    setQuery("");
  };

  return (
    <div className="relative flex max-w-sm flex-col items-center justify-center">
      <Input
        value={query}
        onChange={(e) => {
          debouncedSearch(e.currentTarget.value);
          setQuery(e.currentTarget.value);
        }}
        placeholder="ADD A USER"
        className="tracking-none border border-2 text-xl font-black uppercase text-secondary"
      />
      {queryResult && queryResult.length > 0 && search.length > 0 && (
        <div className="absolute top-0 z-20 flex max-h-48 translate-y-12 flex-col overflow-y-scroll rounded-xl border border-2 border-secondary bg-white p-4 shadow-xl">
          {queryResult.map((query: User, index: number) => {
            return (
              <button
                className="my-2 flex flex-row rounded-xl p-4 transition duration-300 ease-in-out hover:bg-gray"
                key={`search${index}`}
                onClick={() => handleAddMember(query.userId)}
              >
                <span className="text-md flex-none font-semibold text-secondary">
                  {query.emailAddress}
                </span>
                <span className="ml-8 flex grow justify-end whitespace-nowrap font-medium underline">
                  {query.firstName} {query.lastName}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Search;
