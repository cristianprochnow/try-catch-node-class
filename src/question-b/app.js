

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

function valores(area) {
    area = parseFloat(area);

    let custo;

    if (area <= 20) {
        custo = 1.60;
    } else if (area > 20 && area <= 50) {
        custo = 2.80;
    } else {
        custo = 4.20;
    }

    return custo;
}