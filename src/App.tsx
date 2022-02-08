import React from 'react';
import { Route, Routes } from 'react-router-dom'
import { Main } from './pages'
import { Paths } from './paths'

function App() {
  return (
    <>
      <Routes>
        <Route path={Paths.index} element={<Main />} />
      </Routes>
    </>
  );
}

export default App;
