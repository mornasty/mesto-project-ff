import "./pages/index.css";
import { openModal, closeModal } from "./scripts/modal";
import { initialCards } from "./scripts/cards";
import {
  createCard,
  deleteCard,
  toggleLike,
  setImageData,
} from "./scripts/card";

const popupEditButton = document.querySelector(".profile__edit-button");
const popupAddButton = document.querySelector(".profile__add-button");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const popups = document.querySelectorAll(".popup");

// @todo: DOM узлы
const cardsList = document.querySelector(".places__list");

popups.forEach((popup) => {
  popup.classList.add("popup_is-animated");

  const popupClose = popup.querySelector(".popup__close");
  popupClose.addEventListener("click", () => {
    closeModal(popup);
  });

  popup.addEventListener("click", (evt) => {
    if (evt.target == popup) {
      closeModal(popup);
    }
  });
});

popupEditButton.addEventListener("click", () => {
  openModal(popupEdit);
});

popupAddButton.addEventListener("click", () => {
  openModal(popupAdd);
});

// @todo: Вывести карточки на страницу
function renderCards() {
  initialCards.forEach((cardData) => {
    const cardItem = createCard(
      cardData.name,
      cardData.link,
      deleteCard,
      toggleLike,
      setImageData
    );
    cardsList.append(cardItem);
  });
}

renderCards();

const cardImages = document.querySelectorAll(".card__image");
cardImages.forEach((image) => {
  image.addEventListener("click", () => {
    openModal(popupImage);
  });
});

// Находим форму в DOM
const formElement = document.querySelector(".popup__form[name='edit-profile']");
// Находим поля формы в DOM
const nameInput = formElement.querySelector(".popup__input_type_name");
const jobInput = formElement.querySelector(".popup__input_type_description");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

nameInput.value = profileTitle.textContent;
jobInput.value = profileDescription.textContent;

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);

const formNewCard = document.querySelector(".popup__form[name='new-place']");
// Находим поля формы в DOM
const cardNameInput = formNewCard.querySelector(".popup__input_type_card-name");
const cardUrlInput = formNewCard.querySelector(".popup__input_type_url");

function handleFormNewCardSubmit(evt) {
  evt.preventDefault();
  const cardItem = createCard(
    cardNameInput.value,
    cardUrlInput.value,
    deleteCard,
    toggleLike,
    setImageData
  );
  cardsList.prepend(cardItem);
  closeModal(popupAdd);
  evt.target.reset();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formNewCard.addEventListener("submit", handleFormNewCardSubmit);
