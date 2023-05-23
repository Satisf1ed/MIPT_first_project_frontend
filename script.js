const fullImgBox = document.getElementById("fullImgBox");
const fullImg = document.getElementById("fullImg");
const helloBlock = document.getElementById("helloBlock");
const hello = document.getElementById("hello");
const form = document.getElementById('write-me');
const buttonSubmitForm = document.querySelector('.form__submit');
const buttonChangeTheme = document.querySelector('.home-darkness__navbar_change-theme');
const buttonRain = document.querySelector('.button_rain');
let rain = document.querySelector('.rain');
let slideIndex = 1;
const allInput = document.querySelectorAll('.form__input');
const closePopupSpace = document.getElementById('close-space');
const closePopupSpaceGallery = document.getElementById('close-space_gallery');
const closePopupSpaceWelcome = document.getElementById('close-space_welcome');
const body = document.querySelector('.body');
console.log(body);

function closeSpace(object) {
    object.addEventListener('click', () => {
        closeFullImg();
        closeWelcome();
        closeForm();
    })
}

closeSpace(closePopupSpaceGallery);
closeSpace(closePopupSpace);
closeSpace(closePopupSpaceWelcome);

function welcome() {
    if (localStorage.getItem("sent")) {
        return;
    }
    setTimeout(function() {
        helloBlock.style.display = 'flex';
        helloBlock.classList.add('gallery__full-image_animate');
        hello.src = './images/welcome.jpeg';
        closePopupSpaceWelcome.classList.add('active');
        body.style.overflow = 'hidden';
    }, 5000);
}

function closeWelcome() {
    helloBlock.style.display = 'none';
    localStorage.setItem("sent", "true");
    closePopupSpaceWelcome.classList.remove('active');
    body.style.overflow = 'scroll';
}

welcome();

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

    const validateLanguage = (lang) => {
        return /^([a-z\s]+)$/iu.test(lang.value);
    }

    let result = true;

    for (const input of allInput) {
        removeError(input);
        if (input.value === "") {
            result = false;
            createError(input, 'Field is empty');
        }

        if (!validateLanguage(input)) {
            result = false;
            createError(input, 'Language is not english');
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

form.addEventListener('input', (event) => {
    event.preventDefault();
    if (validation()) {}
})

form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (validation()) {
        buttonSubmitForm.classList.add('form__submit_sending');
        buttonSubmitForm.textContent = 'Sending...';
        const {formName, formEmail, formText} = event.currentTarget.elements;
        console.log(formName, formEmail, formText);
        fetch('https://jsonplaceholder.typicode.com/posts', {
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
        })
            .then(function() {
                buttonSubmitForm.classList.add('form__submit_success');
                buttonSubmitForm.textContent = 'Sent!';
                form.reset();
                setTimeout(function() {
                    buttonSubmitForm.classList.remove('form__submit_success');
                    buttonSubmitForm.classList.remove('form__submit_sending');
                    buttonSubmitForm.textContent = 'Send';
                }, 2000);
            });
    }
});

function openForm() {
    closePopupSpace.classList.add('active');
    body.style.overflow = 'hidden';
    document.querySelector('.popup').classList.add('popup_active');
}

function closeForm() {
    closePopupSpace.classList.remove('active');
    body.style.overflow = 'scroll';
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
    closePopupSpaceGallery.classList.add('active');
    body.style.overflow = 'hidden';
    fullImgBox.style.display = 'flex';
    fullImg.src = picture;
}

function closeFullImg() {
    closePopupSpaceGallery.classList.remove('active');
    fullImgBox.style.display = 'none';
    body.style.overflow = 'scroll';
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

    if (n === slides.length - 2) {
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
