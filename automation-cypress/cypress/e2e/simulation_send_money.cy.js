import HomePage from '../page_objects/HomePage';
import FlipGlobe from '../page_objects/FlipGlobe';

describe('Verify service to send money', () => {
  let sourceCurrency = 'IDR'
  let targetCurrency = 'GBP'
  let amountRupiah = 500000
  
  it('ensure the calculation is correct to the exchange rate', () => {
    HomePage.visit()
    HomePage.access_flip_globe();
    FlipGlobe.verify_simulation_send_money(sourceCurrency, targetCurrency, amountRupiah);
  });
});