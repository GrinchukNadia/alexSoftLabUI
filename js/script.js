//header navigation active links
const links = document.querySelectorAll('.nav_li');
let current = document.getElementsByClassName('nav_active');

links.forEach(item => {
    item.addEventListener('click', () => {
        current[0].classList.remove('nav_active')
        item.classList.add('nav_active')
    })
})
//header submenu
const isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (
                isMobile.Android()
                || isMobile.BlackBerry()
                || isMobile.iOS()
                || isMobile.Opera()
                || isMobile.Windows()
                );
    }
};

if(isMobile.any()) {
    document.body.classList.add('mobile')
    let navArr = document.querySelector('.nav_li-dropdown')
    navArr.addEventListener('click', () => {
        navArr.classList.toggle('sub_active')
    })
}else{
    document.body.classList.add('ps')
}
//header mobile menu
const mobileMenu = document.querySelector('.menu_burger');
const menu = document.querySelector('.menu');
mobileMenu.addEventListener('click', () => {
    document.body.classList.toggle('lock')
    menu.classList.toggle('menu_active'); 
    mobileMenu.classList.toggle('menu_burger-active')
})

// slider 

let slider = (containerClass, slidesClass, slideClass, paggination) => {
    const slideContainer = document.querySelector(containerClass);
    const slide = document.querySelector(slidesClass);
    const pag = document.querySelector(paggination);
    const container = document.querySelector('.container')
    
    let slides = document.querySelectorAll(slideClass);
    let index = 1;
    let start;
    let change;
    
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slides.length -1].cloneNode(true);
    
    for (let i = 0; i < slides.length; i++){
        pag.insertAdjacentHTML("afterbegin", `<div class='pag_item'></div>`);
    }

    let pagItem = document.querySelectorAll(`.pag_item`);
    pagItem[0].classList.add('pag_active');

    firstClone.id = 'first-clone';
    lastClone.id = 'last-clone';
    
    slide.append(firstClone);
    slide.prepend(lastClone);
    
    
    
    let slideWidth = (container.offsetWidth) - 40;
    slide.style.transform = `translateX(${-(slideWidth) * index}px)`;
    
    window.addEventListener(`resize`, () => {
        slideWidth = (container.offsetWidth) - 40;
        
        slide.style.transform = `translateX(${-(slideWidth) * index}px)`;
    });
    
    
    const getSlides = () => document.querySelectorAll(slideClass);
    
    
    slide.addEventListener('transitionend', () => {
        slides = getSlides();
        if (slides[index].id === firstClone.id) {
            slide.style.transition = 'none';
            index = 1;
            slide.style.transform = `translateX(${-(slideWidth) * index}px)`;
        }
        
        if (slides[index].id === lastClone.id) {
            slide.style.transition = 'none';
            index = slides.length - 2;
            slide.style.transform = `translateX(${-(slideWidth) * index}px)`;
        }
    });
  
    const moveToNextSlide = () => {
        slides = getSlides();
        if (index >= slides.length - 1) return;
        index++;
        slide.style.transition = '.7s ease-out';
        slide.style.transform = `translateX(${(-slideWidth) * index }px)`;
        let pagItem = document.querySelectorAll(`.pag_item`);
        let pagLength = pagItem.length;
        if (index - 1 == pagLength) {
            pagItem[0].classList.add('pag_active');
            pagItem[pagLength - 1].classList.remove('pag_active');
        } else {
            pagItem[index - 1].classList.add('pag_active');
            pagItem[index - 2].classList.remove('pag_active');
        }
    };
    
    const moveToPreviousSlide = () => {
        if (index <= 0) return;
        index--;
        slide.style.transition = '.7s ease-out';
        slide.style.transform = `translateX(${(-slideWidth) * index}px)`;
        let pagItem = document.querySelectorAll(`.pag_item`);
        let pagLength = pagItem.length;
        if (index - 1 < 0) {
            pagItem[pagLength - 1].classList.add('pag_active');
            pagItem[index].classList.remove('pag_active');
        } else {
            pagItem[index - 1].classList.add('pag_active');
            pagItem[index].classList.remove('pag_active');
        }
    };

    const arrowLeft = document.querySelector('.arrow_left');
    const arrowRight = document.querySelector('.arrow_right');
    arrowRight.addEventListener('click', () => {
        moveToNextSlide();
    })
    arrowLeft.addEventListener('click', () => {
        moveToPreviousSlide();
    })
    
    
    slideContainer.addEventListener('touchstart', (e) => {
        // e.preventDefault();
        start = e.touches[0].clientX;
    });
    slideContainer.addEventListener('touchmove', (e) => {
        // e.preventDefault();
        let touch = e.touches[0];
        change = start - touch.clientX;
    });
    const swipeSlide = () => {
        if (change > 0) {
            moveToNextSlide();
        } else{
            moveToPreviousSlide();
        }
    }
    slideContainer.addEventListener('touchend', swipeSlide);
}

slider('.slider-container', '.slider-slides', '.slider-slide', '.paggination');
// конец слайдер 