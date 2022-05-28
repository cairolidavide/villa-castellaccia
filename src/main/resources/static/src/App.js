import React, {useState} from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import Events from './components/Events';
import Location from './components/Location';
import Login from './components/Login';
import Signin from './components/Signin';
import AdminDock from './components/AdminDock/AdminDock';
import AddPlannerDock from './components/AdminDock/AddPlannerDock';
import VisitDock from './components/AdminDock/VisitsDock';
import EventsDock from './components/AdminDock/EventsDock';
import Settings from './components/Settings';
import UsersDock from './components/AdminDock/UsersDock';
import ServiceDock from './components/AdminDock/ServiceDock';
import PlannerDock from './components/PlannerDock/PlannerDock';
import VisitPlannerDock from './components/PlannerDock/VisitPlannerDock';
import CustomerDock from './components/CustomerDock/CustomerDock';
import CustomerVisitDock from './components/CustomerDock/CustomerVisitDock';
import CustomerEventDock from './components/CustomerDock/CustomerEventDock';
import CustomerQuotesDock from './components/CustomerDock/CustomerQuotesDock';
import EventPlannerDock from './components/PlannerDock/EventPlannerDock';
import UserPlannerDock from './components/PlannerDock/UserPlannerDock';

function App() {
  const [loggedUser, setLoggedUser] = useState("");
  const [accessToken, setAccessToken] = useState("");
  const [LINK, setLINK] = useState("http://localhost:8080");

  const setRecivedLoggedUser = (user, token) => {
    setLoggedUser(user);
    if (token == null) {
      setAccessToken(accessToken);
    } else {
      setAccessToken(token);
    }
  }

  const setNewAccountLogged = (user, token) => {
    setLoggedUser(user);
    setAccessToken(token);
  }

  const exitToAccount = (user, token) => {
    setLoggedUser(user);
    setAccessToken(token);
  }


  return (
      <div className="App">
          <BrowserRouter>
            <Routes>
                <Route path="/" element={<Header loggedUser={loggedUser}/>}>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="events" element={<Events />}></Route>
                    <Route path="location" element={<Location />}></Route>
                    <Route path="login" element={<Login LINK={LINK} onSendLoggedUser={setRecivedLoggedUser} newAccountUserLogged={loggedUser}  newAccountUserLoggedToken={accessToken}/>}></Route>
                    <Route path="/signin" element={<Signin LINK={LINK} onSendNewSigninUser={setNewAccountLogged}/>}></Route>
                    <Route path="/admin-dock" element={<AdminDock LINK={LINK} onExitToAdmin={exitToAccount}
                    loggedUser={loggedUser} accessToken={accessToken}/>}>
                        <Route index element={<VisitDock LINK={LINK} loggedUser={loggedUser} accessToken={accessToken}/>}></Route>
                        <Route path="events" element={<EventsDock LINK={LINK} loggedUser={loggedUser} accessToken={accessToken}/>}></Route>
                        <Route path="planners" element={<AddPlannerDock LINK={LINK} loggedUser={loggedUser} accessToken={accessToken}/>}></Route>
                        <Route path="users" element={<UsersDock LINK={LINK} loggedUser={loggedUser} accessToken={accessToken}/>}></Route>
                        <Route path="services" element={<ServiceDock LINK={LINK} loggedUser={loggedUser} accessToken={accessToken}/>}></Route>
                    </Route>
                    <Route path='/planner-dock' element={<PlannerDock LINK={LINK} onExitToPlanner={exitToAccount} loggedUser={loggedUser} accessToken={accessToken}/>}>
                        <Route index element={<VisitPlannerDock LINK={LINK} loggedUser={loggedUser} accessToken={accessToken}/>}></Route>
                        <Route path="events" element={<EventPlannerDock LINK={LINK} loggedUser={loggedUser} accessToken={accessToken}/>}></Route>
                        <Route path="users" element={<UserPlannerDock LINK={LINK} loggedUser={loggedUser} accessToken={accessToken}/>}></Route>
                    </Route>
                    <Route path="/customer-dock" element={<CustomerDock LINK={LINK} onExitToCustomer={exitToAccount} loggedUser={loggedUser} accessToken={accessToken}/>}>
                        <Route index element={<CustomerVisitDock LINK={LINK} loggedUser={loggedUser} accessToken={accessToken}/>}></Route>
                        <Route path="events" element={<CustomerEventDock LINK={LINK} loggedUser={loggedUser} accessToken={accessToken}/>}></Route>
                        <Route path="quotes" element={<CustomerQuotesDock LINK={LINK} loggedUser={loggedUser} accessToken={accessToken}/>}></Route>
                    </Route>
                </Route>
                <Route path='/settings' element={<Settings LINK={LINK} loggedUser={loggedUser} accessToken={accessToken} onSendModifiedUser={setRecivedLoggedUser}/>}></Route>
            </Routes>
          </BrowserRouter>
      </div>
  );
}

export default App;
