const loginFromOtherPage = () => {
    window.location.href = "loginPage.html";
};

const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar')

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active')
    })
}
if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active')
    })
}

const search = () => {
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
}

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


const wrapper = document.querySelector(".wrapper");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");
const btnPopUp = document.querySelector(".btnLogin-popup");
const iconClose = document.querySelector(".icon-close");
const heroText = document.getElementById("hero-text");

registerLink.addEventListener("click", () => {
    wrapper.classList.add("active2");
})

loginLink.addEventListener("click", () => {
    wrapper.classList.remove("active2");
})


btnPopUp.addEventListener("click", () => {
    wrapper.classList.add("active2-popup");
})

iconClose.addEventListener("click", () => {
    wrapper.classList.remove("active2-popup");
})


