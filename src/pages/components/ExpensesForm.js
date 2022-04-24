import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { methOpt, tagOpt } from '../helpers';
import './ExpensesForm.css';

class ExpensesForm extends React.Component {
  render() {
    const {
      value, description, currency, btnDisabled,
      method, tag, btnLabel, currencies, handleSubmit, handleChange,
    } = this.props;
    const currenciesAndBRL = [...currencies, 'BRL'];
    return (
      <form onSubmit={ handleSubmit } className="expenses-form">
        <label
          htmlFor="value"
          className="value-label"
        >
          Valor
          <input
            data-testid="value-input"
            type="number"
            name="value"
            value={ value }
            placeholder="Valor"
            onChange={ handleChange }
            className="value-input"
          />
        </label>
        <label
          htmlFor="description"
          className="description-label"
        >
          Descrição
          <input
            data-testid="description-input"
            type="text"
            name="description"
            value={ description }
            placeholder="Descrição"
            onChange={ handleChange }
          />
        </label>
        <label
          htmlFor="currency"
          className="currency-label"
        >
          Moeda
          <select
            name="currency"
            id="currency"
            value={ currency }
            onChange={ handleChange }
            data-testid="currency-input"
          >
            {
              currenciesAndBRL.map((curr) => (
                <option key={ curr } value={ curr }>
                  {curr}
                </option>
              ))
            }
          </select>
        </label>
        <label
          htmlFor="method"
          className="method-label"
        >
          Método de Pagamento
          <select
            name="method"
            id="method"
            value={ method }
            onChange={ handleChange }
            data-testid="method-input"
          >
            {
              methOpt.map((meth) => (
                <option key={ meth } value={ meth }>
                  {meth}
                </option>
              ))
            }
          </select>
        </label>
        <label
          htmlFor="tag"
          className="tag-label"
        >
          Tipo de Despesa
          <select
            name="tag"
            id="tag"
            value={ tag }
            onChange={ handleChange }
            data-testid="tag-input"
          >
            {
              tagOpt.map((type) => (
                <option key={ type } value={ type }>
                  {type}
                </option>
              ))
            }
          </select>
        </label>
        <button type="submit" disabled={ btnDisabled }>
          {btnLabel}
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

ExpensesForm.propTypes = {
  currencies: PropTypes.arrayOf(PropTypes.string),
  getCurrencies: PropTypes.func,
  sendExpense: PropTypes.func,
  editExpenses: PropTypes.func,
  btnDisabled: PropTypes.bool,
}.isRequired;

export default connect(mapStateToProps)(ExpensesForm);
