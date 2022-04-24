import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { userLogin } from '../actions';
import wallet from './helpers/wallet.png';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { email } = this.state;
    const { history, getEmail } = this.props;
    localStorage.setItem('trybewallet-user', email);
    getEmail(email);
    history.push('/carteira');
  }

  handleChange = ({ target: { value, type } }) => {
    this.setState({ [type]: value }, this.loginValidation);
  }

  loginValidation = () => {
    const { email, password } = this.state;
    const minPassLength = 6;
    // Padrão regex retirado do site https://www.w3resource.com/javascript/form/email-validation.php
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (password.length >= minPassLength && email.match(validEmail)) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  }

  render() {
    const { email, password, isDisabled } = this.state;
    return (
      <div className="login-page">
        <p>
          <img src={ wallet } alt="Imagem carteira" width="50px" />
          <h1>TrybeWallet</h1>
        </p>
        <div className="login-box">
          <h2>Login</h2>
          <form className="login-form" onSubmit={ this.handleSubmit }>
            <input
              data-testid="email-input"
              type="email"
              placeholder="E-mail"
              value={ email }
              onChange={ this.handleChange }
            />
            <input
              data-testid="password-input"
              type="password"
              placeholder="Senha"
              value={ password }
              onChange={ this.handleChange }
            />
            <button
              type="submit"
              disabled={ isDisabled }
            >
              Entrar
            </button>
          </form>
        </div>
        <p />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getEmail: (email) => dispatch(userLogin(email)),
});

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  getEmail: PropTypes.func,
}.isRequired;

export default connect(null, mapDispatchToProps)(Login);
