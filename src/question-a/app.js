import inquirer from 'inquirer';

inquirer
  .prompt([
    {
        type: 'number',
        name: 'quantidadeChocolate',
        message: 'Qual a quantidade de chocolate desejada?'
    },
    {
        type: 'number',
        name: 'quantidadePessoas',
        message: 'Qual a quantidade pessoas para dividir? (se menor que o chocolate, vai ser igualada)'
    }
  ])
  .then((answers) => {
    try {
        let quantidadeChocolate, quantidadePessoas;

        if (Object.values(answers).includes(NaN)) {
            throw new Error('Valores inseridos incorretamente!');
        }
    
        quantidadeChocolate = answers.quantidadeChocolate;
        quantidadePessoas = answers.quantidadePessoas;
    
        quantidadeChocolate = parseInt(quantidadeChocolate);
        quantidadePessoas = parseInt(quantidadePessoas);

        if (quantidadePessoas > quantidadeChocolate) {
            quantidadeChocolate = quantidadePessoas;
        }

        let valorFinalChocolate = quantidadeChocolate;
        while (valorFinalChocolate % quantidadePessoas != 0) {
            valorFinalChocolate++;
        }

        console.log(
            'Já que a quantidade de pessoas é', 
            quantidadePessoas, 
            'e a quantidade de chocolates compradas inicialmente foi',
            quantidadeChocolate,
            'então a quantidade ideal de chocolate para completar a contagem é',
            valorFinalChocolate
        );
    } catch (error) {
        console.log(error.message);
    }
  })
  .catch(function(error) {
    console.log(error);
  });