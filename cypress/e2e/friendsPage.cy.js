describe('FriendsPage Component', () => {

    beforeEach(() => {
        cy.visit('http://localhost:3000', {
          onBeforeLoad(win) {
            Object.defineProperty(win.navigator, 'language', { value: 'en' });
          }
        });
    });
  
    it('should render the SearchBar component', () => {
      cy.visit('http://localhost:3000/friends');
      cy.get('.searchbar-input').should('be.visible'); // Selecciona por clase
    });
  
    it('should render the Carousel component when there are friends', () => {
      cy.visit('http://localhost:3000/friends');
      cy.get('.FriendsPage').should('be.visible'); // Selecciona el contenedor principal de FriendsPage
    });
  
    it('should show the "No se encontraron resultados" message when no friends match the search', () => {
      cy.visit('http://localhost:3000/friends');
      cy.get('.searchbar-input').type('NonExistentFriendName');
      cy.get('.FriendsPage_no-results-message').should('be.visible').and('contain', 'No se encontraron resultados');
    });
  
    it('should render the carousel arrows', () => {
      cy.visit('http://localhost:3000/friends');
      cy.get('.FriendsPage_custom-arrow-PREV').should('be.visible');
      cy.get('.FriendsPage_custom-arrow-NEXT').should('be.visible');
    });
  
    it('should navigate through the carousel using arrows', () => {
      cy.visit('http://localhost:3000/friends');
      cy.get('.FriendsPage_custom-arrow-NEXT').click();
    });
  
    it('should show and navigate using the custom pagination', () => {
      cy.visit('http://localhost:3000/friends');
      cy.get('.FriendsPage_pagination-container').should('be.visible');
      cy.get('.FriendsPage_custom-pagination-dot:not(.active)').first().click();
    });
  
    it('should filter friends based on search input', () => {
      cy.visit('http://localhost:3000/friends');
      cy.get('.searchbar-input').type('Sofia Torres');
      cy.get('.FriendsPage_friend-name').should('contain', 'Sofia Torres');
    });
  });  