import './App.css';
import { useReducer } from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './Login/Login'
import Hall from './Hall/Hall'
import Start from './Start/Start'

import { userContext, userInitial, userReducer } from './Core/Index';
import { wallContext, wallInitial, wallReducer } from './Core/Index';

function App() {
  const [user, setUser] = useReducer(userReducer, userInitial);
  const [wall, setWall] = useReducer(wallReducer, wallInitial);

  return (
    <div className="App">
      <userContext.Provider value={{ get: user, set: setUser }}>
        <wallContext.Provider value={{ get: wall, set: setWall }}>
          <Router>
            <Route path = "/" exact component = {Login} />
            <Route path = "/Hall" exact component = {Hall}/>
            <Route path = "/Start" component = {Start}/>
          </Router>
        </wallContext.Provider>
      </userContext.Provider>
    </div>
  );
}

export default App;
