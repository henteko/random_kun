import * as React from "react";
import {Stack, Center, Spacer, Heading, Flex, Button} from "@chakra-ui/react";
import { ThemeProvider } from "./views/themeProvider";
import { NameInput } from "./views/NameInput/nameInput";
import { useState } from "react";
import { NameRow } from "./views/NameRow/nameRow";

export const App = () => {
  const [nameList, setNameList] = useState<string[]>([]);
  const [selectName, setSelectName] = useState<string | undefined>(undefined);

  return (
    <ThemeProvider>
      <Center height="100vh">
        <Stack minWidth="md">
          <Flex>
            <Heading as="h1" fontSize='4xl'>Random Kun</Heading>
            <Spacer />
            <Button isDisabled={nameList.length < 1} onClick={() => {
              setSelectName(nameList[Math.floor(Math.random() * nameList.length)]);
            }}>GO!!</Button>
          </Flex>
          <NameInput
            onAdd={(name) => {
              setNameList([name, ...nameList]);
            }}
          />
          <Spacer />
          <Stack>
            {nameList.map((name, index) => (
              <NameRow
                name={name}
                key={index}
                onDelete={() => {
                  const newNameList = [...nameList];
                  newNameList.splice(index, 1);
                  setNameList(newNameList);
                }}
              />
            ))}
          </Stack>
        </Stack>
      </Center>
    </ThemeProvider>
  );
};
