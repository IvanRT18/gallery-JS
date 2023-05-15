function getElement(selection) {
  const element = document.querySelector(selection);
  if (element) {
    return element;
  }
  throw new Error(
    `Please check "${selection}" selector, no such element exists`
  );
}

function Gallery(element) {
  this.container = element;
  //Target elements
  this.list = element.querySelectorAll(".img");
  this.list = [...element.querySelectorAll(".img")]; //Spread operator
  this.modal = getElement(".modal");
  this.modalImg = getElement(".main-img");
  this.modalImages = getElement(".modal-images");
  this.imageName = getElement(".image-name");
  this.closeBtn = getElement(".close-btn");
  this.prevBtn = getElement(".prev-btn");
  this.nextBtn = getElement(".next-btn");

  //Bind
  // this.openModal = this.openModal.bind(this);
  //Usamos bind para closeModal, prevImage y nextImage porque si no estariamos haciendo referencia a los botones y no a Gallery
  this.closeModal = this.closeModal.bind(this);
  this.prevImage = this.prevImage.bind(this);
  this.nextImage = this.nextImage.bind(this);
  this.chooseImage = this.chooseImage.bind(this);
  //EventListeners
  this.container.addEventListener(
    "click",
    function (e) {
      //Si se clickeo una imagen
      if (e.target.classList.contains("img")) {
        this.openModal(e.target, this.list);
      }
    }.bind(this)
  );
}

Gallery.prototype.openModal = function (selectedImage, list) {
  this.setImage(selectedImage);
  this.modalImages.innerHTML = list
    .map(function (image) {
      return `<img src="${
        image.src
      }" title="${image.title}" alt="nature" class="${image.dataset.id === selectedImage.dataset.id ? "modal-img selected" : "modal-img"} data-id="${image.dataset.id}">`;
    })
    .join("");
  this.modal.classList.add("open");
  this.closeBtn.addEventListener("click", this.closeModal);
  this.prevBtn.addEventListener("click", this.prevImage);
  this.nextBtn.addEventListener("click", this.nextImage);
  this.modalImages.addEventListener("click", this.chooseImage); //No se pasan parametros en addEventListener incluso si la funcion los requiere
  console.log(selectedImage, list);
};

Gallery.prototype.closeModal = function () {
  this.modal.classList.remove("open");
  this.closeBtn.removeEventListener("click", this.closeModal);
  this.prevBtn.removeEventListener("click", this.prevImage);
  this.nextBtn.removeEventListener("click", this.nextImage);
  this.modalImages.removeEventListener("click", this.chooseImage);
};

Gallery.prototype.nextImage = function () {
  const selected = this.modalImages.querySelector(".selected");
  const next =
    selected.nextElementSibling || this.modalImages.firstElementChild;
  selected.classList.remove("selected");
  next.classList.add("selected");
  this.setImage(next);
};

Gallery.prototype.prevImage = function () {
  const selected = this.modalImages.querySelector(".selected");
  const prev =
    selected.previousElementSibling || this.modalImages.lastElementChild;
  selected.classList.remove("selected");
  prev.classList.add("selected");
  this.setImage(prev);
};

Gallery.prototype.setImage = function (selectedImage) {
  this.modalImg.src = selectedImage.src;
  this.imageName.textContent = selectedImage.title;
};

Gallery.prototype.chooseImage = function (e) {
  if (e.target.classList.contains("modal-img")) {
    this.setImage(e.target);
    const selected = this.modalImages.querySelector(".selected");
    selected.classList.remove("selected");
    e.target.classList.add("selected");
  }
};

const nature = new Gallery(getElement(".nature"));
const city = new Gallery(getElement(".city"));
