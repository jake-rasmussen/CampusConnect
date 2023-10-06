import Link from "next/link";
import React from "react";

import { Card } from "../shadcn_ui/card";

type PropTypes = {
  clubId: string;
  name: string;
};

const ClubMemberCard = (props: PropTypes) => {
  const { clubId, name } = props;
  return (
    <Card className="group m-6 mb-0 flex h-72 w-72 flex-col rounded-2xl bg-white shadow-xl transition duration-300 ease-in-out hover:scale-110">
      <Link href={`/member/${clubId}`} className="h-full w-full ">
        <header className="h-1/2 rounded-t-xl bg-gradient-to-r from-primary to-secondary shadow-2xl" />
        <div className="flex h-1/2 flex-col text-center">
          <h1 className="tracking-none mt-8 text-xl font-black uppercase text-black">
            {name}
          </h1>
          <p className="text-gray-700 mb-8 flex grow items-end justify-center font-light  transition duration-200 ease-in-out group-hover:text-secondary ">
            Click to view club
          </p>
        </div>
      </Link>
    </Card>
  );
};

export default ClubMemberCard;
