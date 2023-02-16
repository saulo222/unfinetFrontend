import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
import {getbynamelogin} from './services/servicesLogin'

function Login() {
  // React States
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [users,setUsers]=useState([])
  //const  history = useHistory()
  // User Login info

  const errors = {
    pass: "nombre de usuario inválido o contraseña inválida"
  };
  
  const handleSubmit = async (event) =>  {
    //Prevent page reload
    event.preventDefault();

    var { uname, pass } = document.forms[0];

    // Find user login info
   // const userData = database.find((user) => user.username === uname.value);
    const response = await getbynamelogin(uname.value,pass.value)
    console.log(response)
    
    if (response!==undefined) {
      setIsSubmitted(true);
      //localStorage.setItem('user', JSON.stringify(response));
      localStorage.setItem('userId', response.userID);
      setUsers(response)
    }else{
      setErrorMessages({ name: "pass", message: errors.pass });
    }

    
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Nombre de usuario </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Contraseña </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
          <input type="submit" />
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Ufinet</div>
        {isSubmitted ? <div><Link to="./pageBilld">Factura</Link></div> : renderForm}
      </div>
    </div>
  );
}

export default Login;