window.addEventListener("DOMContentLoaded", () => {
    slider({
        container: ".slider",
        slide: ".slide",
        nextArrow: ".slider-next",
        prevArrow: ".slider-prev",
        currentCounter: "#current",
        wrapper: ".slider-wrapper",
        field: ".slider-inner",
    })
});

function slider({ container, slide, nextArrow, prevArrow, currentCounter, wrapper, field }) {
    const slides = document.querySelectorAll(slide),
        slider = document.querySelector(container),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        prev = document.querySelector(prevArrow),
        next = document.querySelector(nextArrow),
        current = document.querySelector(currentCounter),
        width = window.getComputedStyle(slidesWrapper).width;

    let slideIndex = 1;
    let offset = 0;


    slidesField.style.width = `${100 * slides.length}%`;
    slidesField.style.display = 'flex';
    slidesField.style.transition = '0.5s all';
    slider.style.position = 'relative';

    slides.forEach(slide => {
        slide.style.width = width;
    });
    slidesWrapper.style.overflow = 'hidden';

    function deleteNotDigits(str) {
        return Math.round(str.replace(/[^.\d]/g, ''));
    }

    function addedZeroSlides() {
        if (slides.length < 10) {
            current.textContent = `0${slideIndex}`;
        } else {
            current.textContent = `${slideIndex}`;
        }
    }


    addedZeroSlides();

    next.addEventListener('click', () => {
        if (offset == deleteNotDigits(width) * (slides.length - 1)) {
            offset = 0;
        } else {
            offset += deleteNotDigits(width);

        }
        slidesField.style.transform = `translateX(-${offset}px)`;
        if (slideIndex == slides.length) {
            slideIndex = 1;
        } else {
            slideIndex++;
        }

        addedZeroSlides();
    });

    prev.addEventListener('click', () => {
        if (offset == 0) {
            offset = deleteNotDigits(width) * (slides.length - 1);
        } else {
            offset -= deleteNotDigits(width);
        }
        slidesField.style.transform = `translateX(-${offset}px)`;

        if (slideIndex == 1) {
            slideIndex = slides.length;
        } else {
            slideIndex--;
        }

        addedZeroSlides();
    });
}
