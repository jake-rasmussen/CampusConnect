import { type ClubSocialMedia } from "@prisma/client";

import SocialMediaCard from "./socialMediaCard";
import SocialMediaOutline from "./socialMediaOutline";
import SocialMediasEditor from "./socialMediasEditor";

type PropType = {
  socialMedias: ClubSocialMedia[];
  clubId: string;
  editable: boolean;
};

const SocialMedia = (props: PropType) => {
  const { socialMedias, clubId, editable } = props;

  return (
    socialMedias !== undefined && (
      <>
        <section>
          {socialMedias.length !== 0 && (
            <SocialMediaOutline>
              {socialMedias.map(
                (clubSocialMedia: ClubSocialMedia, index: number) => (
                  <SocialMediaCard
                    clubSocialMedia={clubSocialMedia}
                    editable={editable}
                    key={`socialMediaCard${index}`}
                  />
                ),
              )}
            </SocialMediaOutline>
          )}
        </section>
        {editable && <SocialMediasEditor clubId={clubId} />}
      </>
    )
  );
};

export default SocialMedia;
