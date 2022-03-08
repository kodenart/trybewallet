import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { setEmail } from '../actions';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      emailInput: '',
      isValidEmail: false,
      passwordInput: '',
      isValidPassword: false,
    };
  }

  handleEmailInput = ({ target: { value } }) => {
    const regexEmail = /^[\w]+[^\s@]*@[\w]+[.][\w]+$/;
    const isValidEmail = regexEmail.test(value);
    this.setState({
      emailInput: value,
      isValidEmail,
    });
  }

  handlePassword = ({ target: { value } }) => {
    const MIN_LEN_PASSWRD = 6;
    const isValidPassword = value.length >= MIN_LEN_PASSWRD;
    this.setState({
      passwordInput: value,
      isValidPassword,
    });
  }

  render() {
    const {
      emailInput, isValidEmail,
      passwordInput, isValidPassword,
    } = this.state;

    const { loginButtonClick, history } = this.props;

    const passwordWarning = 'Senha deve no mínimo 6 caracteres!';
    const emailWarning = 'Email inválido!';

    const isButtonDisabled = !(isValidEmail && isValidPassword);

    return (
      <div className="loginPage">
        <div>Login Page</div>
        <div className="loginForm">

          <input
            data-testid="email-input"
            type="text"
            value={ emailInput }
            onChange={ this.handleEmailInput }
          />
          {(emailInput.length > 0 && !isValidEmail) && <p>{emailWarning}</p>}

          <input
            data-testid="password-input"
            type="password"
            value={ passwordInput }
            onChange={ this.handlePassword }
          />
          {(passwordInput.length > 0 && !isValidPassword) && <p>{passwordWarning}</p>}

          <button
            type="button"
            disabled={ isButtonDisabled }
            onClick={ () => {
              loginButtonClick(emailInput);
              history.push('/carteira');
            } }
          >
            Entrar

          </button>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginButtonClick: PropTypes.func.isRequired,
  history: PropTypes.objectOf(PropTypes.any).isRequired,
};

const mapDispatchToProps = (dispatch) => (
  {
    loginButtonClick: (emailValue) => {
      dispatch(setEmail(emailValue));
    },
  }
);

export default connect(null, mapDispatchToProps)(Login);
