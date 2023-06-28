import { Badge } from "~/components/shadcn_ui/badge";
import HeaderOutline from "./headerOutline";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "~/components/shadcn_ui/hover-card";

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
            <Badge className="absolute top-0 right-0 translate-x-6 -translate-y-4 bg-white text-primary">Hover</Badge>
            <h1 className="font-black uppercase tracking-none text-sm md:text-md">You are now in edit mode</h1>
          </HoverCardTrigger>
          <HoverCardContent className="bg-white max-w-2xl">
            Hover over any content you wish to edit, and you will see a pop-up once clicked.
            <h1 className="text-red font-black uppercase tracking-none py-2">Warning</h1>
            Once save is clicked, the data is automatically updated and cannot be reverted

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
