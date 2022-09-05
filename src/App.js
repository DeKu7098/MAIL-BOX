import React, { useState } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SignIn from './login/SignIn';
import SignUp from './login/SignUp';
import Welcome from './Welcome/welcome';
import Header from './component/Header';
import Inbox from './Functions/Inbox';
import './Functions/InboxButton.css';
import SentBox from './Functions/SentBox';






function App() {
   const isLogin = useSelector((state) => state.auth.isLoggedIn);
   console.log(isLogin);
   const [showInbox, setInbox] = useState(false);
   const stateHandler = () => {
    setInbox((state) => !state);
    console.log('hi');
   };
   
   const [showSent,setSent] = useState(false);
   const sentHandler = () => {
    setSent((state) => !state);
    console.log('hi');
   }

  return (
    <div>
      {isLogin && <Header />}
      {isLogin && <button className='bn53' onClick={stateHandler}>Inbox</button>}
      {isLogin && <button className='bn53' onClick={sentHandler}>Sentbox</button>}
      
     <Switch>

      {!isLogin && (<Route path="/" exact>
      <Redirect to="/signup"></Redirect>
      </Route>)}
      
      {isLogin && (<Route path="/" exact>

        <Redirect to="/Welcome"></Redirect>
      </Route>)}
      {!isLogin && (<Route path="/signup">
         <SignUp />
      </Route>)}
      {showInbox && <Inbox />}
      {showSent && <SentBox />}
      {!isLogin && (<Route path="/signin">
         <SignIn />
      </Route>)}
      {isLogin && (<Route path="/Welcome">
        <Welcome />
      </Route>)} 
      
      
     </Switch>
     
     
     
   </div>
  );
}

export default App;
