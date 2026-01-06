import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from './HeaderDoctor';
import { FaCalendarAlt, FaEye } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppointmentsCard from './Appointment_card';
import UpdateAppointment from './UpdateAppointment';
import { GetUpcAppointments, GetTestsRoute, GetTreatmentsRoute, UpdateAppointments } from '../APIRoutes/APIRoutes';

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
  cursor: pointer;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  background: linear-gradient(135deg, #007bff, #005bb5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  text-align: center;

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

const DoctorUpcAppointments = () => {
  const [user, setUser] = useState('');
  const [did, setDid] = useState(0);
  const [appointments, setAppointments] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Fetch user
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

  // Fetch upcoming appointments
  useEffect(() => {
    const getAppointments = async () => {
      try {
        if (did) {
          const response = await fetch(`${GetUpcAppointments}/${did}`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log(data);
              setAppointments(data.appointments|| []);
          } else {
            const data = await response.json();
            toast.error(data.message || 'Failed to fetch appointments');
          }
        }
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong. Please try again.');
      }
    };

    if (did) {
      getAppointments();
    }
  }, [did]);

  // Handle view tests
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
        <p>Details: {appointment.appointment_details}</p>
        <p>Remarks: {appointment.remarks || 'None'}</p>
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

  // Handle update remarks


  // Handle card click to redirect
  const handleCardClick = (appointment_id) => {
    navigate(`/doctorh/upcomapo/${appointment_id}`);
  };

  // Handle modal update
  const handleModalUpdate = (aid, remarks) => {
    setAppointments((prev) =>
      prev.map((appt) =>
        appt.aid === aid ? { ...appt, remarks } : appt
      )
    );
  };

  

  return (
    <>
      <Header />
      <Container>
        <ContentContainer onClick={() => setIsModalOpen(true)}>
          <Title>Welcome, {user || 'Doctor'}</Title>
          <Description>Your Upcoming Appointments</Description>
          <AppointmentsCard
            id="#upc-appointments"
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

export default DoctorUpcAppointments;
