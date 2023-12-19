import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './components/Navbar'

function App() {
  return (
    <div>
      <header>
        <CustomNavbar testoAddizionale='Il nostro ristorante epico!' />
      </header>
    </div>
  );
}

export default App;
