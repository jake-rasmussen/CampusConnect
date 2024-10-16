import { Button, Divider } from "@nextui-org/react";
import {
  Focus,
  Profile,
  ProfileSocialMedia,
  SocialMediaPlatformType,
  User,
} from "@prisma/client";
import {
  BrandFacebook,
  BrandInstagram,
  BrandLinkedin,
  BrandTwitter,
  Link,
  Trash,
  UserSearch,
  WorldWww,
} from "tabler-icons-react";

import { uppercaseToCapitalize } from "~/utils/helpers";
import { SocialMediaFormType } from "./profileSocialMediaEditor";

type PropType = {
  profile: Profile & {
    user: User;
    profileSocialMedia: ProfileSocialMedia[];
  };
};

const ProfileDashboard = (props: PropType) => {
  const { profile } = props;

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10">
      <header
        className="h-40 w-full bg-gradient-to-r from-secondary to-primary shadow-2xl md:h-48 lg:h-60"
        // className={`relative w-full shadow-2xl ${colors ? "" : "bg-gradient-to-r from-secondary to-primary"}`}
        // style={
        //   colors
        //     ? {
        //       backgroundImage: `linear-gradient(to right, ${colors.primaryColor}, ${colors.secondaryColor})`,
        //     }
        //     : undefined
        // }
      >
        <div className="relative mx-auto h-full max-w-4xl">
          <section className="absolute bottom-0 translate-y-1/2">
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">
              <div>
                <UserSearch className="h-60 w-60 rounded-full border border-8 bg-secondary p-4 text-white shadow-xl" />
              </div>
              <div className="grid grid-rows-2">
                <div className="row-start-2 flex flex-col justify-center">
                  <h4 className="text-5xl font-semibold">
                    {profile.user.firstName} {profile.user.lastName}
                  </h4>
                  <div>
                    <p className="text-neutral-400">
                      {uppercaseToCapitalize(profile.year)}{" "}
                      <span className="text-secondary">@</span> {profile.school}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </header>

      <section className="mt-28 grid max-w-4xl grid-cols-5">
        <div className="relative col-span-2 flex flex-col gap-4">
          <div className="flex flex-col">
            <h1 className="text-center text-xl font-semibold">Area of Focus</h1>
            <div className="flex flex-col justify-center p-4 text-left">
              <span>
                Major(s):{" "}
                {profile.majors.map(
                  (major: Focus, index: number) =>
                    uppercaseToCapitalize(major) +
                    (index + 1 !== profile.majors.length ? ", " : ""),
                )}
              </span>
              {profile.minors.length > 0 && (
                <span>
                  Minor(s):{" "}
                  {profile.minors.map(
                    (minor: Focus, index: number) =>
                      uppercaseToCapitalize(minor) +
                      (index + 1 !== profile.minors.length ? ", " : ""),
                  )}
                </span>
              )}
            </div>
          </div>
          <Divider />
          <div className="flex flex-col">
            <h1 className="text-center text-xl font-semibold">Social Media</h1>
            <div className="flex flex-wrap items-center justify-center px-4">
              {profile.profileSocialMedia.map(
                (socialMedia: SocialMediaFormType, index: number) => (
                  <div
                    className="my-2 flex flex-row items-center gap-2"
                    key={`socialMedia${socialMedia.url}${index}`}
                  >
                    {socialMedia.platform ===
                    SocialMediaPlatformType.FACEBOOK ? (
                      <BrandFacebook className="h-16 w-16" />
                    ) : socialMedia.platform ===
                      SocialMediaPlatformType.INSTAGRAM ? (
                      <BrandInstagram className="h-16 w-16" />
                    ) : socialMedia.platform ===
                      SocialMediaPlatformType.LINKEDIN ? (
                      <BrandLinkedin className="h-16 w-16" />
                    ) : socialMedia.platform ===
                      SocialMediaPlatformType.TWITTER ? (
                      <BrandTwitter className="h-16 w-16" />
                    ) : (
                      <WorldWww className="h-16 w-16" />
                    )}
                  </div>
                ),
              )}
            </div>
          </div>
          <Divider />
          <div className="flex flex-col gap-4">
            <h1 className="text-center text-xl font-semibold">Skills</h1>
            <div className="flex max-w-lg flex-wrap justify-center gap-2">
              {profile.skills.map((skill: string, index: number) => (
                <div
                  className="rounded-full bg-secondary p-2 px-3 font-black uppercase tracking-wide text-white shadow-xl"
                  key={`skill${skill}${index}`}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="col-span-3 flex flex-col gap-4">
          <h1 className="text-left text-3xl font-semibold">About</h1>
          <Divider />
          <p className="">{profile.about}</p>
        </div>
      </section>
    </div>
  );
};

export default ProfileDashboard;
