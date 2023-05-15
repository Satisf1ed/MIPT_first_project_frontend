const fullImgBox = document.getElementById("fullImgBox");
const fullImg = document.getElementById("fullImg");
const form = document.getElementById('write-me');
const buttonSubmitForm = document.querySelector('.form__submit');
const buttonChangeTheme = document.querySelector('.home-darkness__navbar_change-theme');
const buttonRain = document.querySelector('.button_rain');
let rain = document.querySelector('.rain');
let slideIndex = 1;
const allInput = document.querySelectorAll('.form__input');

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

function validation() {
    const validateEmail = (email) => {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    let result = true;

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
        buttonSubmitForm.classList.add('form__submit_sending');
        buttonSubmitForm.textContent = 'Sending...';
        const formName = document.getElementById('name').value;
        const formEmail = document.getElementById('email').value;
        const formText = document.getElementById('textarea').value;
        console.log(formName, formEmail, formText);
        let response = fetch('http://localhost:3000', {
            method: 'POST',
            mode:'no-cors',
            headers: {
                'Content-Type': 'charset=UTF-8'
            },
            body: JSON.stringify({
                name: formName,
                email: formEmail,
                text: formText
            })
        });
        if (response.ok) {
            buttonSubmitForm.classList.add('form__submit_success');
            buttonSubmitForm.textContent = 'Sent!';
        } else {
            alert('Oops... Something went wrong :(');
            closeForm();
        }
    }
});

function openForm() {
    document.querySelector('.popup').classList.add('popup_active');
}

function closeForm() {
    document.querySelector('.popup').classList.remove('popup_active');
    for (const input of allInput) {
        removeError(input);
    }
    if (buttonSubmitForm.classList.contains('form__submit_sending')) {
        buttonSubmitForm.classList.remove('form__submit_sending');
    }
    if (buttonSubmitForm.classList.contains('form__submit_success')) {
        buttonSubmitForm.classList.remove('form__submit_success');
    }
    buttonSubmitForm.textContent = 'Send';
    form.reset();
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
});

buttonChangeTheme.addEventListener('click', () => {
    let light = "./styles/light_theme.css";
    let dark = "./styles/dark_theme.css";

    let current = document.getElementById('theme').getAttribute('href');
    if (current === dark) {
        current = light;
    } else {
        current = dark;
    }

    document.getElementById('theme').setAttribute('href', current);
});

buttonRain.addEventListener('click', (evt) => {
    evt.preventDefault();
    rain.classList.toggle('rain_active');
    rain.classList.toggle('rain_animate');
});

rain.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (rain.classList.contains('rain_active')) {
        rain.classList.remove('rain_active');
        rain.classList.remove('rain_animate');
    }
})
