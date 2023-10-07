class ProductDigitalPage {
    constructor() {
      this.mobilDataPackages = 'img[alt="Isi Ulang Paket Data"],img[alt="Mobile Data Packages"]';
      this.logoAxis = 'img[alt="axis"]';
      this.logoIndosat = 'img[alt="indosat"]';
      this.logoSmartfren = 'img[alt="smartfren"]';
      this.logoTelkomsel = 'img[alt="telkomsel"]';
      this.logoTri = 'img[alt="tri"]';
      this.logoXl = 'img[alt="XL"]';
    }   

    visit() {
        cy.visit('/produk-digital');
      }

    scroll_to_mobile_data_package(){
        cy.get(this.mobilDataPackages).scrollIntoView()
        .should('be.visible')  
    }
    
    verify_provider_logos_visible() {
      cy.wait(1000)

      cy.get(this.logoAxis)
        .should('be.visible'); 
  
      cy.get(this.logoIndosat)
        .should('be.visible'); 
  
      cy.get(this.logoSmartfren)
        .should('be.visible'); 
  
      cy.get(this.logoTelkomsel)
        .should('be.visible'); 
  
      cy.get(this.logoTri)
        .should('be.visible'); 
  
      cy.get(this.logoXl)
      .should('be.visible'); 
    }
}
  
export default new ProductDigitalPage();