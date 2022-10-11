import "./App.css";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Nav,
  NotFound,
  Home,
  Landing,
  ModalActivity,
  CountryDetail,
} from "./components";
import Footer from "./Footer/footer"

function App() {
  const { modal_open, detailed_country } = useSelector((state) => state);

  return (
    <div className="App">
      {modal_open && <ModalActivity />}
      <Switch>
        <Route exact path="/">          
          <Landing />
          <Footer/>
        </Route>
        <Route exact path="/countries">
          <Nav />
          <Home />
        </Route>        
        {!detailed_country.msg && (
          <Route path="/countries/:id">
            <Nav />
            <CountryDetail />
            <Footer/>
          </Route>
        )}
        <Route path="*">
          <NotFound/>
          <Footer/>
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
