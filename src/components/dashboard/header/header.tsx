import { Badge } from "~/components/shadcn_ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "~/components/shadcn_ui/hover-card";
import HeaderOutline from "./headerOutline";

type PropType = {
  name: string;
};

const Header = (props: PropType) => {
  const { name } = props;

  return (
    <>
      <HeaderOutline>
        <HoverCard>
          <HoverCardTrigger className="absolute translate-y-20 rounded-xl px-8 py-2 backdrop-invert">
            <Badge className="absolute right-0 top-0 -translate-y-4 translate-x-6 bg-white text-primary">
              Hover
            </Badge>
            <h1 className="tracking-none md:text-md text-sm font-black uppercase">
              You are now in edit mode
            </h1>
          </HoverCardTrigger>
          <HoverCardContent className="max-w-2xl bg-white">
            Hover over any content you wish to edit, and you will see a pop-up
            once clicked.
            <h1 className="text-red tracking-none py-2 font-black uppercase">
              Warning
            </h1>
            Once save is clicked, the data is automatically updated and cannot
            be reverted
          </HoverCardContent>
        </HoverCard>
        <h2 className="mb-6 font-sans text-5xl font-bold tracking-tight text-white sm:text-7xl sm:leading-none">
          {name}
        </h2>
      </HeaderOutline>
    </>
  );
};

export default Header;
