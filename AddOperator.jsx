import React, { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {DeoAddOperatorRoute,FdoAddOperatorRoute,DoctorAddOperatorRoute } from '../APIRoutes/APIRoutes';

// Styled Components
const AddOperatorContainer = styled.div`
  
  width: 100vw;
  background: linear-gradient(135deg, #e6f0fa, #d1e3f6);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins', sans-serif;
  overflow: hidden;
`;

const AddOperatorBox = styled(motion.div)`
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

const AddOperatorTitle = styled.h2`
  color: #005bb5;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  text-align: center;
  letter-spacing: 0.5px;
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
  width: 90%;
  margin-bottom: 1.8rem;
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

const LinkText = styled.p`
  font-size: 1.1rem;
  color: #444;
  margin-top: 1.5rem;
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

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const AddOperator = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    password: '',
    confirmPassword: '',
    qualification:'',
    department:'',
    experience:5
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const roles = [
   
    { value: 'fdo', label: 'FDO', route: FdoAddOperatorRoute },
    { value: 'deo', label: 'DEO', route: DeoAddOperatorRoute },
    { value: 'doctor', label: 'Doctor', route: DoctorAddOperatorRoute },
  ];

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
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError(''); // Clear error on input change
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Client-side validation
    if (!formData.name  || !formData.role || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const selectedRole = roles.find((r) => r.value === formData.role);
      if (!selectedRole) {
        setError('Invalid role selected');
        setIsLoading(false);
        return;
      } 
      if (selectedRole==='doctor')
      {
   
   if (!formData.qualification  || !formData.experience || !formData.department ) 
    {
    setError('Please fill in all fields');
    setIsLoading(false);
    return;
  
      }
    }
      

      const response = await fetch(selectedRole.route, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.name,
          password: formData.password,
          qualification:formData.qualification,
          experience:formData.experience,
          department:formData.department
        }),
      });

      if (response.ok) {
        toast.success('Registration successful! Redirecting to login...', {
          position: 'top-center',
          autoClose: 5000,
        });
        setIsLoading(false);
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      } else {
        const data = await response.json();
        setError(data.message || 'Registration failed');
        setIsLoading(false);
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <AddOperatorContainer>
      <AddOperatorBox
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <AddOperatorTitle>Adding new operator</AddOperatorTitle>
        <Form onSubmit={handleSubmit}>
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
            <InputLabel htmlFor="name">Full Name</InputLabel>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </InputGroup>
          <InputGroup as={motion.div} variants={fadeIn} initial="hidden" animate="visible">
            <InputLabel htmlFor="role">Role</InputLabel>
            <Select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select your role
              </option>
              {roles.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </Select>
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
                placeholder="Create a password"
                required
              />
              <EyeIcon onClick={togglePasswordVisibility}>
                {passwordVisible ? <FiEyeOff size={22} /> : <FiEye size={22} />}
              </EyeIcon>
            </InputWrapper>
          </InputGroup>
          <InputGroup as={motion.div} variants={fadeIn} initial="hidden" animate="visible">
            <InputLabel htmlFor="confirm-password">Confirm Password</InputLabel>
            <InputWrapper>
              <Input
                type={confirmPasswordVisible ? 'text' : 'password'}
                id="confirm-password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
              <EyeIcon onClick={toggleConfirmPasswordVisibility}>
                {confirmPasswordVisible ? <FiEyeOff size={22} /> : <FiEye size={22} />}
              </EyeIcon>
            </InputWrapper>
            { (formData.role==='doctor') && ( <InputGroup as={motion.div} variants={fadeIn} initial="hidden" animate="visible">
            <InputLabel htmlFor="qualification">Qualification:</InputLabel>
            <Input
              type="text"
              id="qualification"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="M.B.B.S and M.D in radiology"
              required
            />
        
         <InputLabel htmlFor="experience">Experience</InputLabel>
         <Input
           type="number"
           id="experience"
           name="experience"
           value={formData.experience}
           onChange={handleChange}
           placeholder="Ex:5"
           required
         />
       
       <InputGroup as={motion.div} variants={fadeIn} initial="hidden" animate="visible">
            <InputLabel htmlFor="department">Department:</InputLabel>
            <Select
              id="department"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select yourdepartment
              </option>
              {departments.map((role) => (
                <option key={role.value} value={role.value}>
                  {role.label}
                </option>
              ))}
            </Select>
          </InputGroup>
     </InputGroup> )}
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </InputGroup>
          <SubmitButton
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'AddOperatoring...' : 'AddOperator'}
          </SubmitButton>
        </Form>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          toastStyle={{
            background: '#fff',
            color: '#333',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          }}
        />
      </AddOperatorBox>
    </AddOperatorContainer>
  );
};

export default AddOperator;