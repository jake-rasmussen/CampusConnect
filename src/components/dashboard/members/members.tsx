import "@prisma/client";

import { useUser } from "@clerk/nextjs";
import lodash from "lodash";
import toast from "react-hot-toast";
import { TrashX } from "tabler-icons-react";

import LoadingSection from "~/components/loadingSection";
import { api } from "~/utils/api";
import MemberOutline from "./memberOutline";
import Search from "./search";

import type { Member, ProjectMemberType, User } from "@prisma/client";
import { Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

type PropType = {
  projectId: string;
  members: (Member & {
    user: User;
  })[];
  editable: boolean;
};

const Members = (props: PropType) => {
  const { projectId, members, editable } = props;

  const { user, isLoaded } = useUser();

  const queryClient = api.useContext();

  const deleteMember = api.memberRouter.deleteMember.useMutation({
    onSuccess() {
      toast.dismiss();
      toast.success("Successfully Deleted Member");
      queryClient.invalidate().catch((e) => console.log(e));
    },
  });

  const updateMember = api.memberRouter.updateMember.useMutation({
    onSuccess() {
      toast.dismiss();
      toast.success("Successfully Updated Member!");
      queryClient.invalidate().catch((e) => console.log(e));
    },
    onError() {
      toast.dismiss();
      toast.error("Error...");
    },
  });

  const handleDeleteMember = (userId: string) => {
    deleteMember.mutate({
      userId,
      projectId,
    });
  };

  const handleUpdateMemberType = (userId: string, type: ProjectMemberType) => {
    updateMember.mutate({
      projectId,
      userId,
      type,
    });
  };

  if (!isLoaded) {
    return <LoadingSection />;
  } else {
    return (
      <MemberOutline
        search={<Search projectId={projectId} members={members} />}
        displaySearch={editable}
      >
        <>
          {members.length !== 0 && (
            <section className="min-w-screen md:min-w-[40rem]">
              <Table aria-label="Example static collection table">
                <TableHeader>
                  <TableColumn>FULL NAME</TableColumn>
                  <TableColumn>EMAIL</TableColumn>
                  <TableColumn>ROLE</TableColumn>
                </TableHeader>
                <TableBody>
                  {members.map(
                    (member: Member & { user: User }, index: number) => (
                      <TableRow key={`member${index}`}>
                        <TableCell>{member.user.firstName} {member.user.lastName}</TableCell>
                        <TableCell>{member.user.emailAddress}</TableCell>
                        <TableCell>
                          {editable ? (
                            <div className="h-full w-32">
                              <Select
                                defaultSelectedKeys={[member.type]}
                                onChange={(e) => {
                                  toast.dismiss();
                                  toast.loading("Updating Member...");
                                  handleUpdateMemberType(member.userId, e.target.value as ProjectMemberType);
                                }}
                                isDisabled={member.user.externalId === user?.id}
                                onClick={() => console.log(member.type)}
                              >
                                <SelectItem key="ADMIN">
                                  Admin
                                </SelectItem>
                                <SelectItem key="EVALUATOR">
                                  Evaluator
                                </SelectItem>
                              </Select>
                            </div>
                          ) : (
                            lodash.upperFirst(member.type.toLowerCase())
                          )}</TableCell>
                      </TableRow>
                      // <TableRow key={`member${index}`} className="border-b">
                      //   <TableCell className="font-medium">
                      //     {member.user.firstName} {member.user.lastName}
                      //   </TableCell>
                      //   <TableCell className="font-medium">
                      //     {member.user.emailAddress}
                      //   </TableCell>
                      //   <TableCell className="font-medium">
                      //     {editable ? (
                      //       <div className="h-full w-32">
                      //         <Select // TODO: create confirmation modal
                      //           defaultValue={member.type}
                      //           onValueChange={(input: ProjectMemberType) => {
                      //             toast.dismiss();
                      //             toast.loading("Updating Member...");
                      //             handleUpdateMemberType(member.userId, input);
                      //           }}
                      //           disabled={member.user.externalId === user?.id}
                      //         >
                      //           <SelectTrigger className="h-[2rem] rounded-xl bg-white">
                      //             <SelectValue placeholder="" />
                      //           </SelectTrigger>
                      //           <SelectContent className="bg-white">
                      //             <SelectItem value="ADMIN">Admin</SelectItem>
                      //             <SelectItem value="EVALUATOR">
                      //               Evaluator
                      //             </SelectItem>
                      //           </SelectContent>
                      //         </Select>
                      //       </div>
                      //     ) : (
                      //       lodash.upperFirst(member.type.toLowerCase())
                      //     )}
                      //   </TableCell>
                      //   {editable && member.user.externalId !== user?.id && (
                      //     <TableCell className="text-right font-medium">
                      //       <button
                      //         className="h-8 w-8"
                      //         onClick={() => {
                      //           toast.dismiss();
                      //           toast.loading("Deleting Member...");
                      //           handleDeleteMember(member.userId);
                      //         }}
                      //       >
                      //         <TrashX className="h-full w-full text-secondary transition duration-300 ease-in-out hover:text-primary" />
                      //       </button>
                      //     </TableCell>
                      //   )}
                      // </TableRow>
                    ),
                  )}
                </TableBody>
              </Table>
              {/* <Table className="mx-auto">
                <TableHeader className="text-lg">
                  <TableRow className="uppercase">
                    <TableHeader className="tracking-none w-40 font-black">
                      <TableColumn className="tracking-none w-40 font-black">
                        Full Name
                      </TableColumn>
                      <TableColumn className="tracking-none w-40 font-black">
                        Email
                      </TableColumn>
                      <TableColumn className="tracking-none w-40 font-black">
                        Role
                      </TableColumn>
                    </TableHeader>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {members.map(
                    (member: Member & { user: User }, index: number) => (
                      <TableRow key={`member${index}`} className="border-b">
                        <TableCell className="font-medium">
                          {member.user.firstName} {member.user.lastName}
                        </TableCell>
                        <TableCell className="font-medium">
                          {member.user.emailAddress}
                        </TableCell>
                        <TableCell className="font-medium">
                          {editable ? (
                            <div className="h-full w-32">
                              <Select // TODO: create confirmation modal
                                defaultValue={member.type}
                                onValueChange={(input: ProjectMemberType) => {
                                  toast.dismiss();
                                  toast.loading("Updating Member...");
                                  handleUpdateMemberType(member.userId, input);
                                }}
                                disabled={member.user.externalId === user?.id}
                              >
                                <SelectTrigger className="h-[2rem] rounded-xl bg-white">
                                  <SelectValue placeholder="" />
                                </SelectTrigger>
                                <SelectContent className="bg-white">
                                  <SelectItem value="ADMIN">Admin</SelectItem>
                                  <SelectItem value="EVALUATOR">
                                    Evaluator
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          ) : (
                            lodash.upperFirst(member.type.toLowerCase())
                          )}
                        </TableCell>
                        {editable && member.user.externalId !== user?.id && (
                          <TableCell className="text-right font-medium">
                            <button
                              className="h-8 w-8"
                              onClick={() => {
                                toast.dismiss();
                                toast.loading("Deleting Member...");
                                handleDeleteMember(member.userId);
                              }}
                            >
                              <TrashX className="h-full w-full text-secondary transition duration-300 ease-in-out hover:text-primary" />
                            </button>
                          </TableCell>
                        )}
                      </TableRow>
                    ),
                  )}
                </TableBody>
              </Table> */}
            </section>
          )}
        </>
      </MemberOutline>
    );
  }
};

export default Members;
