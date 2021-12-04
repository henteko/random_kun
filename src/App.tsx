import * as React from "react";
import { Stack, Center, Spacer } from "@chakra-ui/react";
import { ThemeProvider } from "./views/themeProvider";
import { NameInput } from "./views/NameInput/nameInput";
import { useState } from "react";
import { NameRow } from "./views/NameRow/nameRow";

export const App = () => {
  const [nameList, setNameList] = useState<string[]>([]);

  return (
    <ThemeProvider>
      <Center height="100vh">
        <Stack minWidth="md">
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
