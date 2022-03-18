import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { Admin, Main } from './pages'
import { Paths } from './paths'

function App() {
  return (
    <>
      <Routes>
        <Route path={Paths.index} element={<Main />} />
        <Route path={Paths.admin} element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
