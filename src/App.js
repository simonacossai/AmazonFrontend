import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route } from "react-router-dom";
import NavBar from './components/Navbar/NavBar';
import Home from './components/Home/Home';
import AddProduct from './components/Form/AddProduct';
import Details from './components/Details/Details';
import Cart from './components/Cart/Cart';
import { Component } from 'react';

class App extends Component {
  state={
    data:[]
  }
  getProducts=async(name)=>{
    if(name){
      try {
        let response = await fetch(`http://localhost:3001/products/name/${name}`)
        if (response.ok) {
          let data = await response.json()
          console.log(data)
          this.setState({data})
          return data
        } else {
         console.log("error accourred")
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
  render(){
    return (
      <>
  <Router>
   <NavBar getProducts={this.getProducts}/>
   <Route path="/" exact render={(props) => <Home  {...props} product={this.state.data}/>} />
   <Route path="/addForm" exact render={(props) => <AddProduct  {...props}/>} />
   <Route path="/details/:id" exact render={(props) => <Details {...props}/>} />
   <Route path="/cart" exact render={(props) => <Cart {...props}/>} />
  </Router>
  </>
  );
}
}

export default App;
