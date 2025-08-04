const state = {
    score: {
        playerScore: 0,
        computerScore: 0,
        scoreBox: document.getElementById("score_points"),
    },
    cardSprites: {
        avatar: document.getElementById("card-image"),
        name: document.getElementById("card-name"),
        type: document.getElementById("card-type"),
    },

    fieldCards: {
        player: document.getElementById("player-field-card"),
        computer: document.getElementById("computer-field-card"),
    },

    playerSides: {
        player1: "player-cards",
        player1BOX: document.querySelector(".#player-cards"),
        computer: "computer-cards",
        computerBOX: document.querySelector(".#computer-cards"),
    },

    button: document.getElementById("next-duel"),

};

const playerSides = {
    player1: "player-cards",
    computer: "computer-cards",
};

const cardData = [
    {
        id: 0,
        name: "Blue Eyes White Dragon",
        type: "Paper",
        img: ".src/assets/icons/dragon.png",
        WinOf: [1],
        Loseof: [2],
    },

    {
        id: 1,
        name: "Dark Magician",
        type: "Rock",
        img: ".src/assets/icons/magician.png",
        WinOf: [2],
        Loseof: [0],
    },

    {
        id: 2,
        name: "Exodia",
        type: "Scissors",
        img: ".src/assets/icons/exodia.png",
        WinOf: [0],
        Loseof: [1],
    },
];

async function getRandomCardId() {
    const randomIndex = Math.floor(Math.random() * cardData.length)
    return cardData[randomIndex].id;
}

async function createCardImage(randomIdCard, fieldSide) {
    const cardImage = document.createElement("img");
    cardImage.setAttribute("height", "100px");
    cardImage.setAttribute("src", "./src/assets/icons/card-back.png");
    cardImage.setAttribute("data-id", randomIdCard);
    cardImage.classList.add("card");

    if (fieldSide === playerSides.player1) {
        cardImage.addEventListener("mouseover", () => {
            drawSelectCard(randomIdCard);
        });

        cardImage.addEventListener("click", () => {
            setCardsField(cardImage.getAttribute("data-id"));
        });

    }

    return cardImage;
}

async function setCardsField(cardId) {
    await removeAllCardsImages();

    let computerCardId = await getRandomCardId();
    await showHiddenCardFieldsImages();

    await hiddenCardDetails();

    await drawCardsInFields(cardId, computerCardId);

    let duelResults = await checkDuelResults(cardId, computerCardId);

    await updateScore();
    await drawButton(duelResults);
}

async function drawSelectCard(index) {
    state.cardSprites.avatar.scr = cardData[index].img;
    state.cardSprites.name.innerText = cardData[index].name;
    state.cardSprites.type.innerText = "Attibute : " + cardData[index].type;
}

async function removeAllCardsImages() {

    let cards = state.playerSides.computerBOX;

    let imgElements = cards.querySelectorAll("img")
    imgElements.forEach((img) => img.remove());

    cards = dstate.playerSides.playerBOX;

    imgElements = cards.querySelectorAll("img")
    imgElements.forEach((img) => img.remove());
}

async function drawCards(cardNumbers, fieldSide) {
    for (let i = 0; i < cardNumbers; i++) {
        const randomIdCard = await getRandomCardId();
        const cardImage = await createCardImage(randomIdCard, fieldSide);
        document.getElementById(fieldSide).appendChild(cardImage);
    }
}

async function checkDuelResults(playerCardId, computerCardId) {
    let duelResults = "Draw";
    let playerCard = cardData[playerCardId];
    if (playerCard.WinOf.includes(computerCardId)) {
        duelResults = "Win";
        await playAudio("Win");
        state.score.playerScore++;
    }

    if (playerCard.Loseof.includes(computerCardId)) {
        duelResults = "Lose";
        await playAudio("Lose");
        state.score.computerScore++;
    }

    return duelResults;
}

async function drawButton(text) {
    state.actions.button.innerText = text.toUpperCase();
    state.actions.button.style.display = "block";
}

async function updateScore() {
    state.score.scoreBox.innerText = `Win: ${state.score.playerScore} | Lose: ${state.score.computerScore}`;
}

async function resetDuel() {
    state.cardSprites.avatar.src = "";
    state.actions.button.style.display = "none";

    state.fieldCards.player.style.display = "none";
    state.fieldCards.computer.style.display = "none";

    init();
}

async function hiddenCardDetails() {
    state.cardSprites.name.innerText = "";
    state.cardSprites.type.innerText = "";
    state.cardSprites.avatar.src = "";
}

async function showHiddenCardFieldsImages(value) {
    if (value === true) {
        state.fieldCards.player.style.display = "block";
        state.fieldCards.computer.style.display = "block";
    }
    if (value === false) {
        state.fieldCards.player.style.display = "none";
        state.fieldCards.computer.style.display = "none";
    }
}

async function drawCardsInFields(cardId, computerCardId) {
    state.fieldCards.player.src = cardData[cardId].img;
    state.fieldCards.computer.src = cardData[computerCardId].img;
}

async function playAudio(status) {
    const audio = new Audio(`./src/assets/audios/${status}.wav`);
    audio.play();
}

function init() {

    showHiddenCardFieldsImages(false);

    drawCards(5, "playerSides.player1");
    drawCards(5, "playerSides.computer");
}

init();

