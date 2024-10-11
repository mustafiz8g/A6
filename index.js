

document.getElementById('viewBtn').addEventListener('click', function () {
    document.getElementById('best-friend-section').scrollIntoView({
        behavior: 'smooth'
    })
})


// 1 - fetch, load and show categories on html

//create load categories
const loadCategories = async() => {
    // fetch the data 
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/categories')
    const data = await res.json();
    displayCategories(data.categories)
}

const loadPets = async() => {
    // fetch the data 
    const res = await fetch('https://openapi.programming-hero.com/api/peddy/pets')
    const data = await res.json();
    displayPets(data.pets)
}


const loadPetCategories = async(id) =>{
   
   const res = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
    const data = await res.json();
    displayPets(data.data)
    displaySpinner()
}




const loadDetails = async(id) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`)
    const data = await res.json();
    displayDetails(data.petData)
 }

 const displayDetails = (details) => {
   console.log(details)
    const modalContainer = document.getElementById('modal-container');
    modalContainer.innerHTML = "";
    my_modal_1.showModal()
   
    const modal = document.createElement('div')
  
    modal.innerHTML = `
    
    <figure class="p-5">
    <img class="rounded-lg w-full"
      src="${details.image}" />
  </figure>
  <div class=" pl-6 pb-5 pr-5 ">
    <h2 class="text-2xl font-extrabold">${details.pet_name}</h2>
   <div class = "space-y-2 text-slate-600 grid grid-cols-2">
    <p><i class="fa-solid fa-table-columns"></i> &nbsp Breed: &nbsp ${details.breed}</p>
    <p> <i class="fa-regular fa-calendar-days"></i>&nbsp Birth: &nbsp ${details.date_of_birth}</p>
    <p> <i class="fa-solid fa-mercury"></i>&nbsp Gender: &nbsp ${details.gender}</p>
    <p> <i class="fa-solid fa-dollar-sign"></i> &nbsp Price: &nbsp ${details.price}</p>
    <p> <i class="fa-solid fa-mercury "></i>&nbsp Vaccinated Status : &nbsp ${details.vaccinated_status}</p>
    
   </div>
    <div class = "pb-3 border-b" > </div>
    
    <h4 class = "text-xl font-bold text-black1 mt-2 mb-2">Details Information </h4>
    <p>${details.pet_details} </p>

    `
  modalContainer.append(modal)
    
 } 

// create display categories

const displayCategories = (categories) => {
   
    const petBtnSection = document.getElementById('pet-btn-section')
    categories.forEach(item => {
       console.log(item.category)

        const petBtnContainer = document.createElement('div')
        petBtnContainer.classList = "";
       
      

        petBtnContainer.innerHTML = `
         
       
         <button onclick = "loadPetCategories('${item.category}')" class =" h-[100px] w-[240px] hover:bg-teal-100 flex justify-center px-8 py-4 gap-8  items-center bg-white border border-teal-200	 rounded-xl" >
         <img src="${item.category_icon}">
         <h4 class = "text-2xl font-bold">${item.category} </h4>
         </button>
       
        `

       petBtnSection.append(petBtnContainer)


    });


}

// all pets 



const displayPets = (pets) => {

    document.getElementById('spinner').classList.remove('hidden');
    setTimeout(function() {
        document.getElementById('spinner').classList.add('hidden')
    }, 2000);

     const bestDealContainer = document.getElementById('best-deal-container');
    bestDealContainer.innerHTML = "";

    if(pets.length == 0){
        bestDealContainer.innerHTML = `
         <div class=" col-span-3 bg-slate-100 flex flex-col  items-center space-y-6 p-24 rounded-xl">
        <img src="images/error.webp" alt="">
        <p class="text-5xl text-black1 font-bold">No Information Available</p>
        <p>Hi! We're currently out of stock on birds, but we'll have a fresh supply later today. If you'd like to reserve one, feel free to let us know, and we'll make sure to save it for you. You can also check back in a few hours for updates. Thank you for understanding! </p>
     </div>

        `
        return
    }

   pets.forEach( pet => {
    console.log(pet)

    const card = document.createElement('div')
    
    card.innerHTML = `
    
    <div class="card border ">
  <figure class="p-5">
    <img class="rounded-lg w-full"
      src="${pet.image}" />
  </figure>
  <div class=" pl-6 pb-5 pr-5">
    <h2 class="text-xl font-extrabold">${pet.pet_name}</h2>
   <div class = " text-slate-600">
    <p><i class="fa-solid fa-table-columns"></i> &nbsp Breed: &nbsp ${pet.breed}</p>
    <p> <i class="fa-regular fa-calendar-days"></i>&nbsp Birth: &nbsp ${pet.date_of_birth}</p>
    <p> <i class="fa-solid fa-mercury"></i>&nbsp Gender: &nbsp ${pet.gender}</p>
    <p class="mb-3"> <i class="fa-solid fa-dollar-sign"></i> &nbsp Price: &nbsp ${pet.price}</p>
   </div>
    
    <div class="card-actions pt-4 border-t  text-teal-500 flex justify-between">
      <button onclick=getImg('${pet.image}') class="btn btn-sm bg-transparent border border-teal-200 hover:bg-teal-100 "><i class="fa-regular fa-thumbs-up"></i></button>
      <button id="count-text" onclick= countDown() class="btn btn-sm bg-transparent border border-teal-200 hover:bg-teal-100 text-teal-500">Adopt</button>
      <button id="modal-btn" onclick=loadDetails(${pet.petId}) class="btn btn-sm border bg-transparent border-teal-200 hover:bg-teal-100 text-teal-500">Details</button>
    </div>
  </div>
</div>
       

    `
    bestDealContainer.append(card)

   })
   
}

const getImg = (img) => {
   console.log(img)
    
   const likedImgContainer = document.getElementById('selected-img')
   const div = document.createElement('div')
   div.innerHTML = "";
   div.innerHTML = `
    <div>
      <img class= "w-full rounded-lg" src = "${img}" />
    </div>
   `

   likedImgContainer.append(div)

}


function countDown(){
   document.getElementById('count-text').innerText = 'Adopted'
}

loadCategories()
loadPets()

