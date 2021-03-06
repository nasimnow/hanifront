import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddLedger from "./pages/ledger/addLedger";
import TransferList from "./pages/ledger/transfersList";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/add" component={AddLedger} />
        <Route path="/" component={TransferList} />
      </Switch>
    </Router>
  );
}

export default App;
