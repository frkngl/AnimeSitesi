/*HEADER*/
const header = document.querySelector("header");
window.addEventListener("scroll", () => {
    if (window.scrollY > 0) {
        header.classList.add("header-change");
    }
    else {
        header.classList.remove("header-change");
    }
});


  /*TITLE*/
  window.addEventListener("blur", () => {
    document.title = "Tekrar Bekleriz :)";
  });
  window.addEventListener("focus", ()=> {
    document.title = "AniSekai | Anasayfa";
  });


var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    effect: "fade",
    loop: true,
    autoplay: {
        delay: 2500,
        disableOnInteraction: false,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
});