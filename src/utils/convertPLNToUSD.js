export const convertPLNToUSD = (PLN) => {
  if (typeof PLN !== 'string' && typeof PLN !== 'number' && 
             PLN !== undefined) return 'Error';
  if (typeof PLN !== 'number') return NaN;
  if (PLN <= 0) PLN = 0;

  const PLNtoUSD = PLN / 3.5;
  
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });


  return formatter.format(PLNtoUSD).replace(/\u00a0/g, ' ');
}