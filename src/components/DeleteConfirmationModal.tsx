import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button } from '@heroui/react';

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      placement="top-center"
      className="fixed top-4 m-auto bottom-0 z-[9999] md:max-w-[500px] md:max-h-[300px] max-w-[90vw] max-h-[80vh]"
      classNames={{
        backdrop: "bg-black/50",
        base: "fixed inset-0 flex justify-center z-[10000] p-4"
      }}
    >
      <ModalContent className="md:max-w-[500px] md:max-h-[250px] max-w-[90vw] max-h-[80vh] bg-[#535bf2] rounded-lg flex flex-col justify-between p-4 md:p-6">
        <ModalHeader>Confirm Delete</ModalHeader>
        <ModalBody>
          <p>Are you sure you want to delete this log entry? This action cannot be undone.</p>
        </ModalBody>
        <ModalFooter>
          <Button color="default" onPress={onClose} className="text-gray-900 p-2 focus:outline-none focus:ring-0 border-2 border-transparent hover:border-gray-500 transition-all duration-200 rounded-lg">
            Cancel
          </Button>
          <Button color="danger" onPress={onConfirm} className="text-gray-900 p-2 focus:outline-none focus:ring-0 border-2 border-transparent hover:border-red-500 transition-all duration-200 rounded-lg">
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
