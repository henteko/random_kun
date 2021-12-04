import * as React from "react";
import { Button, Input, InputRightElement, InputGroup } from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

type NameRowProps = {
  name: string;
  onDelete: () => void;
};

export const NameRow: React.FC<NameRowProps> = ({ name, onDelete }) => {
  return (
    <InputGroup>
      <Input value={name} isReadOnly />
      <InputRightElement>
        <Button
          variant="outline"
          borderLeftRadius="0"
          onClick={() => {
            onDelete();
          }}
        >
          <DeleteIcon />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};
