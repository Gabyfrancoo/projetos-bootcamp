class Carro{
    marca;
    cor;
    gastoCombustivel;

    constructor(marca, cor , gastoCombustivel){
        this.marca = marca;
        this.cor = cor;
        this.gastoCombustivel = gastoCombustivel;
    }

    calcularGastoPercurso(distancia, precoCombustivel){
        return distancia * this.gastoCombustivel * precoCombustivel;
    }

}

const uno = new Carro('Fiat', 'Prata',  1 / 12);
console.log(uno);
console.log(uno.calcularGastoPercurso(70,5));

const palio = new Carro('Fiat', 'Preto', 1/10);
console.log(palio.calcularGastoPercurso(70,5));