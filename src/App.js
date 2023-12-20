import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './components/Navbar';
import Home from './components/Home';
import FormPrenotazioni from './components/FormPrenotazioni';
import TabellaPrenotazioni from './components/TabPrenotazioni';

function App() {
  return (
    <div>
      <header>
        <CustomNavbar testoAddizionale='Il nostro ristorante epico!' />
      </header>
      <main>
        <Home />
      </main>
      <FormPrenotazioni />
      <TabellaPrenotazioni />
    </div>
  );
}

export default App;
