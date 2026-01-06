import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Header from './HeaderPatient';
import {  FaEye, FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppointmentsCard from './Appointment_card';
import { GetAppointmentsRoute,DeleteAppointmentRoute,GetTestsRoute,GetTreatmentsRoute } from '../APIRoutes/APIRoutes';

// Styled components (reusing and extending from AdminDoctor where applicable)
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
`;

const Title = styled.h2`
  font-size: 2.5rem;
  font-weight: 600;
  color: #005bb5;
  margin-bottom: 1rem;
  text-align: center;
`;

const Description = styled.p`
  font-size: 1.3rem;
  color: #444;
  margin-bottom: 2rem;
  text-align: center;
`;

const CardContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
  margin-top: 2rem;
  justify-content: center;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`;

const Card = styled(Link)`
  background-color: white;
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 250px;
  height: 100%;
  text-align: center;
  transition: transform 0.2s, box-shadow 0.2s;
  text-decoration: none;
  color: inherit;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }

  &.doctor-card {
    border-top: 4px solid #48bb78;
  }

  &.front-desk-card {
    border-top: 4px solid #4299e1;
  }

  &.data-entry-card {
    border-top: 4px solid #ed8936;
  }
`;

const CardIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #2d3748;
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 0.5rem;
`;

const CardText = styled.p`
  font-size: 0.9rem;
  color: #666;
`;

const TableWrapper = styled.div`
  background: white;
  border-radius: 15px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  overflow-x: auto;
  margin-top: 2rem;
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

const PatientHome = () => {
  const [user, setUser] = useState('');
  const [pid,setpid]=useState(0);
  const [appointments, setAppointments] = useState([]);

  // Fetch user and appointments
  useEffect(() => {
    // Set user from localStorage
    let user = localStorage.getItem('user') || 'Patient';
console.log(user.split('+'));
    setUser(user.split('+')[0]);

    // Fetch appointments
    const getAppointments = async () => {
      try {
        const response = await fetch(GetAppointmentsRoute, {
          method: 'POST',
          body:JSON.stringify({pid:`${ user.split('+')[1] }`}),
          headers: {
            'Content-Type': 'application/json',
            // Add authentication headers if required, e.g., Authorization: `Bearer ${token}`
          },
        });

        if (response.ok) {
          const data = await response.json();
          setAppointments(data.appointments || []);
          
        } else {
          const data = await response.json();
          toast.error(data.message || 'Failed to fetch appointments');
        }
      } catch (err) {
        console.error(err);
        toast.error('Something went wrong. Please try again.');
      }
    };

    getAppointments();
  }, []);

  // Handle view tests and treatments
  const handleViewTest = async (appointment_id) => {
    try {
      // Fetch tests
      const testsResponse = await fetch(`${GetTestsRoute}/${appointment_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const testsData = await testsResponse.json();
      const tests = testsResponse.ok ? testsData.tests || [] : [];
      // Display details in toast
      toast.info(
        <div>
          {tests.length > 0 ? (
            <ul>
            {tests.map((test,index)=>{return (<li key={index}>
             {test.details}
            </li>)})}
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
      toast.error('Failed to fetch details');
    }
  };

  const handleViewTreatment = async (appointment_id) => {
    try {
   
      // Fetch treatments
      const treatmentsResponse = await fetch(`${GetTreatmentsRoute}/${appointment_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const treatmentsData = await treatmentsResponse.json();
      const treatments = treatmentsResponse.ok ? treatmentsData.treatments || [] : [];

      // Display details in toast
      toast.info(
       <div>
          {treatments.length > 0 ? (
<ul>
  {treatments.map((treatment,index)=>{return (<li key={index}>
   {treatment.details}
  </li>)})}
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
      toast.error('Failed to fetch details');
    }
  };
  // Handle delete appointment
  const handleViewDoctor = async (appointment) => {
    toast.info(
      <div>
        <strong>Doctor Details</strong>
        
        <p>Doctor: {appointment.dname}</p>
        <p>qualification: {appointment.qualification}</p>
        <p>experience: {appointment.experience}</p>
        <p>department: {appointment.department}</p>
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
 

  return (
    <>
      <Header />
      <Container>
        <ContentContainer>
          <Title>Welcome, {user}</Title>
          <Description>Manage your appointments and access healthcare services.</Description>
<AppointmentsCard id='#appointments' appointments={appointments} handleViewTest={handleViewTest} handleViewPatient={handleViewDoctor} handleViewTreatment={handleViewTreatment} 
valid={false}/>


         
        </ContentContainer>
        <ToastContainer />
      </Container>
    </>
  );
};

export default PatientHome;
