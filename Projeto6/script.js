function getNivel(xp) {
    if (xp < 1000) return "Ferro";
    else if (xp < 2000) return "Bronze";
    else if (xp < 5000) return "Prata";
    else if (xp < 7000) return "Ouro";
    else if (xp < 9000) return "Platina";
    else if (xp < 10000) return "Ascendente";
    else return "Imortal";
}

let nome = gets();
while (nome != null) {
    let xp = parseInt(gets());
    let nivel = getNivel(xp);
    console.log(`O herói de nome: ${nome} está no nível: ${nivel}`);
    nome = gets();
}
