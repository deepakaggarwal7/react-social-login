import COLORS from './colors'

export const card = {
  boxShadow: '0 0 15px rgba(0,0,0,0.25)',
  background: COLORS.background,
  borderRadius: '5px',
  color: COLORS.color,
  display: 'flex',
  flexDirection: 'column',
  minWidth: '10em',
  maxWidth: '25em'
}

export const hr = {
  border: 0,
  height: 0,
  borderTop: '1px solid rgba(0, 0, 0, 0.1)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
  margin: '1rem 0'
}
