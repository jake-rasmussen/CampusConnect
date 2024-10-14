import { Card, CardBody, CardFooter, CardHeader } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";
import { Focus, Profile, User } from "@prisma/client";
import Link from "next/link";
import { UserSearch } from "tabler-icons-react";
import { uppercaseToCapitalize } from "~/utils/helpers";

type PropType = {
  profile: Profile & {
    user: User
  };
}

const ProfileCard = (props: PropType) => {
  const { profile } = props;
  return (<Link href={`/profile/${profile.id}`}>
    <Card className="max-w-[400px] overflow-visible transition duration-300 ease-in-out hover:scale-110 hover:cursor-pointer">
      <CardHeader className="relative flex flex-col pt-20">
        <div className="absolute top-0 -translate-y-1/2">
          <UserSearch className="w-36 h-36 bg-secondary rounded-full p-4 text-white border border-8 shadow-xl" />
        </div>

        <h1>{profile.user.firstName} {profile.user.lastName}</h1>
        <p className="text-neutral-400">{profile.year} @ {profile.school}</p>
      </CardHeader>
      <Divider />
      <CardBody className="flex flex-row">
        <span className="p-4">
          Majoring in {profile.majors.map((major: Focus, index: number) =>
            uppercaseToCapitalize(major) + ((index + 1) !== profile.majors.length ? ", " : "") +
            ((index + 2) === profile.majors.length ? " and " : "")
          )}
          {" "} and minoring in {profile.minors.map((minor: Focus, index: number) =>
            uppercaseToCapitalize(minor) + ((index + 1) !== profile.minors.length ? ", " : "") +
            ((index + 2) === profile.minors.length ? " and " : "")
          )}
        </span>
      </CardBody>
    </Card>
  </Link>);
}

export default ProfileCard;