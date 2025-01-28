import { SocialMedia } from "@prisma/client";

import SocialMediaCard from "./socialMediaCard";
import SocialMediaEditor from "./socialMediaEditor";
import SocialMediaOutline from "./socialMediaOutline";

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
        <section className="flex flex-col items-center justify-center">
          <SocialMediaOutline>
            <>
              {socialMedias.length !== 0 &&
                socialMedias.map((socialMedia: SocialMedia, index: number) => (
                  <SocialMediaCard
                    socialMedia={socialMedia}
                    editable={editable}
                    projectId={projectId}
                    key={`socialMediaCard${index}`}
                  />
                ))}
            </>
          </SocialMediaOutline>
          {editable && <SocialMediaEditor projectId={projectId} />}
        </section>
      </>
    )
  );
};

export default SocialMediaSection;
