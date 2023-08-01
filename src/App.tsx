import * as React from "react";
import {
  Stack,
  Center,
  Spacer,
  Heading,
  Button,
  HStack,
} from "@chakra-ui/react";
import { ThemeProvider } from "./views/themeProvider";
import { NameInput } from "./views/NameInput/nameInput";
import { useState, useEffect } from "react";
import { NameRow } from "./views/NameRow/nameRow";
import { ResultModal } from "./views/ResultModal/resultModal";

type Member = {
  name: string;
  isActive: boolean;
};

function shuffleArray<T>(array: T[]): T[] {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function generatePairs(members: Member[]): [Member, Member][] {
  const shuffledMembers = shuffleArray(members);
  let pairs: [Member, Member][] = [];

  for (let i = 0; i < shuffledMembers.length; i += 2) {
    // Check if pair can be created
    if (i + 1 < shuffledMembers.length) {
      pairs.push([shuffledMembers[i], shuffledMembers[i + 1]]);
    }
  }

  return pairs;
}

export const App = () => {
  const [memberList, setMemberList] = useState<Member[]>([]);
  const [resultList, setResultList] = useState<string[] | undefined>(undefined);
  const queryParams = new URLSearchParams(window.location.search);
  const namesFromQuery = queryParams.getAll("names");

  useEffect(() => {
    if (memberList.length !== 0 || namesFromQuery.length === 0) {
      return;
    }

    // namesFromQueryからmemberListを作成
    const newMemberList = namesFromQuery.map((name) => {
      return {
        name,
        isActive: true,
      };
    });
    setMemberList(newMemberList);
  }, [namesFromQuery, memberList]);

  useEffect(() => {
    const url = new URL(window.location.toString());
    url.searchParams.delete("names");

    // memberListからnameの一覧を取得
    const nameList = memberList.map((member) => member.name);
    nameList.forEach((name) => {
      url.searchParams.append("names", name);
    });

    window.history.pushState({}, "", url);
  }, [memberList]);

  return (
    <ThemeProvider>
      <ResultModal
        resultList={resultList}
        onClosed={() => {
          setResultList(undefined);
        }}
      />
      <Center height="100vh">
        <Stack minWidth="md">
          <Heading as="h1" fontSize="4xl">
            Random Kun
          </Heading>
          <HStack>
            <Button
              isDisabled={
                memberList.filter((member) => member.isActive).length < 1
              }
              onClick={() => {
                const activeMemberList = memberList.filter(
                  (member) => member.isActive
                );
                const randomIndex = Math.floor(
                  Math.random() * activeMemberList.length
                );
                const randomMember = activeMemberList[randomIndex];
                setResultList([randomMember.name]);
              }}
            >
              Select one member
            </Button>
            <Button
              isDisabled={
                memberList.filter((member) => member.isActive).length < 2
              }
              onClick={() => {
                const activeMemberList = memberList.filter(
                  (member) => member.isActive
                );
                const pairs = generatePairs(activeMemberList);

                const pairNames = pairs.map((pair) => {
                  const pairName = `${pair[0].name} & ${pair[1].name}`;
                  return pairName;
                });
                setResultList(pairNames);
              }}
            >
              Make a pair
            </Button>
          </HStack>
          <Spacer />
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
                  newMemberList[index].isActive =
                    !newMemberList[index].isActive;
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
