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
    <SocialLogin provider="Google" appId="1085669919173-lslfngv7lb6j9sr7eostmtk54mrdmhc5.apps.googleusercontent.com" callback={handleSocialLogin}>
                     <a className="button special" >Login with Google</a>
       </SocialLogin>
  )
}

}

ReactDOM.render(<SocialLoginDemo/>,document.getElementById('appRoot'));
