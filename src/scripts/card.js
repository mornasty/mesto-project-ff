import { deleteLike, putLike, removeCard } from "./api";

function getCardTemplate() {
  const cardTemplate = document.querySelector("#card-template").content;
  return cardTemplate.querySelector(".card").cloneNode(true);
}

// Функция создания карточки
export function createCard(
  title,
  imgUrl,
  deleteCard,
  toggleLike,
  setImageData,
  cardId,
  likes,
  userInfo
) {
  const card = getCardTemplate();
  const cardTitle = card.querySelector(".card__title");
  const cardImg = card.querySelector(".card__image");
  const cardBtn = card.querySelector(".card__delete-button");
  const cardLikeBtn = card.querySelector(".card__like-button");
  const cardLikeCounter = card.querySelector(".card__like-counter");

  if (!deleteCard) {
    cardBtn.remove();
  } else {
    cardBtn.addEventListener("click", (evt) => {
      deleteCard(evt, cardId);
    });
  }

  cardTitle.textContent = title;
  cardImg.src = imgUrl;

  cardLikeCounter.textContent = likes.length;
  if (likes.filter(el => el._id === userInfo._id).length > 0) {
    cardLikeBtn.classList.add('card__like-button_is-active')
  }

  cardLikeBtn.addEventListener("click", (evt) => {
    toggleLike(evt, cardLikeCounter, cardId);
  });

  cardImg.addEventListener("click", (evt) => {
    setImageData(evt, title);
  });

  return card;
}

// Функция удаления карточки
export function deleteCard(evt, cardId) {
  const card = evt.target.closest(".card");
  removeCard(cardId)
    .then((result) => {
      card.remove();
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

// Функция переключения лайка
export function toggleLike(evt, cardLikeCounter, cardId) {
  if (evt.target.classList.contains("card__like-button_is-active")) {
    evt.target.classList.remove("card__like-button_is-active");
    deleteLike(cardId)
      .then((result) => {
        cardLikeCounter.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  } else {
    evt.target.classList.add("card__like-button_is-active");
    putLike(cardId)
      .then((result) => {
        cardLikeCounter.textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err); // выводим ошибку в консоль
      });
  }
}
