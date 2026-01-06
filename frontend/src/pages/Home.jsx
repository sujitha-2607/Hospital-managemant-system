import { React, useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import img3 from '../images/imgg3.jpg';
import { useNavigate } from 'react-router-dom';
import imgappoint from '../images/imageappoint.jpg';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { GetDoctorsRoute } from '../APIRoutes/APIRoutes';

// Sample data for dynamic sections
const services = [
  { icon: 'fas fa-stethoscope', title: 'General Medicine', description: 'Comprehensive care for all ages with a focus on prevention and treatment.' },
  { icon: 'fas fa-heartbeat', title: 'Cardiology', description: 'Advanced heart care services with state-of-the-art diagnostics.' },
  { icon: 'fas fa-x-ray', title: 'Radiology', description: 'High-quality imaging services for accurate diagnosis.' },
  { icon: 'fas fa-ambulance', title: 'Emergency Care', description: '24/7 emergency services with rapid response teams.' },
];

const Container = styled.div`
  width: 100%;
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;
`;

const Header = styled.header`
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

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 500;
  transition: color 0.3s;
  cursor: pointer;
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
  cursor: pointer;
  &:hover {
    background: #f0f0f0;
    transform: translateY(-2px);
  }
`;

const Section = styled.section`
  padding: 5rem 0;
  height: auto;
  background: ${(props) => props.bg || 'white'};
`;

const Contactsection = styled.section`
  padding: 5rem 0;
  background: ${(props) => props.bg || 'white'};
`;

const SectionContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const HeroRow = styled.div`
  display: flex;
  align-items: center;
  gap: 3rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const HeroText = styled(motion.div)`
  flex: 1;
  min-width: 300px;
`;

const HeroTitle = styled.h1`
  color: #005bb5;
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroDescription = styled.p`
  font-size: 1.3rem;
  color: #444;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

const HeroImage = styled(motion.img)`
  max-width: 100%;
  border-radius: 15px;
  flex: 1;
  min-width: 300px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
`;

const SectionTitle = styled(motion.h2)`
  text-align: center;
  color: #005bb5;
  font-size: 2.5rem;
  font-weight: 600;
  margin-bottom: 3rem;
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
`;

const ServiceCard = styled(motion.div)`
  background: white;
  padding: 2.5rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }
`;

const ServiceIcon = styled.i`
  font-size: 3.5rem;
  color: #007bff;
  margin-bottom: 1.5rem;
`;

const ServiceTitle = styled.h5`
  font-size: 1.4rem;
  color: #333;
  font-weight: 600;
  margin-bottom: 0.75rem;
`;

const ServiceDescription = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
`;

const DoctorsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
`;

const DoctorCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-8px);
  }
`;

const DoctorImage = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: 0 auto 1.5rem;
  object-fit: cover;
`;

const DoctorName = styled.h5`
  font-size: 1.4rem;
  color: #333;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const DoctorSpecialty = styled.p`
  color: #007bff;
  font-size: 1.1rem;
  font-weight: 500;
  margin-bottom: 0.75rem;
`;

const DoctorDescription = styled.p`
  font-size: 1rem;
  color: #666;
  line-height: 1.5;
`;

const CenteredButton = styled(Button)`
  display: block;
  padding: auto;
  margin: 0.75rem auto;
  width: 8.5rem;
  text-align: center;
`;

const AppointmentRow = styled(HeroRow)`
  gap: 3rem;
`;

const ContactGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2.5rem;
  text-align: center;
`;

const ContactItem = styled.div`
  color: white;
`;

const ContactIcon = styled.i`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #e0e0e0;
`;

const ContactText = styled.p`
  font-size: 1.1rem;
  margin: 0;
  font-weight: 400;
`;

const Footer = styled.footer`
  background: linear-gradient(135deg, #343a40, #2c3238);
  color: white;
  padding: 3rem 0;
`;

const FooterContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
`;

const FooterText = styled.p`
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 1.5rem;
  transition: color 0.3s;
  &:hover {
    color:#007bff;
  }
`;

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const Home = () => {
  const [user, setUser] = useState('');
  const [did, setDid] = useState(0);
  const [inrole, setInrole] = useState('');
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    let userData = localStorage.getItem('user');
    console.log(userData);
    if(!userData){
      console.log('Redirecting from here');
      navigate('/login');
    }
    else{
    const [username, id, role] = userData.split('+');
    console.log(username);
    console.log(id);
    console.log(role);
    if(!username){
      console.log('Rediecting from 2');
      navigate('/login');
    }
    setUser(username);
    setDid(id || 0);
    setInrole(role || '');
  }
  }, []);

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
          alert(data.message || 'getting doctors failed');
        }
      } catch (err) {
        console.log(err);
        alert('Something went wrong. Please try again.');
      }
    };
    get_doctors();
  }, []);



  const handleLogout = ()=>{
    localStorage.removeItem('user')
    navigate('/login');
  }

  // Role-based navigation handler
  const handleNavClick = (destination) => {
    switch (inrole) {
      case 'doctor':
        switch (destination) {
          case 'home':
            navigate('/doctorh');
            break;
          case 'login':
            navigate('/logout');
            break;
          case 'doctors':
            navigate('/doctors');
            break;
          case 'contact':
            // Anchor link, no navigation needed
            break;
          case 'appointment':
            navigate('/appointments');
            break;
          default:
            navigate('/doctor-dashboard');
        }
        break;
      case 'patient':
        switch (destination) {
          case 'home':
            navigate('/patient');
            break;
          case 'login':
            navigate('/logout');
            break;
          case 'doctors':
            navigate('/doctors');
            break;
          case 'contact':
            // Anchor link, no navigation needed
            break;
          case 'appointment':
            navigate('/appointment');
            break;
        }
        break;

        case 'fdo':
        switch (destination) {
          case 'home':
            navigate('/fdo');
            break;
          case 'login':
            navigate('/logout');
            break;
          case 'doctors':
            navigate('/doctors');
            break;
          case 'contact':
            // Anchor link, no navigation needed
            break;
          case 'appointment':
            navigate('/appointment');
            break;
        }
        break;



        case 'deo':
        switch (destination) {
          case 'home':
            navigate('/deo');
            break;
          case 'login':
            navigate('/logout');
            break;
          case 'doctors':
            navigate('/doctors');
            break;
          case 'contact':
            // Anchor link, no navigation needed
            break;
          case 'appointment':
            navigate('/appointment');
            break;
        }
        break;



      default: // Guest or other roles
        switch (destination) {
          case 'home':
            navigate('/');
            break;
          case 'login':
            navigate('/login');
            break;
          case 'doctors':
            navigate('/doctors');
            break;
          case 'contact':
            // Anchor link, no navigation needed
            break;
          case 'appointment':
            navigate('/login');
            break;
          default:
            navigate('/');
        }
    }
  };

  return (
    <Container>
      {/* HEADER */}
      <Header>
        <HeaderContainer>
          <Logo>Caretaker</Logo>
          <Nav>
            <NavLink onClick={() => handleNavClick('home')}>
              Home
            </NavLink>
            <NavLink onClick={() => handleNavClick('doctors')}>Doctors</NavLink>
            <NavLink onClick={() => handleNavClick('contact')} href="#contact">Contact</NavLink>
            <NavLink  href="/login">Login</NavLink>
            <Button onClick={() => handleNavClick('appointment')}>
              {inrole === 'doctor' ? '' : 'Book Appointment'}
            </Button>
            <Button onClick={()=>handleLogout()}>Logout</Button>
          </Nav>
        </HeaderContainer>
      </Header>

      {/* HERO SECTION */}
      <Section id="hero" bg="linear-gradient(135deg, #f8f9fa, #e9ecef)">
        <SectionContainer>
          <HeroRow>
            <HeroText initial="hidden" animate="visible" variants={fadeIn}>
              <HeroTitle>Your Health, Our Priority</HeroTitle>
              <HeroDescription>
                Providing compassionate and advanced medical care to keep you and your loved ones healthy.
              </HeroDescription>
              <Button href="/about">Learn More</Button>
            </HeroText>
            <HeroImage
              src={img3}
              alt="Hospital"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </HeroRow>
        </SectionContainer>
      </Section>

      {/* SERVICES SECTION */}
      <Section id="services">
        <SectionContainer>
          <SectionTitle initial="hidden" animate="visible" variants={fadeIn}>
            Our Services
          </SectionTitle>
          <ServicesGrid as={motion.div} initial="hidden" animate="visible" variants={stagger}>
            {services.map((service, index) => (
              <ServiceCard key={index} variants={fadeIn}>
                <ServiceIcon className={service.icon} />
                <ServiceTitle>{service.title}</ServiceTitle>
                <ServiceDescription>{service.description}</ServiceDescription>
              </ServiceCard>
            ))}
          </ServicesGrid>
        </SectionContainer>
      </Section>

      {/* DOCTORS SECTION */}
      <Section id="doctors" bg="linear-gradient(135deg, #f8f9fa, #e9ecef)">
        <SectionContainer>
          <SectionTitle initial="hidden" animate="visible" variants={fadeIn}>
            Meet Our Doctors
          </SectionTitle>
          <DoctorsGrid as={motion.div} initial="hidden" animate="visible" variants={stagger}>
            {doctors.slice(0, 3).map((doctor, index) => (
              <DoctorCard key={index} variants={fadeIn}>
                <DoctorImage
                  src="https://as1.ftcdn.net/v2/jpg/06/48/69/42/1000_F_648694278_haC94bdL26EedqLMIbMpLACqzxwuvq4f.webp"
                  alt="Doctor"
                />
                <DoctorName>{doctor.name}</DoctorName>
                <DoctorSpecialty>{doctor.department || 'Dentist'}</DoctorSpecialty>
                <DoctorDescription>{doctor.qualification || 'MBBS MD'}</DoctorDescription>
              </DoctorCard>
            ))}
          </DoctorsGrid>
          <CenteredButton href="/doctors">View All Doctors</CenteredButton>
        </SectionContainer>
      </Section>

      {/* APPOINTMENT SECTION */}
      <Section id="appointment">
        <SectionContainer>
          <AppointmentRow>
            <HeroText initial="hidden" animate="visible" variants={fadeIn}>
              <HeroTitle>Book an Appointment</HeroTitle>
              <HeroDescription>
                Schedule a visit with our specialists at your convenience. We’re here to provide the care you need, when you need it.
              </HeroDescription>
              <Button href="/appointment">Make Appointment</Button>
            </HeroText>
            <HeroImage
              src={imgappoint}
              alt="Appointment"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </AppointmentRow>
        </SectionContainer>
      </Section>

      {/* CONTACT SECTION */}
      <Contactsection id="contact" bg="linear-gradient(135deg, #007bff, #005bb5)">
        <SectionContainer>
          <SectionTitle initial="hidden" animate="visible" variants={fadeIn} style={{ color: 'white' }}>
            Get in Touch
          </SectionTitle>
          <ContactGrid initial="hidden" animate="visible" variants={stagger}>
            <ContactItem as={motion.div} variants={fadeIn}>
              <ContactIcon className="fas fa-map-marker-alt" />
              <ContactText>123 Health St, Wellness City, 12345</ContactText>
            </ContactItem>
            <ContactItem as={motion.div} variants={fadeIn}>
              <ContactIcon className="fas fa-phone" />
              <ContactText>(800) 123-4567</ContactText>
            </ContactItem>
            <ContactItem as={motion.div} variants={fadeIn}>
              <ContactIcon className="fas fa-envelope" />
              <ContactText>contact@careplus.com</ContactText>
            </ContactItem>
          </ContactGrid>
        </SectionContainer>
      </Contactsection>

      {/* FOOTER */}
      <Footer>
        <FooterContainer>
          <FooterText>© 2025 CarePlus Hospital. All Rights Reserved.</FooterText>
          <SocialLinks>
            <SocialLink href="#">
              <i className="fab fa-facebook-f"></i>
            </SocialLink>
            <SocialLink href="#">
              <i className="fab fa-twitter"></i>
            </SocialLink>
            <SocialLink href="#">
              <i className="fab fa-linkedin-in"></i>
            </SocialLink>
          </SocialLinks>
        </FooterContainer>
      </Footer>
    </Container>
  );
};

export default Home;
