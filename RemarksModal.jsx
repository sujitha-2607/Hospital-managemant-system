import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';

// Styled Components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: #ffffff;
  border-radius: 15px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  background: linear-gradient(135deg, #007bff, #005bb5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #666;
  transition: color 0.3s ease;

  &:hover {
    color: #333;
  }
`;

const ModalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputField = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
  color: #333;
  transition: all 0.3s ease;

  &:disabled {
    background: #f1f3f5;
    cursor: not-allowed;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
  color: #333;
  resize: vertical;
  min-height: 100px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #48bb78;
    box-shadow: 0 0 6px rgba(72, 187, 120, 0.3);
    outline: none;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const CancelButton = styled.button`
  background: linear-gradient(135deg, #dc3545, #c82333);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #c82333, #a71d2a);
    transform: translateY(-2px);
  }
`;

const SaveButton = styled.button`
  background: linear-gradient(135deg, #48bb78, #38a169);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #38a169, #2f855a);
    transform: translateY(-2px);
  }
`;

const RemarksModal = ({ isOpen, onClose, appointmentId, remarks, onSave }) => {
  const [remarksInput, setRemarksInput] = React.useState(remarks || '');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(appointmentId, remarksInput);
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>Update Remarks</ModalTitle>
          <CloseButton onClick={onClose} aria-label="Close modal">
            <FaTimes />
          </CloseButton>
        </ModalHeader>
        <ModalBody>
          <InputField
            type="text"
            value={appointmentId}
            disabled
            aria-label="Appointment ID"
          />
          <TextArea
            value={remarksInput}
            onChange={(e) => setRemarksInput(e.target.value)}
            placeholder="Enter remarks..."
            aria-label="Remarks"
          />
        </ModalBody>
        <ModalFooter>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <SaveButton onClick={handleSave}>Save</SaveButton>
        </ModalFooter>
      </ModalContainer>
    </ModalOverlay>
  );
};

export default RemarksModal;