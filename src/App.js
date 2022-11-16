import Home from './Home'
import Favorites from "./Components/Favorites/favorites";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar'
import Banner from './Components/Banner/Banner'
import Movies from './Components/Movies/Movies'

function App() {
  return (
    <>
      <Router>
        <Navbar/>
        <Routes>
            {/* <Route exact path="/" render={(props)=>{
              return(
                <>
                  <Banner {...props} />
                  <Movies {...props} />
                </>
              )
            }}/> */}

            <Route path='/' element={<Home/>}/>
            <Route path='/favorites' element={<Favorites/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
