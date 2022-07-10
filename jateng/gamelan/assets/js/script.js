const themeBtn = document.getElementById('theme-changer');
const mobileNav = document.querySelector('.bi-list-nested');
let choosedEmoji = "";


window.addEventListener('load', () =>{
  let state = localStorage.getItem('theme');
  let headColor = document.querySelector("head > meta:nth-child(4)");
  let nav = document.querySelector('nav')
  
  if(state == 'dark'){
    nav.classList.toggle('navbar-dark')
    headColor.content = '#1d1d1d'
    themeBtn.innerHTML = '<img src="./assets/img/brightness.png" class="img-darkmode" alt="ligth mode">'
    $('head').append('<link rel="stylesheet" href="./assets/css/darkmode.css">');
  }
})

mobileNav.addEventListener('click', () => {
  let navContainer = document.querySelector('.navbar');
  navContainer.classList.toggle('bg-transparent')
})

themeBtn.addEventListener('click', () => {
  let nav = document.querySelector('nav')
  let headColor = document.querySelector("head > meta:nth-child(4)");
  let state = localStorage.getItem('theme');
  let isDarkMode = $('link[href="./assets/css/darkmode.css"]');

  if(state == 'dark'){
    nav.classList.toggle('navbar-dark')
    localStorage.removeItem('theme');
    themeBtn.innerHTML = '<img src="./assets/img/night-mode.png" class="img-darkmode" alt="dark mode">'
    headColor.content = '#0dcaf0'
    isDarkMode.remove();
  }else{
    nav.classList.toggle('navbar-dark')
    localStorage.setItem('theme', 'dark');
    themeBtn.innerHTML = '<img src="./assets/img/brightness.png" class="img-darkmode" alt="ligth mode">'
    headColor.content = '#1d1d1d'
    $('head').append('<link rel="stylesheet" href="./assets/css/darkmode.css">');

  }
  
})

// function scroll bar

function scrollProgressBar() {
  var getMax = function () {
    return $(document).height() - $(window).height();
  };

  var getValue = function () {
    return $(window).scrollTop();
  };

  var progressBar = $(".progress-bar"),
    max = getMax(),
    value,
    width;

  var getWidth = function () {
    // Calculate width in percentage
    value = getValue();
    width = (value / max) * 100;
    width = width + "%";
    return width;
  };

  var setWidth = function () {
    progressBar.css({ width: getWidth() });
  };

  $(document).on("scroll", setWidth);
  $(window).on("resize", function () {
    // Need to reset max
    max = getMax();
    setWidth();
  });
}




const handleFeedback = () => {
  let emojies = document.querySelectorAll('#ic-reaction');
  let btn = document.getElementById('send-feedback')
  let name = document.getElementById('name');
  let comment = document.getElementById('feedback-placeholder');
  let feedbackRes = document.querySelector('.feedback-response');
  

  if(name.value.length > 0 && comment.value.length > 0){
    emojies.forEach((e) => {
      e.style.filter = 'grayscale(0%)'
      e.style.fontSize = 'large'
    })
    btn.href = `mailto:halimbla2@gmail.com?subject=${name.value} merasa ${choosedEmoji} dengan artikel&body=${comment.value}`;
    let containerFeedback = document.getElementById('container-feedback');
    containerFeedback.classList.toggle('d-none')
    feedbackRes.classList.toggle('d-none')
  }
}

const handleEmoji = (event) => {
  let emojies = document.querySelectorAll('#ic-reaction');

  emojies.forEach((e) => {
    e.innerHTML !== event.innerHTML ? e.style.filter = 'grayscale(100%)' : e.style.filter = 'grayscale(0%)'
    e.innerHTML === event.innerHTML ? e.style.fontSize = 'x-large' : e.style.fontSize = 'large' 
  })

  switch(event.innerHTML.trim()){
    case '😒':
      choosedEmoji = 'tidak terbantu';
      break;
    case '😑':
      choosedEmoji = 'sedikit terbantu';
      break;
    case ' 🙂':
      choosedEmoji = 'terbantu';
      break;
    case '😀':
      choosedEmoji = 'sangat terbantu';
    break;
    default:
      choosedEmoji = '';
  }
  
  let containerFeedback = document.getElementById('container-feedback');
  containerFeedback.classList.toggle('d-none')
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


document.querySelector('.main-img').addEventListener('mouseover', () => {
  document.querySelector('.share-to').classList.remove('disable')
})

document.querySelector('.main-img').addEventListener('mouseleave', () => {
  document.querySelector('.share-to').classList.add('disable')
})

$(document).ready(function(){
  // preloader
  $(".preloader").fadeOut();

  // scrollprogresbar
  scrollProgressBar();
});

$(document).scroll(function () {
  var $nav = $(".sticky-top");
  if(localStorage.getItem('theme') != 'dark')
    $nav.toggleClass('scrolled shadow', $(this).scrollTop() > $nav.height());
  else
    $nav.toggleClass('shadow', $(this).scrollTop() > $nav.height());
});

