describe('DropdownFriends Component', () => {

    beforeEach(() => {
      cy.visit('http://localhost:3000', {
        onBeforeLoad(win) {
          Object.defineProperty(win.navigator, 'language', { value: 'en' });
        }
      });
    });
  
    it('should show the DropdownFriends component when hovering over the Friends button', () => {
      cy.get('button').contains('Friends').trigger('mouseover');
      cy.get('.dropdown_friends').should('be.visible');
    });
  
    it('should hide the DropdownFriends component when the mouse leaves', () => {
      const friendsButton = cy.get('button').contains('Friends');
      
      friendsButton.trigger('mouseover');
      cy.get('.dropdown_friends').should('be.visible');
  
      friendsButton.trigger('mouseout');
      cy.wait(500); // Añadimos un pequeño tiempo de espera por si el menú se oculta muy rápido.
      cy.get('.dropdown_friends').should('not.exist'); // Cambiamos a not.exist ya que si se oculta el elemento podría no existir.
    });
  
    it('should navigate to the Add Friends page when clicking on the "Agregar amigos" option', () => {
      cy.get('button').contains('Friends').trigger('mouseover');
      cy.get('.dropdown_friends-item-content a').first().click(); // Usamos first() ya que "Agregar amigos" es el primer enlace.
      cy.url().should('eq', 'http://localhost:3000/friends-add');
    });
  
    it('should navigate to the My Friends page when clicking on the "Ver amigos" option', () => {
      cy.get('button').contains('Friends').trigger('mouseover');
      cy.get('.dropdown_friends-item-content a').eq(1).click(); // Usamos eq(1) para obtener el segundo enlace.
      cy.url().should('eq', 'http://localhost:3000/friends');
    });
  
  });  