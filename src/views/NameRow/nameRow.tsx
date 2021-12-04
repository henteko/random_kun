import * as React from "react";
import {
  Text,
  HStack,
  Button,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";

type NameRowProps = {
  name: string;
  onDelete: () => void;
};

export const NameRow: React.FC<NameRowProps> = ({ name, onDelete }) => {
  return (
    <HStack key={name}>
      <Text>{name}</Text>
      <Button
        variant="ghost"
        onClick={() => {
          onDelete();
        }}
      >
        <DeleteIcon />
      </Button>
    </HStack>
  );
};
