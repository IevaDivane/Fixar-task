import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  error: string | null;
}

export const ErrorModal: React.FC<ErrorModalProps> = ({
  isOpen,
  onClose,
  error
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="top-center"
      className="fixed top-0 m-auto bottom-0 z-[9999] md:max-w-[500px] md:max-h-[250px] max-w-[90vw] max-h-[80vh]"
      classNames={{
        backdrop: "bg-black/50",
        base: "fixed inset-0 flex justify-center z-[10000] p-4"
      }}
    >
      <ModalContent className="md:max-w-[500px] md:max-h-[250px] max-w-[90vw] max-h-[80vh] bg-[#535bf2] rounded-lg flex flex-col justify-between p-4 md:p-6">
        <ModalHeader>Error</ModalHeader>
        <ModalBody>
          <p>{error}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onPress={onClose} className="focus:outline-none focus:ring-0 border-2 p-2 border-transparent hover:border-red-500 transition-all duration-200 rounded-lg">
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
