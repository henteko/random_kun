import * as React from "react";
import {
  Button,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { AddIcon } from "@chakra-ui/icons";

type NameInputProps = {
  onAdd: (name: string) => void;
};

export const NameInput: React.FC<NameInputProps> = ({ onAdd }) => {
  const [name, setName] = useState("");

  return (
    <HStack>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onAdd(name);
          setName("");
        }}
      >
        <InputGroup>
          <Input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <InputRightElement>
            <Button type="submit" borderLeftRadius="0">
              <AddIcon />
            </Button>
          </InputRightElement>
        </InputGroup>
      </form>
    </HStack>
  );
};
