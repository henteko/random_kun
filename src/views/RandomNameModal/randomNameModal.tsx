import * as React from "react";
import {
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";

type RandomNameModalProps = {
  name: string | undefined;
  onClosed: () => void;
};

export const RandomNameModal: React.FC<RandomNameModalProps> = ({
  name = undefined,
  onClosed,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (name !== undefined) {
      setIsOpen(true);
    }
  }, [name]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClosed();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Result</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text fontSize="6xl">{name}</Text>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
