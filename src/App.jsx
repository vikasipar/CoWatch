import './App.css';
import MyRoutes from './MyRoutes';
import Navbar from './components/Navbar';
import VideoCall from './components/VideoCall';
// import HomePage from './components/HomePage';

function App() {
  return (
    <div className='md:mx-3 bg-sky-400 overflow-hidden'>
      <Navbar/>
      <VideoCall/>
      <MyRoutes />
    </div>
  )
}

export default App;
