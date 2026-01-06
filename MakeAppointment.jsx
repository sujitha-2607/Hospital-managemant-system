import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GetDoctorsRoute, GetSlotsbyDoctor, BookAppointment } from '../APIRoutes/APIRoutes';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';

// Styled Components
const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
`;

const Header = styled.header`
  background: linear-gradient(135deg, #3b82f6, #1e40af);
  color: white;
  padding: 1.5rem 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const Logo = styled.h4`
  margin: 0;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 1px;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  transition: color 0.3s;
  &:hover {
    color: #e0e0e0;
  }
`;

const Button = styled.a`
  background: #ffffff;
  color: #3b82f6;
  padding: 0.6rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  &:hover {
    background: #f0f0f0;
    transform: translateY(-2px);
  }
`;

const Section = styled.section`
  padding: 5rem 20px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  color: #1e40af;
  text-align: center;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  background: linear-gradient(135deg, #ffffff, #f9fafb);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  margin: 0 auto 2rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  font-size: 1.1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  color: #333;
  transition: all 0.3s ease;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 6px rgba(59, 130, 246, 0.3);
    outline: none;
    transform: translateY(-1px);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  color: #333;
  transition: all 0.3s ease;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 6px rgba(59, 130, 246, 0._gpio);
    outline: none;
    transform: translateY(-1px);
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  color: #333;
  resize: vertical;
  min-height: 120px;
  transition: all 0.3s ease;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 6px rgba(59, 130, 246, 0.3);
    outline: none;
    transform: translateY(-1px);
  }
`;

const SearchBarContainer = styled.div`
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 0.7rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 1rem;
  font-family: 'Poppins', sans-serif;
  color: #333;
  transition: all 0.3s ease;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 6px rgba(59, 130, 246, 0.3);
    outline: none;
    transform: translateY(-1px);
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

const SubmitButton = styled.button`
  background: #3b82f6;
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 25px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 1.5rem auto 0;
  width: 200px;
  text-align: center;

  &:hover {
    background: #1e40af;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const SlotMatrix = styled.div`
  background: #ffffff;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05);
  margin: 1.5rem 0;
  overflow-x: auto;
`;

const MatrixTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const MatrixHeader = styled.th`
  padding: 0.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #333;
  text-align: center;
  border-bottom: 1px solid #d1d5db;
`;

const MatrixCell = styled.td`
  padding: 0.5rem;
  font-size: 0.9rem;
  text-align: center;
  border-bottom: 1px solid #d1d5db;
`;

const SlotButton = styled.button`
  background: ${props => (props.available ? '#4ade80' : '#f87171')};
  color: white;
  padding: 0.3rem;
  border-radius: 6px;
  border: none;
  font-size: 0.8rem;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${props => (props.available ? 'pointer' : 'not-allowed')};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => (props.available ? '#22c55e' : '#ef4444')};
    transform: ${props => (props.available ? 'translateY(-1px)' : 'none')};
  }
`;

const BookingDetails = styled.div`
  background: linear-gradient(135deg, #ffffff, #f9fafb);
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  margin: 2rem auto;
`;

const DetailsTitle = styled.h3`
  font-size: 1.8rem;
  font-weight: 600;
  color: #1e40af;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const DetailItem = styled.p`
  font-size: 1.1rem;
  color: #333;
  margin-bottom: 0.75rem;
  line-height: 1.5;

  strong {
    color: #3b82f6;
  }
`;

const NewAppointmentButton = styled.button`
  background: #4ade80;
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 25px;
  border: none;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 1.5rem auto 0;
  width: 200px;
  text-align: center;

  &:hover {
    background: #22c55e;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const MakeAppointment = () => {
  const [did, setDid] = useState(0);
  const [inrole, setInrole] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDoctor = location.state?.doctor || null;

  useEffect(() => {
    let userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
    } else {
      const [username, id, role] = userData.split('+');
      if (role !== 'fdo') {
        navigate('/login');
      }
      setDid(id || 0);
      setInrole(role || '');
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    pid: '',
    did: selectedDoctor?.id || '',
    appointment_date: '',
    appointment_time: '',
    details: '',
  });
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingDetails, setBookingDetails] = useState(null);

  // Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(GetDoctorsRoute);
        if (response.data.doctors) {
          setDoctors(response.data.doctors);
          setFilteredDoctors(response.data.doctors);
        } else {
          toast.error('Failed to fetch doctors');
        }
      } catch (err) {
        console.error(err);
        toast.error('Error fetching doctors');
      }
    };
    fetchDoctors();
  }, []);

  // Prefill doctor details if provided
  useEffect(() => {
    if (selectedDoctor) {
      setFormData(prev => ({ ...prev, did: selectedDoctor.id }));
      setSearchTerm(selectedDoctor.name);
    }
  }, [selectedDoctor]);

  // Filter doctors by search term
  useEffect(() => {
    const filtered = doctors.filter(doctor =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase().trim())
    );
    setFilteredDoctors(filtered);
  }, [searchTerm, doctors]);

  // Fetch slots when doctor is selected
  useEffect(() => {
    if (formData.did) {
      const fetchSlots = async () => {
        try {
          const response = await axios.get(GetSlotsbyDoctor + `/${formData.did}`);
          if (response.data.slots) {
            setSlots(response.data.slots);
          } else {
            setSlots([]);
            toast.warn('No slots available for this doctor');
          }
        } catch (err) {
          console.error(err);
          setSlots([]);
          toast.error('Error fetching slots');
        }
      };
      fetchSlots();
    } else {
      setSlots([]);
    }
  }, [formData.did]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'did') {
      setSelectedSlot(null);
      setFormData(prev => ({ ...prev, appointment_date: '', appointment_time: '' }));
    }
  };

  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle slot selection
  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setFormData(prev => ({
      ...prev,
      appointment_date: slot.date,
      appointment_time: slot.time,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.pid || !formData.did || !formData.appointment_date || !formData.appointment_time || !formData.details) {
      toast.error('All fields are required');
      return;
    }

    try {
      const response = await axios.post(BookAppointment, formData);
      if (response.data.message === 'sucessful appointment created') {
        toast.success('Appointment booked successfully');
        const selectedDoctor = doctors.find(doc => doc.id === parseInt(formData.did));
        setBookingDetails({
          pid: formData.pid,
          doctorName: selectedDoctor?.name || 'Unknown',
          department: selectedDoctor?.department || 'Dentist',
          appointment_date: formData.appointment_date,
          appointment_time: formData.appointment_time.slice(0, 5),
          details: formData.details,
        });
      } else {
        toast.error(response.data.message || 'Failed to book appointment');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error booking appointment');
    }
  };

  // Handle new appointment
  const handleNewAppointment = () => {
    setBookingDetails(null);
    setFormData({
      pid: '',
      did: '',
      appointment_date: '',
      appointment_time: '',
      details: '',
    });
    setSelectedSlot(null);
    setSearchTerm('');
    setSlots([]);
  };

  // Generate slot matrix
  const times = ['10:00:00', '11:00:00', '12:00:00', '16:00:00', '17:00:00', '18:00:00'];
  const dates = [...new Set(slots.map(slot => slot.date))].sort();
  const matrix = dates.map(date => ({
    date,
    slots: times.map(time => ({
      time,
      available: slots.some(slot => slot.date === date && slot.time === time),
    })),
  }));

  return (
    <Container>
      <Header>
        <HeaderContainer>
          <Logo>Caretaker</Logo>
          <Nav>
            <NavLink href="#home">Home</NavLink>
            <NavLink href="#services">Services</NavLink>
            <NavLink href="#doctors">Doctors</NavLink>
            <NavLink href="#contact">Contact</NavLink>
            <Button href="/appointment">Book Appointment</Button>
          </Nav>
        </HeaderContainer>
      </Header>
      <Section>
        <SectionContainer>
          <Title>Book an Appointment</Title>
          {bookingDetails ? (
            <BookingDetails>
              <DetailsTitle>Appointment Details</DetailsTitle>
              <DetailItem>
                <strong>Patient ID:</strong> {bookingDetails.pid}
              </DetailItem>
              <DetailItem>
                <strong>Doctor:</strong> {bookingDetails.doctorName} ({bookingDetails.department})
              </DetailItem>
              <DetailItem>
                <strong>Date:</strong> {bookingDetails.appointment_date}
              </DetailItem>
              <DetailItem>
                <strong>Time:</strong> {bookingDetails.appointment_time}
              </DetailItem>
              <DetailItem>
                <strong>Details:</strong> {bookingDetails.details}
              </DetailItem>
              <NewAppointmentButton onClick={handleNewAppointment}>
                Book Another Appointment
              </NewAppointmentButton>
            </BookingDetails>
          ) : (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label>Patient ID</Label>
                <Input
                  type="number"
                  name="pid"
                  value={formData.pid}
                  onChange={handleInputChange}
                  placeholder="Enter patient ID"
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label>Doctor</Label>
                <SearchBarContainer>
                  <SearchInput
                    type="text"
                    placeholder="Search doctors by name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />
                </SearchBarContainer>
                <Select
                  name="did"
                  value={formData.did}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select a doctor</option>
                  {filteredDoctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>
                      {doctor.name} ({doctor.department || 'Dentist'})
                    </option>
                  ))}
                </Select>
              </FormGroup>
              {formData.did && (
                <FormGroup>
                  <Label>Select Appointment Slot</Label>
                  <SlotMatrix>
                    <MatrixTable>
                      <thead>
                        <tr>
                          <MatrixHeader>Date</MatrixHeader>
                          {times.map(time => (
                            <MatrixHeader key={time}>{time.slice(0, 5)}</MatrixHeader>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {matrix.map(({ date, slots }) => (
                          <tr key={date}>
                            <MatrixCell>{date}</MatrixCell>
                            {slots.map(({ time, available }) => (
                              <MatrixCell key={time}>
                                <SlotButton
                                  available={available}
                                  onClick={() => available && handleSlotSelect({ date, time })}
                                  disabled={!available}
                                  style={{
                                    background:
                                      selectedSlot?.date === date && selectedSlot?.time === time
                                        ? '#3b82f6'
                                        : undefined,
                                  }}
                                >
                                  {available ? <FaCheck /> : <FaTimes />}
                                </SlotButton>
                              </MatrixCell>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </MatrixTable>
                  </SlotMatrix>
                </FormGroup>
              )}
              <FormGroup>
                <Label>Details</Label>
                <Textarea
                  name="details"
                  value={formData.details}
                  onChange={handleInputChange}
                  placeholder="Enter appointment details"
                  required
                />
              </FormGroup>
              <SubmitButton type="submit">Book Appointment</SubmitButton>
            </Form>
          )}
        </SectionContainer>
      </Section>
      <ToastContainer />
    </Container>
  );
};

export default MakeAppointment;