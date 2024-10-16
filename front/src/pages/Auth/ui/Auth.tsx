import './Auth.scss'

const AuthPage = () => {
  return (
    <div className='Auth'>
     <div className='LabelAuth'>
        <p className='title'>Authorization</p>
     </div>
     <div className='inputBlock'>
       <input placeholder='Token' className='input'/>
       <button className='btnLogin'>Log in</button>
     </div>
    </div>
  )
}

export default AuthPage;