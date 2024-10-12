import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Style/Style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Desktop from './Components/Pages/Desktop';
import { Layout } from './Components/Layout';
import { Dashboard } from './Components/Pages/Dashboard';
import { Calendar } from './Components/Pages/Calendar';
import { Layout2 } from './Components/Layout2';
import Appointment from './Components/Pages/Appointment';
import { StaffMember } from './Components/Pages/StaffMember';

function App() {
  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path='/' element={<Layout />} >
            <Route path='/desktop' element={<Desktop />} />
          </Route>
          <Route path='/' element={<Layout2 />}>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/calendar' element={<Calendar />} />
            <Route path='/appointment' element={<Appointment />} />
            <Route path='/staffmember' element={<StaffMember/>} />
          </Route>
        </Routes>
      </Router>



    </div >
  );
}

export default App;
