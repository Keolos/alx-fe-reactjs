import './App.css';
import Header from './components/Header';
import UserProfile from './components/UserProfile';
import MainContent from './components/MainContent';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Header />
      <UserProfile name="Jane Doe" age="29" bio="Loves exploring cities and cultures." />
      <MainContent />
      <Footer />
    </div>
  );
}



export default App;
