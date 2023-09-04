/** @format */

import { Suspense, useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { useMediaQuery } from 'react-responsive';

import AppBackground from './components/AppBackground/AppBackground';
import LoginPage from './pages/LoginPage/LoginPage';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import Currency from './components/Currency/Currency';
import RegisterPage from './pages/RegisterPage';
import VerifyPage from './pages/VerifyPage/VerifyPage';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import Table from './components/TransactionTable/Table';
import Chart from './components/Chart/Chart';
// import { UserContextProvider } from "./storeContext/authContext/UserContextProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, getAuthRefresh } from './redux/auth/auth-selectors';
import { fetchCurrentUser } from './redux/auth/auth-operations';
import LoaderComponent from './components/LoaderComponent/LoaderComponent';
import NothingPage from './pages/NothingPage/NothingPage';
import LandingPage from './components/LandingPage/LandingPage';
import PasswordRecovery from './components/LoginForm/PasswordRecovery';
import PasswordReset from './components/LoginForm/PasswordReset';

ChartJS.register(ArcElement, Tooltip);

function App() {
  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 767px)' });
  const isAuth = useSelector(getAuth);
  const isAuthRefresh = useSelector(getAuthRefresh);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);
  return (
    <>
      {!isAuthRefresh && (
        <>
          <div className="App">
            <ToastContainer autoClose={6000} />

            <AppBackground>
              <Suspense fallback={<LoaderComponent />}>
                <Routes>
                  <Route path="/home" element={isAuth ? <Navigate to="/" /> : <LandingPage />} />
                  <Route path="/login" element={isAuth ? <Navigate to="/" /> : <LoginPage />} />
                  <Route
                    path="/register"
                    element={isAuth ? <Navigate to="/" /> : <RegisterPage />}
                  />
                  <Route
                    path="/"
                    element={isAuth ? <DashboardPage /> : <Navigate replace to="/home" />}
                  >
                    <Route index element={<Navigate replace to="/table" />} />
                    <Route path="table" element={<Table />} />
                    <Route path="statistic" element={<Chart />} />
                    <Route
                      path="currency"
                      element={isMobileOrTablet ? <Currency /> : <Navigate replace to="/table" />}
                    />
                  </Route>

                  <Route path="/verify/:verificationToken" element={<VerifyPage />} />

                  {/* http://localhost:3000/verify/1693505519242 */}
                  {/* https://moneyminderapp.onrender.com/verify/1693505377514 */}
                  {/* https://oksanabaklan.github.io/final-fe/verify/1693820172631 */}
                  
                  <Route path="/password-reset/:email/:token" element={<PasswordRecovery />} />
                  <Route path="/password-reset" element={<PasswordReset />} />
                  <Route path="*" element={<NothingPage />} />
                </Routes>
              </Suspense>
            </AppBackground>
          </div>
        </>
      )}
    </>
  );
}

export default App;
