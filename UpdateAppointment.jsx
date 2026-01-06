import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { UpdateAppointments } from '../APIRoutes/APIRoutes';

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

const ModalContent = styled.div`
  background: #ffffff;
  border-radius: 15px;
  padding: 2rem;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  font-family: 'Poppins', sans-serif;
  position: relative;

  @media (max-width: 768px) {
    padding: 1.5rem;
    width: 95%;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #333;
  transition: color 0.3s ease;

  &:hover {
    color: #dc3545;
  }
`;

const ModalTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  background: linear-gradient(135deg, #007bff, #005bb5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1.5rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const Form = styled.form`
  display: grid;
  gap: 1rem;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 600;
  color: #333;
  font-size: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
  color: #333;
  background: #f8f9fa;
  cursor: not-allowed;

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const Textarea = styled.textarea`
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

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const Select = styled.select`
  padding: 0.5rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.9rem;
  font-family: 'Poppins', sans-serif;
  color: #333;
  transition: all 0.3s ease;

  &:focus {
    border-color: #48bb78;
    box-shadow: 0 0 6px rgba(72, 187, 120, 0.3);
    outline: none;
  }

  @media (max-width: 768px) {
    font-size: 0.85rem;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(135deg, #48bb78, #38a169);
  color: white;
  padding: 0.75rem;
  border-radius: 8px;
  border: none;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #38a169, #2f855a);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.6rem;
  }
`;

const UpdateAppointment = ({ isOpen, onClose, appointments, did, onUpdate }) => {
  const [selectedAppointmentId, setSelectedAppointmentId] = useState('');
  const [remarks, setRemarks] = useState('');

  if (!isOpen) return null;

  const selectedAppointment = appointments.find(
    (appt) => appt.aid === parseInt(selectedAppointmentId)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedAppointment) {
      toast.error('Please select an appointment');
      return;
    }

    try {
      const payload = {
        aid: selectedAppointment.aid,
        pid: selectedAppointment.pid,
        did: did,
        appointment_time: selectedAppointment.appointment_time,
        appointment_date: selectedAppointment.appointment_date,
        remarks: remarks || '',
        details: selectedAppointment.appointment_details || '',
      };

      const response = await fetch(UpdateAppointments, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || 'Appointment updated successfully');
        onUpdate(selectedAppointment.aid, remarks);
        onClose();
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to update appointment');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    }
  };

  return (
    <ModalOverlay>
      <ModalContent>
        <CloseButton onClick={onClose} aria-label="Close modal">
          <FaTimes />
        </CloseButton>
        <ModalTitle>Update Appointment</ModalTitle>
        <Form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="appointment-select">Select Appointment</Label>
            <Select
              id="appointment-select"
              value={selectedAppointmentId}
              onChange={(e) => {
                setSelectedAppointmentId(e.target.value);
                const appt = appointments.find(
                  (a) => a.aid === parseInt(e.target.value)
                );
                setRemarks(appt ? appt.remarks || '' : '');
              }}
              aria-label="Select an appointment"
            >
              <option value="">Select an appointment</option>
              {appointments.map((appt) => (
                <option key={appt.aid} value={appt.aid}>
                  {`ID: ${appt.aid}, Patient: ${appt.pname}, Date: ${appt.appointment_date}`}
                </option>
              ))}
            </Select>
          </FormField>
          {selectedAppointment && (
            <>
              <FormField>
                <Label>Patient Name</Label>
                <Input
                  type="text"
                  value={selectedAppointment.pname}
                  disabled
                  aria-label="Patient name (read-only)"
                />
              </FormField>
              <FormField>
                <Label>Doctor Name</Label>
                <Input
                  type="text"
                  value={selectedAppointment.dname}
                  disabled
                  aria-label="Doctor name (read-only)"
                />
              </FormField>
              <FormField>
                <Label>Date</Label>
                <Input
                  type="text"
                  value={selectedAppointment.appointment_date}
                  disabled
                  aria-label="Appointment date (read-only)"
                />
              </FormField>
              <FormField>
                <Label>Time</Label>
                <Input
                  type="text"
                  value={selectedAppointment.appointment_time}
                  disabled
                  aria-label="Appointment time (read-only)"
                />
              </FormField>
              <FormField>
                <Label>Details</Label>
                <Input
                  type="text"
                  value={selectedAppointment.appointment_details}
                  disabled
                  aria-label="Appointment details (read-only)"
                />
              </FormField>
              <FormField>
                <Label htmlFor="remarks">Remarks</Label>
                <Textarea
                  id="remarks"
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  placeholder="Enter remarks"
                  aria-label="Remarks for the appointment"
                />
              </FormField>
              <SubmitButton type="submit">Save Changes</SubmitButton>
            </>
          )}
        </Form>
      </ModalContent>
    </ModalOverlay>
  );
};

export default UpdateAppointment;