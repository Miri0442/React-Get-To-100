import { useState } from 'react'
import '../register/Register.css'

function Register({ setIsRegistering, setPlayers, setMessage, message }) {
  const [registerStatus, setRegisterstatus] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isUserExists = (email) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    return users.some((user) => user.email === email);
  };

  const registerUser = (username, email, password) => {
    if (isUserExists(email)) {
      setMessage('A user with this email already exists.');
      setTimeout(() => setMessage(''), 3000); return false;
    }
    const newUser = {
      username,
      email,
      password,
      scores: [],
    };
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return newUser;
  };

  const loginUser = (email, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === email && user.password === password);
    if (user) {
      return user;
    } else {
      setMessage('Email or password are incorrect');
      setTimeout(() => setMessage(''), 3000);
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { username, email, password } = formData;
    let register = registerStatus ? registerUser(username, email, password) : loginUser(email, password);
    if (register) {
      setPlayers((prev) => [...prev, register]);
      setIsRegistering(false);
    }
  };

  const toggleAuthMode = () => {
    setRegisterstatus(!registerStatus);
    setFormData({
      username: '',
      email: '',
      password: '',
    });
  };

  return (
    <div className='entryForm'>
      <div className="auth-form">
        <h2>{registerStatus ? "Sign Up" : "Log In"}</h2>
        <form onSubmit={handleSubmit}>
          {registerStatus && (
            <div>
              <label>User Name:</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            </div>
          )}
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit">{registerStatus ? "Sign Up" : "Log In"}</button>
        </form>

        <button onClick={toggleAuthMode}>
          {registerStatus ? "Already registered?" : "New user?"}
        </button>
      </div>
      {message && (
        <div className="notification">
          {message}
        </div>
      )}
    </div>
  );
}

export default Register