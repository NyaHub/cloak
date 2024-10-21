import { Link, useNavigate } from 'react-router-dom';
import classes from './Auth.module.css'
import React, { useState } from 'react';

const AuthPage: React.FC = () => {
  const [token, setToken] = useState<string>('');
  const navigate = useNavigate();
  // const {login, isLoading, error, errors} = useLogin(token)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value);
  };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        navigate('/campaigns');
       }
    };
  
  return (
     <div className={classes.Auth}>
            <div className={classes.LabelAuth}>
                <p className={classes.title}>Authorization</p>
            </div>
            <div className={classes.inputBlock}>
                <input
                    type="text"
                    placeholder='Token'
                    className={classes.input}
                    value={token}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress} // Обработчик для нажатий клавиш
                />
                <Link to="/campaigns" className={classes.btnLogin}>
                    Log in
                </Link>
            </div>
        </div>
  )
}

export default AuthPage;