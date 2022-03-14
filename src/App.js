import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar/Navbar";
import AppContext from "./context";
import "./App.scss";

import Home from "./pages/Home/Home";
import NotFound from "./pages/NotFound/NotFound";

function App() {
  return (
    <AppContext>
      <div className="App">
        <Navbar />

        <Router>
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </div>
    </AppContext>
  );
}

export default App;
