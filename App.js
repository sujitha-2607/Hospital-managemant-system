import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login2';
import ForgotPassword from './pages/ForgotPassword'
import AdminHome from './pages/AdminHome'
import AdminDoctor from './pages/AdminDoctor';
import Doctors from './pages/Doctors';
import AdminDeo from './pages/AdminDeo';
import AdminFdo from './pages/AdminFdo';
import AddOperator from './pages/AddOperator';
import PatientHome from './pages/PatientHome';
import FdoHome from './pages/FdoHome';
import DeoHome from './pages/DeoHome';
import MakeAppointment from './pages/MakeAppointment';
import DeoTests from './pages/DeoTests';
import DeoTreatments from './pages/DeoTreatments';
import FdoAllocate from './pages/FdoAllocate';
import FdoDischarge from './pages/FdoDischarge';
import DoctorHome from './pages/DoctorHome';
import DoctorPrevAppointments from './pages/DoctorPrevAppointments';
import DoctorUpcAppointments from './pages/DoctorUpcomAppointments';
import Register from './pages/Register';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path ='/forgot_password' element={<ForgotPassword/>} />
        <Route path ='/register' element ={< Register/>}/>
        <Route path ='/admin' element={<AdminHome/>}/>
        <Route path ='/admin/doctor' element={<AdminDoctor/>}/>
        <Route path ='/admin/fdo' element={<AdminFdo/>}/>
        <Route path ='/admin/deo' element={<AdminDeo/>}/>
        <Route path ='/admin/add' element={<AddOperator/>}/>
        <Route path ='/doctors' element={<Doctors/>}/>
        <Route path ='/doctorh' element={<DoctorHome/>}/>
        <Route path ='/doctorh/prevappointment' element={<DoctorPrevAppointments/>}/>
        <Route path ='/doctorh/upcomappointment' element={<DoctorUpcAppointments/>}/>
        <Route path ='/patient' element={<PatientHome/>}/>
        <Route path ='/deo' element={<DeoHome/>}/>
        <Route path ='/deo/test' element={<DeoTests/>}/>
        <Route path ='/deo/treatment' element={<DeoTreatments/>}/>
        <Route path ='/fdo' element={<FdoHome/>}/>
        <Route path ='/appointment' element={<MakeAppointment/>}/>
        <Route path ='/fdo/allocate' element={<FdoAllocate/>}/>
        <Route path ='/fdo/discharge' element={<FdoDischarge/>}/>

        

      </Routes>
    </BrowserRouter>
  );
}

export default App;