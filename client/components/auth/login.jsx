import axios from "axios";
import React, { useState, useRef, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { AuthContext } from "./../contexts/AuthContext.jsx";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import batwing from "../batwing.png";

const Login = (props) => {
  const history = useHistory();
  let emailRef = useRef();
  let emailResetRef = useRef();
  let passwordRef = useRef();
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setSent(false);
  };
  const handleShow = () => setShow(true);

  const { login, loginWithGoogle, setUser, resetPassword } =
    useContext(AuthContext);

  async function handleSubmit(e) {
    e.preventDefault();
    login(emailRef.current.value, passwordRef.current.value)
      .then(() => {
        history.push("/welcomeBack");
      })
      .catch((e) => {
        setError(e.message);
      });
  }

  async function handlePasswordReset(e) {
    e.preventDefault();
    try {
      setSent(true);
      if (emailResetRef.current.value) {
        await resetPassword(emailResetRef.current.value);
      }
    } catch (error) {
      setError(error);
    }
  }

  async function handleLoginWithGoogle(e) {
    e.preventDefault();
    try {
      const result = await loginWithGoogle();
      const id = await axios.get(`user/${result.user.uid}`);
      if (id.data) {
        history.push("/welcomeBack");
      } else {
        setUser(result);
        history.push("/complete-signup");
      }
    } catch (error) {
      setError(error);
    }
  }

  const renderEmailSent = () => {
    return emailResetRef.current.value ? (
      <div>email sent to: {emailResetRef.current.value}</div>
    ) : null;
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {error && <div>{error}</div>}
        <div className='login-batwing-container'>
          <img className="batwing-login" src={batwing} alt="" />
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <label className="login-form-labels" htmlFor="email">
            email:
          </label>
          <input
            className="login-form-inputs"
            name="email"
            type="email"
            ref={emailRef}
            required
          />
          <label className="login-form-labels" htmlFor="password">
            password:
          </label>
          <input
            className="login-form-inputs"
            name="password"
            type="password"
            autoComplete="on"
            ref={passwordRef}
            required
          />
          <button className="login-btn">Login</button>
        </form>
        <div className="google-login-container">
          <button className="google-login-btn" onClick={handleLoginWithGoogle}>
            Login with Google
          </button>
          <div>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Enter email:</Modal.Title>
              </Modal.Header>
              <form className="form-group" onSubmit={handlePasswordReset}>
                <Modal.Body>
                  {error && (
                    <div className="alert primary-alert" role="alert"></div>
                  )}
                  {sent ? (
                    renderEmailSent()
                  ) : (
                    <input
                      className='forgot-pword-email-input'
                      type="email"
                      ref={emailResetRef}
                      placeholder="email@example.com"
                    />
                  )}
                  <div className='modal-buttons-container'>
                  <button className='modal-close-btn' variant="secondary" onClick={handleClose}>
                    Close
                  </button>
                  {sent ? null : <button className='modal-submit-btn' variant="primary">Submit</button>}
                  </div>
                </Modal.Body >
                {/* <Modal.Footer >
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  {sent ? null : <Button variant="primary">Submit</Button>}
                </Modal.Footer> */}
              </form>
            </Modal>
            <button  className='forgot-password-btn' onClick={handleShow}>
              Forgot Password?
            </button>
          </div>
        </div>
        <div className="login-link-to-registration-container">
          Don't have an account?
          <Link className="login-link-to-registration" to="/register">
            Register here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;