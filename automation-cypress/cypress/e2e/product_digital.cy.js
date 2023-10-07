import ProductDigitalPage from '../page_objects/ProductDigitalPage';

describe('Verify Telkomsel, Indosat Ooredoo, and XL', () => {
  beforeEach(() => {
    ProductDigitalPage.visit();
  });

  it('scroll to find out cellular providers', () => {
    ProductDigitalPage.scroll_to_mobile_data_package()
    ProductDigitalPage.verify_provider_logos_visible()
  });
});

