import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './components/Navbar/NavBar';
import Home from './components/Home/Home';
import AddProduct from './components/Form/AddProduct';
import Details from './components/Details/Details';
function App() {
  return (
    <>
    <Router>
   <NavBar/>
   <Route
            path="/"
            exact
            render={(
              props 
            ) => <Home  {...props}/>} 
          />
      <Route
            path="/addForm"
            exact
            render={(
              props 
            ) => <AddProduct  {...props}/>} 
          />
          <Route
            path="/details/:id"
            exact
            render={(
              props 
            ) => <Details {...props}/>} 
          />
   </Router>
   </>
  );
}

export default App;
