import inquirer from 'inquirer';
import Conta from './db/schema/conta.schema.js';
import sequelize from './db/db.js';

sequelize.sync().then(montaFatura);

function montaFatura() {
    inquirer
        .prompt([
            {
                type: 'number',
                name: 'numeroMedidorConsumo',
                message: 'Qual o número do medidor de consumo?'
            },
            {
                type: 'text',
                name: 'nomeResponsavelAgua',
                message: 'Qual o nome do responsável pela conta de água?'
            },
            {
                type: 'number',
                name: 'volumeConsumido',
                message: 'Qual foi o volume consumido esse mês? (m³)'
            },
        ])
        .then((answers) => {
            try {
                if (Object
                    .values(answers)
                    .filter(item => item !== NaN)
                    .includes(NaN)) {
                    throw new Error('Valores inseridos incorretamente!');
                }

                calculaFatura(answers);
            } catch (error) {
                console.log(error.message);
            }
        });
}

/**
 * @param {{
 *  numeroMedidorConsumo: number;
 *  nomeResponsavelAgua: string;
 *  volumeConsumido: number;
 * }} params 
 */
function calculaFatura(params) {
    let custoPorMetro3 = valores(params.volumeConsumido);
    let custoTotal = aplicaDesconto(custoPorMetro3 * params.volumeConsumido);

    Conta.create({
        numero_medidor: params.numeroMedidorConsumo,
        responsavel_medidor: params.nomeResponsavelAgua,
        volume_consumido: params.volumeConsumido,
        custo_por_metro_cubico: custoPorMetro3,
        custo_total: custoTotal
    }).then(function() {
        Conta.findAll().then(function(results) {
            console.log(results);
        });
    });
}

function aplicaDesconto(valor) {
    valor = parseFloat(valor);

    let taxa = 0;

    if (valor < 100) {
        taxa = 0.05;
    } else if (valor > 200) {
        taxa = 0.10;
    }

    valor -= (valor * taxa);

    return valor;
}

function valores(volume) {
    volume = parseFloat(volume);

    let custo;

    if (volume <= 20) {
        custo = 1.60;
    } else if (volume > 20 && volume <= 50) {
        custo = 2.80;
    } else {
        custo = 4.20;
    }

    return custo;
}