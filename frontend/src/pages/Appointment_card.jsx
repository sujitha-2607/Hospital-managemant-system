import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTemperatureHigh, FaPills, FaUserMd } from 'react-icons/fa';
import { UpdateAppointments } from '../APIRoutes/APIRoutes';
import { toast, ToastContainer } from 'react-toastify';
// Styled Components
const Title = styled.h2`
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

const Description = styled.p`
  font-size: 1.1rem;
  color: #444;
  background: rgba(255, 255, 255, 0.9);
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  padding: 0 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const CardWrapper = styled.div`
  background: #ffffff;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  border-top: 4px solid #48bb78;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const CardContent = styled.div`
  display: grid;
  gap: 0.75rem;
`;

const CardField = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.95rem;
  align-items: center;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const Label = styled.span`
  font-weight: 600;
  color: #333;
  display: flex;
  align-items: center;
`;

const Value = styled.span`
  color: #666;
  text-align: right;
  max-width: 60%;
  word-break: break-word;

  @media (max-width: 768px) {
    max-width: 50%;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.5rem;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #007bff, #005bb5);
  color: white;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;
  font-size: 1.2rem;
  width: 40px;
  height: 40px;

  &:hover {
    background: linear-gradient(135deg, #005bb5, #003087);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 1.1rem;
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
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }
`;

const Status = styled.span`
  color: #dc3545;
  font-weight: 600;
  background: rgba(220, 53, 69, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
`;

const Stat = styled.span`
  color: #48bb78;
  font-weight: 600;
  background: rgba(72, 187, 120, 0.1);
  padding: 0.25rem 0.5rem;
  border-radius: 6px;
`;

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
  max-width: 500px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const ModalHeader = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
`;

const ModalTextarea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 0.95rem;
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

const ModalButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const ModalButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  journée`

const SaveModalButton = styled(ModalButton)`
  background: linear-gradient(135deg, #48bb78, #38a169);
  color: white;

  &:hover {
    background: linear-gradient(135deg, #38a169, #2f855a);
  }
`;

const CancelModalButton = styled(ModalButton)`
  background: linear-gradient(135deg, #dc3545, #c82333);
  color: white;

  &:hover {
    background: linear-gradient(135deg, #c82333, #a71d2a);
  }
`;

const AppointmentsCard = ({ appointments, handleViewTest, handleViewTreatment, handleViewPatient, handleCardClick, valid }) => {
  const currentDate = new Date(Date.now());
  const [remarks, setRemarks] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [tempRemarks, setTempRemarks] = useState('');

  // Initialize remarks state for each appointment
  useEffect(() => {
    const initialRemarks = {};
    appointments.forEach((appointment) => {
      initialRemarks[appointment.aid] = appointment.remarks || '';
    });
    setRemarks(initialRemarks);
  }, [appointments]);

  // Open modal and set temporary remarks
  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setTempRemarks(remarks[appointment.aid] || '');
    setModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedAppointment(null);
    setTempRemarks('');
  };
  const handleUpdateRemarks = async (appointment, remarks) => {
    try {
      const payload = {
        aid: appointment.aid,
        pid: appointment.pid,
        did: appointment.did,
        appointment_time: appointment.appointment_time,
        appointment_date: appointment.appointment_date,
        remarks: remarks || '',
        details: appointment.appointment_details || '',
      };

      const response = await fetch(UpdateAppointments, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || 'Remarks updated successfully');
       
      } else {
        const data = await response.json();
        toast.error(data.message || 'Failed to update remarks');
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
    }
  };
  // Handle save remarks from modal
  const handleSaveRemarks = () => {
    if (selectedAppointment && typeof handleUpdateRemarks === 'function') {
      handleUpdateRemarks(selectedAppointment, tempRemarks);
      setRemarks((prev) => ({ ...prev, [selectedAppointment.aid]: tempRemarks }));
    } else {
      console.warn('handleUpdateRemarks is not a function or no appointment selected');
    }
    closeModal();
  };

  // Log props for debugging
  useEffect(() => {
    console.log('AppointmentsCard props:', { handleUpdateRemarks, handleCardClick });
  }, [handleUpdateRemarks, handleCardClick]);

  return (
    <>
      <Title>Your Appointments</Title>
      {appointments.length === 0 ? (
        <Description>No appointments scheduled.</Description>
      ) : (
        <CardsContainer>
          {appointments.map((appointment) => {
            const appointmentDate = new Date(appointment.appointment_date);
            const isDone = appointmentDate < currentDate;

            return (
              <CardWrapper
                key={appointment.aid}
                onClick={() => typeof handleCardClick === 'function' ? handleCardClick(appointment.aid) : console.warn('handleCardClick is not a function')}
              >
                <CardContent>
                  <CardField>
                    <Label>Date:</Label>
                    <Value>{appointment.appointment_date}</Value>
                  </CardField>
                  <CardField>
                    <Label>Time:</Label>
                    <Value>{appointment.appointment_time}</Value>
                  </CardField>
                  <CardField>
                    <Label>Doctor:</Label>
                    <Value>{appointment.dname}</Value>
                  </CardField>
                  <CardField>
                    <Label>Patient:</Label>
                    <Value>{appointment.pname}</Value>
                  </CardField>
                  <CardField>
                    <Label>Reason:</Label>
                    <Value>{appointment.appointment_details}</Value>
                  </CardField>
                  <CardField>
                    <Label>Remarks:</Label>
                    <Value>{remarks[appointment.aid] || ''}</Value>
                  </CardField>
                  <CardField>
                    <Label>Status:</Label>
                    {isDone ? <Status>Done</Status> : <Stat>Booked</Stat>}
                  </CardField>
                </CardContent>
                <ActionButtons>
                  <ActionButton
                    onClick={(e) => { e.stopPropagation(); handleViewTest(appointment.aid); }}
                    title="View Tests"
                    aria-label="View tests for this appointment"
                  >
                    <FaTemperatureHigh />
                  </ActionButton>
                  <ActionButton
                    onClick={(e) => { e.stopPropagation(); handleViewTreatment(appointment.aid); }}
                    title="View Treatments"
                    aria-label="View treatments for this appointment"
                  >
                    <FaPills />
                  </ActionButton>
                  <ActionButton
                    onClick={(e) => { e.stopPropagation(); handleViewPatient(appointment); }}
                    title="View Patient Details"
                    aria-label="View patient details for this appointment"
                  >
                    <FaUserMd />
                  </ActionButton>
                  {valid && (
                    <SaveButton
                      onClick={(e) => { e.stopPropagation(); openModal(appointment); }}
                      aria-label={`Edit remarks for appointment ${appointment.aid}`}
                    >
                      Save Remarks
                    </SaveButton>
                  )}
                </ActionButtons>
              </CardWrapper>
            );
          })}
        </CardsContainer>
      )}

      {modalOpen && selectedAppointment && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>Edit Remarks for Appointment {selectedAppointment.aid}</ModalHeader>
            <ModalTextarea
              value={tempRemarks}
              onChange={(e) => setTempRemarks(e.target.value)}
              placeholder="Enter remarks here..."
            />
            <ModalButtons>
              <CancelModalButton onClick={closeModal}>Cancel</CancelModalButton>
              <SaveModalButton onClick={handleSaveRemarks}>Save</SaveModalButton>
            </ModalButtons>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  );
};

export default AppointmentsCard;
