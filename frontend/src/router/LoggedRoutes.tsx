import { Navigate, Route, Routes } from 'react-router-dom';
import NotFound from '@/app/_NotFound/not-found';
import About from '@/app/About';
import Dashboard from '@/app/DashBoard';
import Footer from '@/components/layout/Footer/Footer';
import Header from '@/components/layout/Header/Header';
import Main from '@/components/layout/Main/Main';
import TSBox from '@/components/primitives/TSBox';

function LoggedRoutes() {
  return (
    <TSBox className='min-h-full w-full flex overflow-hidden'>
      {/* 
        //? aqui vai o menu lateral 
      */}

      <TSBox className='min-h-full w-full flex flex-1 flex-col overflow-hidden'>
        <Header />
        <Main>
          <Routes>
            <Route path='/' element={<Dashboard />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Navigate to='/' replace />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Main>
        <Footer />
      </TSBox>
    </TSBox>
  );
}

export default LoggedRoutes;
