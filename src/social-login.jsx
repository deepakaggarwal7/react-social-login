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
    //console.log('handleSocialLoginInvokeSuccess:RawResponse')
    //console.log(res)
    var user = new SocialUser();

    if(this.props.provider=="Google")
    {
      var profile = gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile();
      var authResponse = gapi.auth2.getAuthInstance().currentUser.get().getAuthResponse(true);
      user.provider = this.props.provider;
      user.profile.id = profile.getId();
      user.profile.firstName = profile.getGivenName();
      user.profile.lastName = profile.getFamilyName();
      user.profile.email = profile.getEmail();
      user.profile.name = profile.getName();
      user.profile.profilePicUrl = profile.getImageUrl();
      user.token.accessToken = authResponse.access_token;
      user.token.expiresAt = authResponse.expires_at;
      this.props.callback(user,null);
   }
   else if(this.props.provider=="Facebook")
   {
     user.provider = this.props.provider;
     user.profile.id = res.id;
     user.profile.firstName = res.first_name;
     user.profile.lastName = res.last_name;
     user.profile.email = res.email;
     user.profile.name = res.name;
     user.profile.profilePicUrl = res.picture.data.url;
     user.token.accessToken = res.authResponse.accessToken;
     user.token.expiresAt = res.authResponse.expiresIn;
     //console.log(user);
     //console.log(this);
     this.props.callback(user,null);
   }
  }

  handleSocialLoginInvokeFailure(err){
    this.props.callback(null,err);
  }

  handleLogin(e, obj){
    var ctx = this;
    var handleSuccess = ctx.handleSocialLoginInvokeSuccess;
    //console.log("handleLogin called");
    if(this.props.provider=="Facebook")
    {

      FB.init({
          appId      : 'PUT YOUR APP ID HERE',
          xfbml      : true,

          version    : 'v2.7'
        });
        //console.log("FB.Init.called")

        //invoke Facebook Login
        FB.login(function(response){
        var loginResponse = response;
        //console.log(response)
        //invoke facebook /me for profile
        FB.api('/me', {fields:'email,name,id,first_name,last_name,picture'}, function(profileResponse) {
          Object.assign(profileResponse,loginResponse);
          ctx.handleSocialLoginInvokeSuccess(profileResponse);
        });
      },{scope:'email'});
      //login process extends



    }
  }

  componentDidMount(){
      var d = document;
      var appId = this.props.appId;
      if(this.props.provider=="Google")
            loader.loadGoogleSdk(d,this.id,appId,this.handleSocialLoginInvokeSuccess.bind(this), this.handleSocialLoginInvokeFailure.bind(this));
      else if(this.props.provider=='Facebook')
            loader.loadFacebookSdk(d,this.id,appId,this.handleSocialLoginInvokeSuccess.bind(this), this.handleSocialLoginInvokeFailure.bind(this));
  }

  render(){
    return(
        <div id={this.id} onClick={this.handleLogin.bind(this)}>{this.props.children}</div>
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
    loadGoogleSdk: (function(d, cid, appId, fn, err){
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

    }),
    loadFacebookSdk: (function(d, cid, appId, fn, err){
      var id='fb-client';
     var js, fjs = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id;
     js.src = "//connect.facebook.net/en_US/all.js";
     js.onLoad = ()=> {
           window.fbAsyncInit = function() {
        FB.init({
          appId      : appId,
          xfbml      : true,
          version    : 'v2.6'
        });

      };

     }
     fjs.parentNode.insertBefore(js, fjs);
   })
}
