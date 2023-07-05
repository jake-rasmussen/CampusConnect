import { InfoCircle } from "tabler-icons-react";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/shadcn_ui/hover-card";
import HeaderOutline from "./headerOutline";

type PropType = {
  name: string;
  edit: boolean;
};

const Header = (props: PropType) => {
  const { name, edit } = props;

  return (
    <>
      <HeaderOutline>
        {edit ? (
          <HoverCard>
            <HoverCardTrigger className="absolute translate-y-20 rounded-xl px-8 py-2 backdrop-invert">
              <h1 className="tracking-none md:text-md flex flex-row items-center text-sm font-black uppercase">
                <InfoCircle className="mr-2" />
                You are now in edit mode
              </h1>
            </HoverCardTrigger>
            <HoverCardContent className="w-96 bg-white">
              Hover over any content you wish to edit, and you will see a pop-up
              once clicked.
              <h1 className="text-red tracking-none py-2 font-black uppercase">
                Warning
              </h1>
              Once save is clicked, the data is automatically updated and cannot
              be reverted
            </HoverCardContent>
          </HoverCard>
        ) : (
          <></>
        )}

        <h2 className="mb-6 font-sans text-5xl font-bold tracking-tight text-white sm:text-7xl sm:leading-none">
          {name}
        </h2>
      </HeaderOutline>
    </>
  );
};

export default Header;
