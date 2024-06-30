import Button from './Button'
import BasicTextEntry from './TextEntry';
const LoginBox = (props) => {
  return <div className="LoginBox">
  <h2>Log In</h2>
  <form>
    <p>Enter your Login Details</p>
    <div className='UserDetails'>
      <BasicTextEntry type='text' placeholder='Food Truck Name'></BasicTextEntry>
      <BasicTextEntry type='password' placeholder='8+ Strong Password'></BasicTextEntry>
    </div>
    <Button className='UserLogInBtn' btnName='Login'></Button>
    <div style={{ padding: "20px 10px", justifyContent:'center', display:'flex' }}>
      -----not a member ?-----
    </div>
    <Button className='UserRegisterBtn' btnName='Register'></Button>
    <div style={{display:'flex', justifyContent:'center', cursor:'pointer'}}><a>Continue as guest</a></div>
  </form>``
</div>;
};

export default LoginBox;