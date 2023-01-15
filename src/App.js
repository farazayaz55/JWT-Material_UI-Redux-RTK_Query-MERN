import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import React from 'react'
import ButtonAppBar from './Components/Appbar';
import SignIn from './Pages/Signin';
import SignUp from './Pages/SignUp';
import TODO from './Pages/TODO';

const App = () => {
  return (
    <div className='app'>
    <Router>
      <ButtonAppBar />
      <Routes>
            <Route path="/Login" exact element={<SignIn/>} />
            <Route path="/Register" exact element={<SignUp/>} />
            <Route path="/" exact element={<TODO/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App;
