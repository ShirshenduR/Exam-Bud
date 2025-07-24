import { Routes, Route, useLocation, matchRoutes } from 'react-router-dom';
import { Suspense, lazy } from "react";
import Loading from './utils/Global-Loading/Loading';
import useRouteProgress from './hooks/useRouteProgress.js';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import './styles/nprogress-custom.css';

const LandingPage = lazy(() => import('./pages/landingPage/LandingPage'));
const Home = lazy(() => import('./pages/Home'));
const Branch = lazy(() => import('./pages/Branch'));
const Semester = lazy(() => import('./pages/Semester'));
const Subject = lazy(() => import('./pages/Subject'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const NotFound = lazy(() => import('./pages/404/NotFound'));
const LoginPage = lazy(() => import('./pages/Login/Login'));
const SignUp = lazy(() => import('./pages/SignUp/SignUp'));

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';

const routes = [
    { path: '/' },
    { path: '/home' },
    { path: '/branch/:branchId' },
    { path: '/branch/:branchId/semester/:semesterId' },
    { path: '/branch/:branchId/semester/:semesterId/subject/:subjectId' },
    { path: '/admin' },
    { path: '/login' },
    { path: '/signup' }
];

export default function App() {
    const location = useLocation();
    const matched = matchRoutes(routes, location.pathname);
    const is404 = !matched;
  
    useRouteProgress();

    return (
        <AuthProvider>
            {!is404 && <Header />}
            <main className="main-content">
                <Suspense fallback={<Loading />}>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/signup" element={<SignUp />} />
                        
                        {/* Protected Routes */}
                        <Route path="/home" element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        } />
                        <Route path="/Home" element={
                            <ProtectedRoute>
                                <Home />
                            </ProtectedRoute>
                        } />
                        <Route path="/branch/:branchId" element={
                            <ProtectedRoute>
                                <Branch />
                            </ProtectedRoute>
                        } />
                        <Route path="/branch/:branchId/semester/:semesterId" element={
                            <ProtectedRoute>
                                <Semester />
                            </ProtectedRoute>
                        } />
                        <Route path="/branch/:branchId/semester/:semesterId/subject/:subjectId" element={
                            <ProtectedRoute>
                                <Subject />
                            </ProtectedRoute>
                        } />
                        <Route path="/admin" element={
                            <ProtectedRoute>
                                <AdminDashboard />
                            </ProtectedRoute>
                        } />
                        
                        <Route path="*" element={<NotFound />}/>
                    </Routes>
                </Suspense>
            </main>
            {!is404 && <Footer />}
        </AuthProvider>
    );
}
