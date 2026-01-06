import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaSignOutAlt, FaUserMd, FaHeadset, FaKeyboard, FaArrowLeft } from 'react-icons/fa';
import styled from 'styled-components';

// Styled components for Header
const HeaderStyle= styled.header`
  background: linear-gradient(135deg, #007bff, #005bb5);
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

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    color: #e0e0e0;
  }
`;

const Button = styled.a`
  background: #ffffff;
  color: #007bff;
  padding: 0.6rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: #f0f0f0;
    transform: translateY(-2px);
    color: #007bff;
  }
`;

const Header = () => {
  const navigate = useNavigate();

  const logout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('user');
      window.alert('Successful logout');
      navigate('/');
    }
  };

  const menuItems = [
    { name: 'Back', icon: <FaArrowLeft />, path: '/' },
    { name: 'Appointments', icon: <FaUserMd />, path: '/patient' },
    
    { name: 'Logout', icon: <FaSignOutAlt />, action: logout },
  ];

  return (
    <HeaderStyle>
      <HeaderContainer>
        <Logo>Patient  Panel</Logo>
        <Nav>
          {menuItems.map((item, index) => (
            item.action ? (
              <Button
                key={index}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  item.action();
                }}
              >
                {item.icon}
                {item.name}
              </Button>
            ) : (
              <NavLink key={index} to={item.path}>
                {item.icon}
                {item.name}
              </NavLink>
            )
          ))}
        </Nav>
      </HeaderContainer>
    </HeaderStyle>
  );
};

export default Header;