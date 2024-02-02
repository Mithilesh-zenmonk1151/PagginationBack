
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './component/Navbar';
import UserTable from './component/UserTable';
import Write from './component/Write';
import EditUser from './component/EditUser';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/add-user' element={<Write/>}/>
        <Route path='/view-user' element={<UserTable/>}/>
         <Route path="/edit" element={<EditUser/>} /> 
      </Routes>
   
    </div>
  );
}

export default App;
