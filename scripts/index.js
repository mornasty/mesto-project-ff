// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content

// @todo: DOM узлы
const cardsList = document.querySelector('.places__list')

// @todo: Функция создания карточки
function makeCard(title, imgUrl, deleteCard) {
    const card = cardTemplate.querySelector('.card').cloneNode(true);

    const cardTitle = card.querySelector('.card__title');
    const cardImg = card.querySelector('.card__image');
    const cardBtn = card.querySelector('.card__delete-button')

    cardTitle.textContent = title
    cardImg.src = imgUrl
    cardBtn.addEventListener('click', deleteCard)

    return card;
}

// @todo: Функция удаления карточки
function deleteCard(evt) {
    const card = evt.target.closest('.card');
    card.remove();
}

// @todo: Вывести карточки на страницу
function renderCards() {
    initialCards.forEach((cardData) => {
        const cardItem = makeCard(cardData.name, cardData.link, deleteCard)
        cardsList.append(cardItem)
    })
}

renderCards();