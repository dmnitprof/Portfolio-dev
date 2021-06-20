document.addEventListener('DOMContentLoaded', Onload)

function Onload() {
    const pageLoading = document.querySelector('.page .loading')
    setTimeout(() => {
        pageLoading.style.display = 'none'
    }, 500)
}

const burger = document.querySelector('.burger__span')
const menu = document.querySelector('.header-nav__menu')

const switchClass = ['active', 'show-menu']

burger.addEventListener('click', (e) => {
        animateElement(burger, 0)
        animateElement(menu, 1)
})

function animateElement(element, index) {
   element.classList.toggle(switchClass[index])
}
