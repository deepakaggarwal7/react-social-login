import React from 'react'
import ReactDOM from 'react-dom'

import Demo from './containers/demo'
import { card as cardStyle, hr as hrStyle } from './utils/styles'

// class GitHubLoginWithPersonalToken extends Component {
//   constructor (props) {
//     super(props)
//
//     this.state = {
//       githubToken: ''
//     }
//
//     this.trackChange = this.trackChange.bind(this)
//   }
//
//   trackChange (e) {
//     this.setState({
//       githubToken: e.target.value
//     })
//   }
//
//   render () {
//     return (
//       <div style={{ marginTop: '1rem' }}>
//         <h3>GitHub Authentication with personal token</h3>
//         <label htmlFor='gh_token' style={{ display: 'block' }}>GitHub Personal Token</label>
//         <input
//           id='gh_token'
//           type='text'
//           onChange={this.trackChange}
//           value={this.state.githubToken}
//           style={{ display: 'block', marginBottom: '1rem', minWidth: '50%' }}
//         />
//         {
//           this.state.githubToken
//             ? <SocialButton
//               provider='github'
//               appId={this.state.githubToken}
//               onLoginSuccess={handleSocialLogin}
//               onLoginFailure={handleSocialLoginFailure}
//             >
//               Login with GitHub
//             </SocialButton>
//             : null
//         }
//       </div>
//     )
//   }
// }

ReactDOM.render(
  <div style={{ ...cardStyle, padding: '1.5rem 2rem', textAlign: 'center' }}>
    <strong>react-social-login demo</strong>
    <hr style={hrStyle} />
    <Demo />
  </div>,
  document.getElementById('app')
)
