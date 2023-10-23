describe('AddFriendsPage Component', () => {

    beforeEach(() => {
      cy.visit('http://localhost:3000/friends-add', {
        onBeforeLoad(win) {
          Object.defineProperty(win.navigator, 'language', { value: 'en' });
        }
      });
    });
  
    it('should render the SearchBar component', () => {
        cy.get('.searchbar-input').should('be.visible'); // Selecciona por clase
    });
  
    it('should render the Carousel component when there are friend pairs', () => {
      cy.get('.AddFriendsPage').should('be.visible');
    });
  
    it('should show the "NoResults" message when no friends match the search', () => {
      cy.get('.searchbar-input').type('NonExistentFriendName');
      cy.get('.AddFriendsPage_no-results-message').should('be.visible');
    });
  
    it('should render the carousel arrows', () => {
      cy.get('.custom-arrow-PREV').should('be.visible');
      cy.get('.custom-arrow-NEXT').should('be.visible');
    });
  
    it('should navigate through the carousel using arrows', () => {
      cy.get('.custom-arrow-NEXT').click();
    });
  
    it('should show and navigate using the custom pagination', () => {
      cy.get('.AddFriendsPage_pagination-container').should('be.visible');
      cy.get('.AddFriendsPage_custom-pagination-dot:not(.active)').first().click();
    });
  
    it('should filter friends based on search input', () => {
      cy.get('.searchbar-input').type('Sofia Torres');
      cy.get('.AddFriendsPage_friend-name').should('contain', 'Sofia Torres');
    });
  
    it('should be able to click the add button of a friend', () => {
      cy.get('.AddFriendsPage_add-button').first().click();
    });
  
    it('should disable and show "Added" on the button after a friend is added', () => {
      cy.get('.AddFriendsPage_add-button').first().click().should('be.disabled');
      cy.get('.AddFriendsPage_add-button.added').should('be.visible').and('contain', 'Added');
    });
    
  });  