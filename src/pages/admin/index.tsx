import { useUser } from "@clerk/nextjs";
import Error from "next/error";
import React, { useState } from "react";

import ProjectAdminCard from "~/components/allProjects/projectMemberCard";
import LoadingPage from "~/components/loadingPage";
import { Input } from "~/components/shadcn_ui/input";
import UserLayout from "~/layouts/userLayout";
import { api } from "~/utils/api";
import { NextPageWithLayout } from "../_app";

const AdminProject: NextPageWithLayout = () => {
  const [query, setQuery] = useState("");

  const {
    data: adminProjects,
    isLoading,
    error,
  } = api.projectRouter.getAdminProjects.useQuery();

  if (isLoading) {
    return <LoadingPage />;
  } else if (error) {
    return <Error statusCode={error?.data?.httpStatus || 500} />;
  } else {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center ">
        <section className="mb-14 mt-20">
          <h1 className="tracking-none text-center text-4xl font-black uppercase text-black">
            Admin Projects
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
          {adminProjects.map((project, index) => (
            <ProjectAdminCard
              projectId={project.id}
              name={project.name}
              key={index}
            />
          ))}
        </div>
      </div>
    );
  }
};

AdminProject.getLayout = (page) => {
  return <UserLayout>{page}</UserLayout>;
};

export default AdminProject;
