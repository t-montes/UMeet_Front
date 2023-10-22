describe('groupsPage Component', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000');
  });

  it('should render the groups page component', () => {
    cy.visit('http://localhost:3000/groups');
    cy.get('.GroupsPage-group-container').first().click();
    cy.get('.textBox').should('be.visible');
    cy.get('.timetable-main').should('be.visible');
  })

});