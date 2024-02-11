import PropTypes from 'prop-types';
import { convertUSDToPLN } from './../../utils/convertUSDToPLN';
import { convertPLNToUSD } from './../../utils/convertPLNToUSD';
import { formatAmountInCurrency } from './../../utils/formatAmountInCurrency';
import { useMemo } from 'react';
import styles from './ResultBox.module.scss';
import clsx from 'clsx';

const ResultBox = ({ from, to, amount }) => {

  const convertedAmount = useMemo(() => {
    if(from === 'USD' && to === 'PLN') return convertUSDToPLN(amount);
    if(from === 'PLN' && to === 'USD') return convertPLNToUSD(amount);
    return formatAmountInCurrency(amount, from);
  }, [from, to, amount]);

  const formattedAmount = useMemo(() => formatAmountInCurrency(amount, from), [amount, from]);

  if(!validator(amount)) return (
    <div data-testid='result-div'  className={clsx(styles.result, styles.error)}>
      Wrong amount value!!
    </div>
  ); 
  return (
    <div data-testid='result-div' className={styles.result}>
      {formattedAmount} = {convertedAmount}
    </div>
  );
};

ResultBox.propTypes = {
  from: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
}

const validator = (value) => {
  if(isNaN(value)) return false;
  if (typeof value !== 'number') return false;
  if (value <= 0) return false;
  return true;
}

export default ResultBox;