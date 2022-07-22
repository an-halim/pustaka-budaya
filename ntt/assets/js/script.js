const themeBtn = document.getElementById('theme-changer');
const mobileNav = document.querySelector('.bi-list-nested');
let choosedEmoji = "";

window.addEventListener('load', () =>{
    let state = localStorage.getItem('theme');
    let body = document.body;
    let nav = document.querySelector('nav')
    let headColor = document.querySelector("head > meta:nth-child(4)");  

    if(state == 'dark'){
        body.classList.toggle("dark-mode");
        nav.classList.toggle("dark-mode")
        nav.classList.toggle("navbar-dark")
        headColor.content = '#1d1d1d'
        themeBtn.innerHTML = '<img src="./assets/img/brightness.png" class="img-darkmode" alt="ligth mode">'
        $('head').append('<link rel="stylesheet" href="./assets/css/darkmode.css">');
    }
})

mobileNav.addEventListener('click', () => {
  console.log('hai im clicked!')
  let navContainer = document.querySelector('.navbar');
  navContainer.classList.toggle('bg-transparent')
})


themeBtn.addEventListener('click', () => {
    let headColor = document.querySelector("head > meta:nth-child(4)");
    let state = localStorage.getItem('theme');
    let body = document.body;
    let nav = document.querySelector('nav')
    let isDarkMode = $('link[href="./assets/css/darkmode.css"]');
    
    if(state == 'dark'){
        localStorage.removeItem('theme');
        themeBtn.innerHTML = '<img src="./assets/img/night-mode.png" class="img-darkmode" alt="dark mode">'
        headColor.content = '#0dcaf0'
        isDarkMode.remove();
    }else{
      localStorage.setItem('theme', 'dark');
      themeBtn.innerHTML = '<img src="./assets/img/brightness.png" class="img-darkmode" alt="ligth mode">'
      headColor.content = '#1d1d1d'
      $('head').append('<link rel="stylesheet" href="./assets/css/darkmode.css">');
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
    if(name.value.length > 0 && comment.value.length > 0){
      btn.href = `mailto:halimbla2@gmail.com?subject=${name.value} merasa ${choosedEmoji} dengan artikel&body=${comment.value}`;
      let containerFeedback = document.getElementById('container-feedback');
      containerFeedback.classList.toggle('disable')
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

  console.log(choosedEmoji)
  let containerFeedback = document.getElementById('container-feedback');
  containerFeedback.classList.toggle('d-none')
}

const scrollFunction = () => {
  const goTOp = document.getElementById("go-top");
  
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) 
    goTOp.style.display = "block";
  else
    goTOp.style.display = "none";
}

const closeModal = (e) => {
  $("#search-modal").modal('hide');
  document.querySelector(`#${e.href.split('#')[1]}`).classList.add('mark')
}

window.onkeydown = keydown;

function keydown(e){
  if (!e) 
  e = event;
  if (e.ctrlKey && e.keyCode==75){ //CTRL+K
    e.preventDefault();
    $("#search-modal").modal('show');
    setTimeout(() => {
        $('#search-container').focus();
    }, 500);
  }
}

const bukaModal = () => {
  document.getElementById("modals").style.display = "block";
  document.querySelector('nav').classList.toggle('d-none')
  document.querySelector('#go-top').classList.toggle('d-none')
}

const tutupModal = () => {
  document.getElementById("modals").style.display = "none";
  document.querySelector('nav').classList.toggle('d-none')
  document.querySelector('#go-top').classList.toggle('d-none')
}

window.onscroll = scrollFunction

const topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}

$(document).ready(function(){
  // preloader
  $(".preloader").fadeOut();

  // scrollprogresbar
  scrollProgressBar();
});

$(document).ready(() => {
  $("#myModal").modal('show');
});

$(document).scroll(() => {
  let $nav = $(".sticky-top");
  if(localStorage.getItem('theme') != 'dark')
    $nav.toggleClass('scrolled shadow', $(this).scrollTop() > $nav.height());
  else
    $nav.toggleClass('shadow', $(this).scrollTop() > $nav.height());
});