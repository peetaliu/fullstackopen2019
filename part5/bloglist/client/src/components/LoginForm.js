import React from 'react'
const LoginForm = props => (
  <form onSubmit={props.handleLogin}>
    <div>
      Username:
      <input
        type="text"
        value={props.username}
        name="Username"
        onChange={({ target }) => props.setUsername(target.value)}
      />
    </div>
    <div>
      Password:
      <input
        type="password"
        value={props.password}
        name="Password"
        onChange={({ target }) => props.setPassword(target.value)}
      />
    </div>
    <button type="submit">Login</button>
  </form>
)

export default LoginForm