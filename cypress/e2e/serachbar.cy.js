describe('SearchBar Component', () => {

    beforeEach(() => {
      cy.visit('http://localhost:3000', {
        onBeforeLoad(win) {
          Object.defineProperty(win.navigator, 'language', { value: 'en' });
        }
      });
    });
  
    it('should render the SearchBar component', () => {
      cy.visit('http://localhost:3000/friends-add');
      cy.get('.group').should('be.visible');
    })
  
    it('should have a search icon', () => {
      cy.visit('http://localhost:3000/friends-add');
      cy.get('.icon').should('be.visible');
    })
  
    it('should display input field with a placeholder "Search"', () => {
      cy.visit('http://localhost:3000/friends-add');
      cy.get('.searchbar-input').should('be.visible')
                                 .and('have.attr', 'placeholder', 'Search');
    })
  
    it('should type in the input field and capture the value', () => {
      const inputValue = 'Sample Text';
  
      cy.visit('http://localhost:3000/friends-add');
      cy.get('.searchbar-input')
        .type(inputValue)
        .should('have.value', inputValue);
    })
  
    it('should trigger input change event', () => {
      cy.visit('http://localhost:3000/friends-add');
      cy.get('.searchbar-input')
        .invoke('val', 'Another Text')
        .trigger('change')
        .should('have.value', 'Another Text');
    })
  })  