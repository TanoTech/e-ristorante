import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './components/Navbar';
import Home from './components/Home';

function App() {
  return (
    <div>
      <header>
        <CustomNavbar testoAddizionale='Il nostro ristorante epico!' />
      </header>
      <main>
        <Home />
      </main>
    </div>
  );
}

export default App;
