let addToy = false;

const toyURL = 'http://localhost:3000/toys'

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  fetchingToys()

  //where to put new toys
  const addNewToy = document.querySelector(".add-toy-form")
  console.log(addNewToy) 
  addNewToy.addEventListener("submit", newToy)

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

//FETCH ANDY'S TOYS
function fetchingToys(){
  fetch(toyURL)
    .then(res => res.json())
    .then(toyList => toyList.forEach(toy => renderToy(toy)))
    //toy is the element created. i.e in toyList, for each created element do...

}

//ADD TOY INFO TO THE CARD
function renderToy(toy){
let toyCollection = document.querySelector("#toy-collection")

//make a div class for each toy and add it to the toy collection div
let toyDiv = document.createElement('div')
  toyDiv.className = "card"

//Add toy info to the card 
let toyHeader = document.createElement('h2')
  toyHeader.innerText = toy.name

let toyImg = document.createElement('img')
  toyImg.src = toy.image
  toyImg.className = "toy-avatar"

let toyP = document.createElement('p')
  toyP.innerText = `${toy.likes} Likes`

let toyButton = document.createElement('button')
  toyButton.innerText = "Like <3"
  toyButton.className = "like-btn"
  toyButton.id = toy.id

  //for likes
  toyButton.addEventListener("click", (event) => {
    toyLikes(event, toyP) 
  })


  
//put it all together in the div
//Append can be used for multiple elements
toyDiv.append(toyHeader, toyImg, toyP, toyButton)
//appendChild is for a single element
toyCollection.appendChild(toyDiv)
}

//ADD A NEW TOY
function newToy(event) {
  event.preventDefault()
  console.log(event);

  //grab new toy data from the forms
  let toyData = {
    name: event.target.name.value,
    image: event.target.image.value,
    likes: 0
  }
  // debugger

  // POST request - building an object to send to server
  fetch(toyURL, {
    method:"POST",
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(toyData)
  }).then(res => res.json())
    .then(toy => renderToy(toy)) //we simply want this to be placed in with 
    //the other toys
  
    //clear the form once new toy has been added
    document.querySelector(".add-toy-form").reset()
}

//INCREASE A TOY'S LIKES
function toyLikes(event, toyP){
  //1. need event listener for like button.

  //2. Capture the toy's ID. 
  //Remember that event.currentTarget always returns the element that the listener was attached to
  let captureId = event.target.id

  //3.Calculate the number of likes
    //a. need to print the number of likes on the page then increase it 
    //.split on the space and grab the first value
  let likes = parseInt(toyP.innerText.split(" ")[0]) + 1;
  console.log(likes)

  //3. FETCH, PATCH stuff
  fetch(`${toyURL}/${captureId}` ,{
    method:"PATCH",
    headers:{
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "likes": likes
  }) 
}).then (res => res.json())
  .then (toy => toyP.innerText = `${toy.likes} Likes`)
}

