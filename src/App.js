
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Screens/Login/Login';
import AdminDashboard from './Screens/AdminDashboard/AdminDashboard'

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/admin_dashboard' element={<AdminDashboard />} />
        {/* <Route path='/admin_dashboard' element={<AdminDashboard />}/> */}

      </Routes>
    </BrowserRouter>
    
    </>
  );
}

export default App;
