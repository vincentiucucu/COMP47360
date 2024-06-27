import IntroText from "../components/IntroText";
import BasicTextEntry from "../components/TextEntry";
import Button from "../components/Button";

const Signup = (props) => {
    return (
        <div>
        <IntroText></IntroText>
        <div>
          <div className="BlurCard">
            <div className="LoginBox">
              <h2>Register</h2>
              <form>
                <p>Enter Full Name</p>
                <div style={{ display: "flex" }}>
                  <div style={{ width: "48%" }}>
                    <BasicTextEntry
                      type="text"
                      placeholder="First Name"
                    ></BasicTextEntry>
                  </div>
                  <div style={{ width: "48%" }}>
                    <BasicTextEntry
                      type="text"
                      placeholder="Last Name"
                    ></BasicTextEntry>
                  </div>
                </div>

                <p>Enter Truck/Cart Name</p>
                <BasicTextEntry
                  type="text"
                  placeholder="Food Truck Name"
                ></BasicTextEntry>

                <p>Password</p>
                <BasicTextEntry
                  type="password"
                  placeholder="8+ Strong Password"
                ></BasicTextEntry>

                <p>Confirm Password</p>
                <BasicTextEntry
                  type="password"
                  placeholder="8+ Strong Password"
                ></BasicTextEntry>

                <p>License Number</p>
                <BasicTextEntry
                  type="text"
                  placeholder="Enter your License Number"
                ></BasicTextEntry>

                <p>Food Type</p>
                <BasicTextEntry
                  type="text"
                  placeholder="Enter the type of food"
                ></BasicTextEntry>

                <Button className="UserRegisterBtn" btnName="Sign Up"></Button>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    padding: "10px",
                    cursor: "pointer",
                  }}
                ></div>
              </form>
            </div>
            ;
          </div>
        </div>
      </div>
    );
  };
  
export default Signup;
