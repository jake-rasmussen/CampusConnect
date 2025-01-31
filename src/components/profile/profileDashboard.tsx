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
  WorldWww,
  UserSearch,
  User as UserIcon,
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
      <div className="absolute top-0 right-0 mt-64 mx-4">
        <ProfileEditor editType="update" initialValues={initialValues} />
      </div>

      <header className="w-full bg-gradient-to-r from-secondary to-primary shadow-2xl h-60">
        <div className="relative mx-auto h-full max-w-4xl px-4 flex md:justify-start justify-center">
          <section className="absolute bottom-0 translate-y-1/2 md:pt-0 pt-20">
            <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0">
              <div className="flex-none w-56">
                <UserIcon className="h-56 w-56 rounded-full border-8 border bg-secondary p-4 text-white shadow-xl" />
              </div>
              <div className="flex-none grid grid-rows-2 w-full">
                <div className="row-start-1 md:row-start-2 flex flex-col justify-center">
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

      <section className="flex flex-col-reverse md:flex-row my-40 max-w-4xl gap-8 px-4 mx-4">
        <div className="flex-none md:w-56 flex flex-col gap-4 w-full">
          <div className="flex flex-col gap-2">
            <h1 className="text-xl font-semibold">Area of Focus</h1>
            <div className="flex flex-col justify-center text-left break-words">
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
              <Divider />
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
                        <BrandFacebook className="h-16 w-16 hover:text-blue-600 transition-colors duration-200" />
                      ) : socialMedia.platform ===
                        SocialMediaPlatformType.INSTAGRAM ? (
                        <BrandInstagram className="h-16 w-16 hover:text-pink-500 transition-colors duration-200" />
                      ) : socialMedia.platform ===
                        SocialMediaPlatformType.LINKEDIN ? (
                        <BrandLinkedin className="h-16 w-16 hover:text-blue-700 transition-colors duration-200" />
                      ) : socialMedia.platform ===
                        SocialMediaPlatformType.TWITTER ? (
                        <BrandTwitter className="h-16 w-16 hover:text-blue-400 transition-colors duration-200" />
                      ) : (
                        <WorldWww className="h-16 w-16 hover:text-gray-500 transition-colors duration-200" />
                      )}
                    </a>
                  ))}
                </div>
              </div>
            </>
          )}

          {profile.skills.length > 0 && (
            <>
              <Divider />
              <div className="flex flex-col gap-2 w-full">
                <h1 className="text-xl font-semibold">Skills</h1>
                <div className="flex justify-center">
                  <div className="w-full flex-wrap flex max-w-lg items-center gap-2 justify-center">
                    {profile.skills.map((skill, index) => (
                      <div
                        className="rounded-full bg-secondary p-2 px-3 font-black uppercase tracking-wide text-white shadow-xl"
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

        <div className="flex flex-col gap-2 w-full">
          <h1 className="text-left text-3xl font-semibold">About</h1>
          <Divider />
          <p className="break-words whitespace-pre-wrap">
            {profile.about || "No description provided."}
          </p>
        </div>
      </section>
    </div>
  );
};

export default ProfileDashboard;
