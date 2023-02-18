const inputAgreement = document.getElementById('inputAgreement');
inputAgreement.addEventListener('change', function d() {
    if(inputAgreement.checked) {
        console.log('отмечено');
    } else {
        console.log('не отмечено');
    }
});
const closingAfter = document.getElementById('closeX');
const modal = document.querySelector('#b-modal');
const popUpOpen = document.getElementById('pop-up');

popUpOpen.addEventListener('click', () => {
    modal.classList.add("FadeIn");
});
closingAfter.addEventListener('click', () => {
    modal.classList.remove("FadeIn");
    modal.classList.add("FadeOut");
});
modal.addEventListener('click', () => {
    modal.classList.remove("FadeIn");
    modal.classList.add("FadeOut");
});