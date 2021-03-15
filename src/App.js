import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AddLedger from "./pages/ledger/addLedger";
import TransferList from "./pages/ledger/transfersList";
import upiAdd from "./pages/upi/upiAdd";
import AddCoin from "./pages/coin/addCoin";
import CoinList from "./pages/coin/coinList";
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={TransferList} />
        <Route path="/add" component={AddLedger} />
        <Route path="/upi" component={upiAdd} />
        <Route path="/addcoin" component={AddCoin} />
        <Route exact path="/coins" component={CoinList} />
        <Route exact path="/index" component={CoinList} />
      </Switch>
    </Router>
  );
}

export default App;
