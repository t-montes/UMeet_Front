describe('groupsPage Component', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000', {
      onBeforeLoad (win) {
          Object.defineProperty(win.navigator, 'language', {value: 'en'});
      }
    })
  });

  it('should render the groups page component', () => {
    cy.visit('http://localhost:3000/groups');
    cy.get('.GroupsPage-carousel-wrapper').should('be.visible');
  })

  it('should render the arrows component', () => {
    cy.visit('http://localhost:3000/groups');
    cy.get('.GroupsPage-custom-arrow-NEXT').should('be.visible');
    cy.get('.GroupsPage-custom-arrow-PREV').should('be.visible');

  })

  it('should change the pagination when NEXT arrows are pressed', () => {
    cy.visit('http://localhost:3000/groups');
    cy.wait(3000);
    cy.get('.GroupsPage-custom-arrow-NEXT').click();
    cy.wait(1000);
    cy.get('.GroupsPage-custom-arrow-NEXT').click();
  })

  it('should change the pagination when PREV arrows are pressed', () => {
    cy.visit('http://localhost:3000/groups');
    cy.wait(3000);
    cy.get('.GroupsPage-custom-arrow-NEXT').click();
    cy.wait(1000);
    cy.get('.GroupsPage-custom-arrow-PREV').click();
  })
})