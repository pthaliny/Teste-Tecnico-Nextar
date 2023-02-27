///<reference types="cypress"/>

/*O usuário deve ser capaz de encontrar o produto desejado através da busca. Uma melhoria a ser discutida e que poderia melhorar a experiência de navegação do usuário
seria adicionar um filtro de busca mais detalhado e específico de acordo com o que ele deseja encontrar, como: "Menor preço", "Maior preço" e "Marca", por exemplo. */

context('Testar Busca do Site', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080)
        cy.visit('https://meucomercio.com.br/lojaqualificacao')
        cy.wait(500)
});

    const searchProd = 'Product VTPKPFHVGZ'
    const noResult = 'Não há produtos publicados no Catálogo Online'

it('1- Buscar produto não existente', () => {
    
    cy.get('[type=search]').type('Aleatorio')
    cy.wait(300)
    cy.contains(noResult).should('be.visible')

});

it('2- Buscar produto específico', () => {

    cy.get('[type=search]').type(searchProd)
    cy.wait(300)

    cy.get('.search-bar__results')
        .contains(searchProd)
        .click()

    cy.contains(searchProd)
        .parent()
        .click()

    cy.get('.product-detail__content').contains(searchProd)
        .should('be.visible')
    
});

it('3- Buscar produtos nomes similares', () => {

    cy.get('[type=search]').type('Product')
    cy.wait(300)
    
    //Assertion para garantir que a lista flutuante da busca traga mais de 1 resultado
    cy.get('.search-bar__results')
        .children()
        .find('li')
        .should('have.length.above', 1)

      })
    
});