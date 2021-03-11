import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddLedger from "./pages/ledger/addLedger";
import TransferList from "./pages/ledger/transfersList";
import AddStock from "./pages/hedge/addStock"

function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/" component={TransferList} />
        <Route path="/add" component={AddLedger} />
        
        <Route  path="/addstock" component={AddStock} />
      </Switch>
    </Router>
  );
}

export default App;
