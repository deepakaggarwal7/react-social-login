import React from 'react'
import SocialLogin from '../src/social-login.jsx'
import ReactDOM from 'react-dom';

const handleSocialLogin = (user,err) => {
   console.log(user);
   console.log(err);
 }

export default class SocialLoginDemo extends React.Component{


render(){
  console.log('called');
  return(
    <div>
  {/*<SocialLogin provider="Google" appId="1085669919173-lslfngv7lb6j9sr7eostmtk54mrdmhc5.apps.googleusercontent.com" callback={handleSocialLogin}>
                     <button>Login with Google</button>
    </SocialLogin>*/}
    <SocialLogin provider="Facebook" appId="209060642824026" callback={handleSocialLogin}>
                     <button>Login with Facebook</button>
    </SocialLogin>

    <SocialLogin provider="Linkedin" appId="81oplz05qxuccs" callback={handleSocialLogin}>
                     <button>Login with LinkedIn</button>
    </SocialLogin>
    </div>
  )
}

}

ReactDOM.render(<SocialLoginDemo/>,document.getElementById('appRoot'));
