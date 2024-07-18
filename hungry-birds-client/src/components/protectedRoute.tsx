import { useAuth } from '@/AuthContext';
import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';


export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

