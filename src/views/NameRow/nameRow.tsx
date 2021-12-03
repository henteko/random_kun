import * as React from "react";
import {
  Text,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

type NameRowProps = {
  name: string;
  onDelete: () => void;
};

export const NameRow: React.FC<NameRowProps> = ({ name, onDelete }) => {
  return (
    <HStack key={name}>
      <Text>{name}</Text>
      <Button variant="ghost">
        <EditIcon />
      </Button>
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
