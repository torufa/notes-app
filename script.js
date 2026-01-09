//ALL VARIABLES AND DOC SELECTIONS
let formContainer = document.querySelector(".form-container");
let stack = document.querySelector(".stack");
let addNote = document.querySelector("#add-note");
let closeForm = document.querySelector(".closeForm");

let form = document.querySelector("form");
let imageUrlInput = form.querySelector(
  "input[placeholder='https://example.com/photo.jpg']",
);
let fullNameInput = form.querySelector(
  "input[placeholder='Enter full name']",
);
let homeTownInput = form.querySelector(
  "input[placeholder='Enter home town']",
);
let purposeInput = form.querySelector(
  "input[placeholder='e.g., Quick appointment note']",
);
let categoryRadios = form.querySelectorAll("input[type='radio']");
let submitButton = form.querySelector(".submit-btn");

let upBtn = document.querySelector("#upBtn");
let downBtn = document.querySelector("#downBtn");


//CODE STARTS HERE
addNote.addEventListener("click", function(){
  formContainer.style.display = "initial";
});

closeForm.addEventListener("click", () => {
  formContainer.style.display = "none";
});


form.addEventListener("submit", function(evt){
  evt.preventDefault();

  let imageUrl = imageUrlInput.value.trim();
  let fullName = fullNameInput.value.trim();
  let homeTown = homeTownInput.value.trim();
  let purpose = purposeInput.value.trim();

  if (imageUrl === "") {
    alert("Please enter an Image URL.");
    return;
  }

  if (fullName === "") {
    alert("Please enter your Full Name.");
    return;
  }

  if (homeTown === "") {
    alert("Please enter your Home Town.");
    return;
  }

  if (purpose === "") {
    alert("Please enter the Purpose.");
    return;
  }

  let selected = false;
  categoryRadios.forEach(function(e){
    if(e.checked){
      selected = e.value;
    }
  });

  if(!selected){
    alert("Please select a category");
    return;
  }
  saveToLocalStorage({
    imageUrl,
    fullName,
    homeTown,
    purpose,
    selected
  })
  form.reset();
  formContainer.style.display = "none";
  showCards();
})

function saveToLocalStorage(obj){
  let oldTasks = JSON.parse(localStorage.getItem("tasks")) || [];

  oldTasks.push(obj);
  localStorage.setItem("tasks", JSON.stringify(oldTasks));
}

function showCards() {
  stack.innerHTML = "";

  let allTasks = JSON.parse(localStorage.getItem("tasks"));

  allTasks.forEach(function (task) {
    // Create card container
    const card = document.createElement("div");
    card.classList.add("card");

    // Avatar image
    const avatar = document.createElement("img");
    avatar.src = task.imageUrl;
    avatar.alt = "profile";
    avatar.classList.add("avatar");
    card.appendChild(avatar);

    // Name 
    const name = document.createElement("h2");
    name.textContent = task.fullName;
    card.appendChild(name);

    // Info: Home town
    const hometownInfo = document.createElement("div");
    hometownInfo.classList.add("info");

    const hometownLabel = document.createElement("span");
    hometownLabel.textContent = "Home town";
    const hometownValue = document.createElement("span");
    hometownValue.textContent = task.homeTown;

    hometownInfo.appendChild(hometownLabel);
    hometownInfo.appendChild(hometownValue);
    card.appendChild(hometownInfo);

    // Info: Bookings
    const bookingsInfo = document.createElement("div");
    bookingsInfo.classList.add("info");

    const bookingsLabel = document.createElement("span");
    bookingsLabel.textContent = "Purpose";
    const bookingsValue = document.createElement("span");
    bookingsValue.textContent = task.purpose;

    bookingsInfo.appendChild(bookingsLabel);
    bookingsInfo.appendChild(bookingsValue);
    card.appendChild(bookingsInfo);

    // Buttons container
    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");

    // Call button
    const callBtn = document.createElement("button");
    callBtn.classList.add("call");
    callBtn.innerHTML = '<i class="ri-phone-line"></i> Call';

    // Message button
    const msgBtn = document.createElement("button");
    msgBtn.classList.add("msg");
    msgBtn.textContent = "Message";

    // Append buttons
    buttonsDiv.appendChild(callBtn);
    buttonsDiv.appendChild(msgBtn);

    // Append buttonsDiv to card
    card.appendChild(buttonsDiv);

    // Finally, add the card to the DOM (for example, inside a container)
    document.querySelector(".stack").appendChild(card); // or any container of your choice
  });
}
showCards();

function updateStack(){
  let cards = document.querySelectorAll(".stack .card");

  cards.forEach(function(card, index){
    card.style.zIndex = 100 - index;
    card.style.transform = `translateY(${index * 10}px) scale(${1 - index * 0.02})`;
    card.style.opacity = 1 - index * 0.02;
});
}


upBtn.addEventListener("click", function(){
  let lastChild = stack.lastElementChild;
  if(lastChild){
    stack.insertBefore(lastChild, stack.firstElementChild);
  }
});
downBtn.addEventListener("click", function(){
  let firstChild = stack.firstElementChild;
  if(firstChild){
    stack.appendChild(stack.firstChild);
  }
})


