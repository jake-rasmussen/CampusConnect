import { ClubMember, ClubMemberType, User } from "@prisma/client";
import toast from "react-hot-toast";
import { TrashX } from "tabler-icons-react";

import Search from "~/components/dashboard/members/search";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/shadcn_ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/shadcn_ui/table";
import { api } from "~/utils/api";

type PropType = {
  clubId: string;
  members: (ClubMember & {
    user: User;
  })[];
};

const Members = (props: PropType) => {
  const { clubId, members } = props;

  const queryClient = api.useContext();

  const deleteMember = api.clubMemberRouter.deleteClubMember.useMutation({
    onSuccess() {
      toast.dismiss();
      toast.success("Successfully Deleted Member");
      queryClient.invalidate().catch((e) => console.log(e));
    },
  });

  const updateMember = api.clubMemberRouter.updateClubMember.useMutation({
    onSuccess() {
      toast.dismiss();
      toast.success("Successfully Updated Member");
      queryClient.invalidate().catch((e) => console.log(e));
    },
  });

  const handleDeleteMember = (userId: string) => {
    deleteMember.mutate({
      userId,
      clubId,
    });
  };

  const handleUpdateMemberType = (userId: string, type: "ADMIN" | "GRADER") => {
    updateMember.mutate({
      clubId,
      userId,
      type,
    });
  };

  return (
    <section className="flex w-full flex-col items-center gap-10 md:pt-0">
      <Search clubId={clubId} members={members} />
      <h1 className="text-center text-2xl font-semibold underline decoration-secondary">
        Members
      </h1>
      {members.length !== 0 && (
        <section className="min-w-screen rounded-xl bg-white p-4 shadow-xl md:min-w-[40rem]">
          <Table className="mx-auto">
            <TableHeader className="text-lg">
              <TableRow className="uppercase">
                <TableHead className="tracking-none w-40 font-black">
                  Full Name
                </TableHead>
                <TableHead className="tracking-none font-black">
                  Email
                </TableHead>
                <TableHead className="tracking-none font-black">Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member, index: number) => (
                <TableRow key={`member${index}`} className="border-b">
                  <TableCell className="font-medium">
                    {member.user.firstName} {member.user.lastName}
                  </TableCell>
                  <TableCell className="font-medium">
                    {member.user.emailAddress}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="h-full w-32">
                      <Select
                        defaultValue={member.type}
                        onValueChange={(input: ClubMemberType) => {
                          handleUpdateMemberType(member.userId, input);
                        }}
                      >
                        <SelectTrigger className="h-[2rem] rounded-xl bg-white">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="ADMIN">Admin</SelectItem>
                          <SelectItem value="GRADER">Grader</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    <button
                      className="h-8 w-8"
                      onClick={() => handleDeleteMember(member.userId)}
                    >
                      <TrashX className="h-full w-full text-secondary transition duration-300 ease-in-out hover:text-primary" />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </section>
      )}
    </section>
  );
};

export default Members;
