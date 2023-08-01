import * as React from "react";
import {
  Button,
  Input,
  InputRightElement,
  InputGroup,
  HStack,
} from "@chakra-ui/react";
import { CloseIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

type NameRowProps = {
  name: string;
  isActive: boolean;
  onDelete: () => void;
  onToggleActive: () => void;
};

export const NameRow: React.FC<NameRowProps> = ({
  name,
  isActive,
  onDelete,
  onToggleActive,
}) => {
  return (
    <HStack>
      <Button
        size="xs"
        variant="ghost"
        onClick={() => {
          onDelete();
        }}
      >
        <CloseIcon />
      </Button>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          value={name}
          isReadOnly
          variant={isActive ? "outline" : "filled"}
        />
        <InputRightElement width="3rem">
          <Button
            h="1.75rem"
            size="sm"
            onClick={() => {
              onToggleActive();
            }}
          >
            {isActive ? <ViewOffIcon /> : <ViewIcon />}
          </Button>
        </InputRightElement>
      </InputGroup>
    </HStack>
  );
};
