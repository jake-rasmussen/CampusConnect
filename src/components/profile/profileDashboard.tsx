import { Divider } from "@nextui-org/react";
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
  Trash,
  UserSearch,
  WorldWww,
} from "tabler-icons-react";

import { uppercaseToCapitalize } from "~/utils/helpers";
import { SocialMediaFormType } from "./profileSocialMediaEditor";
import Link from "next/link";

type PropType = {
  profile: Profile & {
    user: User;
    profileSocialMedia: ProfileSocialMedia[];
  };
};

const ProfileDashboard = (props: PropType) => {
  const { profile } = props;

  return (
    <div className="flex h-full w-full flex-col md:gap-0 gap-8 items-center justify-center mb-36">
      <header className="w-full bg-gradient-to-r from-secondary to-primary shadow-2xl h-60">
        <div className="relative mx-auto h-full max-w-4xl">
          <section className="absolute bottom-0 translate-y-1/2 w-full">
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 w-full items-center text-center md:text-left mx-4">
              <div className="w-56">
                <UserSearch className="h-56 w-56 rounded-full border-8 border bg-secondary p-4 text-white shadow-xl" />
              </div>
              <div className="grid md:grid-rows-2 w-full h-full">
                <div className="row-start-2 flex flex-col justify-center mt-4">
                  <h4 className="text-3xl md:text-5xl font-semibold">
                    {profile.user.firstName} {profile.user.lastName}
                  </h4>
                  <div>
                    <p className="text-neutral-400">
                      {uppercaseToCapitalize(profile.year)}{" "}
                      <span className="text-secondary">@</span>{" "}
                      {uppercaseToCapitalize(profile.school)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </header>

      <section className="flex flex-col-reverse md:flex-row mt-40 max-w-4xl gap-8 px-4">
        <div className="flex-none md:w-56 flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold">Area of Focus</h1>
            <div className="flex flex-col justify-center text-left break-words">
              <span>
                Major(s):{" "}
                {profile.majors.map(
                  (major: Focus, index: number) =>
                    uppercaseToCapitalize(major) +
                    (index + 1 !== profile.majors.length ? ", " : "")
                )}
              </span>
              {profile.minors.length > 0 && (
                <span>
                  Minor(s):{" "}
                  {profile.minors.map(
                    (minor: Focus, index: number) =>
                      uppercaseToCapitalize(minor) +
                      (index + 1 !== profile.minors.length ? ", " : "")
                  )}
                </span>
              )}
            </div>
          </div>
          {profile.profileSocialMedia.length > 0 && (
            <>
              <Divider />
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold">Social Media</h1>
                <div className="flex flex-wrap items-center justify-center">
                  {profile.profileSocialMedia.map(
                    (socialMedia: SocialMediaFormType, index: number) => (
                      <Link
                        className="my-2 flex flex-row items-center gap-2"
                        key={`socialMedia${socialMedia.url}${index}`}
                        href={socialMedia.url}
                        target="_blank"
                        rel="noopener noreferrer"
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
                      </Link>
                    )
                  )}
                </div>
              </div>
            </>
          )}
          {profile.skills.length > 0 && (
            <>
              <Divider />
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold">Skills</h1>
                <div className="flex flex-wrap justify-center gap-2">
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
            </>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-left text-3xl font-semibold">About</h1>
          <Divider />
          <p className="break-words">{profile.about}</p>
        </div>
      </section>
    </div>
  );
};

export default ProfileDashboard;
