import "./pages/index.css";
import { openModal, closeModal } from "./scripts/modal";
import { initialCards } from "./scripts/cards";
import { createCard, deleteCard, toggleLike } from "./scripts/card";

const popups = document.querySelectorAll(".popup");
const popupPic = document.querySelector(".popup__image");
const popupCaption = document.querySelector(".popup__caption");
const popupImage = document.querySelector(".popup_type_image");

const popupEdit = document.querySelector(".popup_type_edit");
const popupEditButton = document.querySelector(".profile__edit-button");

const popupAdd = document.querySelector(".popup_type_new-card");
const popupAddButton = document.querySelector(".profile__add-button");

const formEditProfile = document.querySelector(
  ".popup__form[name='edit-profile']"
);
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(
  ".popup__input_type_description"
);
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const formNewCard = document.querySelector(".popup__form[name='new-place']");
const cardNameInput = formNewCard.querySelector(".popup__input_type_card-name");
const cardUrlInput = formNewCard.querySelector(".popup__input_type_url");

const cardsList = document.querySelector(".places__list");

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

function submitFormEditProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEdit);
}

function submitFormNewCard(evt) {
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

function setImageData(evt, title) {
  popupPic.src = evt.target.src;
  popupPic.alt = title;
  popupCaption.textContent = title;
  openModal(popupImage);
}

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
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(popupEdit);
});

popupAddButton.addEventListener("click", () => {
  openModal(popupAdd);
});

formEditProfile.addEventListener("submit", submitFormEditProfile);

formNewCard.addEventListener("submit", submitFormNewCard);

renderCards();
