import { SocialMedia } from "@prisma/client";

import SocialMediaCard from "./socialMediaCard";
import SocialMediaOutline from "./socialMediaOutline";
import SocialMediasEditor from "./socialMediasEditor";

type PropType = {
  socialMedias: SocialMedia[];
  projectId: string;
  editable: boolean;
};

const SocialMediaSection = (props: PropType) => {
  const { socialMedias, projectId, editable } = props;

  return (
    socialMedias !== undefined && (
      <>
        <section>
          {socialMedias.length !== 0 && (
            <SocialMediaOutline>
              {socialMedias.map((socialMedia: SocialMedia, index: number) => (
                <SocialMediaCard
                  socialMedia={socialMedia}
                  editable={editable}
                  key={`socialMediaCard${index}`}
                />
              ))}
            </SocialMediaOutline>
          )}
        </section>
        {editable && <SocialMediasEditor clubId={projectId} />}
      </>
    )
  );
};

export default SocialMediaSection;
