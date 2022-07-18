const themeBtn = document.getElementById('theme-changer');
const mobileNav = document.querySelector('.bi-list-nested');
let choosedEmoji = "";


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
        nav.classList.toggle("navbar-dark")
        headColor.content = '#1d1d1d'
        themeBtn.innerHTML = '<img src="./assets/img/brightness.png" class="img-darkmode" alt="ligth mode">'
    }
})

mobileNav.addEventListener('click', () => {
  let navContainer = document.querySelector('.navbar');
  navContainer.classList.toggle('bg-transparent')
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
        themeBtn.innerHTML = '<img src="./assets/img/night-mode.png" class="img-darkmode" alt="dark mode">'
        headColor.content = '#0dcaf0'
    }else{
        localStorage.setItem('theme', 'dark');
        themeBtn.innerHTML = '<img src="./assets/img/brightness.png" class="img-darkmode" alt="ligth mode">'
        headColor.content = '#1d1d1d'
    }
    body.classList.toggle("dark-mode");
    nav.classList.toggle("dark-mode");
    nav.classList.toggle("navbar-dark");
    
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
    let btn = document.getElementById('send-feedback')
    let name = document.getElementById('name');
    let comment = document.getElementById('feedback-placeholder');
    btn.href = `mailto:halimbla2@gmail.com?subject=${name.value} merasa ${choosedEmoji} dengan artikel&body=${comment.value}`
}

const handleEmoji = (event) => {
  
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

  console.log(choosedEmoji)
  let containerFeedback = document.getElementById('container-feedback');
  containerFeedback.classList.toggle('disable')
}

//Get the button
var mybutton = document.getElementById("go-top");

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

