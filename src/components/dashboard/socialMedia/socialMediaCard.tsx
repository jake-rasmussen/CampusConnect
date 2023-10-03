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

import type { ClubSocialMedia } from "@prisma/client";

type PropType = {
  clubSocialMedia: ClubSocialMedia;
  editable: boolean;
};

const SocialMediaCard = (props: PropType) => {
  const { clubSocialMedia, editable } = props;

  const iconClassName =
    "w-full h-full text-secondary transition duration-300 ease-in-out hover:text-primary";
  const icon: JSX.Element =
    clubSocialMedia.platform === SocialMediaPlatformType.FACEBOOK ? (
      <BrandFacebook className={iconClassName} />
    ) : clubSocialMedia.platform === SocialMediaPlatformType.INSTAGRAM ? (
      <BrandInstagram className={iconClassName} />
    ) : clubSocialMedia.platform === SocialMediaPlatformType.LINKEDIN ? (
      <BrandLinkedin className={iconClassName} />
    ) : clubSocialMedia.platform === SocialMediaPlatformType.TWITTER ? (
      <BrandTwitter className={iconClassName} />
    ) : (
      <WorldWww className={iconClassName} />
    );

  return (
    <>
      <div className="relative h-16 w-16">
        <Link className="h-full w-full" href={clubSocialMedia.url}>
          {icon}
        </Link>

        {editable && (
          <SocialMediaCardEditor
            url={clubSocialMedia.url}
            platform={clubSocialMedia.platform}
            socialMediaId={clubSocialMedia.id}
          />
        )}
      </div>
    </>
  );
};

export default SocialMediaCard;
