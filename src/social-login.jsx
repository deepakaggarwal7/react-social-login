import React from 'react'

export default class SocialUser {
  constructor(){
    this.provider='';

    this.profile =
    {
        name:'',
        firstName:'',
        lastName:'',
        email:'',
        profilePicUrl:''
   }

   this.token = {
        accessToken:'',
        expiresAt:''
   }
}
}

export default class SocialLogin extends React.Component{
  constructor(props){
    super(props);
    this.id =  'sl' + Math.floor(Math.random() * 0xFFFF) + '';
  }



  handleSocialLoginInvokeSuccess(res){
    var user = new SocialUser();

    user.provider = this.props.provider;
    user.profile.id = res.wc.Ka;
    user.profile.firstName = res.wc.Za;
    user.profile.lastName = res.wc.Na;
    user.profile.email = res.wc.hg;
    user.profile.name = res.wc.wc;
    user.profile.profilePicUrl = res.wc.Ph;
    user.token.accessToken = res.hg.access_token;
    user.token.expiresAt = res.hg.expires_at;
    this.props.callback(user,null);
  }

  handleSocialLoginInvokeFailure(err){
    this.props.callback(null,err);
  }



  componentDidMount(){
      var d = document;
      var appId = this.props.appId;
      if(this.props.provider=='Google')
            loader.loadGoogleSdk(d,this.id,appId,this.handleSocialLoginInvokeSuccess.bind(this), this.handleSocialLoginInvokeFailure.bind(this));
  }

  render(){
    return(
        <div id={this.id}>{this.props.children}</div>
    )
  }

}

//SupportedTypes
SocialLogin.propTypes = {
  provider  : React.PropTypes.oneOf(['Google','Facebook']).isRequired,
  appId     : React.PropTypes.string.isRequired,
  children  : React.PropTypes.element.isRequired,
  callback  : React.PropTypes.func
}


//scripts Loading
var loader = {

    //Google Script loader
    loadGoogleSdk: function(d, cid, appId, fn, err){
    var js = d.createElement('script');
    js.src='https://apis.google.com/js/platform.js';
    js.id = 'gapi-client';
    js.onload = (function(){
      
      gapi.load('auth2',()=>{
        if(!window.gapi.auth2.getAuthInstance())
            window.gapi.auth2.init({client_id:appId});
        window.gapi.auth2.getAuthInstance().attachClickHandler(cid, {}, fn, err)
      })
    })
    if(document.getElementsByTagName('script').length==0)
      d.appendChild(js);
    else
        document.getElementsByTagName('script')[0].parentNode.appendChild(js);

    }
}
