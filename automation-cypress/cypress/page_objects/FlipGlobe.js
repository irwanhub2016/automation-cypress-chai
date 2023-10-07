class FlipGlobe {
    constructor() {
      this.listCurrency = '.toggle-language label div:nth-child(1) p';
      this.dropdownCurrency = '.toggle-language label div:nth-child(1) p';
      this.inputCurrency = '.toggle-language label div:nth-child(1) p';
      this.highlightedCurrency = '.toggle-language label div:nth-child(1) p';
      this.linkFlipGlobe = '.toggle-language label div:nth-child(2) p';
      this.txtCurencyRate = "//p[contains(text(),'Current Rate')]/following-sibling::div/p | //p[contains(text(),'Kurs Saat Ini')]/following-sibling::div/p"
      this.txtTransferFee = '//p[contains(text(), "+ Biaya transfer via Flip")]/following-sibling::p | //p[contains(text(), "+ Transfer fee via Flip")]/following-sibling::p'
      this.txtTotalPay = "//p[contains(text(),'Total Yang Harus Kamu Bayar')]/following-sibling::p | //p[contains(text(),'Total You Have to Pay')]/following-sibling::p"
    }
    
    verify_simulation_send_money(source_currency, target_currency, amount_rupiah){  
      let numericTotalValue;
      let numericTfValue;
      
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
        .type(amount_rupiah)
  
      cy.xpath(`//input[contains(@placeholder, 'Masukkan nominal dalam ${target_currency}')] | //input[contains(@placeholder, 'Input amount in ${target_currency}')]`)
        .click
    
      cy.wait(1000)
  
      cy.xpath(`//input[contains(@placeholder, 'Masukkan nominal dalam ${target_currency}')] | //input[contains(@placeholder, 'Input amount in ${target_currency}')]`)
        .invoke('val')
        .then((value) => {
          const targetCurrencyAmount = parseFloat(value.replace(',', '.'));;
          cy.log(`Amount in ${target_currency}: ${targetCurrencyAmount}`);
  
          cy.xpath(this.txtCurencyRate)
            .should('be.visible')
        });
      
      cy.xpath(this.txtTransferFee)
        .invoke('text')
        .then((text) => {
          numericTfValue = parseFloat(text.replace(/[^0-9]/g, ''));
      
          cy.xpath(this.txtTotalPay)
          .invoke('text')
          .then((text) => {
            const trimmedTotalText = text.replace(/[^0-9]/g, '');
            numericTotalValue = parseFloat(trimmedTotalText);
        
            cy.log(`Total pay: ${numericTotalValue}`);
            cy.log(`Transfer fee amount: ${numericTfValue}`);
            cy.log(`Amount in Rupiah: ${amount_rupiah}`);
            cy.log(`Expected Total Pay: ${numericTotalValue}`);
  
            cy.expect(numericTfValue + amount_rupiah).to.equal(numericTotalValue);
          });
        });
    }
}
  
  export default new FlipGlobe();