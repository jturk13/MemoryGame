const cardsContainer = document.querySelector('.cards-grid');
const movesCounter = document.getElementById('moves');
const resetButton = document.getElementById('reset-button');

let flippedCards = [];
let isProcessing = false;
let moves = 0;

function generateRandomColors(numColors) {
  const colors = [];
  for (let i = 0; i < numColors; i++) {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    colors.push(randomColor);
  }
  return colors.concat(colors); 
}

const randomColors = generateRandomColors(8); 

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function incrementMoves() {
  moves++;
  movesCounter.textContent = moves;
}

resetButton.addEventListener('click', (event) => {
  event.preventDefault();
  resetGame();
});

function resetGame() {
  moves = 0;
  movesCounter.textContent = moves;

  cardsContainer.innerHTML = '';
  const cardsData = randomColors.map((color, index) => ({
    id: index + 1,
    color,
  }));

  shuffleArray(cardsData);

  generateCards(cardsData);

  flippedCards = [];
  isProcessing = false;
}

function generateCard(cardData) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('card');
  cardElement.dataset.cardId = cardData.id;
  cardElement.dataset.color = cardData.color;

  const cardInner = document.createElement('div');
  cardInner.classList.add('card-inner');

  const cardFront = document.createElement('div');
  cardFront.classList.add('card-front');

  const cardBack = document.createElement('div');
  cardBack.classList.add('card-back');
  cardBack.style.backgroundColor = cardData.color;

  cardInner.appendChild(cardFront);
  cardInner.appendChild(cardBack);
  cardElement.appendChild(cardInner);

  cardElement.addEventListener('click', () => {
    if (!isProcessing && !cardElement.classList.contains('is-flipped')) {
      cardElement.classList.add('is-flipped');
      flippedCards.push(cardElement);
      incrementMoves();

      if (flippedCards.length === 2) {
        isProcessing = true;
        const [card1, card2] = flippedCards;

        if (card1.dataset.color === card2.dataset.color) {
          flippedCards = [];
          isProcessing = false;
        } else {
          setTimeout(() => {
            card1.classList.remove('is-flipped');
            card2.classList.remove('is-flipped');
            flippedCards = [];
            isProcessing = false;
          }, 1000);
        }
      }
    }
  });

  return cardElement;
}

function generateCards(cardsData) {
  cardsData.forEach((cardData) => {
    const card = generateCard(cardData);
    cardsContainer.appendChild(card);
  });
}

resetGame();