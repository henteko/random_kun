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

type ResultModalProps = {
  resultList: string[] | undefined;
  onClosed: () => void;
};

export const ResultModal: React.FC<ResultModalProps> = ({
  resultList = undefined,
  onClosed,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (resultList !== undefined) {
      setIsOpen(true);
    }
  }, [resultList]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    onClosed();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={handleClose} size='xl'>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Result</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {
            resultList?.map((result) => (
              <Text fontSize="5xl">{result}</Text>
            ))
          }
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
