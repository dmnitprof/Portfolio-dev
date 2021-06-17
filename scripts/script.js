// document.addEventListener('DOMContentLoaded', Onload)
//
// function Onload() {
//     const pageLoading = document.querySelector('.page .loading')
//     setTimeout(() => {
//         pageLoading.style.display = 'none'
//     }, 500)
// }

const burger = document.querySelector('.header__nav-burger span')
const menu = document.querySelector('.header__nav-menu')

const switchClass = ['active', 'show']

burger.addEventListener('click', (e) => {
        animateElement(burger, 0)
        animateElement(menu, 1)
})

function animateElement(element, index) {
   element.classList.toggle(switchClass[index])
}
// const mediaQueryMobile = window.matchMedia(' (min-width: 320px),(max-width: 768px)')
// const mediaQueryPc = window.matchMedia('(min-width: 769px)')
// if (mediaQueryMobile.matches) {
//     menu.classList.add('header__nav-menu--mobile')
// }
// if(mediaQueryPc.matches){
//     menu.classList.remove('header__nav-menu--mobile')
// }