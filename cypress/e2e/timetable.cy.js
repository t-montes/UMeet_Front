describe('Timetable Component', () => {
    // Visit your local development server before running tests
    beforeEach(() => {
        cy.visit('http://localhost:3000', {
            onBeforeLoad (win) {
                Object.defineProperty(win.navigator, 'language', {value: 'en'});
            }
        })
    });

    it('should render the timetable', () => {
        cy.get('[data-testid=timetable]').should('be.visible');
    });
  
    it('should display the current week', () => {
        cy.get('[data-testid=timetable-title]').should('be.visible');

        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        cy.get('[data-testid=timetable-title]').should('contain', month);
        cy.get('[data-testid=timetable-title]').should('contain', year);
    });
  
    it('should navigate to the next week', () => {
        cy.get('button:contains(">")').click(); // Click the "Next Week" button
        cy.get('[data-testid=timetable-title]').should('be.visible');

        const date = new Date();
        date.setDate(date.getDate() + 7);
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        cy.get('[data-testid=timetable-title]').should('contain', month);
        cy.get('[data-testid=timetable-title]').should('contain', year);
    });
  
    it('should navigate to the previous week', () => {
        cy.get('button:contains("<")').click(); // Click the "Previous Week" button
        cy.get('[data-testid=timetable-title]').should('be.visible');

        const date = new Date();
        date.setDate(date.getDate() - 7);
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        cy.get('[data-testid=timetable-title]').should('contain', month);
        cy.get('[data-testid=timetable-title]').should('contain', year);
    });
  
    it('should go back to today when "Today" button is clicked', () => {
        cy.get('button:contains("Today")').click(); // Click the "Today" button
        cy.get('[data-testid=timetable-title]').should('be.visible');

        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        cy.get('[data-testid=timetable-title]').should('contain', month);
        cy.get('[data-testid=timetable-title]').should('contain', year);
    });

    it('should go back to today, even after navigating to the next week', () => {
        const rnd = Math.floor(Math.random() * 10) + 1;
        for (let i = 0; i < rnd; i++) {
            cy.get('button:contains(">")').click(); // Click the "Next Week" button
        }
        cy.get('button:contains("Today")').click(); // Click the "Today" button
        cy.get('[data-testid=timetable-title]').should('be.visible');

        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        cy.get('[data-testid=timetable-title]').should('contain', month);
        cy.get('[data-testid=timetable-title]').should('contain', year);
    });

    it('should go back to today, even after navigating to the previous week', () => {
        const rnd = Math.floor(Math.random() * 10) + 1;
        for (let i = 0; i < rnd; i++) {
            cy.get('button:contains("<")').click(); // Click the "Next Week" button
        }
        cy.get('button:contains("Today")').click(); // Click the "Today" button
        cy.get('[data-testid=timetable-title]').should('be.visible');

        const date = new Date();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        cy.get('[data-testid=timetable-title]').should('contain', month);
        cy.get('[data-testid=timetable-title]').should('contain', year);
    }); 
});
  