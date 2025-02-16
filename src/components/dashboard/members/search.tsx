import "@prisma/client";

import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
  user,
} from "@heroui/react";
import { debounce } from "lodash";
import React, { Key, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

import { api } from "~/utils/api";

import type { Member, User } from "@prisma/client";

type PropType = {
  projectId: string;
  members: Member[];
};

type FieldStateType = {
  selectedKey: Key | null;
  inputValue: string;
  items: User[];
};

const Search = (props: PropType) => {
  const { projectId, members } = props;

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [search, setSearch] = useState<string>("");
  const [registeredUserIds, setRegisteredUserIds] = useState<string[]>(
    Array.from(members, (member) => member.userId), // Don't look up users who are already admin
  );
  const [fieldState, setFieldState] = useState<FieldStateType>({
    selectedKey: "",
    inputValue: "",
    items: [],
  });
  const [selectedUser, setSelectedUser] = useState<User>();

  const {
    data: users,
    isLoading,
    isError,
  } = api.usersRouter.getUsersByQuery.useQuery(
    {
      query: search,
    },
    {
      enabled: search.length > 0,
    },
  );

  const queryClient = api.useContext();

  const addMember = api.memberRouter.createMember.useMutation({
    onSuccess() {
      toast.dismiss();
      toast.success("Successfully Added Member!");
      queryClient.invalidate();
    },
    onError() {
      toast.dismiss();
      toast.error("Error...");
    },
  });

  const debouncedSearch = useRef(
    debounce(async (input: string) => {
      setSearch(input);
    }, 200),
  ).current;

  useEffect(() => {
    setRegisteredUserIds(Array.from(members, (member) => member.userId));

    if (users !== undefined) {
      setFieldState((prevState: FieldStateType) => ({
        inputValue: prevState.inputValue,
        selectedKey: "",
        items: users.filter((user) => !registeredUserIds.includes(user.userId)),
      }));
    }
  }, [users]);

  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  const handleAddMember = async (userId: string) => {
    toast.dismiss();
    toast.loading("Adding Member...");

    await addMember.mutateAsync({
      projectId,
      userId,
    });
  };

  const onSelectionChange = (key: Key | null) => {
    setFieldState((prevState: FieldStateType) => {
      let selectedItem = (prevState.items || []).find(
        (user) => user.emailAddress === key,
      );

      return {
        inputValue: selectedItem?.emailAddress || "",
        selectedKey: "",
        items: prevState.items,
      };
    });
  };

  const onInputChange = (value: string) => {
    setFieldState((prevState: FieldStateType) => ({
      inputValue: value,
      selectedKey: "",
      items: prevState.items,
    }));
    debouncedSearch(value);
  };

  return (
    <div className="relative flex max-w-sm flex-col items-center justify-center">
      <div className="flex w-full flex-wrap md:flex-nowrap">
        <Autocomplete
          className="w-[50rem]"
          inputValue={fieldState.inputValue}
          items={fieldState.items || []}
          isLoading={!(search.length === 0) && isLoading}
          label="Search User"
          selectedKey={fieldState.selectedKey}
          onInputChange={onInputChange}
          onSelectionChange={onSelectionChange}
          listboxProps={{
            emptyContent: "Search User By Email",
          }}
          errorMessage={isError ? "Error Getting Users" : ""}
          onBlur={() => {
            setFieldState(() => ({
              inputValue: "",
              selectedKey: "",
              items: [],
            }));
            setSearch("");
          }}
        >
          {((user: User) => {
            return (
              <AutocompleteItem
                key={`search${user.userId}`}
                onPress={() => {
                  setSelectedUser(user);
                  onOpen();
                }}
              >
                <div className="text-md font-semibold text-black">
                  {user.emailAddress}
                </div>
              </AutocompleteItem>
            );
          })}
        </Autocomplete>
      </div>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                Are you sure you want to add {selectedUser?.firstName}{" "}
                {selectedUser?.lastName}?
              </ModalHeader>
              <ModalBody>
                <p className="text-slate-500">{selectedUser?.emailAddress}</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    if (selectedUser) {
                      handleAddMember(selectedUser.userId).then(() => {
                        onClose();
                      });
                    }
                  }}
                >
                  Confirm
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default Search;
