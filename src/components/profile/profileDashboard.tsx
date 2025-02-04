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
  User as UserIcon,
  UserSearch,
  WorldWww,
} from "tabler-icons-react";

import { uppercaseToCapitalize } from "~/utils/helpers";
import ProfileEditor from "./profileEditor";

type PropType = {
  profile: Profile & {
    user: User;
    profileSocialMedia: ProfileSocialMedia[];
  };
};

const ProfileDashboard = ({ profile }: PropType) => {
  // Prepare initial values
  const initialValues = {
    about: profile.about || "",
    skills: profile.skills || [],
    school: profile.school || "",
    year: profile.year || "",
    majors: profile.majors || [],
    minors: profile.minors || [],
    socialMedia: profile.profileSocialMedia || [],
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10">
      <div className="absolute right-0 top-0 mx-4 mt-64">
        <ProfileEditor editType="update" initialValues={initialValues} />
      </div>

      <header className="h-60 w-full bg-gradient-to-r from-secondary to-primary shadow-2xl">
        <div className="relative mx-auto flex h-full max-w-4xl justify-center px-4 md:justify-start">
          <section className="absolute bottom-0 translate-y-1/2 pt-20 md:pt-0">
            <div className="flex flex-col space-y-4 md:flex-row md:space-x-6 md:space-y-0">
              <div className="w-56 flex-none">
                <UserIcon className="h-56 w-56 rounded-full border border-8 bg-secondary p-4 text-white shadow-xl" />
              </div>
              <div className="grid w-full flex-none grid-rows-2">
                <div className="row-start-1 flex flex-col justify-center md:row-start-2">
                  <h4 className="text-3xl font-semibold md:text-5xl">
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

      <section className="mx-4 my-40 flex w-full max-w-5xl flex-col-reverse gap-8 rounded-3xl bg-gradient-to-r from-secondary to-primary p-8 text-white shadow-2xl md:flex-row">
        <div className="flex w-full flex-none flex-col gap-4 md:w-56">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold">Area of Focus</h1>
            <div className="flex flex-col justify-center break-words text-left">
              <span>
                <strong>Major(s):</strong>{" "}
                {profile.majors.length > 0
                  ? profile.majors
                      .map((major) => uppercaseToCapitalize(major))
                      .join(", ")
                  : "None"}
              </span>
              {profile.minors.length > 0 && (
                <span>
                  <strong>Minor(s):</strong>{" "}
                  {profile.minors
                    .map((minor) => uppercaseToCapitalize(minor))
                    .join(", ")}
                </span>
              )}
            </div>
          </div>

          {profile.profileSocialMedia.length > 0 && (
            <>
              <Divider className="bg-white" />
              <div className="flex flex-col gap-2">
                <h1 className="text-xl font-semibold">Social Media</h1>
                <div className="flex flex-wrap items-center justify-center">
                  {profile.profileSocialMedia.map((socialMedia, index) => (
                    <a
                      key={`socialMedia-${index}`}
                      href={socialMedia.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      {socialMedia.platform ===
                      SocialMediaPlatformType.FACEBOOK ? (
                        <BrandFacebook className="h-16 w-16 transition-colors duration-200 hover:text-blue-600" />
                      ) : socialMedia.platform ===
                        SocialMediaPlatformType.INSTAGRAM ? (
                        <BrandInstagram className="h-16 w-16 transition-colors duration-200 hover:text-pink-500" />
                      ) : socialMedia.platform ===
                        SocialMediaPlatformType.LINKEDIN ? (
                        <BrandLinkedin className="h-16 w-16 transition-colors duration-200 hover:text-blue-700" />
                      ) : socialMedia.platform ===
                        SocialMediaPlatformType.TWITTER ? (
                        <BrandTwitter className="h-16 w-16 transition-colors duration-200 hover:text-blue-400" />
                      ) : (
                        <WorldWww className="hover:text-gray-500 h-16 w-16 transition-colors duration-200" />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}

          {profile.skills.length > 0 && (
            <>
              <Divider className="bg-white" />
              <div className="flex w-full flex-col gap-2">
                <h1 className="text-xl font-semibold">Skills</h1>
                <div className="flex justify-center">
                  <div className="flex w-full max-w-lg flex-wrap items-center justify-center gap-2">
                    {profile.skills.map((skill, index) => (
                      <div
                        className="rounded-full bg-white p-2 px-3 font-black uppercase tracking-wide text-secondary shadow-xl"
                        key={`skill-${index}`}
                      >
                        {skill}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="flex w-full flex-col gap-2">
          <h1 className="text-left text-3xl font-semibold">About</h1>
          <Divider className="bg-white" />
          <p className="whitespace-pre-wrap break-words">
            {profile.about || "No description provided."}
          </p>
        </div>
      </section>
    </div>
  );
};

export default ProfileDashboard;
