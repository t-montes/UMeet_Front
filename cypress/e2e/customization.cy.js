describe('Customization Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/settings', {
          onBeforeLoad(win) {
            Object.defineProperty(win.navigator, 'language', { value: 'en' });
          }
        });
      });

      it('should open and close the Customization component', () => {
        cy.get('.customization_btn').click();
        cy.wait(500);  // espera medio segundo para permitir transiciones o animaciones
        cy.get('.customization').should('be.visible');
      });
    
      it('should select a day from the ControlledSelect component', () => {
        cy.get('.customization_btn').click();
        cy.get('.customization').should('be.visible');
        cy.get('.customization_select-customization_container select').first().select('Tuesday');
      });
    
      it('should toggle the CheckBox', () => {
        cy.get('.customization_btn').click();
        cy.get('.customization_select-customization_container input[type="checkbox"]').first().uncheck();
        cy.get('.customization_select-customization_container input[type="checkbox"]').first().should('not.be.checked');
      });
    
      it('should change the Slider value', () => {
        cy.get('.customization_btn').click();
    
        cy.get('.slider_range').invoke('val', 70).trigger('input').trigger('change');
        cy.get('.slider_range-value').should('contain.text', '50px');
      });
    
      it('should change color using the ColorPicker', () => {
        cy.get('.customization_btn').click();
        cy.get('.color-picker').invoke('val', '#ff5733').trigger('change');
      });
});