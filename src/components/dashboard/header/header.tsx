import { Colors } from "@prisma/client";
import { InfoCircle } from "tabler-icons-react";

import HeaderOutline from "./headerOutline";
import { useEffect } from "react";

type PropType = {
  name: string;
  subtext?: string;
  colors?: Colors;
  bannerUrl?: string;
  editable: boolean;
};

const Header = (props: PropType) => {
  const { name, subtext, colors, bannerUrl, editable } = props;

  useEffect(() => {
    
  })

  return (
    <HeaderOutline colors={colors}>
      {editable ? (
        <div className="absolute translate-y-20 rounded-xl px-8 py-2 backdrop-invert">
          <h1 className="tracking-none md:text-md flex flex-row items-center text-sm font-black uppercase">
            <InfoCircle className="mr-2" />
            You are now in edit mode
          </h1>
        </div>
      ) : (
        <></>
      )}

      <div className="min-w-96 flex flex-col overflow-hidden">
        <h2 className="mb-6 font-sans text-5xl font-bold tracking-tight text-white sm:text-7xl sm:leading-none">
          {name}
        </h2>
        {subtext ? (
          <h4 className="text-2xl font-semibold text-white sm:text-4xl">
            {subtext}
          </h4>
        ) : (
          <></>
        )}
      </div>
    </HeaderOutline>
  );
};

export default Header;
