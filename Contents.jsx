import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserMd, FaHeadset, FaKeyboard } from 'react-icons/fa';
import styled from 'styled-components';

// Styled components for Contents
const Container = styled.div`
  padding: 1rem;
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
  margin-bottom: 1rem;
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

const Contents = () => {
  const [user, setUser] = useState('');

  useEffect(() => {
    let user = localStorage.getItem('user') || 'Admin';
    setUser(user.split('+')[0]);
  }, []);

  return (
    <Container>
      <Title>Welcome {user}</Title>
      <Description>This is the admin dashboard</Description>
      <CardContainer>
        <Card to="/admin/doctor" className="doctor-card">
          <CardIcon><FaUserMd /></CardIcon>
          <CardTitle>Doctor</CardTitle>
          <CardText>Manage doctor profiles</CardText>
        </Card>
        <Card to="/admin/front-desk" className="front-desk-card">
          <CardIcon><FaHeadset /></CardIcon>
          <CardTitle>Front Desk</CardTitle>
          <CardText>Manage front desk operations</CardText>
        </Card>
        <Card to="/admin/data-entry" className="data-entry-card">
          <CardIcon><FaKeyboard /></CardIcon>
          <CardTitle>Data Entry</CardTitle>
          <CardText>Manage data entry tasks</CardText>
        </Card>
      </CardContainer>
    </Container>
  );
};

export default Contents;