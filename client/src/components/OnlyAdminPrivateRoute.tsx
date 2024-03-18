import { Outlet, Navigate } from 'react-router-dom';

import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

const OnlyAdminPrivateRoute = () => {
  const { currentUser } = useSelector((state: RootState) => state.user);

  return currentUser && currentUser?.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to='/sign-in' />
  );
};

export default OnlyAdminPrivateRoute;
