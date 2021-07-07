import React, { useState } from 'react';
import Home from './components/Home'
import Dashboard from './components/Dashboard'
import Login from './components/Login'
import {
  ChakraProvider,
  extendTheme 
} from '@chakra-ui/react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


const appTheme = extendTheme({
  fonts: {
    heading: "Playfair display",
    body: "Lato",
  },
})


function App() {
  // const [loggedIn, setLoggedIn] = useState(false);

  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <Router>
      <ChakraProvider theme={appTheme}>


        <Switch>
          <Route exact path="/">
            <Home />
          </Route>

          <Route exact path="/dashboard" >
            <Dashboard user={user} setUser={setUser} />

          </Route>
          <Route exact path="/login">
            <Login setUser={setUser} />
          </Route>

        </Switch>
      </ChakraProvider>
    </Router>
  );
}

export default App;
