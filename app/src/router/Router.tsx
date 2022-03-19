import {BrowserRouter,Routes, Route} from 'react-router-dom';

import {Home} from '../components/pages/Home'
import {Calendar} from '../components/pages/Calendar'
import {Reports} from '../components/pages/Reports'
import {Settings} from '../components/pages/Settings'

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/calendar' element={<Calendar />} />
        <Route path='/reports' element={<Reports />} />
        <Route path='/settings' element={<Settings />} />
        <Route path='*' element={<p>404ページです</p>} />
      </Routes>
      </BrowserRouter>
  )
}