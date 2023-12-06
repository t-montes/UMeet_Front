describe('Customization Component', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/settings', {
      onBeforeLoad(win) {
        Object.defineProperty(win.navigator, 'language', { value: 'en' });
      }
    });
  });

  it('should select a day from the ControlledSelect component', () => {
    cy.get('.customization_btn').click({ force: true });
    cy.get('.customization').should('be.visible');
    cy.get('.customization_select-customization_container select').first().select('Tuesday');
  });

  it('should toggle the CheckBox', () => {
    cy.get('.customization_btn').click();
    cy.get('.customization_container input[type="checkbox"]').first().check();
    cy.get('.customization_container input[type="checkbox"]').first().should('be.checked');
  });

  it('should change the start and end time values', () => {
    cy.get('.customization_btn').click();
    cy.get('.customization_container input[type="number"]').eq(0).clear().type('9');
    cy.get('.customization_container input[type="number"]').eq(1).clear().type('17');
  });

  it('should display a warning if startHour is greater than endHour', () => {
    cy.get('.customization_btn').click();
    cy.get('.customization').should('be.visible');

    // Establecer un valor de startHour mayor que endHour
    cy.get('.customization_container input[type="number"]').eq(0).clear().type('20'); // startHour
    cy.get('.customization_container input[type="number"]').eq(1).clear().type('18'); // endHour

    // Hacer clic en el botón de guardar o similar para activar la validación
    cy.get('.customization_close').click(); 

    // Verificar que aparece la advertencia
    cy.get('.customization_warning').should('contain.text', 'Start time must be greater than end time');
  });
  
});
