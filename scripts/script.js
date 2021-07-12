document.addEventListener('DOMContentLoaded', Onload)

function Onload() {
    const pageLoading = document.querySelector('.page .loading')
    setTimeout(() => {
        pageLoading.style.display = 'none'
    }, 500)
}

const page = document.querySelector('.page')
const burger = document.querySelector('.burger__span')
const menu = document.querySelector('.header-nav__menu')
const headerNanList = document.querySelectorAll('.header-nav__list')
const rightBtn = document.querySelector('.right-button')
const leftBtn = document.querySelector('.left-button')
const sidebar = document.querySelector('.sidebar')
const slideContainer = document.querySelector('.slide-container')
const mainSlide = document.querySelector('.main-slide')
const slidesCount = mainSlide.querySelectorAll('div').length
const anchors = document.querySelectorAll('a[href*="#"]')
const mainContactsInputName = document.querySelector('#contacts-input-name')
const mainContactsInputData = document.querySelector('#contacts-input-data')
const mainContactsTextarea = document.querySelector('.main__contacts-textarea')
const mainContactsButton = document.querySelector('.main__contacts-button')
const mainContactsMessage = document.querySelector('.main__contacts-message')
const botKey = import.meta.env.VITE_APP_BOT_KEY
const URL = `https://api.telegram.org/bot1213080858:${botKey}/sendMessage?chat_id=-1001169555829&&text=`

const values = ['active', 'show-menu', 'hidden']
let activeSlideIndex = 0

for (let anchor of anchors) {
    anchor.addEventListener('click', e => {
        e.preventDefault()
        burger.classList.remove('active')
        menu.classList.remove('show-menu')
        page.classList.remove('hidden')
        const blockId = anchor.getAttribute('href')

        document.querySelector('' + blockId).scrollIntoView({
            behavior: "smooth",
            block: "nearest"
        })

    })
}

for (const list of headerNanList) {
    list.addEventListener('touchstart', touchstart)
    list.addEventListener('touchend', touchend)
}


function animateElement(element, index) {
    element.classList.toggle(values[index])
}

function touchstart(e) {
    e.target.style.color = 'red'

}

function touchend(e) {
    e.target.style.color = 'white'

}

burger.addEventListener('click', () => {
    animateElement(burger, 0)
    animateElement(menu, 1)
    animateElement(page, 2)
})


sidebar.style.right = `${(slidesCount - 1) * 100}%`


rightBtn.addEventListener('click', () => {
    changeSlide('right')

})

leftBtn.addEventListener('click', () => {
    changeSlide('left')
})

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') {
        changeSlide('right')
    } else if (e.key === 'ArrowLeft') {
        changeSlide('left')
    }
})

function changeSlide(direction) {
    if (direction === 'left') {
        activeSlideIndex++
        if (activeSlideIndex === slidesCount) {
            activeSlideIndex = 0
        }
    } else if (direction === 'right') {
        activeSlideIndex--
        if (activeSlideIndex < 0) {
            activeSlideIndex = slidesCount - 1
        }
    }
    const width = slideContainer.clientWidth

    mainSlide.style.transform = `translateX(-${activeSlideIndex * width}px)`
    sidebar.style.transform = `translateX(${activeSlideIndex * width}px)`

}


mainContactsButton.addEventListener('click', () => {
    fetchTelegram()
})

function fetchTelegram() {
    if (mainContactsInputName.value && mainContactsInputData.value && mainContactsTextarea.value) {
        fetch(`${URL}
*имя пользователя:* ${mainContactsInputName.value} %0A\
*данные пользователя:* ${mainContactsInputData.value} %0A\
*Сообщение:* ${mainContactsTextarea.value}
&parse_mode=markdown`)
            .then((response) => {
                if (response.status === 200) {
                    mainContactsMessage.innerHTML = 'Сообщение отправлено успешно'
                    mainContactsMessage.style.color = 'green'
                    mainContactsMessage.style.transition = 'all 1s'
                    setTimeout(() => {
                        mainContactsMessage.innerHTML = ''
                    }, 5000)
                    mainContactsInputName.value = mainContactsInputData.value = mainContactsTextarea.value = ''
                    console.log(response.status)
                } else {
                    mainContactsMessage.innerHTML = 'Что-то пошло не так'
                    mainContactsMessage.style.color = 'red'
                    mainContactsMessage.style.transition = 'all 1s'
                    setTimeout(() => {
                        mainContactsMessage.innerHTML = ''
                    }, 5000)
                    console.log(response.status)
                }
            })
    } else {
        mainContactsMessage.innerHTML = 'Поля не должны быть пустыми'
        mainContactsMessage.style.color = 'red'
        mainContactsMessage.style.transition = 'all 1s'
        setTimeout(() => {
            mainContactsMessage.innerHTML = ''
        }, 5000)
    }

}


