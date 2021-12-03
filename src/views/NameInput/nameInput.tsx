import * as React from "react";
import {
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";

type NameInputProps = {
  onAdd: (name: string) => void;
};

export const NameInput: React.FC<NameInputProps> = ({ onAdd }) => {
  const [name, setName] = useState("");

  return (
    <HStack>
      <Input
        type="text"
        placeholder="Name"
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></Input>
      <Button
        onClick={() => {
          onAdd(name);
        }}
      >
        ADD
      </Button>
    </HStack>
  );
};
