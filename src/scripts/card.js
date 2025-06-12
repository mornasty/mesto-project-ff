function getCardTemplate() {
  const cardTemplate = document.querySelector("#card-template").content;
  return cardTemplate.querySelector(".card").cloneNode(true);
}

// @todo: Функция создания карточки
export function createCard(
  title,
  imgUrl,
  deleteCard,
  toggleLike,
  setImageData
) {
  const card = getCardTemplate();
  const cardTitle = card.querySelector(".card__title");
  const cardImg = card.querySelector(".card__image");
  const cardBtn = card.querySelector(".card__delete-button");
  const cardLikeBtn = card.querySelector(".card__like-button");

  cardTitle.textContent = title;
  cardImg.src = imgUrl;
  cardBtn.addEventListener("click", deleteCard);
  cardLikeBtn.addEventListener("click", toggleLike);
  cardImg.addEventListener("click", (evt) => {
    setImageData(evt, title);
  });

  return card;
}

// @todo: Функция удаления карточки
export function deleteCard(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}

export function toggleLike(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}