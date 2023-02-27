///<reference types ="cypress"/>

    /*Neste cenário, será validado o fluxo de ponta-a-ponta de fechamento de um pedido com método de entrega por Retirada, a fim de verificar se o fluxo principal
        está funcional.
        
        Funcionalidade: Realizar compra na Loja Qualificação com Retirada
        >Como Cliente
        >Eu quero realizar um pedido de um produto na Loja Qualificação com método de entrega por Retirada
        >Para retirar o produto no endereço da Loja Qualificação

        Cenário: Realizar compra de produto com método de Entrega normal
            Dado: que eu esteja acessando o site da Loja Qualificação;
            Quando: eu inserir um produto na sacola;
                 E: informar meus dados pessoais;
            Então: eu recebo a mensagem de confirmação do pedido pela Loja.*/

        context('Realizar Pedido para Retirada de 1 produto em Loja', () => {
            
            beforeEach(() => {
                cy.viewport(1920, 1080)
                cy.visit('https://meucomercio.com.br/lojaqualificacao')
                cy.wait(300)
            });
            
            const product = 'Product ATWBBFFZOA'
            const comment = 'Teste - Retirada em Loja'
            const nextButton = 'Avançar'

            it('1- Fluxo Compra pela Homepage com método Retirada em Loja', () => { 
                cy.viewport(1920, 1080)
                cy.visit('https://meucomercio.com.br/lojaqualificacao')
                cy.wait(300)
        
                cy.contains(product)
                 .parent()
                 .find('.nex-icon-plus')
                 .click()
        
                cy.get('.red').should('have.text', '1') //Assertion para garantir que 1 produto foi adicionado à sacola
                cy.get('.checkout-button').click() //Clique para abrir a modal da Sacola
                cy.get('.divided').contains(product) //Validar modal da Sacola aberta com o produto adicionado
        
                cy.get('textarea').type(comment)
                cy.get('[type=button]').contains(nextButton).click()
        
                //Seleção do método de Entrega (Retirada)
                cy.get('.withdraw__options').find('[value=withdraw]').check()   
                cy.get('[type=button]').contains(nextButton).click()
        
                cy.get('.step-content').contains('Identifique-se') //Validar tela de Preenchimento de dados do Cliente
        
                //Preenchimento dos dados do Cliente
                cy.get('[name=name]').type('Luciana Rosa de Souza')
                cy.get('[name=email]').type('Luci.souza@yopmail.com')
                cy.get('.phone-input').type(12345678900)
        
                cy.get('[type=checkbox]').check({ force : true })

                cy.get('[type=button]').contains('Enviar').click()
                cy.wait(300)
        
                //Mensagem de Pedido realizado
                cy.get('.step-content').contains('Pedido Feito!').should('be.visible')
        
            });

            it('2- Fluxo Compra pela PDP com método Retirada em Loja', () => {
        
                cy.contains(product)
                 .parent()
                 .click()
        
                cy.wait(300)
        
                cy.get('.ui').contains('Adicionar').click()
        
                cy.get('.ui .red').should('have.text', '1') //Assertion para garantir que 1 produto foi adicionado à sacola
                cy.get('.product-detail__header-wrapper').click('right') //Clique para abrir a modal da Sacola
                cy.get('.divided').contains(product) //Validar modal da Sacola aberta com o produto adicionado

                cy.get('textarea').type(comment)
                cy.get('[type=button]').contains(nextButton).click()
        
                //Seleção do método de Entrega (Retirada)
                cy.get('.withdraw__options').find('[value=withdraw]').check()   
                cy.get('[type=button]').contains(nextButton).click()
        
                cy.get('.step-content').contains('Identifique-se') //Validar tela de Preenchimento de dados do Cliente
        
                //Preenchimento dos dados do Cliente
                cy.get('[name=name]').type('Luciana Rosa de Souza')
                cy.get('[name=email]').type('Luci.souza@yopmail.com')
                cy.get('.phone-input').type(12345678900)
        
                cy.get('[type=checkbox]').check({ force : true })

                cy.get('[type=button]').contains('Enviar').click()
                cy.wait(300)
        
                //Validações das informações do pedido e Cliente
                cy.get('.summary-header').contains('1 item')
                cy.get('.--quantity').contains('1')
                cy.get('.--name').contains(product)
                
                //Mensagem de Pedido realizado
                cy.get('.step-content').contains('Pedido Feito!').should('be.visible')

            });
        
        });