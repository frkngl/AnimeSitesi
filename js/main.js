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
window.addEventListener("focus", () => {
    document.title = "AniSekai | Anasayfa";
});



/*SWIPER*/
const progressCircle = document.querySelector(".autoplay-progress svg");
const progressContent = document.querySelector(".autoplay-progress span");
var swiper = new Swiper(".mySwiper", {
    spaceBetween: 30,
    loop: true,
    effect: "fade",
    centeredSlides: true,
    autoplay: {
        delay: 4000,
        disableOnInteraction: false
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    },
    on: {
        autoplayTimeLeft(s, time, progress) {
            progressCircle.style.setProperty("--progress", 1 - progress);
            progressContent.textContent = `${Math.ceil(time / 1000)}s`;
        }
    }
});




/*KATEGORİLER DÖNGÜYE ALAN EDİTLER*/

const video = document.querySelectorAll(".splide__slide .video");
video.forEach(video => {
    video.onmouseenter = () => {
        video.play();
        video.volume = 0.02;
        video.classList.add("active");
    };

    video.onmouseleave = () => {
        video.pause();
        video.classList.remove("active");
    };
});


//Aramalarda büyük küçük harf duyarlılığı için
jQuery.expr[':'].contains = function (a, i, m) {
    return jQuery(a).text().toUpperCase()
        .indexOf(m[3].toUpperCase()) >= 0;
};

$(document).ready(function () {

    // keyup ile inputa herhangi bir değer girilince fonksiyonu tetikliyoruz
    $("#searchTags").keyup(function () {

        // inputa yazılan değeri alıyoruz
        var value = $("#searchTags").val();

        // eğer input içinde değer yoksa yani boşsa tüm menüyü çıkartıyoruz
        if (value.length == 0) {

            $("#menuFull li").show();

            // arama yapılmışsa ilk olarak tüm menüyü gizliyoruz ve girilen değer ile eşleşen kısmı çıkarıyoruz
        } else {

            $("#menuFull li").hide();
            $("#menuFull li:contains(" + value + ")").show();

        }

    });

});