import './App.css';
import RouterComp from './RouterComp'
import axios from 'axios'
import {AuthContextComp} from './context/authContext'
axios.defaults.withCredentials=true;
document.body.style.backgroundColor = "rgb(0,0,0,0.062)";
function App() {
  return (
    
    <AuthContextComp>
      <RouterComp />
    </AuthContextComp>
  );
}

export default App;
