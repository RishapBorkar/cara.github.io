// Shopping cart function call

if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
    login();
    search();
    search2();
    loginFromOtherPage();
    login2();
    Sidebar();
};

// Sidebar

const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar')

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active')
    })
};
if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active')
    })
};

// Login from other page

function loginFromOtherPage () {
    window.location.href = "loginPage.html";
};

// Add To Cart

var addToCartButton = document.getElementById('add-to-cart');
addToCartButton.addEventListener('click', addToCart);

// Login button function

function login () {
    const wrapper = document.querySelector(".wrapper");
    const loginLink = document.querySelector(".login-link");
    const registerLink = document.querySelector(".register-link");
    const iconClose = document.querySelector(".icon-close");

    registerLink.addEventListener("click", () => {
        wrapper.classList.add("active2");
    });

    loginLink.addEventListener("click", () => {
        wrapper.classList.remove("active2");
    });


    wrapper.classList.add("active2-popup");

    iconClose.addEventListener("click", () => {
        wrapper.classList.remove("active2-popup");
    });
};

// Login Page function

function login2 () {
    const wrapper = document.querySelector(".wrapper");
    const loginLink = document.querySelector(".login-link");
    const iconClose = document.querySelector(".icon-close");

    wrapper.classList.add("active2");

    loginLink.addEventListener("click", () => {
        wrapper.classList.remove("active2");
    });

    iconClose.addEventListener("click", () => {
        wrapper.classList.remove("active2-popup");
    });
};

// Cart Page Working

function ready() {

    var cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        cartItems = JSON.parse(cartItems);
        if (cartItems.length > 0) {
            var cartDocument = document;

            var cartTable = cartDocument.querySelector('.cart-content');

            for (var i = 0; i < cartItems.length; i++) {
                var cartItem = cartItems[i];

                // Create a new cart item row
                var cartRow = document.createElement('tr');
                cartRow.classList.add('cart-box');

                // Add the necessary HTML elements to the cart item row
                var cartRemoveCell = document.createElement('td');
                var removeIcon = document.createElement('i');
                removeIcon.classList.add('far', 'fa-times-circle', 'cart-remove');
                cartRemoveCell.appendChild(removeIcon);
                cartRow.appendChild(cartRemoveCell);

                var cartImageCell = document.createElement('td');
                var cartImage = document.createElement('img');
                cartImage.setAttribute('src', cartItem.image);
                cartImageCell.appendChild(cartImage);
                cartRow.appendChild(cartImageCell);

                var cartTitleCell = document.createElement('td');
                cartTitleCell.textContent = cartItem.title;
                cartRow.appendChild(cartTitleCell);

                var cartPriceCell = document.createElement('td');
                cartPriceCell.classList.add('cart-price');
                cartPriceCell.textContent = cartItem.price;
                cartRow.appendChild(cartPriceCell);

                var cartQuantityCell = document.createElement('td');
                var cartQuantityInput = document.createElement('input');
                cartQuantityInput.setAttribute('type', 'number');
                cartQuantityInput.setAttribute('value', cartItem.quantity);
                cartQuantityInput.classList.add('cart-quantity');
                cartQuantityCell.appendChild(cartQuantityInput);
                cartRow.appendChild(cartQuantityCell);

                var cartSubtotalCell = document.createElement('td');
                cartSubtotalCell.classList.add('subTotal-price');
                cartRow.appendChild(cartSubtotalCell);

                cartTable.appendChild(cartRow);
            };
        } 
        
        else {
            var cartEmptyMessage = document.getElementById('cart-empty-message');
            cartEmptyMessage.style.display = 'flex';
        };
    }
    
    else {
        var cartEmptyMessage = document.getElementById('cart-empty-message');
        cartEmptyMessage.style.display = 'flex';
    };

    // Remove Items From Cart
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    console.log(removeCartButtons)

    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    };

    // Update subtotal and total

    var quantityInputs = document.querySelectorAll('.cart-quantity');

    quantityInputs.forEach(function(quantityInput) {
        quantityInput.addEventListener('change', function() {
            UpdateSubtotal();
            UpdateTotal();
        });
    });

    function UpdateSubtotal() {
        var quantityInputs = document.querySelectorAll('.cart-quantity');
        var totalPrices = document.querySelectorAll('.subTotal-price');
        
        for (var i = 0; i < quantityInputs.length; i++) {
            var quantityInput = quantityInputs[i];
            var totalPrice = totalPrices[i];
            var cartPrice = quantityInput.parentNode.previousElementSibling.textContent;
            
            var quantity = parseInt(quantityInput.value);
            var price = parseFloat(cartPrice.replace('$', ''));
            
            if (isNaN(quantity) || quantity <= 0) {
                quantity = 1;
                quantityInput.value = 1;
            }
            
            var subtotal = quantity * price;
            totalPrice.textContent = '$' + subtotal.toFixed(2);
        }
    };
    UpdateSubtotal();
    UpdateTotal();

    // Buy Now Function

    var buyNowButton = document.querySelector('.buyNow');
    buyNowButton.addEventListener('click', buyNow);

    function buyNow() {
        localStorage.removeItem('cartItems');
        var cartTable = document.querySelector('.cart-content');
        cartTable.innerHTML = '';

        UpdateTotal();
        var cartEmptyMessage = document.getElementById('cart-empty-message');
        cartEmptyMessage.style.display = 'flex';

        alert("Your order has been placed");
    };
};

// Remove items from cart

function removeCartItem(event) {
    var buttonClicked = event.target;
    var cartItemRow = buttonClicked.closest('tr');
    var cartItems = JSON.parse(localStorage.getItem('cartItems'));

    // Find the index of the cart item in the array
    var index = Array.from(cartItemRow.parentNode.children).indexOf(cartItemRow);

    // Remove the cart item from the array
    cartItems.splice(index, 1);

    // Update the cart items in localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    // Remove the cart item from the HTML
    cartItemRow.remove();

    UpdateTotal();
};

// Update Subtotal of Whole Cart

function UpdateTotal() {
    var subTotalElements = document.querySelectorAll('.subTotal-price');
    var subtotal = 0;
    
    for (var i = 0; i < subTotalElements.length; i++) {
      var subTotalValue = parseFloat(subTotalElements[i].textContent.replace('$', ''));
      subtotal += subTotalValue;
    }
  
    var cartSubtotalElement = document.querySelector('.cart-subtotal');
    var cartTotalElement = document.querySelector('.cart-total');
    cartSubtotalElement.textContent = '$' + subtotal.toFixed(2);
    cartTotalElement.textContent = '$' + subtotal.toFixed(2);
};

// Add Product to Cart

function addToCart() {
    var productImage = document.querySelector('#MainImg').getAttribute('src');
    var productTitle = document.querySelector('.product-title').textContent;
    var productPrice = document.querySelector('.price').textContent;
    var cartQuantity = document.querySelector('.cart-quantity').value;

    var cartItem = {
        image: productImage,
        title: productTitle,
        price: productPrice,
        quantity: cartQuantity
    };

    var cartItems = localStorage.getItem('cartItems');
    if (cartItems) {
        cartItems = JSON.parse(cartItems);
    } else {
        cartItems = [];
    }
    cartItems.push(cartItem);

    localStorage.setItem('cartItems', JSON.stringify(cartItems));

    window.location.href = 'cart.html';
};

function search () {
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const storeitems = document.getElementById("product-list");
    const product = document.querySelectorAll(".pro");
    const pname = storeitems.getElementsByTagName("h5");
    const pageheader = document.getElementById("page-header");

    for(var i = 0; i < pname.length; i++) {
        let match = product[i].getElementsByTagName("h5")[0];

        if (match) {
           let textvalue = match.textContent || match.innerHTML;

           if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
            product[i].style.display = "";
            pageheader.style.display = "none";
           }
           else {
            product[i].style.display = "none";
           }
        }
    }
};

const search2 = () => {
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const storeitems = document.getElementById("product-list");
    const product = document.querySelectorAll(".pro");
    const pname = storeitems.getElementsByTagName("h5");
    const prodetails = document.getElementById("prodetails");

    for(var i = 0; i < pname.length; i++) {
        let match = product[i].getElementsByTagName("h5")[0];

        if (match) {
           let textvalue = match.textContent || match.innerHTML;

           if (textvalue.toUpperCase().indexOf(searchbox) > -1) {
            product[i].style.display = "";
            prodetails.style.display = "none";
           }
           else {
            product[i].style.display = "none";
           }
        }
    }
};



