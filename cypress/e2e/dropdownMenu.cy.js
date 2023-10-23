describe('DropdownMenu Component', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000', {
          onBeforeLoad(win) {
            Object.defineProperty(win.navigator, 'language', { value: 'en' });
          }
        });
    });

    it('should load notifications correctly', () => {
      cy.get('button[title="Notifications"]').click();
      cy.get('.dropdown_notification-text').should('have.length.at.least', 1); // Asegurarse de que al menos hay una notificación
      cy.get('.dropdown_notification-time').should('have.length.at.least', 1); // Asegurarse de que al menos hay un tiempo de notificación
    });
  
    it('should load more notifications when LoadMore button is clicked', () => {
      cy.get('button[title="Notifications"]').click();
      cy.get('.dropdown_notification-text').should('have.length', 5);
      cy.get('.dropdown_load-more-button').click();
      cy.get('.dropdown_notification-text').should('have.length', 8);
    });
  
  });