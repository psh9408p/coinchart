import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./Routes/Coin";
import Coins from "./Routes/Coins";

export default function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/:coinId">
          <Coin></Coin>
        </Route>
        <Route path="/">
          <Coins></Coins>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
