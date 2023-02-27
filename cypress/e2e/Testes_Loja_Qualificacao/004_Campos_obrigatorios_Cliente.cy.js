///<reference types="cypress"/>

/*É importante validar a obrigatoriedade dos campos para que nenhum dado essencial do cliente fique faltando no momento da compra. As informações de contato são importantes não só
para que as informações do pedido sejam enviadas para ele, como também para o vendedor e cliente poderem se comunicar. E, dependendo do negócio, a empresa pode enviar promoções,
novidades e atualizações do pedido até a sua entrega. */

context('Campos obrigatórios (Identificação do Cliente)', () => {

    beforeEach(() => {
        cy.viewport(1920, 1080)
        cy.visit('https://meucomercio.com.br/lojaqualificacao')
        cy.wait(300)

        const product = 'Product ATWBBFFZOA'
        const postalCode = '54580780'
        const nextButton = 'Avançar'

        //Adicionar produto na sacola
        cy.contains(product)
         .parent()
         .find('.nex-icon-plus')
         .click()

        // Abrir modal da Sacola
        cy.get('.checkout-button').click()
        cy.get('[type=button]').contains(nextButton).click()

        //Preenchimento do Endereço
        cy.get('[name=cep]').type(postalCode)
        cy.get('[name=number]').type('241')
        cy.get('[type=button]').contains(nextButton).click()

    });

        const empty = 'be.empty'
        const disable = 'be.disabled'
        const beCheck = 'be.checked'
        const notCheck = 'not.be.checked'

    it('1- Botão bloqueado (Campos não preenchidos)', () => { 

        cy.get('[name=name]').should(empty)
        cy.get('[name=email]').should(empty)
        cy.get('[name="phone.number"]').should(empty)
        cy.get('[type=checkbox]').should(notCheck)
        cy.get('.button').should(disable)
        
    });

    it('2- Botão bloqueado (Apenas "Nome" preenchido)', () => {

        cy.get('[name=name]').type('Apenas Nome Preenchido')
        cy.get('[name=email]').should(empty)
        cy.get('[name="phone.number"]').should(empty)
        cy.get('[type=checkbox]').should(notCheck)
        cy.get('.button').should(disable)

    });

    it('3- Botão bloqueado (Apenas "Email" preenchido)', () => {
        
        cy.get('[name=name]').should(empty)
        cy.get('[name=email]').type('emailpreenchido@yopmail.com')
        cy.get('[name="phone.number"]').should(empty)
        cy.get('[type=checkbox]').should(notCheck)
        cy.get('.button').should(disable)

    });

    it('4- Botão bloqueado (Apenas "Telefone" preenchido)', () => {
        
        cy.get('[name=name]').should(empty)
        cy.get('[name=email]').should(empty)
        cy.get('.phone-input').type(12345678900)
        cy.get('[type=checkbox]').should(notCheck)
        cy.get('.button').should(disable)

    });

    it('5- Botão bloqueado (Checkbox "Termos" não marcado)', () => {
        
        cy.get('[name=name]').type('Teste de Campos')
        cy.get('[name=email]').type('emailpreenchido@yopmail.com')
        cy.get('.phone-input').type(12345678900)
        cy.get('[type=checkbox]').should(notCheck)
        cy.get('.button').should(disable)

        cy.get('[type=checkbox]').check({ force : true })
        cy.get('[type=checkbox]').should(beCheck)
        cy.get('[type=checkbox]').uncheck({ force : true })
        cy.get('[type=checkbox]').should(notCheck)
        cy.get('.button').should(disable)

    });

    it('6- Botão habilitado (Campos preenchidos)', () => {
        
        cy.get('[name=name]').type('Teste de Campos')
        cy.get('[name=email]').type('emailpreenchido@yopmail.com')
        cy.get('.phone-input').type(12345678900)
        cy.get('[type=checkbox]').check({ force : true })
        cy.get('.button').contains('Enviar').should('be.enabled')

    });


});