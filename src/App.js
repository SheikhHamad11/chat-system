import './App.scss';
import "bootstrap/dist/js/bootstrap.bundle";
import Dashboard from './pages/admin/Dashboard';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ManageClient from './pages/admin/ManageClient';
import ClientForm from './pages/admin/ClientForm';
import ManageAgent from './pages/admin/ManageAgent';
import AgentForm from './pages/admin/AgentForm';
import GroupsManagement from './pages/admin/GroupsManagement';
import GroupComponent from './pages/admin/GroupComponent';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/'>
        {/* <Route path='' element={<ProtectedRoute><Home /></ProtectedRoute>} /> */}
        {/* <Route path='register' element={<Register />} /> */}
        <Route index element={<Dashboard/>} />
        <Route path='/manageClient' element={<ManageClient/>} />
        <Route path='/manageAgent' element={<ManageAgent/>} />
        <Route path='/groupsmanagement' element={<GroupsManagement/>} />
        <Route path='/groupcomponent' element={<GroupComponent/>} />
        <Route path='/agentForm' element={<AgentForm/>} />
        <Route path='/agentForm/:Id' element={<AgentForm/>} />
        <Route path='/clientForm/:Id' element={<ClientForm/>} />
        <Route path='/clientForm' element={<ClientForm/>} />
      </Route>
    </Routes>
  </BrowserRouter>
  </>
   
  );
}

export default App;
