document.addEventListener(('DOMContentLoaded'), function () {
  //  this is the endpoint for the dummy data
  // https://dummyjson.com/products

  const productsContainer = document.querySelector(".products")
  const modal = document.querySelector('.modal');
  const modalImage = document.querySelector('.modal-image');
  const listImage = document.querySelector('.list-image');
  const modalTitle = document.querySelector('.modal-title');
  const modalPrice = document.querySelector('.modal-price');
  const modalDescription = document.querySelector('.modal-description');
  const modalRating = document.querySelector('.modal-rating');
  const closeModalButton = document.querySelector('.btn--close-modal')


  //chiamata e popolamento del singolo prodotto con i relativi dati
  const singleProduct = (id) => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then(res => res.json())
      .then((product) => {
        modalImage.src = product.thumbnail;
        modalImage.alt = product.title;
        listImage.innerHTML = '';
        product.images.forEach(image => {
          let template =
            `<li class="list-image">
              <img
                src=${image}
                alt="image"
              />
            </li>`
          listImage.innerHTML += template
        });
        modalPrice.textContent = `$ ${product.price}`;
        modalTitle.textContent = product.title;
        modalDescription.textContent = product.description;
        modalRating.textContent = `Rating: ${product.rating}`;
        modal.classList.remove("modal--hidden"); //cerco di mascherare il ritardo facendo aprire la modale solo dopo il caricamento degli elementi
      });
  }


  //interazione con i pulsanti

  const productButtons = () => {

    const buttons = document.querySelectorAll('.button--product');

    buttons.forEach((button) => {
      button.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        singleProduct(id);
      })
    });
  }


  closeModalButton.addEventListener('click', function () {
    modal.classList.add("modal--hidden");
  })





  //template iniziale che stampa tutte le carte

  const printProductsCards = (data) => {

    productsContainer.innerHTML = ""
    data.forEach((element) => {
      let template =
        `<div class="product">
          <div class="content">
            <h2>${element.category}</h2>
            <img
              src="${element.thumbnail}"
              alt="${element.title}"
            />
            <h3>${element.title}</h3>
            <p>${element.brand}</p>
            <p>$ ${element.price}</p>
            <p>In stock: ${element.stock}</p>
          </div>
          <button class="btn button--product" data-id="${element.id}">View</button>
        </div>`;

      productsContainer.innerHTML += template;
    })

    productButtons()

  }


  //chiamata a tutti i prodotti
  fetch('https://dummyjson.com/products')
    .then(res => res.json())
    .then((data) => printProductsCards(data.products));


  //sezione di ricerca

  const searchInput = document.getElementById('search')
  const searchButton = document.querySelector('.search-button')
  const resetButton = document.querySelector('.reset-button')


  searchButton.addEventListener('click', function () {
    if (searchInput.value.length > 0 && searchInput.value != ' ') {
      fetch(`https://dummyjson.com/products/search?q=${searchInput.value}`)
        .then(res => res.json())
        .then((data) => printProductsCards(data.products))
    } else {
      productsContainer.innerHTML = '';
    }
  });

  resetButton.addEventListener('click', function () {
    searchInput.value = ''
    fetch(`https://dummyjson.com/products`)
      .then(res => res.json())
      .then((data) => printProductsCards(data.products))
  });



});







