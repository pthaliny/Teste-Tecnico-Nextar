///<reference types="cypress"/>

/*É importante validar a obrigatoriedade dos campos no cadastro de Endereço pois sem os dados necessários, não é possível enviar o produto para o cliente. E dependendo do negócio,
pode ser usado também como um endereço de cobrança. */

context('Campos obrigatórios (Endereço Entrega)', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080)
        cy.visit('https://meucomercio.com.br/lojaqualificacao')
        cy.wait(300)

        const product = 'Product ATWBBFFZOA'

        //Adicionar produto na sacola
        cy.contains(product)
         .parent()
         .find('.nex-icon-plus')
         .click()

        // Abrir modal da Sacola
        cy.get('.checkout-button').click()

    });

    const nextButton = 'Avançar'
    const postalCode = '54580780'
    const empty = 'be.empty'
    const notEmpty = 'not.be.empty'
    const disable = 'be.disabled'

    it('1- Botão bloqueado (Campos não preenchidos)', () => { 

        cy.get('[type=button]').contains(nextButton).click()
        cy.get('.button').contains(nextButton).should(disable) //Validar botão bloqueado
        
    });

    it('2- Botão bloqueado (Apenas "CEP" preenchido)', () => {
        
        cy.get('[type=button]').contains(nextButton).click()

        cy.get('[name=cep]').type(postalCode)
        cy.wait(300)
        cy.get('.field').should(notEmpty)
        cy.get('[name=number]').should(empty)
        cy.get('.button').contains(nextButton).should(disable) //Validar botão bloqueado

    });

    it('3- Botão bloqueado (Apenas "Número" preenchido)', () => {
        
        cy.get('[type=button]').contains(nextButton).click()

        cy.get('[name=cep]').should(empty)
        cy.get('[name=number]').type('241')
        cy.get('[name=complement]').should(empty)
        cy.get('.button').contains(nextButton).should(disable) //Validar botão bloqueado

    });

    it('4- Botão habilitado ("CEP" e "Número" preenchidos)', () => {
        
        cy.get('[type=button]').contains(nextButton).click()

        cy.get('[name=cep]').type(postalCode)
        cy.wait(300)
        cy.get('.field').should(notEmpty)
        cy.get('[name=number]').type('241')
        cy.get('[name=complement]').should(empty)
        cy.get('.button').contains(nextButton).should('be.enabled') //Validar botão habilitado

    });

});