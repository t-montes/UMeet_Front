describe('eventCreateMenu Component', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000', {
      onBeforeLoad (win) {
          Object.defineProperty(win.navigator, 'language', {value: 'en'});
      }
    })
  });

  it('should render the group create menu component', () => {
    cy.get('[data-testid="action-button-0"]').click({ force: true });
    cy.get('.MuiBox-root.css-n71kjy').should('be.visible');
  })

  it('should fail to create an event with no name', () => {
    cy.get('[data-testid="action-button-0"]').click({ force: true });
    cy.contains('button', 'Create').click();
    cy.contains('Please enter an event name.');
  })

  it('should fail to create an event with no start time', () => {
    cy.get('[data-testid="action-button-0"]').click({ force: true });
    cy.get('#\\:r1\\:').type('Test Event');
    cy.contains('button', 'Create').click();
    cy.contains('Please select a start time.');
  })

  it('should fail to create an event with no end time', () => {
    cy.get('[data-testid="action-button-0"]').click({ force: true });
    cy.get('#\\:r1\\:').type('Test Event');
    cy.get('#\\:r7\\:').type('10:00');
    cy.contains('button', 'Create').click();
    cy.contains('Please select an end time.');
  })

  it('should create an event successfully if all required fields where filled', () => {
    cy.get('[data-testid="action-button-0"]').click({ force: true });
    cy.get('#\\:r1\\:').type('Test Event');
    cy.get('#\\:r7\\:').type('10:00');
    cy.get('#\\:r9\\:').type('11:00');
    cy.contains('button', 'Create').click();
    cy.get('.MuiBox-root.css-n71kjy').should('not.exist');
  })
})