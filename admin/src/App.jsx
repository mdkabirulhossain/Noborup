import React from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

const App = () => {
  return (
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'>
      <div >
        <Navbar />
        <hr />
        <div className='flex w-full'>
          <Sidebar />
        </div>
      </div>
    </div>
  );
};

export default App;