import './App.css';
import Header from './components/Header';
import UserProfile from './components/UserProfile';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import Counter from './components/Counter';



function App() {
  return (
    <div>
      <Header />
      <UserProfile name="Jane Doe" age="29" bio="Loves exploring cities and cultures." />
      <Counter />
      <MainContent />
      <Footer />
    </div>
  );
}



export default App;
