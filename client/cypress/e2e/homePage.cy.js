describe('homePage loads on visit', () => {
  it('displays homePage header', () => {
    cy.visit('http://localhost:3000');
    cy.get('h1');
    cy.should('be.visible');
    cy.should('have.text', 'Home Page');
  });
});
