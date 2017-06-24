# react-social-login

## Synopsis

react-social-login is a "social component" for react. Just wrap it around any HTML to make it authenticate users with Social Providers.

## Code Example
```
 <SocialLogin 
    provider="google" 
	appId="1085669919173-lslfngv7lb6j9sr7eostmtk54mrdmhc5.apps.googleusercontent.com" 
    callback={handleSocialLogin}>
                     <!-- ANY HTML THAT LOOKS GOOD ON YOUR PAGE //-->
 </SocialLogin>
```

and handler:	

```   
const handleSocialLogin = (user,err) => {
   console.log(user); //either you will get a user
   console.log(err); //or an error
 }
```
Currently supports Google, Facebook and LinkedIn as Provider (More to come!!)
	   
## Motivation

 * Having a component that doesn't dictates the HTML
 * All-in-One login component for different social providers
 * Takes care of warnings from provider's SDKs when multiple instances are placed
 * Kind of re-birth of my previous .Net driven similar open source - SocialAuth.NET

## Installation

__Install Nuget Package by:__
```
npm install react-social-login
```
__Compile code locally by:__
```
npm install
npm update
npm build
```

__Try demo by:__
```
npm start
and then open http://localhost:8080 
```

## Change Log

__v2.0.0__ [26 Feb 2017]
* Use small case for providers
* Linkedin support added along with previous google and facebook
* A lot of refactoring done
* Uses Webpack 2.x
__Huge  Thanks to  Nicolas Goudry for his generous contribution __

__v2.0.1__ [24 June 2017]
* fixed #issue6 - Console Log removed from index.js 


## Tests

TBD

## Contributors
* [Nicolas Goudry] (https://github.com/nicolas-goudry)
* No longer just myself

## License

MIT