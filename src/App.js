import { useState, useEffect } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import { useDispatch, useSelector } from 'react-redux';
import { addUserData } from './redux/userDataSlice';
import { WhatsApp } from '@mui/icons-material';



function App() {
  const dispatch = useDispatch();
  
  

  const user = useSelector((state) => state.userData);

  return (
    <div className="app">
      <Router>
        {!user ? (
          <Login/>
        ) : (
          <div className="app_body">
            <Routes>
              {/* Define your routes inside <Routes> */}
              <Route
                path="/rooms/:roomId"
                element={
                  <>
                    <Sidebar />
                    <Chat />
                  </>
                }
              />
              <Route
                path="/"
                element={
                  <>
                    <Sidebar />
                    {/* <Chat /> */}
                    <div className='not-active-chat'>
                      
                      <div className='not-active-chat-div'>
                      <center> <div><img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt=""/></div> </center>
                      <center><h3>WhatsApp For windows</h3></center>
                      <span>Send and receive messages without keeping your phone online.</span><br/><p>Use WhatsApp on 4 linked Devices and 1 phone at the same time.</p>
                      </div>
                    </div>
                  </>
                }
              />
            </Routes>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
