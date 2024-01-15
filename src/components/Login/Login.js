import React, { useState , useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../Store/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if(action.type === "USER_INPUT"){
    return {value:action.val, isValid:action.val.includes('@')}
  }
  if(action.type === "INPUT_BLUR"){
    return {value:state.value, isValid:state.value.includes('@')}
  }
return {value:'', isValid:false}
}

const passwordReducer = (state, action) => {
  if(action.type === "USER_INPUT") {
    return {value:action.val, isValid:action.val.trim().length > 6} 
  }
  if(action.type === "INPUT_BLUR") {
    return {value:state.value, isValid:state.value.trim().length > 6}
  }
  return {value:'', isValid:false}
}

const collegeReducer = (state, action) => {
  if(action.type === "USER_INPUT"){
    return {value:action.val, isValid:action.val.trim().length > 0}
  }
  if(action.type === "INPUT_BLUR"){
    return {value:state.value, isValid:state.value.trim().length > 0}
  }
  return {value:'', isValid:false}
}
const Login = (props) => {
  const authCtx = useContext(AuthContext);
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const collegeInputRef = useRef();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {value:'', isValid:null});
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {value:'', isValid:null});
  const [collegeState, dispatchCollege] = useReducer(collegeReducer, {value:'', isValid:null});


  const emailChangeHandler = (event) => {
    dispatchEmail({type:"USER_INPUT", val:event.target.value});
    setFormIsValid(event.target.value.includes('@') && passwordState.value.trim().length > 6 && collegeState.value.trim().length > 0)
  };

  const passwordChangeHandler = (event) => {
   dispatchPassword({type:"USER_INPUT", val:event.target.value})
   setFormIsValid(event.target.value.trim().length > 6 && emailState.value.includes('@') && collegeState.value.trim().length > 0)
  };

  const collegeChangeHandler = (event)=>{
   dispatchCollege({type:"USER_INPUT", val:event.target.value})
   setFormIsValid (event.target.value.trim().length > 0 && emailState.value.includes('@') && passwordState.value.trim().length > 6)    
  }

  const validateEmailHandler = () => dispatchEmail({type: 'INPUT_BLUR'})

  const validatePasswordHandler = () => dispatchPassword({type:"INPUT_BLUR"});

  const validateCollegeHandler = () => dispatchCollege({type:"INPUT_BLUR"});

  const submitHandler = (event) => {
    event.preventDefault();
    if(formIsValid) authCtx.onLogin(emailState.value, passwordState.value, collegeState.value);
    else if(!emailState.isValid){
      emailInputRef.current.focus();
    }
   else  if(!passwordState.isValid){ 
      passwordInputRef.current.focus();
    }
    else if(!collegeState) collegeInputRef.current.focus();
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input 
        ref={emailInputRef}
        id="email" 
        label="E-mail" 
        type="email"
        value={emailState.value} 
        isValid={emailState.isValid}
        onChange={emailChangeHandler}
        onBlur={validateEmailHandler}
        ></Input>
       <Input 
       ref={passwordInputRef}
        id="password" 
        label="Password" 
        type="password"
        value={passwordState.value} 
        isValid={passwordState.isValid}
        onChange={passwordChangeHandler}
        onBlur={validatePasswordHandler}
        ></Input>
<Input  
        ref={collegeInputRef}
        id="college" 
        label="College" 
        type="text"
        value={collegeState.value} 
        isValid={collegeState.isValid}
        onChange={collegeChangeHandler}
        onBlur={validateCollegeHandler}
        ></Input>

        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
