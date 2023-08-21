/** @format */

import { Suspense, useContext, useEffect } from 'react';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { useMediaQuery } from 'react-responsive';

import AppBackground from './components/AppBackground/AppBackground';
import LoginPage from './pages/LoginPage/LoginPage';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import Currency from './components/Currency/Currency';
import RegisterPage from './pages/RegisterPage';
import VerifyPage from './pages/VerifyPage/VerifyPage';
import { UserContext } from './storeContext/UserContext';
import DashboardPage from './pages/DashboardPage/DashboardPage';
import Table from './components/TransactionTable/Table';
import Statistic from './components/Statistic/Statistic';
import Chart from './components/Chart/Chart';
import UpdateTransaction from './components/TransactionTable/UpdateTransaction';
// import { UserContextProvider } from "./storeContext/authContext/UserContextProvider";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAuth, getAuthRefresh } from './redux/auth/auth-selectors';
import { fetchCurrentUser } from './redux/auth/auth-operations';
import LoaderComponent from './components/LoaderComponent/LoaderComponent';
import LandingPage from './components/LandingPage/LandingPage';

ChartJS.register(ArcElement, Tooltip);

function App() {
  // const { authenticated } = useContext(UserContext);

  // console.log(authenticated);
  const isMobileOrTablet = useMediaQuery({ query: '(max-width: 767px)' });
  const isAuth = useSelector(getAuth);
  const isAuthRefresh = useSelector(getAuthRefresh);
  const dispatch = useDispatch();
  console.log(isAuthRefresh);

  useEffect(() => {
    dispatch(fetchCurrentUser());
    console.log(isAuth);
  }, [dispatch]);
  return (
    <>
      {!isAuthRefresh && (
        <>
          <div className="App">
            <ToastContainer autoClose={6000} />
            {/* */}
            <AppBackground>
              <Suspense fallback={<LoaderComponent />}>
                <Routes>

                  <Route path='/home' element={<LandingPage/> } />
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
                    <Route path="currency" element={<Currency />} />
                  </Route>
                  <Route
                    path="/update-transaction/:transactionId"
                    element={<UpdateTransaction />}
                  />
                  <Route path="/verify/:verificationToken" element={<VerifyPage />} />
                  <Route
                    path="*"
                    element={
                      <main style={{ padding: '1rem' }}>
                        <span>There's nothing here!</span>
                        <br />
                        <span>
                          <Link to={'/'}>Return</Link>
                        </span>
                      </main>
                    }
                  />
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
