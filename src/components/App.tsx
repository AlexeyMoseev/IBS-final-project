import React, {useEffect} from 'react';
import {LayoutMain} from "./layouts/LayoutMain";
import {useActions} from "../hooks/useAction";

function App() {
  const {app__initApp} = useActions();
  useEffect(()=>{
    app__initApp()
  })
  return (
    <LayoutMain/>
  );
}

export default App;
