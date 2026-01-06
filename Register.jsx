import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Loader from '../assets/Loader'; // Ensure the path is correct
import { PatientloginRoute, AdminloginRoute, DoctorloginRoute, DeologinRoute, FdologinRoute,PatientRegisterROute } from '../APIRoutes/APIRoutes';

const LoginContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background: linear-gradient(135deg, #e6f0fa, #d1e3f6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
`;

const LoginBox = styled(motion.div)`
  width: min(90vw, 450px);
  padding: 3rem 2.5rem;
  background: rgba(255, 255, 255, 0.98);
  border-radius: 20px;
  box-shadow: 0 12px 32px rgba(0, 91, 181, 0.15);
  display: flex;
  flex-direction: column;
  align-items: center;
  backdrop-filter: blur(8px);
`;

const LoginTitle = styled.h2`
  color: #005bb5;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  letter-spacing: 0.5px;
`;

const Text1 = styled.div`
  font-size: 1.1rem;
  color: #444;
  margin-bottom: 2rem;
  text-align: center;
`;

const NavLink = styled.button`
  background: none;
  border: none;
  color: #007bff;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  text-decoration: underline;
  padding: 0;
  transition: color 0.3s ease;

  &:hover {
    color: #005bb5;
  }
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonGroup = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1.5rem;
`;

const BackButton = styled(motion.button)`
  font-size: 1rem;
  font-weight: 500;
  background: #f8f9fa;
  border: 2px solid #007bff;
  color: #007bff;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background: #007bff;
    color: white;
  }
`;

const InputGroup = styled(motion.div)`
  width: 100%;
  margin-bottom: 1.8rem;
  padding-right: 1.5rem;
  position: relative;
`;

const InputLabel = styled.label`
  font-size: 1rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 0.5rem;
  display: block;
  text-align: left;
`;

const InputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.9rem 1.2rem;
  font-size: 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  outline: none;
  background: #fff;
  transition: all 0.3s ease;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 10px rgba(0, 123, 255, 0.25);
  }

  &::placeholder {
    color: #bbb;
    font-weight: 400;
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

const EyeIcon = styled.div`
  position: absolute;
  right: 1.2rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #007bff;
  }
`;

const ForgotPassword = styled.div`
  width: 100%;
  text-align: right;
  margin-bottom: 1.5rem;

  a {
    color: #007bff;
    font-size: 0.95rem;
    font-weight: 500;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: #005bb5;
      text-decoration: underline;
    }
  }
`;

const SubmitButton = styled(motion.button)`
  width: 100%;
  padding: 0.9rem;
  font-size: 1.2rem;
  font-weight: 600;
  background: linear-gradient(135deg, #007bff, #005bb5);
  color: white;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: linear-gradient(135deg, #005bb5, #003d80);
    transform: translateY(-2px);
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const LoaderContainer = styled.div`
  margin: 2rem auto;
  display: flex;
  justify-content: center;
`;

const ErrorMessage = styled.p`
  color: #dc3545;
  font-size: 0.95rem;
  margin-top: 0.5rem;
  text-align: left;
`;

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: '', password: '', contact:'' }); // Default role to 'patient'
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(''); // Clear error on input change
  };

  useEffect(() => {
    if (message) {
      toast(message, {
        autoClose: 5000,
        pauseOnHover: true,
        closeOnClick: true,
        position: 'top-center',
        theme: 'light',
        toastStyle: {
          background: '#fff',
          color: '#333',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        },
      });
    }
  }, [message]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.username || !formData.password || !formData.contact) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }


    try {
      const response = await fetch(PatientRegisterROute, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          contact:formData.contact
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setIsLoading(false);
        setMessage(data.message || "sucessful-register");
        navigate('/login');
       
        
      } else {
        const data = await response.json();
        setError(data.message || 'Login failed');
        setIsLoading(false);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
    
  };

  return (
    <LoginContainer>
      <LoginBox
        as={motion.div}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <LoginTitle>Welcome to CarePlus</LoginTitle>
        <Form onSubmit={submitHandler}>
          <ButtonGroup>
            <BackButton
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              type="button"
            >
              ← Back
            </BackButton>
          </ButtonGroup>
          <InputGroup as={motion.div} variants={fadeIn} initial="hidden" animate="visible">
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </InputGroup>
          <InputGroup as={motion.div} variants={fadeIn} initial="hidden" animate="visible">
            <InputLabel htmlFor="contact">ph no</InputLabel>
            <Input
              id="contact"
              name="contact"
              type='number'
              value={formData.contact}
              onChange={handleChange}
              required
            >
              </Input>
             
          </InputGroup>
          <InputGroup as={motion.div} variants={fadeIn} initial="hidden" animate="visible">
            <InputLabel htmlFor="password">Password</InputLabel>
            <InputWrapper>
              <Input
                type={passwordVisible ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              <EyeIcon onClick={togglePasswordVisibility}>
                {passwordVisible ? <FiEyeOff size={22} /> : <FiEye size={22} />}
              </EyeIcon>
            </InputWrapper>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </InputGroup>
          <SubmitButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'submitting ...' : 'Register'}
          </SubmitButton>
        </Form>
        {isLoading && (
          <LoaderContainer>
            <Loader />
          </LoaderContainer>
        )}
        <ToastContainer />
      </LoginBox>
    </LoginContainer>
  );
}

export default Register;