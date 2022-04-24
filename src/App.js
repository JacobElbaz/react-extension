import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import List from './List';
import './App.css';
import icon from './icon.png';

function App() {
  return (
    <div className="App">
      
      <h1 className="text-center mt-3">Fast<img src={icon} alt="fastopen" className='rounded-circle' height={40}/>pen</h1>
      <List/>
    </div>
  );
}

export default App;