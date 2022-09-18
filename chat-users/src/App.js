import {Route, Routes, Navigate, Outlet} from 'react-router-dom'
import Login from './view/Login/Login'
import Main from './view/Main/Main'
import './App.less';

function App() {
  return (
    <div>
      <Routes>
          <Route path='/' element={<Navigate to='/login' />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/main' element={<Main />}/>
      </Routes>

      <Outlet/>
    </div>
  );
}

export default App;
