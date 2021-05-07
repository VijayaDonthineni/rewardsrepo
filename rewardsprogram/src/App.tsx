import React from "react";
import logo from "./logo.svg";
import "./App.css";
import UserRewards from "./Features/UserRewards";
import user from "./Features/UserTransactions";

function App() {
  return (
    <div style={{ marginTop: "40px" }}>
      <UserRewards userTransactions={user} />
    </div>
  );
}

export default App;
