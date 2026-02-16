import { Navigate, Route, Routes } from 'react-router-dom';
import NotFound from '@/app/_NotFound/not-found';
import About from '@/app/About';
import { Dashboard } from '@/app/Dashboard';
import Traducoes from '@/app/Traducoes';
import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';
import Main from '@/components/layout/Main/Main';
import Sidebar from '@/components/layout/Sidebar/Sidebar';
import { BsBox } from '@/components/singles/BaseComponents';

function LoggedRoutes() {
  return (
    <BsBox className='h-screen w-full flex overflow-hidden'>
      <Sidebar />

      <BsBox className='h-screen min-h-0 w-full flex flex-1 flex-col overflow-hidden'>
        <Header />
        <Main>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/about' element={<About />} />
            <Route path='/traducoes/:system/:environment/:language/:namespace' element={<Traducoes />} />
            <Route path='/login' element={<Navigate to='/' replace />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Main>
        <Footer />
      </BsBox>
    </BsBox>
  );
}

export default LoggedRoutes;
