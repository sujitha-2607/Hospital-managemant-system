import { React, useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaEye, FaEdit, FaTrash, FaUserMd } from 'react-icons/fa';
import Header from './Header';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetDoctorsRoute, DeleteDoctorRoute,DoctorupdateRoute } from '../APIRoutes/APIRoutes';

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

// Modal styled components
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

const AdminDoctor = () => {
  const departments=[
    {
        value:'dentist',label:"Dentist"
    },
    {
        value:'cardiology',label:'cardiology'
    },
    {
        value:'general',label:'General physician'
    },
    {
        value:'neurology',label:'Neurology'
    },
    {
        value:'radiology',label:'Radiology'
    },
  ]

  const [doctors, setDoctors] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    department: '',
    qualification: '',
    experience: 0,
    role: '',
  });
  const modalRef = useRef(null);

  // Fetch doctors from API
  useEffect(() => {
    const get_doctors = async () => {
      try {
        const response = await fetch(GetDoctorsRoute, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setDoctors(data.doctors);
        } else {
          const data = await response.json();
          alert(data.message || 'Getting doctors failed');
        }
      } catch (err) {
        console.log(err);
        alert('Something went wrong. Please try again.');
      }
    };
    get_doctors();
  }, []);

  // Remove handleDelete from useEffect dependencies to avoid unnecessary re-fetches
  const handleDelete = async (username) => {
    if (window.confirm(`Are you sure you want to delete doctor with name: ${username}?`)) {
      try {
        const response = await fetch(`${DeleteDoctorRoute}/${username}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (response.ok) {
          const data = await response.json();
          alert(data.message);
          setDoctors(doctors.filter(doctor => doctor.name !== username));
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

  const handleView = (doctor) => {
    console.log('handleView called for:', doctor);
    toast.info(
      <div>
        <strong>Doctor Details</strong>
        <p>Name: {doctor.name}</p>
        <p>Department: {doctor.department}</p>
        <p>Qualification: {doctor.qualification}</p>
        <p>Experience: {doctor.experience}</p>
      </div>,
      {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      }
    );
  };

  const handleUpdate = (doctor) => {
    setSelectedDoctor(doctor);
    setFormData({
      id: doctor.id || '',
      username: doctor.name || '',
      department: doctor.department || '',
      qualification: doctor.qualification || '',
      experience: doctor.experience || 0,
      role: doctor.role || 'doctor',
    });
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedDoctor(null);
    setFormData({
      
      username: '',
      department: '',
      qualification: '',
      experience: 0,
      role: '',
    });
  };

  const handleOk = async (e) => {
    e.preventDefault();
    console.log('Updating doctor:', formData);
   
    
    try {
      const response = await fetch(DoctorupdateRoute, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        const data = await response.json();
        toast.success(data.message);
        
        setDoctors(doctors.map((doctor) =>
          doctor.username === formData.username ? formData : doctor
        ));
       
      } else {
        const data = await response.json();
      
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error)
      toast.error('Error updating doctor');
    }
    
    setIsModalOpen(false);
    setSelectedDoctor(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'experience' ? parseInt(value) || 0 : value,
    }));
  };

  // Focus modal on open
  useEffect(() => {
    if (isModalOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isModalOpen]);

  return (
    <>
      <Header />
      <Container>
        <ContentContainer>
          <HeaderSection>
            <Title>Manage Doctors</Title>
            <AddButton to="/admin/add">
              <FaUserMd /> Add New Doctor
            </AddButton>
          </HeaderSection>

          {doctors.length === 0 ? (
            "No doctor registered"
          ) : (
            <TableWrapper>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Department</TableHeader>
                    <TableHeader>Qualification</TableHeader>
                    <TableHeader>Actions</TableHeader>
                  </TableRow>
                </TableHead>
                <tbody>
                  {doctors.map((doctor) => (
                    <TableRow key={doctor.id}>
                      <TableCell>{doctor.name}</TableCell>
                      <TableCell>{doctor.department || 'N/A'}</TableCell>
                      <TableCell>{doctor.qualification || 'N/A'}</TableCell>
                      <TableCell>
                        <ActionButton
                          color="#007bff"
                          hoverColor="#0056b3"
                          onClick={() => handleView(doctor)}
                          title="View Details"
                        >
                          <FaEye />
                        </ActionButton>
                        <ActionButton
                          color="#48bb78"
                          hoverColor="#2f855a"
                          onClick={() => handleUpdate(doctor)}
                          title="Update"
                        >
                          <FaEdit />
                        </ActionButton>
                        <ActionButton
                          color="#ed8936"
                          hoverColor="#dd6b20"
                          onClick={() => handleDelete(doctor.name)}
                          title="Delete"
                        >
                          <FaTrash />
                        </ActionButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </tbody>
              </Table>
            </TableWrapper>
          )}

          {/* Modal for updating doctor */}
          {isModalOpen && (
            <ModalOverlay>
              <ModalContent tabIndex={-1} ref={modalRef}>
                <ModalHeader>Update Doctor</ModalHeader>
                <Form onSubmit={handleOk}>
                <label for='name'> name</label>
                  <Input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Doctor Name"
                    disabled
                  />
                  <label for='qualification'> qualification</label>
                  <Input
                    type="text"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    placeholder="Qualification"
                    required
                  />
                   <label for='experience'> experience</label>
                  <Input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    placeholder="Experience (years)"
                    required
                  />
                   <label for='department'> department</label>
            <Select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select your department
              </option>
              {departments.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </Select>
                  <ButtonGroup>
                    <Button type="button" cancel onClick={handleCancel}>
                      Cancel
                    </Button>
                    <Button type="submit">OK</Button>
                  </ButtonGroup>
                </Form>
              </ModalContent>
            </ModalOverlay>
          )}
        </ContentContainer>
        <ToastContainer />
      </Container>
    </>
  );
};

export default AdminDoctor;