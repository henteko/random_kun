import * as React from "react";
import { Box, VStack, Grid } from "@chakra-ui/react";
import { ThemeProvider } from "./views/themeProvider";
import { NameInput } from "./views/NameInput/nameInput";
import { useState } from "react";
import { NameRow } from "./views/NameRow/nameRow";

export const App = () => {
  const [nameList, setNameList] = useState<string[]>([]);

  return (
    <ThemeProvider>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <VStack spacing={8}>
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
            <NameInput
              onAdd={(name) => {
                setNameList([...nameList, name]);
              }}
            />
          </VStack>
        </Grid>
      </Box>
    </ThemeProvider>
  );
};
