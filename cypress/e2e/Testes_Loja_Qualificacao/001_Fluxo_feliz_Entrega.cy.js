///<reference types ="cypress"/>

    /*Como o produto já tem uma versão com funcionalidades prontas, foram realizados testes exploratórios a fim de verificar se os fluxos principais estão funcionais e detectar
        comportamentos inesperados e possíveis melhorias que possam ser implementadas.
        Neste teste, será validado o fluxo de ponta-a-ponta de fechamento de um pedido com método de entrega por transportadora, a fim de verificar se o fluxo principal
        está funcional.
        
        Funcionalidade: Realizar compra na Loja Qualificação com Entrega normal
        >Como Cliente
        >Eu quero realizar um pedido de um produto na Loja Qualificação com Entrega normal
        >Para receber o produto no meu endereço

        Cenário: Realizar compra de produto com método de Entrega normal
            Dado: que eu esteja acessando o site da Loja Qualificação;
            Quando: eu inserir um produto na sacola;
                 E: informar os dados do meu endereço;
                 E: informar meus dados pessoais;
            Então: eu recebo a mensagem de confirmação do pedido pela Loja.

        */

    context('Realizar Pedido para Entrega de 1 produto', () => {
    
        beforeEach(() => {
            cy.viewport(1920, 1080)
            cy.visit('https://meucomercio.com.br/lojaqualificacao')
            cy.wait(300)
    });

    const product = 'Product ATWBBFFZOA'
    const comment = 'Teste - Entrega em casa'
    const nextButton = 'Avançar'
    const postalCode = '01311903'


    it('Fluxo Compra pela Homepage com método Entrega normal', () => { 

    /*Como os botões de adição/remoção de produto na sacola possuem a mesma identificação na estruturação do site, optei por encontrar o elemento-pai de uma string (a qual criei
        uma variável), e assim encontrar o elemento do botão "+" pelo nome da sua classe */

        cy.contains(product)
         .parent()
         .find('.nex-icon-plus')
         .click()

        cy.get('.red').should('have.text', '1') //Assertion para garantir que 1 produto foi adicionado à sacola
        cy.get('.checkout-button').click() //Clique para abrir a modal da Sacola
        cy.get('.divided').contains(product) //Validar modal da Sacola aberta com o produto adicionado
        cy.get('textarea').type(comment)

        cy.get('[type=button]').contains(nextButton).click()

    /* Melhorias que podem ser discutidas para o Checkout:
        1. Nota-se que os botões "Expandir" e "Seta para baixo" são redundantes, pois ambos têm a mesma função. Poderia ser colocado apenas
        a seta para baixo com uma descrição sutil de "Expandir/Recolher" ou informando um resumo da ação que é atribuída a ele;
        2. Poderia ter uma exibição dos produtos da sacola também no Resumo do pedido. Exibir apenas a quantidade de itens pode levar o usuário a ficar retornando
        à tela anterior para revisar os produtos.*/

        //Seleção do método de Entrega (Entrega)
        cy.get('.withdraw__options').find('[value=delivery]').check({ force : true })
        cy.get('[name=cep]').type(postalCode)
        cy.wait(300)

        cy.get('.field').should('not.be.empty') //Validar que o endereço foi preenchido pela api após inserir o CEP

        //Preenchimento do Endereço de Entrega
        cy.get('[name=number]').type('10')
        cy.get('[name=complement]').type(comment)

        /*Reparei um comportamento de melhoria em relação ao campo "Comentário" que pode ser discutido: Nota-se que o valor preenchido no campo apenas é salvo ao avançar até a etapa de "Identificação". Seria mais adequado se o valor do campo fosse salvo já na próxima etapa (Seleção de Entrega), pois, se o usuário voltar à tela anterior a informação exibida será a anterior. */

        cy.get('[type=button]').contains(nextButton).click()

        cy.get('.step-content').contains('Identifique-se') //Validar tela de Preenchimento de dados do Cliente

        //Preenchimento dos dados do Cliente
        cy.get('[name=name]').type('Josete Maria da Silva')
        cy.get('[name=email]').type('mariajosete@yopmail.com')
        cy.get('.phone-input').type(12345678900)

        cy.get('[type=checkbox]').check({ force : true })
        /*Tive um pouco de dificuldade para selecionar o checkbox, o Cypress acusava o elemento de estar escondido abaixo de outro elemento, então usei o 'force'. */

        cy.get('[type=button]').contains('Enviar').click()
        cy.wait(300)

        //Mensagem de Pedido realizado
        cy.get('.step-content').contains('Pedido Feito!').should('be.visible')

    });

    it('Fluxo Compra pela PDP com método de Entrega normal', () => {

        /* Erro encontrado na página de produto: Ao clicar em um dos produtos listados na vitrine "Mais itens", a página carrega normalmente com as informações do produto ao qual
        o usuário clicou. Porém, ao clicar novamente no mesmo produto exibido na vitrine, a página fica em estado de carregamento infinito.
        
            Sugestão de melhoria: Não listar o mesmo produto que está sendo visualizado na página na vitrine "Mais itens", pois o mesmo já está aberto. Poderia ser exibida apenas
            variações daquele produto, se fosse o caso.*/
        
        cy.contains(product)
         .parent()
         .click()

        cy.wait(300)

        cy.get('.ui').contains('Adicionar').click()

        cy.get('.ui .red').should('have.text', '1') //Assertion para garantir que 1 produto foi adicionado à sacola

        //Clique para abrir a modal da Sacola

        /*Tive dificuldade em localizar o elemento de clique da Sacola, pois ele estava coberto por outros, então usei um caminho específico,
        porém assumo que não seja uma boa prática, considerando que isto deixa muito atrelado ao código do site, o que não é indicado... Mas foi a solução temporária que encontrei*/
        cy.get('.product-detail__header-wrapper').click('right')

        cy.get('.divided').contains(product) //Validar modal da Sacola aberta com o produto adicionado
        cy.get('textarea').type(comment)

        cy.get('[type=button]').contains(nextButton).click()

        //Seleção do método de Entrega (Entrega)
        cy.get('.withdraw__options').find('[value=delivery]').check({ force : true })
        cy.get('[name=cep]').type(postalCode)
        cy.wait(300)

        cy.get('.field').should('not.be.empty') //Validar que o endereço foi preenchido pela api após inserir o CEP

        //Preenchimento do Endereço de Entrega
        cy.get('[name=number]').type('10')
        cy.get('[name=complement]').type(comment)

        cy.get('[type=button]').contains(nextButton).click()

        cy.get('.step-content').contains('Identifique-se') //Validar tela de Preenchimento de dados do Cliente

        //Preenchimento dos dados do Cliente e Checkbox
        cy.get('[name=name]').type('Josete Maria da Silva')
        cy.get('[name=email]').type('mariajosete@yopmail.com')
        cy.get('.phone-input').type(12345678900)

        cy.get('[type=checkbox]').check({ force : true })
        cy.get('[type=button]').contains('Enviar').click()

        //Mensagem de Pedido realizado
        cy.get('.step-content').contains('Pedido Feito!').should('be.visible')

    });

});