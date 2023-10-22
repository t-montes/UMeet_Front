describe('groupCreateMenu Component', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000', {
      onBeforeLoad (win) {
          Object.defineProperty(win.navigator, 'language', {value: 'en'});
      }
    })
  });

  it('should render the group create menu component', () => {
    cy.get('[data-testid="action-button-1"]').click({ force: true });
    cy.get('.MuiBox-root.css-qllggt').should('be.visible');
  })

  it('should fail to create a group with no name', () => {
    cy.get('[data-testid="action-button-1"]').click({ force: true });
    cy.get('.GroupCreateMenu-button').click();
    cy.contains('Please enter an group name.');
  })

  it('should create a group with a name', () => {
    cy.get('[data-testid="action-button-1"]').click({ force: true });
    cy.get('.MuiInputBase-input').type('Test Group');
    cy.get('.GroupCreateMenu-button').click();
    cy.get('.MuiBox-root.css-qllggt').should('not.exist');
  })
})