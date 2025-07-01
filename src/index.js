import "./pages/index.css";
import { openModal, closeModal } from "./scripts/modal";
import { createCard, deleteCard, toggleLike } from "./scripts/card";
import { clearValidation, enableValidation } from "./scripts/validation";
import {
  getCards,
  getUserInfo,
  updateUserInfo,
  updateUserAvatar,
  postNewCard,
} from "./scripts/api";

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

const profileAvatar = document.querySelector(".profile__image");
const popupEditAvatar = document.querySelector(".popup_type_edit-avatar");
const avatarUrlInput = document.getElementById("avatar-link");
const formEditAvatar = document.querySelector(
  ".popup__form[name='edit-avatar']"
);

const formNewCard = document.querySelector(".popup__form[name='new-place']");
const cardNameInput = formNewCard.querySelector(".popup__input_type_card-name");
const cardUrlInput = formNewCard.querySelector(".popup__input_type_url");

const cardsList = document.querySelector(".places__list");

function renderCards() {
  Promise.all([getUserInfo(), getCards()])
    .then((result) => {
      const profileData = result[0];
      const cardsData = result[1];

      profileTitle.textContent = profileData.name;
      profileAvatar.style = `background-image: url('${profileData.avatar}')`;
      profileDescription.textContent = profileData.about;

      cardsData.forEach((cardData) => {
        const cardItem = createCard(
          cardData.name,
          cardData.link,
          profileData._id === cardData.owner._id ? deleteCard : null,
          toggleLike,
          setImageData,
          cardData._id,
          cardData.likes,
          profileData
        );
        cardsList.append(cardItem);
      });
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
    });
}

function submitFormEditProfile(evt) {
  evt.preventDefault();

  const submitBtn = evt.target.querySelector(".popup__button");
  const initalButtonText = submitBtn.textContent;
  submitBtn.textContent = "Сохранение...";

  updateUserInfo(nameInput.value, jobInput.value)
    .then((result) => {
      profileTitle.textContent = result.name;
      profileDescription.textContent = result.about;
      submitBtn.textContent = initalButtonText;
      closeModal(popupEdit);
      clearValidation(evt.target, validationConfig);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
      submitBtn.textContent = "Ошибка";
    });
}

function submitFormEditAvatar(evt) {
  evt.preventDefault();

  const submitBtn = evt.target.querySelector(".popup__button");
  const initalButtonText = submitBtn.textContent;
  submitBtn.textContent = "Сохранение...";

  updateUserAvatar(avatarUrlInput.value)
    .then((result) => {
      profileAvatar.style = `background-image: url('${result.avatar}')`;
      submitBtn.textContent = initalButtonText;
      closeModal(popupEditAvatar);
      evt.target.reset();
      clearValidation(evt.target, validationConfig);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
      submitBtn.textContent = "Ошибка";
    });
}

function submitFormNewCard(evt) {
  evt.preventDefault();

  const submitBtn = evt.target.querySelector(".popup__button");
  const initalButtonText = submitBtn.textContent;
  submitBtn.textContent = "Сохранение...";

  postNewCard(cardNameInput.value, cardUrlInput.value)
    .then((result) => {
      const cardItem = createCard(
        result.name,
        result.link,
        deleteCard,
        toggleLike,
        setImageData,
        result._id,
        result.likes
      );
      cardsList.prepend(cardItem);
      submitBtn.textContent = initalButtonText;
      closeModal(popupAdd);
      evt.target.reset();
      clearValidation(evt.target, validationConfig);
    })
    .catch((err) => {
      console.log(err); // выводим ошибку в консоль
      submitBtn.textContent = "Ошибка";
    });
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
  clearValidation(formEditProfile, validationConfig);
  openModal(popupEdit);
});

popupAddButton.addEventListener("click", () => {
  openModal(popupAdd);
});

profileAvatar.addEventListener("click", () => {
  openModal(popupEditAvatar);
});

formEditProfile.addEventListener("submit", submitFormEditProfile);

formNewCard.addEventListener("submit", submitFormNewCard);

formEditAvatar.addEventListener("submit", submitFormEditAvatar);

renderCards();

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

enableValidation(validationConfig);
