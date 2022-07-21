import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import {
  changeExpenses, fetchCurrencies, fetchExchangeRates, saveTotal,
} from '../actions';
import ExpensesForm from './components/ExpensesForm';
import Footer from './components/Footer';
import Header from './components/Header';
import Table from './components/Table';
import { INITIAL_STATE } from './helpers';

class Wallet extends React.Component {
  constructor(props) {
    super(props);
    this.state = INITIAL_STATE;
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange = ({ target: { value, name } }) => {
    this.setState({
      [name]: value,
    }, this.formValidation);
  }

  formValidation = () => {
    const { value, description } = this.state;
    if (value > 0 && description.length > 2) {
      this.setState({ btnDisabled: false });
    } else this.setState({ btnDisabled: true });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { sendExpense, expenses, editExpenses } = this.props;
    const { btnLabel, editId, value, description, currency, method, tag } = this.state;
    if (btnLabel === 'Adicionar despesa') {
      await sendExpense({
        value,
        description,
        currency,
        method,
        tag,
      });
    } else {
      const newExpenses = expenses.map((exp) => {
        if (exp.id === +editId) {
          return ({
            ...exp,
            value,
            description,
            currency,
            method,
            tag,
            id: exp.id,
          });
        }
        return exp;
      });
      await editExpenses(newExpenses);
    }
    this.setState(INITIAL_STATE);
    this.calculateTotal();
  }

  calculateTotal = () => {
    const { expenses, headerCurrency, saveTotalExp } = this.props;
    const brlTotal = expenses
      .reduce((acc, expense) => {
        const {
          value, exchangeRates, currency,
        } = expense;
        if (currency === 'BRL') return +value;
        return acc + (+value * +exchangeRates[currency].ask);
      }, 0);

    if (headerCurrency !== 'BRL' && expenses.length) {
      const rates = expenses[0].exchangeRates;
      saveTotalExp((+brlTotal / +rates[headerCurrency].ask)
        .toLocaleString('pt-BR', {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2 }));
    } else {
      saveTotalExp(brlTotal.toLocaleString('pt-BR', {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2 }));
    }
  }

  handleDelete = async ({ target: { id } }) => {
    const { expenses, editExpenses } = this.props;
    const newExpenses = expenses
      .filter((exp) => exp.id !== +id);
    await editExpenses(newExpenses);
    this.calculateTotal();
    this.setState(INITIAL_STATE);
  }

  handleEdit = ({ target: { id } }) => {
    const { expenses } = this.props;
    const { value, description, currency, method, tag } = expenses
      .find((exp) => exp.id === +id);
    this.setState({ value,
      description,
      currency,
      method,
      tag,
      btnLabel: 'Editar despesa',
      editId: id });
  }

  render() {
    const { email, currencies, history } = this.props;
    const {
      value, description, currency, method, tag, btnLabel, btnDisabled,
    } = this.state;
    return (
      <>
        <Header
          email={ email }
          // ALTERAR ISSO URGENTE!!! SALVAR TOTAL NA STORE!!!!!!
          // totalExp={ this.calculateTotal() }
          currencies={ currencies }
          history={ history }
        />
        <ExpensesForm
          value={ value }
          description={ description }
          currency={ currency }
          method={ method }
          tag={ tag }
          btnLabel={ btnLabel }
          btnDisabled={ btnDisabled }
          currencies={ currencies }
          handleSubmit={ this.handleSubmit }
          handleChange={ this.handleChange }
        />
        <Table handleEdit={ this.handleEdit } handleDelete={ this.handleDelete } />
        <Footer />
      </>);
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  headerCurrency: state.wallet.headerCurrency,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchCurrencies()),
  sendExpense: (expense) => dispatch(fetchExchangeRates(expense)),
  editExpenses: (expenses) => dispatch(changeExpenses(expenses)),
  saveTotalExp: (totalExp) => dispatch(saveTotal(totalExp)),
});

Wallet.propTypes = {
  email: PropTypes.string,
  currencies: PropTypes.arrayOf(PropTypes.string),
  expenses: PropTypes.arrayOf(PropTypes.object),
  getCurrencies: PropTypes.func,
  sendExpense: PropTypes.func,
  editExpenses: PropTypes.func,
  saveTotalExp: PropTypes.func,
  headerCurrency: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
