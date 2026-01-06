import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBed } from 'react-icons/fa';
import Header from './HeaderFdo';
import { toast, ToastContainer } from 'react-toastify';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';
import { AdmitRoomRoute, AvailableRoomRoute } from '../APIRoutes/APIRoutes';

// Styled components for the main layout
const Container = styled.div`
  width: 100%;
  font-family: 'Poppins', sans-serif;
  padding: 5rem 20px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 3rem 20px;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  color: #005bb5;
  margin: 0;
`;

const AddButton = styled(Link)`
  background: #007bff;
  color: white;
  padding: 0.6rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #0056b3;
    transform: translateY(-2px);
    color: white;
  }
`;

const TableWrapper = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  background: #007bff;
  color: white;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background: #f8f9fa;
  }
`;

const TableHeader = styled.th`
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  text-align: left;

  @media (max-width: 768px) {
    padding: 0.75rem;
    font-size: 1rem;
  }
`;

const TableCell = styled.td`
  padding: 1rem;
  font-size: 1rem;
  color: #333;

  @media (max-width: 768px) {
    padding: 0.75rem;
    font-size: 0.9rem;
  }
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.color || '#007bff'};
  font-size: 1.2rem;
  cursor: pointer;
  margin-right: 1rem;
  transition: color 0.2s;

  &:hover {
    color: ${props => props.hoverColor || '#0056b3'};
  }
`;

// Styled components for the Modal
const ModalContent = styled.div`
  font-family: 'Poppins', sans-serif;
  background: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  padding: 2rem;
  max-width: 400px;
 scroll:none;
 max-height:400px;
  margin: 0 auto;
`;

const ModalTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 600;
  color: #005bb5;
  margin: 0 0 1.5rem;
`;

const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.25rem;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  transition: border-color 0.2s;

  &:focus {
    outline: none;
    border-color: #007bff;
  }

  &:disabled {
    background: #f8f9fa;
    cursor: not-allowed;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
`;

const SubmitButton = styled.button`
  background: #007bff;
  color: white;
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #0056b3;
    transform: translateY(-2px);
  }
`;

const CancelButton = styled.button`
  background: #f8f9fa;
  color: #333;
  padding: 0.6rem 1.5rem;
  border: 1px solid #ced4da;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: #e9ecef;
    transform: translateY(-2px);
  }
`;

Modal.setAppElement('#root');

const FdoAllocate = () => {
  const [deo, setdeo] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [formData, setFormData] = useState({ id: 0, pid: '' });

  const openModal = (roomId) => {
    setFormData({ id: roomId, pid: '' });
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, pid: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(AdmitRoomRoute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success(data.message || 'Room allocated successfully');
        closeModal();
      } else {
        toast.error(data.message || 'Failed to allocate room');
        closeModal();
      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again.');
      closeModal();
    }
  };

  useEffect(() => {
    const get_deo = async () => {
      try {
        const response = await fetch(AvailableRoomRoute, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data = await response.json();

        if (response.ok) {
          setdeo(data.rooms);
        } else {
          toast.error(data.message || 'Getting rooms failed');
        }
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong. Please try again.');
      }
    };

    get_deo();
  }, []);

  return (
    <>
      <Header />
      <Container>
        <ContentContainer>
          <HeaderSection>
            <Title>Manage Rooms</Title>
          </HeaderSection>
          {deo.length === 0 ? (
            <div>Sorry, no rooms registered</div>
          ) : (
            <TableWrapper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Room no</TableHeader>
                    <TableHeader>Room details</TableHeader>
                    <TableHeader>Actions</TableHeader>
                  </TableRow>
                </TableHead>
                <tbody>
                  {deo.map((room) => (
                    <TableRow key={room.id}>
                      <TableCell>{room.id}</TableCell>
                      <TableCell>{room.details}</TableCell>
                      <TableCell>
                        <ActionButton
                          color="#28a745"
                          hoverColor="#218838"
                          onClick={() => openModal(room.id)}
                          title="Allocate"
                        >
                          <FaBed />
                        </ActionButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </TableWrapper>
          )}
        </ContentContainer>

        {/* Modal */}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Allocate Room"
          style={{
            content: {
              background: 'none',
              border: 'none',
              padding: 0,
              maxWidth: '400px',
              width: '90%',
              position: 'absolute',
              top: '50%',
              left: '50%',
              height:'300px',
              scroll:'none',
              transform: 'translate(-50%, -50%)',
              margin: 0,
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            },
          }}
        >
          <ModalContent>
            <ModalTitle>Allocate Room</ModalTitle>
            <ModalForm onSubmit={handleSubmit}>
              <FormGroup>
                <FormLabel>Room ID:</FormLabel>
                <FormInput
                  type="text"
                  value={formData.id}
                  disabled
                />
              </FormGroup>
              <FormGroup>
                <FormLabel>Patient ID:</FormLabel>
                <FormInput
                  type="text"
                  name="pid"
                  value={formData.pid}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <ButtonGroup>
                <SubmitButton type="submit">Allocate</SubmitButton>
                <CancelButton onClick={closeModal} type="button">
                  Cancel
                </CancelButton>
              </ButtonGroup>
            </ModalForm>
          </ModalContent>
        </Modal>

        <ToastContainer />
      </Container>
    </>
  );
};

export default FdoAllocate;
