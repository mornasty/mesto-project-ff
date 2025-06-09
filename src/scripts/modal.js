function closePopupByEsc(popup) {
  document.addEventListener("keydown", closePopup);

  function closePopup(evt) {
    if (evt.key == "Escape") {
      closeModal(popup);
      document.removeEventListener("keydown", closePopup);
    }
  }
}

export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
}

export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  closePopupByEsc(popup);
}
