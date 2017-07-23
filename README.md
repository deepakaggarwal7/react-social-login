[npm:img]: https://img.shields.io/npm/v/react-social-login.svg?style=flat-square
[npm:url]: https://www.npmjs.org/package/react-social-login

[standard:img]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard:url]: http://standardjs.com

[dependencies:img]: https://david-dm.org/deepakaggarwal7/react-social-login.svg?style=flat-square
[dependencies:url]: https://github.com/deepakaggarwal7/react-social-login/blob/master/package.json#L33

[license:img]: https://img.shields.io/badge/License-MIT-brightgreen.svg?style=flat-square
[license:url]: https://opensource.org/licenses/MIT

# React Social Login &middot; [![NPM version][npm:img]][npm:url] &middot; [![Standard - JavaScript Style Guide][standard:img]][standard:url] &middot; [![Dependencies][dependencies:img]][dependencies:url] &middot; [![License: MIT][license:img]][license:url]

React Social Login is an HOC which provides social login through multiple providers.

**Currently supports Facebook, GitHub, Google, Instagram and LinkedIn as providers (more to come!)**

## Motivation

 * Having a component that doesn't dictates the HTML
 * All-in-One login component for different social providers
 * Takes care of warnings from provider's SDKs when multiple instances are placed
 * Kind of re-birth of my previous .Net driven similar open source - SocialAuth.NET

## Demo

Edit `appId` props with your own ones in `demo/index.js` file and build demo:

```shell
$ npm start
```

You can then view the demo at [http://localhost:8080][demo].

**WARNING!** Be aware that Facebook demo doesn’t work on localhost

## Install

```shell
$ npm install --save react-social-login
```

## Usage

Create the component of your choice and transform it into a SocialLogin component.

**SocialButton.js**

```js
import React from 'react'
import SocialLogin from 'react-social-login'

const Button = ({ children, triggerLogin, ...props }) => (
  <button onClick={triggerLogin} {...props}>
    { children }
  </div>
)

export default SocialLogin(Button)
```

Then, use it like a normal component.

**index.js**

```js
import React from 'react'
import ReactDOM from 'react-dom'

import SocialButton from './SocialButton'

const handleSocialLogin = (user) => {
  console.log(user)
}

const handleSocialLoginFailure = (err) => {
  console.error(err)
}

ReactDOM.render(
  <div>
    <SocialButton
      provider='facebook'
      appId='YOUR_APP_ID'
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
    >
      Login with Facebook
    </SocialButton>
  </div>,
  document.getElementById('app')
)
```

### Reference

Raw component props (before transform):

| Prop  | Default  | Type / Values  | Description  |
|---|---|---|---|
| appId  | —  | string  | Your app identifier (see [find my appId][findmyappid])  |
| autoLogin  | false  | boolean  | Enable auto login on `componentDidMount`  |
| onLoginFailure  | —  | function  | Callback on login fail  |
| onLoginSuccess  | —  | function  | Callback on login success  |
| provider  | —  | `facebook`, `github`, `google`, `instagram`, `linkedin`  | Social provider to use  |
| any other prop  | —  | —  | Any other prop will be forwarded to your component  |

Transformed component props:

| Prop  | Type  | Description  |
|---|---|---|
| triggerLogin  | function  | Function to trigger login process, usually attached to an event listener  |
| all your props  | —  | All props from your original component, minus SocialLogin specific props  |

### Find my appId

#### Facebook

See [facebook for developers documentation][fb4devdoc].

#### GitHub

See [GitHub Developer guide][githubdoc].

#### Google

See [Google Sign-In for Websites guide][gsignindoc].

#### Instagram

See [Instagram developers documentation][instadoc].

#### LinkedIn

See `Where can I find my API key?` section on the [FAQ][linkedinfaq].

## Old component support

We decided to keep the old behavior as a fallback, it is available as a named export:

```js
import React from 'react'
import ReactDOM from 'react-dom'
import { OldSocialLogin as SocialLogin } from 'react-social-login'

const handleSocialLogin = (user, err) => {
  console.log(user)
  console.log(err)
}

ReactDOM.render(
  <div>
    <SocialLogin
      provider='facebook'
      appId='YOUR_APP_ID'
      callback={handleSocialLogin}
    >
      <button>Login with Google</button>
    </SocialLogin>
  </div>,
  document.getElementById('app')
)
```

## Build

Though not mandatory, it is recommended to use latest npm5 to match lockfile versions.

```shell
$ npm install
$ npm run build
```

## Change Log

__v2.0.0__ [26 Feb 2017]
* Use small case for providers
* Linkedin support added along with previous google and facebook
* A lot of refactoring done
* Uses Webpack 2.x
__Huge  Thanks to  Nicolas Goudry for his generous contribution __

__v2.0.1__ [24 June 2017]
merged Pull #15  Request  which resolves:
 * Facebook error
 * code styling
 * unnecessary console logs
 * pre-commit lint

## Tests

TBD

## Contributors
* [Nicolas Goudry][ghngoudry]
* No longer just myself

[demo]: http://localhost:8080
[findmyappid]: #find-my-appid
[fb4devdoc]: https://developers.facebook.com/docs/apps/register
[githubdoc]: https://developer.github.com/apps/building-integrations/setting-up-and-registering-oauth-apps/registering-oauth-apps
[gsignindoc]: https://developers.google.com/identity/sign-in/web/devconsole-project
[instadoc]: https://www.instagram.com/developer
[linkedinfaq]: https://developer.linkedin.com/support/faq
[ghngoudry]: https://github.com/nicolas-goudry
