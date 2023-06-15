const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('change', () => {
    const body = document.body;
    body.classList.toggle('dark-theme');
});

const cardContainer = document.getElementById('card-container');
const loadMoreBtn = document.getElementById('load-more-btn');
const popUp = document.getElementById('pop-up');
const popUpContent = document.getElementById('pop-up-content');
const popUpImage = document.getElementById('pop-up-image');

let startIndex = 0;
const cardsPerLoad = 4;

const createCard = (cardData) => {
    const card = document.createElement('div');
    card.classList.add('card');

    const image = document.createElement('img');
    image.src = cardData.image;
    card.appendChild(image);

    const caption = document.createElement('p');
    caption.classList.add('caption');
    caption.textContent = cardData.caption;
    card.appendChild(caption);

    const likes = document.createElement('p');
    likes.classList.add('likes');
    likes.textContent = `Liked by: ${cardData.likes} people`;
    card.appendChild(likes);

    image.addEventListener('click', () => {
        popUpImage.src = cardData.image;
        popUp.style.display = 'flex';
    });

    return card;
};

const loadInitialCards = () => {
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            const initialCards = data.slice(
                startIndex, startIndex + cardsPerLoad
            );
            initialCards.forEach(cardData => {
                const card = createCard(cardData);
                cardContainer.appendChild(card);
            });

            startIndex += cardsPerLoad;

            if(startIndex < data.length) {
                loadMoreBtn.style.display = 'block';
            }
        })
        .catch(err => {
            console.error(`Error: ${err}`);
        })
};

const loadMoreCards = () => {
    fetch('data.json')
        .then(res => res.json())
        .then(data => {
            const cards = data.slice(
                startIndex, startIndex + cardsPerLoad
            );
            cards.forEach(cardData => {
                const card = createCard(cardData);
                cardContainer.appendChild(card);
            });

            startIndex += cardsPerLoad;

            if(startIndex >= data.length) {
                loadMoreBtn.style.display = 'none';
            }
        })
        .catch(err => {
            console.error(`Error: ${err}`);
        })
};

loadMoreBtn.addEventListener('click', loadMoreCards);
loadInitialCards();

popUp.addEventListener('click', () => {
    popUp.style.display = 'none';
});
