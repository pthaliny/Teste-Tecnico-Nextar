///<reference types="cypress"/>

context('Adicionar e Remover itens da Sacola', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080)
        cy.visit('https://meucomercio.com.br/lojaqualificacao')
        cy.wait(500)
});

    const product1 = 'Product ATWBBFFZOA'
    const product2 = 'Product BWBYKMBRMZ'

it('1- Adicionar e remover produto da sacola (Botões)', () => {

    //Clicar 4 vezes no botão "+" (adicionar produto)
    for(let n = 0; n < 4; n ++){
        cy.contains(product1)
        .parent()
        .find('.nex-icon-plus')
        .click()
      }
    
      cy.get('.red').should('have.text', '4') //Assertion para garantir que 4 produtos foram adicionados à sacola
    
    //Clicar 2 vezes no botão "-" (remover produto)
    for(let n = 0; n < 2; n ++){
        cy.contains(product1)
        .parent()
        .find('.nex-icon-minus')
        .click()
      }
    
        cy.get('.red').should('have.text', '2') //Assertion para garantir que 2 produtos foram removidos da sacola
    
});

it('2- Adicionar e remover produto da sacola (manual)', () => {

    //Adicionando primeiro produto do catálogo à sacola
    cy.contains(product1)
        .parent()
        .find('.amount-input__value')
        .type('5')

    cy.get('.red').should('have.text', '5')

    //Adicionando segundo produto do catálogo à sacola
    cy.contains(product2)
        .parent()
        .find('.amount-input__value')
        .type('2')

        cy.get('.red').should('have.text', '7')

    //Removendo 2 produtos da sacola
    cy.contains(product2)
        .parent()
        .find('.amount-input__value')
        .clear()

        cy.get('.red').should('have.text', '5')
    
});

it('3- Limpar Sacola', () => {

    cy.contains(product2)
        .parent()
        .find('.amount-input__value')
        .type('1')
    
    cy.get('.checkout-button').click() //Clique para abrir a Sacola

    //Remover produto da Sacola
    cy.get('.content')
        .children()
        .find('.nex-icon-minus')
        .click()

    cy.get('.checkout-button__total-price').should('have.text', 'R$ 0,00').click()
    cy.get('.empty-cart').should('have.text', 'Sua sacola está vazia.Voltar ao Catalogo')
    /* ^ Mesmo que a primeira frase seja uma exibição de texto e a segunda seja um botão clicável, a assertion só funcionou quando colocados os textos como se fossem um só,
    pois na estrutura do site, os dois textos estão dentro da mesma classe. Consegui apenas desta forma. :( */
    
});

    
});