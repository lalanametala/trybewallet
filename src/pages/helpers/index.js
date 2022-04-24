export const methOpt = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito', 'PIX'];

export const tagOpt = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];

export const tableLabels = [
  'Descrição',
  'Tag', 'Método de pagamento',
  'Valor', 'Moeda', 'Câmbio utilizado',
  'Valor convertido', 'Moeda de conversão', 'Editar/Excluir',
];

export const INITIAL_STATE = {
  value: '',
  description: '',
  currency: 'USD',
  method: methOpt[0],
  tag: tagOpt[0],
  btnLabel: 'Adicionar despesa',
  editId: '',
  btnDisabled: true,
};

const symbolsArr = [
  {
    currency: 'Argentina Peso',
    abbreviation: 'ARS',
    symbol: '$',
  },
  {
    currency: 'Australia Dollar',
    abbreviation: 'AUD',
    symbol: '$',
  },
  {
    currency: 'Brazil Real',
    abbreviation: 'BRL',
    symbol: 'R$',
  },
  {
    currency: 'Canada Dollar',
    abbreviation: 'CAD',
    symbol: '$',
  },
  {
    currency: 'China Yuan Renminbi',
    abbreviation: 'CNY',
    symbol: '¥',
  },
  {
    currency: 'Euro Member Countries',
    abbreviation: 'EUR',
    symbol: '€',
  },
  {
    currency: 'Israel Shekel',
    abbreviation: 'ILS',
    symbol: '₪',
  },
  {
    currency: 'Japan Yen',
    abbreviation: 'JPY',
    symbol: '¥',
  },
  {
    currency: 'Switzerland Franc',
    abbreviation: 'CHF',
    symbol: 'CHF',
  },
  {
    currency: 'United Kingdom Pound',
    abbreviation: 'GBP',
    symbol: '£',
  },
  {
    currency: 'United States Dollar',
    abbreviation: 'USD',
    symbol: '$',
  },
];

const rdc = symbolsArr.reduce((acc, curr) => {
  acc[curr.abbreviation] = curr.symbol;
  return acc;
}, {});

export const currencySymbols = {
  ...rdc,
  LTC: 'Ł',
  BTC: '₿',
  ETH: 'Ξ',
  XRP: 'XRP',
  DOGE: 'Ð',
};
