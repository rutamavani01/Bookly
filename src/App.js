import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './Style/Style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Desktop from './Components/Pages/Desktop';
import { Layout } from './Components/Layout';
import { Dashboard } from './Components/Pages/Dashboard';
import { Calendar } from './Components/Pages/Calendar';
import { Layout2 } from './Components/Layout2';

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
            <Route path='/calender' element={<Calendar />} />
          </Route>
        </Routes>
      </Router>



    </div >
  );
}

export default App;
