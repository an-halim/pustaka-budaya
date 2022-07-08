const themeBtn = document.getElementById('theme-changer');
const mobileNav = document.querySelector('.bi-list-nested');
let choosedEmoji = "";

window.addEventListener('load', () =>{
    let state = localStorage.getItem('theme');
    let body = document.body;
    let nav = document.querySelector('nav')
    let headColor = document.querySelector("head > meta:nth-child(4)");    
    let logoDark = document.querySelector('.logo-dark')
    let logoLight = document.querySelector('.logo-light')
    
    let form = document.querySelector('form')
    if(state == 'dark'){
        body.classList.toggle("dark-mode");
        nav.classList.toggle("dark-mode")
        nav.classList.toggle("navbar-dark")
        form.classList.toggle("dark-mode")
        logoDark.classList.add('d-none')
        logoLight.classList.remove('d-none')
        headColor.content = '#1d1d1d'
        themeBtn.innerHTML = '<img src="./assets/foto/brightness.png" class="img-darkmode" alt="ligth mode">'
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
    let logoDark = document.querySelector('.logo-dark')
    let logoLight = document.querySelector('.logo-light')
    // let form = document.querySelector('form')
    if(state == 'dark'){
        logoDark.classList.remove('d-none')
        logoLight.classList.add('d-none')
        localStorage.removeItem('theme');
        themeBtn.innerHTML = '<img src="./assets/foto/night-mode.png" class="img-darkmode" alt="dark mode">'
        headColor.content = '#0dcaf0'
      }else{
      logoDark.classList.add('d-none')
      logoLight.classList.remove('d-none')
        localStorage.setItem('theme', 'dark');
        themeBtn.innerHTML = '<img src="./assets/foto/brightness.png" class="img-darkmode" alt="ligth mode">'
        headColor.content = '#1d1d1d'
    }
    body.classList.toggle("dark-mode");
    nav.classList.toggle("dark-mode");
    nav.classList.toggle("navbar-dark");
    // form.classList.toggle("dark-mode")
})

// search modal
document.getElementById('btn-search').addEventListener('click', (e) =>{
  $('.navbar-toggler').click()
  $("#search-modal").modal('show');
  $('.search-result').empty();
  document.querySelector("#search-container").value = ''
})


$('#search-modal').on('click', () =>{
  document.querySelector("#search-container").addEventListener('input', (e) =>{
    let searchValue = e.target.value.toLowerCase();
    let paragrafContainer = document.querySelectorAll('p');
    
    
    document.querySelector('input').addEventListener('keypress', (e) => {
      if(e.key == 'Enter'){
        // reset result container if used before
        $('.search-result').empty();

        let i = 0;
        paragrafContainer.forEach(p =>{
          p.innerHTML.split(' ').forEach(el => {
            if(el.toLowerCase() == searchValue && !p.classList.contains('d-none')){
              let searchId = `searchid-${i}`
              p.parentElement.parentElement.setAttribute('id', searchId);

              let content = p.innerHTML
              if(content.length > 40){
                content = content.slice(0 , 40)
              }
              $('.search-result').append(`<p>${content}....</p><span><a class="btn btn-primary btn-see" onclick="closeModal()" href="#${searchId}">Lihat</a></span>`)
              $('.search-result').append('<hr>')
              i++;
            }
          });
        })

      }
    })

  }, true)
})

const closeModal = () => {
  $("#search-modal").modal('hide');
}

document.querySelector('input').addEventListener('keypress', (e) => {
  if(e.key == 'Enter'){
  }

})

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

const scrollFunction = () => {
  const goTOp = document.getElementById("go-top");
  
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) 
    goTOp.style.display = "block";
  else
    goTOp.style.display = "none";
}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = scrollFunction

// When the user clicks on the button, scroll to the top of the document
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