// Autor: Belén Cepeda

describe('Pruebas en Sauce Demo', () => {
  it('Realizar la compra de dos productos', () => {
   
    // Ingresar a inicio de sesión
    cy.visit('https://www.saucedemo.com');

    // Inicio de sesión
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');

    // Agregar dos productos al carrito
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();

    // Visualizar el carrito
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.url().should('include', '/cart.html');
    cy.get('.cart_item').should('have.length', 2);
    cy.get('.cart_item').eq(0).should('contain.text', 'Sauce Labs Backpack');
    cy.get('.cart_item').eq(1).should('contain.text', 'Sauce Labs Bolt T-Shirt');

    // Completar el formulario de compra
    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one.html');
    cy.get('[data-test="firstName"]').type('Belen');
    cy.get('[data-test="lastName"]').type('Cepeda');
    cy.get('[data-test="postalCode"]').type('11111');
    cy.get('[data-test="continue"]').click();
    cy.url().should('include', '/checkout-step-two.html');
    cy.get('.cart_item').should('have.length', 2); 
    cy.get('.summary_info').should('contain.text', 'SauceCard #31337');

    // Finalizar la compra hasta la confirmación: “THANK YOU FOR YOUR ORDER”
    cy.get('[data-test="finish"]').click();
    cy.url().should('include', '/checkout-complete.html');
    cy.get('.complete-header').should('contain.text', 'Thank you for your order!');
    cy.get('.complete-text').should('contain.text', 'Your order has been dispatched');
  });
});
