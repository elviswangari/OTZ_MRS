import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';

const RoleGate = ({ children, allowedRoles }) => {
  const auth = useAuthUser();
  
  if (!auth || !auth.role) {
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(auth.role)) {
    // Redirect to their own dashboard if they have a role but not the allowed one
    return <Navigate to={auth.role === 'hcw' ? '/hcw' : '/roc'} replace />;
  }

  return children;
};

export default RoleGate;
