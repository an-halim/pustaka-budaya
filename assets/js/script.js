const themeBtn = document.getElementById('theme-changer');

window.addEventListener('load', () =>{
    let state = localStorage.getItem('theme');
    console.log(state)
    let body = document.body;
    let nav = document.querySelector('nav')
    let headColor = document.querySelector("head > meta:nth-child(4)");
    
    let form = document.querySelector('form')
    if(state == 'dark'){
        body.classList.toggle("dark-mode");
        nav.classList.toggle("dark-mode")
        form.classList.toggle("dark-mode")
        headColor.content = '#1d1d1d'
        themeBtn.innerHTML = '<img src="./assets/brightness.png" class="img-darkmode" alt="ligth mode">'
    }
})

themeBtn.addEventListener('click', () => {
    console.log("Clicked!")
    let headColor = document.querySelector("head > meta:nth-child(4)");
    let state = localStorage.getItem('theme');
    let body = document.body;
    let nav = document.querySelector('nav')
    let form = document.querySelector('form')
    if(state == 'dark'){
        localStorage.removeItem('theme');
        themeBtn.innerHTML = '<img src="./assets/night-mode.png" class="img-darkmode" alt="dark mode">'
        headColor.content = '#0dcaf0'
    }else{
        localStorage.setItem('theme', 'dark');
        themeBtn.innerHTML = '<img src="./assets/brightness.png" class="img-darkmode" alt="ligth mode">'
        headColor.content = '#1d1d1d'
    }
    body.classList.toggle("dark-mode");
    nav.classList.toggle("dark-mode");
    form.classList.toggle("dark-mode")
})


const handleFeedback = () => {
    let btn = document.getElementById('send-feedback')
    let email = document.getElementById('name');
    let comment = document.getElementById('feedback-placeholder');
    console.log(email.value)
    btn.href = `mailto:halimbla2@gmail.com?subject="subject text"&body=From ${email.value}
    ${comment.value}`
}

const handleEmoji = (event) => {
    console.log(event.innerHTML)
    let containerFeedback = document.getElementById('container-feedback');
    containerFeedback.classList.toggle('disable')
}

//Get the button
var mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

