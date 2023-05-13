const fullImgBox = document.getElementById("fullImgBox");
const fullImg = document.getElementById("fullImg");
const form = document.getElementById('write-me');
let slideIndex = 1;

function validation() {
    function removeError(input) {
        const parent = input.parentNode;
        const errorLabel = parent.querySelector('.error-label_invisible');
        if (errorLabel.classList.contains('error-label')) {
            input.classList.remove('error');
            errorLabel.classList.remove('error-label')
        }
    }

    function createError(input, text) {
        const parent = input.parentNode;
        input.classList.add('error');
        const errorLabel = parent.querySelector('.error-label_invisible');
        errorLabel.classList.add('error-label');
        errorLabel.textContent = text;
    }

    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    let result = true;
    const allInput = document.querySelectorAll('.form__input');

    for (const input of allInput) {
        removeError(input);
        if (input.value === "") {
            result = false;
            createError(input, 'Field is empty');
        }

        if (input.dataset.email) {
            removeError(input);
            if (!validateEmail(input.value)) {
                result = false;
                createError(input, 'Email is invalid');
            }
        }
    }

    return result;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (validation()) {

        form.reset();
    }
});

function openForm() {
    document.querySelector('.popup').classList.add('popup_active');
}

function closeForm() {
    document.querySelector('.popup').classList.remove('popup_active');
}

document.querySelector('#show-form').addEventListener('click', openForm);

document.querySelector('.popup__close').addEventListener('click', closeForm);

function openFullImg(picture) {
    fullImgBox.style.display = 'flex';
    fullImg.src = picture;
}

function closeFullImg() {
    fullImgBox.style.display = 'none';
}

function showSlides(n) {
    const slides = Array.from(document.querySelectorAll('.photo-grid__item'));
    const left_button = document.querySelector('.arrow_left');
    const right_button = document.querySelector('.arrow_right');
    closeFullImg();

    openFullImg(slides[n].src);
    if (n === 1) {
        left_button.classList.add('arrow_inactive');
    } else {
        left_button.classList.remove('arrow_inactive');
    }

    if (n === slides.length - 1) {
        right_button.classList.add('arrow_inactive');
    } else {
        right_button.classList.remove('arrow_inactive');
    }
    console.log(n);
    console.log(slides.length);
}

function changeSlides(n) {
    if ((document.querySelector('.arrow_left').classList.contains('arrow_inactive') && n < 0) ||
        (document.querySelector('.arrow_right').classList.contains('arrow_inactive') && n > 0)) {
        return;
    }
    showSlides(slideIndex += n);
}

function showSlide(n) {
    slideIndex = n;
    showSlides(n);
}

document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        closeFullImg();
        closeForm();
    }
})
