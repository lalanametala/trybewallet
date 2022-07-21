import PropTypes from 'prop-types';
import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';
import { FaCoins } from 'react-icons/fa';
import { FiLogOut } from 'react-icons/fi';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { connect } from 'react-redux';
import { changeHeaderCurr } from '../../actions';
import { currencySymbols } from '../helpers';
import wallet from '../helpers/wallet.png';
import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = { heaCurr: 'BRL' };
  }

  handleChange = ({ target: { value } }) => {
    const { changeCurr } = this.props;
    changeCurr(value);
    this.setState({ heaCurr: value });
  }

  logout = () => {
    localStorage.removeItem('trybewallet-user');
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { email, totalExp, currencies, headerCurrency } = this.props;
    const { heaCurr } = this.state;
    const allCurr = [...currencies, 'BRL'];
    return (
      <header>
        <div className="title-logo">
          <img src={ wallet } alt="Imagem carteira" width="40px" height="40px" />
          <h3>TrybeWallet</h3>
        </div>
        <div className="header-info">
          <p data-testid="email-field" className="user-info">
            <AiOutlineUser className="user-icon" />
            {email}
          </p>
          <p className="total-field">
            <FaCoins />
            {'  '}
            <p>
              {currencySymbols[headerCurrency]}
              <span data-testid="total-field">{totalExp}</span>
            </p>
          </p>
          <div className="currency-choice">
            <RiMoneyDollarCircleLine className="curr-icon" />
            <select
              data-testid="header-currency-field"
              name="header-currency"
              id="header-currency"
              value={ heaCurr }
              onChange={ this.handleChange }
            >
              {allCurr.map((curr) => (
                <option key={ curr } value={ curr }>
                  {curr}
                </option>
              ))}
            </select>
          </div>
          <button
            className="logout"
            onClick={ this.logout }
            type="button"
            title="Logout"
          >
            <FiLogOut className="logout-icon" />
          </button>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  headerCurrency: state.wallet.headerCurrency,
  totalExp: state.wallet.totalExp,
});

const mapDispatchToProps = (dispatch) => ({
  changeCurr: (newCurrency) => dispatch(changeHeaderCurr(newCurrency)),
});

Header.propTypes = {
  email: PropTypes.string,
  totalExp: PropTypes.string,
  changeCurr: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  headerCurrency: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Header);
