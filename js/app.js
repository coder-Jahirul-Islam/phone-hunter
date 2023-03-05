const loadPhones = async (searchText,dataLimit ) => {
    const URL = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(URL);
    const data = await res.json();
    displayPhones(data.data,dataLimit);

}


const displayPhones = (phones,dataLimit) => {
    console.log(phones);

    const phoneContainer = document.getElementById("phones-container")
    phoneContainer.textContent = '';

    // display 10 phones only
    const showAll = document.getElementById('show-all');
    if ( dataLimit && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none')

    } else {
        showAll.classList.add('d-none')
    }

    // display no phones found
    const noPhones = document.getElementById('no-found-message')
    if (phones.length === 0) {
        noPhones.classList.remove('d-none')
    }
    else {
        noPhones.classList.add('d-none')
    }
    // display all phones

    phones.forEach(phone => {
        const phoneDiv = document.createElement('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
             <div class="card p-4">
                    <img src="${phone.image}" class="card-img-top" alt="...">
                 <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                 </div>
             </div>`
        phoneContainer.appendChild(phoneDiv)

    })

    // stop loader
    toggleSpinner(false);


}

const processSearch = (dataLimit) =>{
    toggleSpinner(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadPhones(searchText,dataLimit);

}

// handle search btn click
document.getElementById('btn-search').addEventListener('click', function () {
    // start loader
    processSearch(10)
})

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove("d-none")
    }
    else {
        loaderSection.classList.add("d-none")
    }
}
// not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click',function(){
 processSearch()
})

// loadPhones()






