// =====> Main variables
var siteName = document.getElementById("bookmark_name");
var siteURL = document.getElementById("bookmark_url");
var submitBtn = document.querySelector(".btn.btn-danger"); // زر الإرسال
var tableContent = document.getElementById("tableContent");
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");
var bookmarks = [];

// =====> LocalStorage
if (localStorage.getItem("bookmarksList")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
  bookmarks.forEach((bookmark, index) => displayBookmark(index));
}

// =====> Display Function
function displayBookmark(indexOfWebsite) {
  var userURL = bookmarks[indexOfWebsite].siteURL;
  var httpsRegex = /^https?:\/\//g;
  var validURL = httpsRegex.test(userURL) ? userURL : `https://${userURL}`;
  var fixedURL = userURL.replace(httpsRegex, "");

  var newBookmark = `
    <tr>
      <td>${indexOfWebsite + 1}</td>
      <td>${bookmarks[indexOfWebsite].siteName}</td>
      <td>
        <button class="btn btn-info" data-index="${indexOfWebsite}">
          <i class="fa-solid fa-eye pe-2"></i>Visit
        </button>
      </td>
      <td>
        <button class="btn btn-danger" data-index="${indexOfWebsite}">
          <i class="fa-solid fa-trash-can"></i>Delete
        </button>
      </td>
    </tr>
  `;
  tableContent.innerHTML += newBookmark;

  // btn
  document
    .querySelector(`.btn-info[data-index="${indexOfWebsite}"]`)
    .addEventListener("click", visitWebsite);

  document
    .querySelector(`.btn-danger[data-index="${indexOfWebsite}"]`)
    .addEventListener("click", deleteBookmark);
}

// =====> clear
function clearInput() {
  siteName.value = "";
  siteURL.value = "";
}

// =====> Capitalization
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// =====> add bookmark
submitBtn.addEventListener("click", function () {
  if (
    siteName.classList.contains("is-valid") &&
    siteURL.classList.contains("is-valid")
  ) {
    var bookmark = {
      siteName: capitalize(siteName.value),
      siteURL: siteURL.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    displayBookmark(bookmarks.length - 1);
    clearInput();
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
  } else {
    boxModal.classList.remove("d-none");
  }
});

// =====> delete
function deleteBookmark(e) {
  var deletedIndex = e.target.dataset.index;
  bookmarks.splice(deletedIndex, 1);
  tableContent.innerHTML = "";
  bookmarks.forEach((_, index) => displayBookmark(index));
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}

// =====> visit
function visitWebsite(e) {
  var websiteIndex = e.target.dataset.index;
  var httpsRegex = /^https?:\/\//;
  var url = bookmarks[websiteIndex].siteURL;
  var validURL = httpsRegex.test(url) ? url : `https://${url}`;
  window.open(validURL, "_blank");
}

// =====> Verify data
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex = /^(https?:\/\/)?(www\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;

siteName.addEventListener("input", function () {
  validate(siteName, nameRegex);
});

siteURL.addEventListener("input", function () {
  validate(siteURL, urlRegex);
});

function validate(element, regex) {
  if (regex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

// =====> close modal Function
function closeModal() {
  boxModal.classList.add("d-none");
}

// =====> طرق إغلاق النافذة
closeBtn.addEventListener("click", closeModal);
