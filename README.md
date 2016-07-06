# react-social-login

## Synopsis

react-social-login is a "social component" that can be wrapped to any any HTML and turn it into an authentication component with SocialProvider

## Code Example
```
 <SocialLogin provider="Google" appId="1085669919173-lslfngv7lb6j9sr7eostmtk54mrdmhc5.apps.googleusercontent.com" callback={handleSocialLogin}>
                     <a className="button special" >Login with Google</a>
       </SocialLogin>
```

and handler:	

```   
const handleSocialLogin = (user,err) => {
   console.log(user); //either you will get a user
   console.log(err); //or an error
 }
```
	   
## Motivation

 # Having a component that doesn't dictates the HTML
 # All-in-One login component for different social providers
 # Takes care of warnings from provider's SDKs when multiple instances are placed
 # Kind of re-birth of my previous .Net driven similar open source - SocialAuth.NET

## Installation
```
npm install react-social-login
```

## API Reference

TBD

## Tests

TBD

## Contributors

Myself at the moment.

## License

MIT