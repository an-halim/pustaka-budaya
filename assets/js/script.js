const themeBtn = document.getElementById('theme-changer');
const mobileNav = document.querySelector('.bi-list-nested');
let choosedEmoji = "";

window.addEventListener('load', () =>{
    let state = localStorage.getItem('theme');
    let headColor = document.querySelector("head > meta:nth-child(4)");
    let nav = document.querySelector('nav')
    
    if(state == 'dark'){
        nav.classList.toggle("dark-mode")
        headColor.content = '#1d1d1d'
        themeBtn.innerHTML = '<img src="./assets/img/brightness.png" class="img-darkmode" alt="ligth mode">'
        $('head').append('<link rel="stylesheet" href="./assets/css/darkmode.css">');
    }
})

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

mobileNav.addEventListener('click', () => {
  let navContainer = document.querySelector('.navbar');
  navContainer.classList.toggle('bg-transparent')
})

themeBtn.addEventListener('click', () => {
    let headColor = document.querySelector("head > meta:nth-child(4)");
    let nav = document.querySelector('nav')
    let state = localStorage.getItem('theme');
    let isDarkMode = $('link[href="./assets/css/darkmode.css"]');

    if(state == 'dark'){
      nav.classList.toggle("dark-mode")
      localStorage.removeItem('theme');
      themeBtn.innerHTML = '<img src="./assets/img/night-mode.png" class="img-darkmode" alt="dark mode">'
      headColor.content = '#0dcaf0'
      isDarkMode.remove();
    }else{
      nav.classList.toggle("dark-mode")
      localStorage.setItem('theme', 'dark');
      themeBtn.innerHTML = '<img src="./assets/img/brightness.png" class="img-darkmode" alt="ligth mode">'
      headColor.content = '#1d1d1d'
      $('head').append('<link rel="stylesheet" href="./assets/css/darkmode.css">');

    }
    
})


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
    containerFeedback.classList.toggle('disable')
    feedbackRes.classList.toggle('disable')
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
  containerFeedback.classList.toggle('disable')
}

const scrollFunction = () => {
  const goTOp = document.getElementById("go-top");
  
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) 
    goTOp.style.display = "block";
  else
    goTOp.style.display = "none";
}

window.onscroll = scrollFunction

const topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


$(document).ready(() => {
  $('.carousel').carousel({
    interval: true,
  });

  // preloader
  $(".preloader").fadeOut();

  // scrollprogresbar
  scrollProgressBar();
});

$(document).scroll(() => {
  let $nav = $(".fixed-top");
  if(localStorage.getItem('theme') != 'dark')
    $nav.toggleClass('scrolled shadow', $(this).scrollTop() > $nav.height());
  else
    $nav.toggleClass('shadow', $(this).scrollTop() > $nav.height());
});


let parentUrl = window.parent.location.origin;
let prevBtn = document.querySelector('.carousel-control-prev');
let nextBtn = document.querySelector('.carousel-control-next');

nextBtn.addEventListener('click', (e) => {

  let activeCarousel;
  let contentDisabled;
  let carouselTittle = document.querySelectorAll('#carousel-tittle');
  let titel = document.querySelector('.title-provinsi');
  let deskripsi = document.querySelector('.deskripsi-provinsi')
  let bg = document.getElementById('provinsi');
  let itemCarousel = document.querySelectorAll('.carousel-item');

  itemCarousel.forEach((e) => {
    if(e.classList.contains('carousel-item-next')){
      
      activeCarousel = e.querySelector('img').src
      contentDisabled = e.querySelector('.d-none')
      titel.innerHTML = contentDisabled.querySelector('.display-1').innerHTML
      deskripsi.innerHTML = contentDisabled.querySelector('.display-3').innerHTML
      document.querySelector('.btn-provinsi').href = contentDisabled.querySelector('a').href;
      bg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url('${activeCarousel.replace(parentUrl, '.')}')`  
    }
  })

  carouselTittle.forEach(e => e.classList.add('bounce-left'))
  titel.classList.add('slideUp')
  deskripsi.classList.add('slideUp')
  e.target.style.pointerEvents = "none";
  setTimeout(() => {
    carouselTittle.forEach(e => e.classList.remove('bounce-left'))
    titel.classList.remove('slideUp')
    deskripsi.classList.remove('slideUp')
    e.target.style.pointerEvents = "auto";
  }, 1000)

})

prevBtn.addEventListener('click', (e) => {

  let activeCarousel;
  let contentDisabled;
  let titel = document.querySelector('.title-provinsi');
  let deskripsi = document.querySelector('.deskripsi-provinsi')
  let bg = document.getElementById('provinsi');
  let itemCarousel = document.querySelectorAll('.carousel-item');

  itemCarousel.forEach((e) => {
    if(e.classList.contains('carousel-item-prev')){
      
      activeCarousel = e.querySelector('img').src
      contentDisabled = e.querySelector('.d-none')
      titel.innerHTML = contentDisabled.querySelector('.display-1').innerHTML
      deskripsi.innerHTML = contentDisabled.querySelector('.display-3').innerHTML
      document.querySelector('.btn-provinsi').href = contentDisabled.querySelector('a').href;
      bg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url('${activeCarousel.replace(parentUrl, '.')}')`  
    }
  })
  
  titel.classList.add('slideUp')
  deskripsi.classList.add('slideUp')
  e.target.style.pointerEvents = "none";
  setTimeout(() => {
    deskripsi.classList.remove('slideUp')
    e.target.style.pointerEvents = "auto";
    titel.classList.remove('slideUp')
  }, 1000)
  
})

setInterval(() => {
  let bgHome = document.querySelector('.bg-img');

  let bgList = [
    './assets/img/rizknas-2MOnt5BQEkE-unsplash.jpg',
    './assets/img/kilarov-zaneit-_387q_NwPLg-unsplash.jpg',
    './assets/img/labuhan-bajo.jpg'
  ]

  let randomize = Math.floor(Math.random() * bgList.length)
  bgHome.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url(${bgList[randomize]})`
  nextBtn.click();
}, 5000)
