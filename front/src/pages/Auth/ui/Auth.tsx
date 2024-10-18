import classes from './Auth.module.css'

const AuthPage = () => {
  return (
    <div className={classes.Auth}>
     <div className={classes.LabelAuth}>
        <p className={classes.title}>Authorization</p>
     </div>
     <div className={classes.inputBlock}>
       <input placeholder='Token' className={classes.input}/>
       <button className={classes.btnLogin}>Log in</button>
     </div>
    </div>
  )
}

export default AuthPage;