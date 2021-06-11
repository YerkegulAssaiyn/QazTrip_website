// Get the modal
const modal = document.querySelector("#myModal");

// Get the button that opens the modal
const btn = document.querySelectorAll(".btn");

// Get the <span> element that closes the modal
const closeModal = document.getElementsByClassName("close")[0];

for (let i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", function () {
    modal.style.display = "block";
  });
}

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
