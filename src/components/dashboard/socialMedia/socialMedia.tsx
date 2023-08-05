import { ClubSocialMedia } from "@prisma/client";

import SocialMediaCard from "./socialMediaCard";
import SocialMediaOutline from "./socialMediaOutline";
import SocialMediasEditor from "./socialMediasEditor";

type PropType = {
  socialMedias: ClubSocialMedia[];
  clubId: string;
  edit: boolean;
};

const SocialMedia = (props: PropType) => {
  const { socialMedias, clubId, edit } = props;

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
                    edit={edit}
                    key={`socialMediaCard${index}`}
                  />
                ),
              )}
            </SocialMediaOutline>
          )}
        </section>
        {edit && <SocialMediasEditor clubId={clubId} />}
      </>
    )
  );
};

export default SocialMedia;
