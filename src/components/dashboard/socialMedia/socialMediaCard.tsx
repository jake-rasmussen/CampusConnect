import { SocialMediaPlatformType } from "@prisma/client";
import Link from "next/link";
import {
  BrandFacebook,
  BrandInstagram,
  BrandLinkedin,
  BrandTwitter,
  WorldWww,
} from "tabler-icons-react";

import SocialMediaCardEditor from "./socialMediaCardEditor";

import type { SocialMedia } from "@prisma/client";

type PropType = {
  socialMedia: SocialMedia;
  editable: boolean;
};

const SocialMediaCard = (props: PropType) => {
  const { socialMedia, editable } = props;

  const iconClassName =
    "w-full h-full text-secondary transition duration-300 ease-in-out hover:text-primary";
  const icon: JSX.Element =
    socialMedia.platform === SocialMediaPlatformType.FACEBOOK ? (
      <BrandFacebook className={iconClassName} />
    ) : socialMedia.platform === SocialMediaPlatformType.INSTAGRAM ? (
      <BrandInstagram className={iconClassName} />
    ) : socialMedia.platform === SocialMediaPlatformType.LINKEDIN ? (
      <BrandLinkedin className={iconClassName} />
    ) : socialMedia.platform === SocialMediaPlatformType.TWITTER ? (
      <BrandTwitter className={iconClassName} />
    ) : (
      <WorldWww className={iconClassName} />
    );

  return (
    <>
      <div className="relative h-16 w-16 my-4">
        <Link className="h-full w-full" href={socialMedia.url}>
          {icon}
        </Link>

        {editable && (
          <SocialMediaCardEditor
            url={socialMedia.url}
            platform={socialMedia.platform}
            socialMediaId={socialMedia.id}
          />
        )}
      </div>
    </>
  );
};

export default SocialMediaCard;
