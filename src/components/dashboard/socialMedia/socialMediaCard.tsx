import { SocialMediaPlatformType } from "@prisma/client";
import Link from "next/link";
import {
  BrandFacebook,
  BrandInstagram,
  BrandLinkedin,
  BrandTwitter,
  WorldWww,
} from "tabler-icons-react";

import SocialMediaEditor from "./socialMediaEditor";
import { useContext } from "react";
import { ProjectContext } from "lib/context"; // Import the ProjectContext

import type { SocialMedia } from "@prisma/client";

type PropType = {
  socialMedia: SocialMedia;
  editable: boolean;
  projectId: string;
};

const SocialMediaCard = (props: PropType) => {
  const { socialMedia, editable, projectId } = props;

  const { colors } = useContext(ProjectContext);

  const iconStyle = {
    color: colors.secondaryColor,
    transition: "color 0.3s ease-in-out",
  };

  const hoverStyle = {
    color: colors.primaryColor,
  };

  const icon: JSX.Element =
    socialMedia.platform === SocialMediaPlatformType.FACEBOOK ? (
      <BrandFacebook style={iconStyle} className="w-full h-full hover:text-primary" />
    ) : socialMedia.platform === SocialMediaPlatformType.INSTAGRAM ? (
      <BrandInstagram style={iconStyle} className="w-full h-full hover:text-primary" />
    ) : socialMedia.platform === SocialMediaPlatformType.LINKEDIN ? (
      <BrandLinkedin style={iconStyle} className="w-full h-full hover:text-primary" />
    ) : socialMedia.platform === SocialMediaPlatformType.TWITTER ? (
      <BrandTwitter style={iconStyle} className="w-full h-full hover:text-primary" />
    ) : (
      <WorldWww style={iconStyle} className="w-full h-full hover:text-primary" />
    );

  return (
    <>
      <div className="relative my-4 h-16 w-16">
        <Link
          className="h-full w-full"
          href={socialMedia.url}
          style={{ color: colors.secondaryColor }}
          onMouseOver={(e) => (e.currentTarget.style.color = colors.primaryColor)}
          onMouseOut={(e) => (e.currentTarget.style.color = colors.secondaryColor)}
        >
          {icon}
        </Link>

        {editable && (
          <SocialMediaEditor
            url={socialMedia.url}
            platform={socialMedia.platform}
            socialMediaId={socialMedia.id}
            projectId={projectId}
          />
        )}
      </div>
    </>
  );
};

export default SocialMediaCard;