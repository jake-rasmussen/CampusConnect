import { Button, Divider } from "@nextui-org/react";
import { Focus, Profile, ProfileSocialMedia, SocialMediaPlatformType, User } from "@prisma/client";
import { UserSearch, BrandInstagram, BrandLinkedin, BrandFacebook, BrandTwitter, Link, Trash, WorldWww } from "tabler-icons-react";
import { uppercaseToCapitalize } from "~/utils/helpers";
import { SocialMediaFormType } from "./profileSocialMediaEditor";

type PropType = {
  profile: Profile & {
    user: User;
    profileSocialMedia: ProfileSocialMedia[];
  };
}

const ProfileDashboard = (props: PropType) => {
  const { profile } = props;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10">
      <header
        className="w-full shadow-2xl bg-gradient-to-r from-secondary to-primary h-40 md:h-48 lg:h-60"
      // className={`relative w-full shadow-2xl ${colors ? "" : "bg-gradient-to-r from-secondary to-primary"}`}
      // style={
      //   colors
      //     ? {
      //       backgroundImage: `linear-gradient(to right, ${colors.primaryColor}, ${colors.secondaryColor})`,
      //     }
      //     : undefined
      // }
      >
        <div className="relative max-w-4xl mx-auto h-full">
          <section className="absolute bottom-0 translate-y-1/2">
            <div className="flex flex-col space-y-4 md:space-y-0 md:space-x-6 md:flex-row">
              <div>
                <UserSearch className="w-60 h-60 bg-secondary rounded-full p-4 text-white border border-8 shadow-xl" />
              </div>
              <div className="grid grid-rows-2">
                <div className="row-start-2 flex flex-col justify-center">
                  <h4 className="text-5xl font-semibold">{profile.user.firstName} {profile.user.lastName}</h4>
                  <div>
                    <p className="text-neutral-400">
                      {uppercaseToCapitalize(profile.year)} <span className="text-secondary">@</span> {profile.school}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </header>

      <section className="grid grid-cols-5 mt-28 max-w-4xl">
        <div className="relative flex flex-col gap-4 col-span-2">
          <div className="flex flex-col">
            <h1 className="text-center text-xl font-semibold">
              Area of Focus
            </h1>
            <div className="flex flex-col text-left justify-center p-4">
              <span>
                Major(s): {profile.majors.map((major: Focus, index: number) =>
                  uppercaseToCapitalize(major) + ((index + 1) !== profile.majors.length ? ", " : "")
                )}
              </span>
              {profile.minors.length > 0 && <span>
                Minor(s): {profile.minors.map((minor: Focus, index: number) =>
                  uppercaseToCapitalize(minor) + ((index + 1) !== profile.minors.length ? ", " : "")
                )}
              </span>}
            </div>
          </div>
          <Divider />
          <div className="flex flex-col">
            <h1 className="text-center text-xl font-semibold">
              Social Media
            </h1>
            <div className="flex flex-wrap items-center justify-center px-4">
              {profile.profileSocialMedia.map((socialMedia: SocialMediaFormType, index: number) => <div className="flex flex-row gap-2 items-center my-2"
                key={`socialMedia${socialMedia.url}${index}`}>
                {socialMedia.platform === SocialMediaPlatformType.FACEBOOK ? (
                  <BrandFacebook className="w-16 h-16" />
                ) : socialMedia.platform === SocialMediaPlatformType.INSTAGRAM ? (
                  <BrandInstagram className="w-16 h-16" />
                ) : socialMedia.platform === SocialMediaPlatformType.LINKEDIN ? (
                  <BrandLinkedin className="w-16 h-16" />
                ) : socialMedia.platform === SocialMediaPlatformType.TWITTER ? (
                  <BrandTwitter className="w-16 h-16" />
                ) : (
                  <WorldWww className="w-16 h-16" />
                )}
              </div>)}
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-4">
            <h1 className="text-center text-xl font-semibold">
              Skills
            </h1>
            <div className="flex flex-wrap justify-center max-w-lg gap-2">
              {
                profile.skills.map((skill: string, index: number) => <div
                  className="bg-secondary text-white p-2 px-3 uppercase font-black tracking-wide rounded-full shadow-xl"
                  key={`skill${skill}${index}`}>
                  {skill}
                </div>)
              }
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 col-span-3">
          <h1 className="text-left text-3xl font-semibold">
            About
          </h1>
          <Divider />
          <p className="">
            {profile.about}
          </p>
        </div>
      </section>

    </div>
  );
}

export default ProfileDashboard;
