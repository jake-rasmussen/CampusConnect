import Link from "next/link";
import React from "react";

import Button from "../button";
import { Card } from "../shadcn_ui/card";

type PropTypes = {
  clubId: string;
  name: string;
};

const ClubCard = (props: PropTypes) => {
  const { clubId, name } = props;
  return (
    <Card className="m-6 mb-0 flex h-48 w-1/4 max-w-[80rem] flex-col rounded-2xl bg-white shadow-xl">
      <header className="h-1/2 w-full rounded-t-xl bg-gradient-to-r from-primary to-secondary shadow-2xl" />
      <div>
        <p className="">{name}</p>
        <Link href={`/club/${clubId}`}>
          <Button> </Button>
        </Link>
      </div>
    </Card>
  );
};

export default ClubCard;
