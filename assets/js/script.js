const themeBtn = document.getElementById('theme-changer');
const mobileNav = document.querySelector('.bi-list-nested');
let choosedEmoji = "";

document.querySelector('canvas').addEventListener('load', (e) => {
  e.target.classList.add('canvas-animation')
})

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
        form.classList.toggle("dark-mode")
        headColor.content = '#1d1d1d'
        themeBtn.innerHTML = '<img src="./assets/img/brightness.png" class="img-darkmode" alt="ligth mode">'
    }
})

mobileNav.addEventListener('click', () => {
  console.log('hai im clicked!')
  let $nav = $(".fixed-top");
  console.log($nav.height())
  let navContainer = document.querySelector('.navbar');
  navContainer.classList.toggle('bg-transparent')
})

themeBtn.addEventListener('click', () => {
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
    form.classList.toggle("dark-mode")
})

// search modal
document.getElementById('btn-search').addEventListener('click', (e) =>{
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
            if(el.toLowerCase() == searchValue){
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

// close nabar if click outside
$(document).ready( () => {
  $(document).click( (e) => {
      let clickPos = $(e.target);
      let _opened = $(".navbar-collapse").hasClass("show");
      if (_opened === true && !clickPos.hasClass("navbar-toggler")) {
          $("button.navbar-toggler").click();
      }
  });
});

const handleFeedback = () => {
    let btn = document.getElementById('send-feedback')
    let name = document.getElementById('name');
    let comment = document.getElementById('feedback-placeholder');
    let feedbackRes = document.querySelector('.feedback-response');

    if(name.value.length > 0 && comment.value.length > 0){
      btn.href = `mailto:halimbla2@gmail.com?subject=${name.value} merasa ${choosedEmoji} dengan artikel&body=${comment.value}`;
      let containerFeedback = document.getElementById('container-feedback');
      containerFeedback.classList.toggle('disable')
      feedbackRes.classList.toggle('disable')
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

window.onscroll = scrollFunction

const topFunction = () => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}


$(window).ready(() => {
  $(".preloader").fadeOut();
})

$(document).ready(() => {
  $("#myModal").modal('show');
});

$(document).scroll(() => {
  let $nav = $(".fixed-top");
  if(localStorage.getItem('theme') != 'dark')
    $nav.toggleClass('scrolled shadow', $(this).scrollTop() > $nav.height());
  else
    $nav.toggleClass('shadow', $(this).scrollTop() > $nav.height());
});


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

let parentUrl = window.parent.location.origin;
let prevBtn = document.querySelector('.carousel-control-prev');
let nextBtn = document.querySelector('.carousel-control-next');

let updateBg = (clasName) => {
  let activeCarousel;
  let contentDisabled;
  let bg = document.getElementById('provinsi');
  let itemCarousel = document.querySelectorAll('.carousel-item');

  let clasList = [
    'carousel-item-next',
    'carousel-item-prev',
    'active'
  ]

  for(c of clasList) {
    
    itemCarousel.forEach((e) => {
      if(e.classList.contains(c)){
        
        activeCarousel = e.querySelector('img').src
        contentDisabled = e.querySelector('.d-none')
        document.querySelector('.title-provinsi').innerHTML = contentDisabled.querySelector('.display-1').innerHTML
        document.querySelector('.deskripsi-provinsi').innerHTML = contentDisabled.querySelector('.display-3').innerHTML
        document.querySelector('.btn-provinsi').href = contentDisabled.querySelector('a').href;
        bg.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.527),rgba(0, 0, 0, 0.5)), url('${activeCarousel.replace(parentUrl, '.')}')`
        bg.classList.add('animate')
  
      }
    })

  }
 
  
  let t = setTimeout(bg.classList.remove('animate'), 10000)
  clearTimeout(500)
}

nextBtn.addEventListener('click', updateBg)
prevBtn.addEventListener('click', updateBg)

setInterval(updateBg, 2000)