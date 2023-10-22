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

    it('should navigate to the groups page when the "Groups" button is clicked', () => {
        cy.contains('a', 'Groups').click();
        cy.get('.GroupsPage-carousel-wrapper').should('be.visible');
    });

    it('should navigate to the settings page when the "Settings" button is clicked', () => {
        cy.get('[title=Settings]').click();
        cy.get('[data-testid=settings]').should('be.visible');
    });

    it('should change to "EN" when the "Language" button is clicked', () => {
        cy.get('[title=Language]').click();
        cy.get('[title=Idioma]').should('contain', 'ES');
    });

    it('should open notification dropdown when "Notifications" button is clicked', () => {
        cy.get('[title=Notifications]').click();
        cy.get('[data-testid="notifications-dropdown"]').should('not.be.empty');
    });
});