import { Navigate, Route, Routes } from 'react-router-dom';
import Login from '@/app/Login';

function NotLoggedRoutes() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path='*' element={<Navigate to='/login' replace />} />
    </Routes>
  );
}

export default NotLoggedRoutes;
