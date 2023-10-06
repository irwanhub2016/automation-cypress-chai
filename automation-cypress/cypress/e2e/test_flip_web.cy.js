describe('Language Toggle Test', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should change the language to ID and verify it', () => {
    cy.get('.toggle-language label div:nth-child(1) p').click();

    cy.get('body').should('contain', 'Bebas transaksi, ke siapa aja.');
  });

  it('should change the language to ENG and verify it', () => {
    cy.get('.toggle-language label div:nth-child(2) p').click();
    cy.get('body').should('contain', 'Free financial transactions, to anyone.');
  });
});

describe('Verify Telkomsel, Indosat Ooredoo, and XL', () => {
  beforeEach(() => {
    cy.visit('/produk-digital');
  });

  it('scroll to find out cellular providers', () => {
    cy.get('img[alt="Isi Ulang Paket Data"],img[alt="Mobile Data Packages"]').scrollIntoView()
      .should('be.visible')

    cy.wait(1000)

    cy.get('img[alt="axis"]')
      .should('be.visible'); 

    cy.get('img[alt="indosat"]')
      .should('be.visible'); 

    cy.get('img[alt="smartfren"]')
      .should('be.visible'); 

    cy.get('img[alt="telkomsel"]')
      .should('be.visible'); 

    cy.get('img[alt="tri"]')
      .should('be.visible'); 

    cy.get('img[alt="XL"]')
    .should('be.visible'); 
  });
});

describe('Verify service to send money', () => {
  let source_currency = 'IDR'
  let target_currency = 'GBP'
  let numericTotalValue;
  let numericTfValue;
  let amountRupiah = 500000
  
  beforeEach(() => {
    cy.visit('/');
  });

  it('ensure the calculation is correct to the exchange rate', () => {
    cy.get('button[id *= popover] a[href *= "/landing"]')
      .should('be.visible')
    
    cy.get('button[id *= popover] a[href *= "/landing"]')
      .click()

    cy.get('a[href="https://flip.id/flip-globe"]')
      .should('be.visible'); 

    cy.get('a[href="https://flip.id/flip-globe"]')
      .click()

    cy.url().should('include', '/flip-globe');

    cy.get('li[class*="chakra-breadcrumb__list-item"]')
      .should('be.visible')

    cy.get('button[class *= "chakra-menu__menu-button"]')
      .should('be.visible')

    cy.get('button[class *= "chakra-menu__menu-button"]')
      .click()

    cy.get('div[class *= chakra-modal__body] input')
    .should('be.visible')
    
    cy.get('div[class *= chakra-modal__body] input')
      .type('GBP')

    cy.xpath("//p[contains(text(),'United Kingdom')]")
      .click()

    cy.xpath(`//input[contains(@placeholder, 'Masukkan nominal dalam ${source_currency}')] | //input[contains(@placeholder, 'Input amount in ${source_currency}')]`)
      .type(amountRupiah)

    cy.xpath(`//input[contains(@placeholder, 'Masukkan nominal dalam ${target_currency}')] | //input[contains(@placeholder, 'Input amount in ${target_currency}')]`)
      .click
  
    cy.wait(1000)

    cy.xpath(`//input[contains(@placeholder, 'Masukkan nominal dalam ${target_currency}')] | //input[contains(@placeholder, 'Input amount in ${target_currency}')]`)
      .invoke('val')
      .then((value) => {
        const target_currency_amount = parseFloat(value.replace(',', '.'));;
        cy.log(`Amount in ${target_currency}: ${target_currency_amount}`);

        cy.xpath("//p[contains(text(),'Current Rate')]/following-sibling::div/p | //p[contains(text(),'Kurs Saat Ini')]/following-sibling::div/p")
          .should('be.visible')
      });
    
    cy.xpath('//p[contains(text(), "+ Biaya transfer via Flip")]/following-sibling::p | //p[contains(text(), "+ Transfer fee via Flip")]/following-sibling::p')
      .invoke('text')
      .then((text) => {
        numericTfValue = parseFloat(text.replace(/[^0-9]/g, ''));
    
        cy.xpath("//p[contains(text(),'Total Yang Harus Kamu Bayar')]/following-sibling::p | //p[contains(text(),'Total You Have to Pay')]/following-sibling::p")
        .invoke('text')
        .then((text) => {
          const trimmedTotalText = text.replace(/[^0-9]/g, '');
          numericTotalValue = parseFloat(trimmedTotalText);
      
          cy.log(`Total pay: ${numericTotalValue}`);
          cy.log(`Transfer fee amount: ${numericTfValue}`);
          cy.log(`Amount in Rupiah: ${amountRupiah}`);
          cy.log(`Expected Total Pay: ${numericTotalValue}`);

          cy.expect(numericTfValue + amountRupiah).to.equal(numericTotalValue);
        });
      });
  });
});