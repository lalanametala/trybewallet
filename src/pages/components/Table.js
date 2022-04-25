import PropTypes from 'prop-types';
import React from 'react';
import { FiTrash2 } from 'react-icons/fi';
import { RiEditLine } from 'react-icons/ri';
import { connect } from 'react-redux';
import { currencySymbols, tableLabels } from '../helpers';
import './Table.css';

class Table extends React.Component {
  isBRL = (exp, altern) => (exp.currency === 'BRL'
    ? 1.00
    : Number(altern.ask)
  )

  render() {
    const {
      expenses,
      handleEdit,
      handleDelete,
      headerCurrency,
    } = this.props;

    return (
      <table>
        <h3>Despesas</h3>
        <thead>
          {tableLabels.map((label) => (
            <th name={ label } key={ label }>{label}</th>
          ))}
        </thead>
        {expenses.map((exp, index) => (
          <tbody key={ index }>
            <tr>
              <td data-th={ tableLabels[0] }>
                {exp.description}
              </td>
              <td data-th={ tableLabels[1] }>{exp.tag}</td>
              <td data-th={ tableLabels[2] }>{exp.method}</td>
              <td data-th={ tableLabels[3] }>
                {`${currencySymbols[exp.currency]}${Number(exp.value)
                  .toLocaleString('pt-BR', {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2 })}`}

              </td>
              <td data-th={ tableLabels[4] }>
                {
                  headerCurrency === 'BRL'
                    ? 'Real'
                    : exp.exchangeRates[headerCurrency].name.split('/')[0]
                }
              </td>
              <td data-th={ tableLabels[5] }>
                {currencySymbols[headerCurrency]}
                {
                  headerCurrency === 'BRL'
                    ? this
                      .isBRL(exp, exp.exchangeRates[exp.currency])
                      .toLocaleString('pt-BR', {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2 })
                    : (this.isBRL(exp, exp.exchangeRates[exp.currency])
                    / (+exp.exchangeRates[headerCurrency].ask))
                      .toLocaleString('pt-BR', {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2 })
                }
              </td>
              <td data-th={ tableLabels[6] }>
                {currencySymbols[headerCurrency]}
                {
                  headerCurrency === 'BRL'
                    ? (+exp.value * this
                      .isBRL(exp, exp.exchangeRates[exp.currency]))
                      .toLocaleString('pt-BR', {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2 })
                    : ((+exp.value * this
                      .isBRL(exp, exp.exchangeRates[exp.currency]))
                      / +exp.exchangeRates[headerCurrency].ask)
                      .toLocaleString('pt-BR', {
                        maximumFractionDigits: 2,
                        minimumFractionDigits: 2 })
                }
              </td>
              <td data-th={ tableLabels[7] }>
                {
                  exp.currency === 'BRL'
                    ? 'Real'
                    : exp.exchangeRates[exp.currency].name.split('/')[0]
                }
              </td>
              <td className="buttons">
                <button
                  type="button"
                  data-testid="edit-btn"
                  className="edit-btn"
                  id={ exp.id }
                  onClick={ handleEdit }
                >
                  <RiEditLine />
                </button>
                <button
                  type="button"
                  data-testid="delete-btn"
                  className="delete-btn"
                  id={ exp.id }
                  onClick={ handleDelete }
                >
                  <FiTrash2 />
                </button>
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  headerCurrency: state.wallet.headerCurrency,
});

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  handleEdit: PropTypes.func,
  handleDelete: PropTypes.func,
  headerCurrency: PropTypes.string,
}.isRequired;

export default connect(mapStateToProps)(Table);
