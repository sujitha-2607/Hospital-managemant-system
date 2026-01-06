import { React, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaEye, FaEdit, FaTrash, FaUserMd } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetAppointmentsRoute, DeleteDoctorRoute, DoctorupdateRoute } from '../APIRoutes/APIRoutes';

// Styled components (unchanged except for modal additions)
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
const Test_details=styled.p`
overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  width: '100px'
`

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

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 10px;
  padding: 2rem;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
`;

const ModalHeader = styled.h2`
  font-size: 1.8rem;
  color: #005bb5;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.9rem 1.2rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  outline: none;
  background: #fff;
  color: #333;
  transition: all 0.3s ease;
  appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23666' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
  background-repeat: no-repeat;
  background-position: right 1rem center;
  background-size: 1em;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.25);
  }
`;

const Button = styled.button`
  background: ${props => (props.cancel ? '#dc3545' : '#007bff')};
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background 0.3s ease;
  &:hover {
    background: ${props => (props.cancel ? '#c82333' : '#005bb5')};
  }
`;



const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
`;

const AdminDoctor = ({ GetRoute, DeleteRoute, UpdateRoute, CreateRoute, msg }) => {
  const [appointments, setAppointments] = useState([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // For Create modal
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false); // For Update modal
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    aid: 0,
    details: '',
  });
  const [testFormData, setTestFormData] = useState({
    id: 0,
    details: '',
  });
  const [testsByAppointment, setTestsByAppointment] = useState({});
  const createModalRef = useRef(null);
  const updateModalRef = useRef(null);
  const currentDate = new Date(Date.now()).toISOString();

  // Fetch appointments from API
  useEffect(() => {
    const getAppointments = async () => {
      try {
        const response = await fetch(GetAppointmentsRoute, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAppointments(
            data.appointments.filter(
              app => app.appointment_date + 'T' + app.appointment_time < currentDate
            )
          );
        } else {
          const data = await response.json();
          alert(data.message || 'Getting appointments failed');
        }
      } catch (err) {
        console.log(err);
        alert('Something went wrong. Please try again.');
      }
    };
    getAppointments();
  }, []);

  // Fetch tests for all appointments
  useEffect(() => {
    const getTests = async (aid) => {
      try {
        const response = await fetch(`${GetRoute}/${aid}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          return data.tests || [];
        } else {
          const data = await response.json();
          toast.error(data.message || 'Failed to fetch tests');
          return [];
        }
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong while fetching tests.');
        return [];
      }
    };

    const fetchAllTests = async () => {
      const newTestsByAppointment = {};
      for (let i = 0; i < appointments.length; i++) {
        const { aid } = appointments[i];
        const tests = await getTests(aid);
        newTestsByAppointment[aid] = tests;
      }
      setTestsByAppointment(newTestsByAppointment);
    };

    if (appointments.length > 0) {
      fetchAllTests();
    }
  }, [appointments]);

  console.log(testsByAppointment);

  const handleDelete = async (id) => {
    if (window.confirm(`Are you sure you want to delete test: ${id}?`)) {
      try {
        const response = await fetch(`${DeleteRoute}/${id}`, {
          method: 'DELETE',
          
        });
        if (response.ok) {
          const data = await response.json();
          alert(data.message);
         
        } else {
          const data = await response.json();
          toast.error(data.message);
        }
      } catch (err) {
        console.log(err);
        toast.error('Something went wrong. Please try again.');
      }
    }
  };

  const handleCreate = (doctor) => {
    setFormData({
      aid: doctor.aid || 99,
      details: doctor.details || '',
    });
    setIsCreateModalOpen(true);
  };

  const handleUpdate = (test) => {
    setTestFormData({
      id: test.id || 99,
      details: test.details || '',
    });
    setIsUpdateModalOpen(true);
  };

  const handleCreateCancel = () => {
    setIsCreateModalOpen(false);
    setSelectedDoctor(null);
    setFormData({
      aid: 0,
      details: '',
    });
  };

  const handleUpdateCancel = () => {
    setIsUpdateModalOpen(false);
    setTestFormData({
      id: 0,
      details: '',
    });
  };

  const handleCreateOk = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(CreateRoute, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error creating appointment');
    }
    setIsCreateModalOpen(false);
  };

  const handleUpdateOk = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${UpdateRoute}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testFormData),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        // Optionally refresh tests
        const updatedTests = await fetch(`${GetRoute}/${testFormData.aid}`);
        if (updatedTests.ok) {
          const updatedData = await updatedTests.json();
          setTestsByAppointment(prev => ({
            ...prev,
            [testFormData.aid]: updatedData.tests,
          }));
        }
      } else {
        const data = await response.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error('Error updating test');
    }
    setIsUpdateModalOpen(false);
  };

  const handleCreateChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setTestFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Focus modal on open
  useEffect(() => {
    if (isCreateModalOpen && createModalRef.current) {
      createModalRef.current.focus();
    }
    if (isUpdateModalOpen && updateModalRef.current) {
      updateModalRef.current.focus();
    }
  }, [isCreateModalOpen, isUpdateModalOpen]);

  return (
    <Container>
      <ContentContainer>
        <HeaderSection>
          <Title>Manage {msg} </Title>
        </HeaderSection>

        {appointments.length === 0 ? (
          "No doctor registered"
        ) : (
          <TableWrapper>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeader>Patient Name</TableHeader>
                  <TableHeader>Doctor Name</TableHeader>
                  <TableHeader>Tests</TableHeader>
                  <TableHeader>Actions</TableHeader>
                </TableRow>
              </TableHead>
              <tbody>
                {appointments.map((doctor) => (
                  <TableRow key={doctor.aid}>
                    <TableCell>{doctor.pname}</TableCell>
                    <TableCell>{doctor.dname}</TableCell>
                    <TableCell>
                      {(!testsByAppointment[doctor.aid] ||
                        testsByAppointment[doctor.aid].length === 0) ? (
                        <div>No {msg} available</div>
                      ) : (
                        <div>
                          <ul>
                            {testsByAppointment[doctor.aid].map((test) => (
                              <li style={{display:'flex'}} key={test.id}>
                                <Test_details>{test.details}</Test_details>
                                <ActionButton
                                  color="#48bb78"
                                  hoverColor="#2f855a"
                                  onClick={() => handleUpdate(test)}
                                  title="Update"
                                >
                                  <FaEdit />
                                </ActionButton>
                                <ActionButton
                                  color="#ed8936"
                                  hoverColor="#dd6b20"
                                  onClick={() => handleDelete(test.id)}
                                  title="Delete"
                                >
                                  <FaTrash />
                                </ActionButton>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <ActionButton
                        color="#48bb78"
                        hoverColor="#2f855a"
                        onClick={() => handleCreate(doctor)}
                        title="Create"
                      >
                        <FaEdit />
                      </ActionButton>
                    </TableCell>
                  </TableRow>
                ))}
              </tbody>
            </Table>
          </TableWrapper>
        )}

        {/* Create Modal */}
        {isCreateModalOpen && (
          <ModalOverlay>
            <ModalContent tabIndex={-1} ref={createModalRef}>
              <ModalHeader>Create {msg}</ModalHeader>
              <Form onSubmit={handleCreateOk}>
                <label htmlFor="aid">Appointment ID</label>
                <Input
                  type="number"
                  name="aid"
                  value={formData.aid}
                  onChange={handleCreateChange}
                  placeholder="Appointment ID"
                  disabled
                />
                <label htmlFor="details">Details</label>
                <Input
                  type="text"
                  name="details"
                  value={formData.details}
                  onChange={handleCreateChange}
                  placeholder="Test Details"
                  required
                />
                <ButtonGroup>
                  <Button type="button" cancel onClick={handleCreateCancel}>
                    Cancel
                  </Button>
                  <Button type="submit">OK</Button>
                </ButtonGroup>
              </Form>
            </ModalContent>
          </ModalOverlay>
        )}

        {/* Update Modal */}
        {isUpdateModalOpen && (
          <ModalOverlay>
            <ModalContent tabIndex={-1} ref={updateModalRef}>
              <ModalHeader>Update Test</ModalHeader>
              <Form onSubmit={handleUpdateOk}>
                <label htmlFor="id">{msg} ID</label>
                <Input
                  type="number"
                  name="id"
                  value={testFormData.id}
                  onChange={handleUpdateChange}
                  placeholder="Test ID"
                  disabled
                />
                <label htmlFor="details">Details</label>
                <Input
                  type="text"
                  name="details"
                  value={testFormData.details}
                  onChange={handleUpdateChange}
                  placeholder="Test Details"
                  required
                />
                <ButtonGroup>
                  <Button type="button" cancel onClick={handleUpdateCancel}>
                    Cancel
                  </Button>
                  <Button type="submit">OK</Button>
                </ButtonGroup>
              </Form>
            </ModalContent>
          </ModalOverlay>
        )}

        <ToastContainer />
      </ContentContainer>
    </Container>
  );
};

export default AdminDoctor;
