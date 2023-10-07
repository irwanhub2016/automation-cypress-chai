class HomePage {
    constructor() {
      this.buttonId = '.toggle-language label div:nth-child(1) p';
      this.buttonEng = '.toggle-language label div:nth-child(2) p';
      this.buttonLanding = 'button[id *= popover] a[href *= "/landing"]';
      this.linkFlipGlobe = 'a[href="https://flip.id/flip-globe"]';
    }
  
    visit() {
      cy.visit('/');
    }
  
    access_flip_globe(){
      cy.get(this.buttonLanding)
        .should('be.visible')
      
      cy.get(this.buttonLanding)
        .click()
  
      cy.get(this.linkFlipGlobe)
        .should('be.visible'); 
  
      cy.get(this.linkFlipGlobe)
        .click()        
    }

    verify_switch_page_to_indonesia() {
        cy.get(this.buttonId).click();
        cy.get('body').should('contain', 'Bebas transaksi, ke siapa aja.');
    }

    verify_switch_page_to_english() {
        cy.get(this.buttonEng).click();
        cy.get('body').should('contain', 'Bebas transaksi, ke siapa aja.');
    }
}
  
  export default new HomePage();