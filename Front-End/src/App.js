import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import UserContext from "./Context/user_context";
import Login from "./Components/Login_components/login";
import Main from "./Components/Main_component/main";

import "./App.css";

function App() {
  const [val, setVal] = useState(null);
  const providerVal = useMemo(() => [val, setVal], [val, setVal]);

  return (
    <div className="">
      {/* <header className=""></header> */}

      <Router>
        <Switch>
          <UserContext.Provider value={providerVal}>
            {val ? <Main></Main> : <Login></Login>}
          </UserContext.Provider>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
