import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import WalletForm from '../components/WalletForm';
import WalletHeader from '../components/WalletHeader';
import { fetchCurrencies } from '../actions/currency';
import WalletTable from '../components/WalletTable';

class Wallet extends React.Component {
  componentDidMount() {
    // for the options inside the form
    const { currenciesGetter } = this.props;
    currenciesGetter();
  }

  render() {
    return (
      <div>
        <WalletHeader />
        <WalletForm />
        <WalletTable />
      </div>

    );
  }
}

Wallet.propTypes = {
  currenciesGetter: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  currenciesGetter: () => dispatch(fetchCurrencies()),
});

export default connect(null, mapDispatchToProps)(Wallet);
