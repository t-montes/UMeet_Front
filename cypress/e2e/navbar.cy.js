describe('Navbar Component', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000', {
            onBeforeLoad (win) {
                Object.defineProperty(win.navigator, 'language', {value: 'en'});
            }
        })
    });

    it('should render the navbar', () => {
        cy.get('[data-testid=navbar]').should('be.visible');
    });

    it('should navigate to the timetable page when the "My Schedule" button is clicked', () => {
        cy.contains('a', 'My Schedule').click();
        cy.get('[data-testid=timetable]').should('be.visible');
    });

    /*it('should navigate to the settings page when the "Settings" button is clicked', () => {
        cy.contains('a', 'Friends').click();
        cy.get('[data-testid=settings]').should('be.visible');
    });

    it('should navigate to the about page when the "About" button is clicked', () => {
        cy.get('button:contains("About")').click();
        cy.get('[data-testid=about]').should('be.visible');
    });*/
});