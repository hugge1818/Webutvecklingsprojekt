//Sökfilter

function filter() {
  var input, filter, div, k, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  for (i = 1; i < 9; i++) {
  div = document.getElementById("product" + [i]);
  k = div.getElementsByTagName('h1')[0];

  txtValue = k.textContent || k.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      div.style.display = "";
    } else {
      div.style.display = "none";
    }
  }
}

//Varukorgen
var carts = document.querySelectorAll('.add-cart');

var products =[{
  name: 'Crucial MX500',
  tag: 'crucialmx500',
  price: 680,
  inCart: 0
},
{
  name: 'iPhone 11‏‏‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎',
  tag: 'iphone11',
  price: 8400,
  inCart: 0
},
{
  name: 'Intel 9900KF ‎‏‏‎',
  tag: 'intelcorei99900kf',
  price: 5800,
  inCart: 0
},
{
  name: 'Galaxy S10‏‏‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎',
  tag: 'galaxys10',
  price: 5990,
  inCart: 0
},
{
  name: 'Crucial BX500',
  tag: 'crucialbx500',
  price: 599,
  inCart: 0
},
{
  name: 'Intel 9700k‏‏‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎‏‏‎ ‎',
  tag: 'intelcorei79700k',
  price: 4399,
  inCart: 0
}
];

for(let i=0; i <carts.length; i++){
    carts[i].addEventListener('click', () =>{
    cartNumbers(products[i]);
    totalCost(products[i]);
  })
}

function cartNumbers(product){

  let productNumbers = localStorage.getItem('cartNumbers');
  productNumbers = parseInt(productNumbers);

  if ( productNumbers ){
    localStorage.setItem('cartNumbers', productNumbers + 1);
  } else{
    localStorage.setItem('cartNumbers', 1);
  }
  setItems(product);

}
function setItems(product){
  let cartItems = localStorage.getItem('productsInCart');
  cartItems = JSON.parse(cartItems);
  
  if(cartItems != null){
    if(cartItems[product.tag] == undefined){
      cartItems = {
        ...cartItems, 
        [product.tag]: product
      }
    }
    cartItems[product.tag].inCart += 1;
  } else{
    product.inCart = 1;
    cartItems = {
      [product.tag]: product
    }
  }
  localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){
  let cartCost = localStorage.getItem('totalCost');

  if(cartCost != null){
    cartCost = parseInt(cartCost);
    localStorage.setItem("totalCost", cartCost + product.price);
  }else{
    localStorage.setItem("totalCost", product.price);
  }
}

function displayCart(){
  let cartItems = localStorage.getItem("productsInCart");
  cartItems = JSON.parse(cartItems);
  let productContainer = document.querySelector(".cartproducts");
  let cartCost = localStorage.getItem('totalCost');

  if(cartItems && productContainer ){
    productContainer.innerHTML = '';
    Object.values(cartItems).map(item => { 
      productContainer.innerHTML += `
      <div class="cartproduct"> 
        <i class="fas fa-times-circle" href="#"></i>
        <img src="./images/${item.tag}.jpg">
        <span class="span1">${item.name}</span>
      <div class="price">${item.price}kr</div>
      <div class="quantity">
        <i class="fas fa-chevron-circle-left" href="#"></i>
        <span class="span2">${item.inCart}</span>
        <i class="fas fa-chevron-circle-right" href="#"></i>
      </div>
      <div class="total">
        ${item.inCart * item.price}kr
      </div>
      </div>
      `;
    });

    productContainer.innerHTML += ` 
    <div class="basketTotalContainer">
      <h4 class="basketTotalTitle>
        Basket Total
      </h4>
      <h4 class="basketTotal">
        ${cartCost}kr
      </h4>
    </div>
    `;

  }
}

//Betalningsfunktion
function purchaseClicked() {
  alert('Tack för köpet');
  localStorage.clear();
  window.location.reload();
}

displayCart();