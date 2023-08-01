import * as React from "react";
import { Stack, Center, Spacer, Heading, Flex, Button } from "@chakra-ui/react";
import { ThemeProvider } from "./views/themeProvider";
import { NameInput } from "./views/NameInput/nameInput";
import { useState, useEffect, useCallback } from "react";
import { NameRow } from "./views/NameRow/nameRow";
import { RandomNameModal } from "./views/RandomNameModal/randomNameModal";

type Member = {
  name: string;
  isActive: boolean;
}

export const App = () => {
  const [memberList, setMemberList] = useState<Member[]>([]);
  const [selectName, setSelectName] = useState<string | undefined>(undefined);
  const queryParams = new URLSearchParams(window.location.search);
  const namesFromQuery= queryParams.getAll("names");

  useEffect(() => {
    // namesFromQueryからmemberListを作成
    const newMemberList = namesFromQuery.map((name) => {
      return {
        name,
        isActive: true,
      };
    });
    setMemberList(newMemberList);
  }, []);

  useEffect(() => {
    const url = new URL(window.location.toString());
    url.searchParams.delete("names");

    // memberListからnameの一覧を取得
    const nameList = memberList.map((member) => member.name);
    nameList.forEach((name) => {
      url.searchParams.append('names', name);
    });

    window.history.pushState({}, '', url);
  }, [memberList]);

  return (
    <ThemeProvider>
      <RandomNameModal
        name={selectName}
        onClosed={() => {
          setSelectName(undefined);
        }}
      />
      <Center height="100vh">
        <Stack minWidth="md">
          <Flex>
            <Heading as="h1" fontSize="4xl">
              Random Kun
            </Heading>
            <Spacer />
            <Button
              isDisabled={memberList.filter((member) => member.isActive).length < 1}
              onClick={() => {
                // memberListの中からisActiveがtrueのものだけを抽出し、その中からランダムに1つ選ぶ
                const activeMemberList = memberList.filter((member) => member.isActive);
                const randomIndex = Math.floor(Math.random() * activeMemberList.length);
                const randomMember = activeMemberList[randomIndex];
                setSelectName(randomMember.name);
              }}
            >
              GO!!
            </Button>
          </Flex>
          <NameInput
            onAdd={(name) => {
              setMemberList([{ name, isActive: true }, ...memberList]);
            }}
          />
          <Spacer />
          <Stack>
            {memberList.map((member, index) => (
              <NameRow
                name={member.name}
                isActive={member.isActive}
                key={index}
                onDelete={() => {
                  const newMemberList = [...memberList];
                  newMemberList.splice(index, 1);
                  setMemberList(newMemberList);
                }}
                onToggleActive={() => {
                  // memberListのindex番目のisActiveを反転させる
                  const newMemberList = [...memberList];
                  newMemberList[index].isActive = !newMemberList[index].isActive;
                  setMemberList(newMemberList);
                }}
              />
            ))}
          </Stack>
        </Stack>
      </Center>
    </ThemeProvider>
  );
};
