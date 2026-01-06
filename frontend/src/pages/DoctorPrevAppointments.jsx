import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from './HeaderDoctor';
import { FaHistory, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppointmentsCard from './Appointment_card';
import { GetPrevAppointments, GetTestsRoute, GetTreatmentsRoute } from '../APIRoutes/APIRoutes';

// Styled components
const Container = styled.div`
  padding: 5rem 20px;
  background: linear-gradient(135deg, #f8f9fa, #e9ecef);
  min-height: 100vh;
  font-family: 'Poppins', sans-serif;

  @media (max-width: 768px) {
    padding: 3rem 20px;
  }
`;

const ContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  background: linear-gradient(135deg, #007bff, #005bb5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-align: center;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Description = styled.p`
  font-size: 1.3rem;
  color: #444;
  background: rgba(255, 255, 255, 0.9);
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

// Updated AppointmentsCard styling (assumed to be in Appointment_card.jsx)
const CardWrapper = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1rem;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border-top: 4px solid #48bb78;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const CardText = styled.p`
  font-size: 1rem;
  color: #333;
  flex: 1;
  min-width: 200px;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const ActionButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
  cursor: pointer;
  transition: background 0.3s ease, transform 0.3s ease;

  &:hover {
    background: #005bb5;
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
  }
`;

const DoctorPrevAppointments = () => {
  const [user, setUser] = useState('');
  const [did, setDid] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  // Fetch user and appointments
  useEffect(() => {
    let userData = localStorage.getItem('user');
    if(!userData){
      navigate('/login');
    }
    else{
    const [username, id, role] = userData.split('+');
    console.log(userData);
    if(role!='doctor'){
      navigate('/login');
    }
    setUser(username);
    setDid(parseInt(id) || 0);
  }
  }, []);

  // Handle view tests
  useEffect(()=>{
    const app = async () => {
      try {
        const response = await fetch(`${GetPrevAppointments}/${did}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.appointments.length>0) {
            setAppointments( data.appointments);
          } else {
            toast.warn(data.message || 'No previous appointments found');
            setAppointments([]);
          }
        } else {
          const data = await response.json();
          toast.error(data.message || 'Failed to fetch appointments');
        }
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong. Please try again.');
      }
    };
if(did){
      app();
}
    
  },[did])
  console.log(appointments);
  const handleViewTest = async (appointment_id) => {
    try {
      const testsResponse = await fetch(`${GetTestsRoute}/${appointment_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const testsData = await testsResponse.json();
      const tests = testsResponse.ok ? testsData.tests || [] : [];

      toast.info(
        <div>
          {tests.length > 0 ? (
            <ul>
              {tests.map((test, index) => (
                <li key={index}>{test.details}</li>
              ))}
            </ul>
          ) : (
            <p>No tests assigned</p>
          )}
        </div>,
        {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        }
      );
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch tests');
    }
  };

  // Handle view treatments
  const handleViewTreatment = async (appointment_id) => {
    try {
      const treatmentsResponse = await fetch(`${GetTreatmentsRoute}/${appointment_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const treatmentsData = await treatmentsResponse.json();
      const treatments = treatmentsResponse.ok ? treatmentsData.treatments || [] : [];

      toast.info(
        <div>
          {treatments.length > 0 ? (
            <ul>
              {treatments.map((treatment, index) => (
                <li key={index}>{treatment.details}</li>
              ))}
            </ul>
          ) : (
            <p>No treatments assigned</p>
          )}
        </div>,
        {
          position: 'top-center',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        }
      );
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch treatments');
    }
  };

  // Handle view patient
  const handleViewPatient = async (appointment) => {
    toast.info(
      <div>
        <strong>Patient Details</strong>
        <p>Patient ID: {appointment.pid}</p>
        <p>Details: {appointment.details}</p>
        <p>Remarks: {appointment.remarks}</p>
      </div>,
      {
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      }
    );
  };

  // Handle card click to redirect
  const handleCardClick = (appointment_id) => {
    navigate(`/doctorh/prevapo/${appointment_id}`);
  };

  return (
    <>
      <Header />
      <Container>
        <ContentContainer>
          <Title>Welcome, {user || 'Doctor'}</Title>
          <Description>Your Previous Appointments</Description>
          <AppointmentsCard
            id="appointments"
            appointments={appointments}
            handleViewTest={handleViewTest}
            handleViewTreatment={handleViewTreatment}
            handleViewPatient={handleViewPatient}
            handleCardClick={handleCardClick}
            valid={true}
          />
        </ContentContainer>
        <ToastContainer />
      </Container>
    </>
  );
};

export default DoctorPrevAppointments;
