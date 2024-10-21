import { Link, useNavigate } from 'react-router-dom';
import classes from './Auth.module.css'
import React, { useState } from 'react';

const AuthPage: React.FC = () => {
  const [token, setToken] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setToken(event.target.value);
  };

    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        navigate('/campaigns'); // Перенаправление на /campaigns при нажатии Enter
       }
    };
  
  return (
     <div className={classes.Auth}>
            <div className={classes.LabelAuth}>
                <p className={classes.title}>Authorization</p>
            </div>
            <div className={classes.inputBlock}>
                <input
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