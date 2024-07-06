import "../styles/Login.scss";
import Background from "../components/Background";
import IntroText from "../components/IntroText";
import LoginBox from '../components/LoginBox'

function LogIn() {
  return (
    <div>
        <Background></Background>
      <div>
        <IntroText></IntroText>
        <div>
          <div className="Card">
            <LoginBox></LoginBox>
          </div>
        </div>
      </div>
    </div>
  );
}

// Exporting the component for use in other parts of the application
export default LogIn;
