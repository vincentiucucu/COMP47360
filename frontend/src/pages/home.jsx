import IntroText from "../components/IntroText";
import "../assets/styles/Main.scss";
import Background from "../components/Background"
import { useNavigate } from 'react-router-dom';
import Button from "../components/Button";

function Main() {

    const navigate = useNavigate(); 
  
    const handleLoginClick = () => {
      navigate('/login'); 
    };
  
    const handleSignInClick = () => {
      navigate('/signin'); 
    };

  return (
    <div>
      <Background></Background>
      <div>
        <div id="UserBtn">
          <Button className='LogInBtn' btnName='Login' onClick={handleLoginClick}></Button>
          <Button className='SignInBtn' btnName='SignIn' onClick={handleSignInClick}></Button>
        </div>
        <div id="IntroTextBox">
          <div className="BlurCard"></div>
          <IntroText></IntroText>
        </div>
      </div>
    </div>
  );
}

// Exporting the component for use in other parts of the application
export default Main;
