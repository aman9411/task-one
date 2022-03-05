import React, { useState } from 'react';
import Menu from './MenuComponent';
import './App.css';

function App() {

  const [toggler, setToggler] = useState(false);

  const handleToggler = () => {
    setToggler(true);
  };

  return (
    <div className="App">
      <button className="menu_btn" onClick={()=> handleToggler()}>Menu</button>
      {
        toggler ?
        <Menu setToggler={setToggler} />
        : null
      }
    </div>
  );
}

export default App;
