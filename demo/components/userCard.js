import PropTypes from 'prop-types'
import React, { Component } from 'react'

import COLORS from '../utils/colors'
import { card as cardStyle } from '../utils/styles'

const Detail = ({ label, data }) => (
  <div style={{ fontSize: '.8rem' }}>
    <label style={{ color: COLORS.lightColor, paddingRight: '.25rem' }}>{label} :</label>
    <span>{data}</span>
  </div>
)

const AccessToken = ({ token }) => {
  const codeStyle = {
    fontFamily: 'monospace',
    wordWrap: 'break-word',
    margin: '.5em 0',
    padding: '.5em',
    fontSize: '85%',
    backgroundColor: 'rgba(27,31,35,0.05)',
    borderRadius: '3px'
  }

  return (
    <div style={{ fontSize: '.8rem' }}>
      <label style={{ color: COLORS.lightColor, paddingRight: '.25rem' }}>Access token :</label>
      <div style={codeStyle}>{token}</div>
    </div>
  )
}

export default class UserCard extends Component {
  static propTypes = {
    user: PropTypes.shape({
      _profile: PropTypes.object,
      _token: PropTypes.object
    }),
    logout: PropTypes.func
  }

  render () {
    const { user: { _profile, _token }, logout } = this.props
    let expiration = 'unknown'

    if (_token.expiresAt === Infinity) {
      expiration = 'never/unknown (see provider doc)'
    } else if (_token.expiresAt) {
      const date = new Date(_token.expiresAt)
      const year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()

      if (month < 10) month = `0${month}`
      if (day < 10) day = `0${day}`
      if (hour < 10) hour = `0${hour}`
      if (minute < 10) minute = `0${minute}`

      expiration = `${month}/${day}/${year} ${hour}:${minute}`
    }

    const styles = {
      container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'left'
      },
      avatar: {
        background: COLORS.background,
        boxShadow: '0 0 12px rgba(0,0,0,0.5)',
        border: `5px solid ${COLORS.white}`,
        borderRadius: '50%',
        height: '7em',
        width: '7em',
        zIndex: '1'
      },
      content: {
        ...cardStyle,
        marginTop: '-.75rem'
      },
      dataContainer: {
        padding: '1.5rem 2rem'
      },
      id: {
        fontSize: '.5rem',
        margin: '-.2rem 0'
      },
      name: {
        fontSize: '1.5rem',
        marginBottom: '.5rem'
      },
      button: {
        color: COLORS.red,
        border: 'none',
        width: '100%',
        padding: '.5rem',
        fontSize: '1em',
        textTransform: 'uppercase'
      }
    }

    const avatar = _profile.profilePicURL ||
      'https://maxcdn.icons8.com/Share/icon/p1em/users//gender_neutral_user1600.png'

    return (
      <div style={styles.container}>
        <img style={styles.avatar} src={avatar} />
        <div style={styles.content}>
          <div style={styles.dataContainer}>
            <div style={styles.id}>ID {_profile.id}</div>
            <div style={styles.name}>{_profile.name}</div>
            <Detail label='Firstname' data={_profile.firstName} />
            <Detail label='Lastname' data={_profile.lastName} />
            <Detail label='Email' data={_profile.email} />
            <Detail label='Gender' data={_profile.gender} />
            <Detail label='Expiration' data={expiration} />
            <AccessToken token={_token.accessToken} />
          </div>
          <button style={styles.button} onClick={logout}>Logout</button>
        </div>
      </div>
    )
  }
}
