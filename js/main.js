/*HEADER*/
const togglePositionalHeaderStyles = () => {
    // Bu fonksiyon window scrollY pozisyonuna göre "header-change" classini ekliyor ya da kaldiriyor.
    if (window.scrollY > 0 && !header.classList.contains("header-change")) {
        header.classList.add("header-change");
    };
    if (window.scrollY === 0 && header.classList.contains("header-change")) {
        header.classList.remove("header-change");
    };
};

// "scroll" eventleri cok seri ateslendigi icin "header-change" classinin eklenmesini timeout ile
// yapicaz, bu timeout un ID sini de burda actigimiz timeoutID ye aticaz. Sebebi asagidaki
// "scroll" event listenerin icinde aciklaniyor.
let timeoutID = null;

// header DOM da beliriyor
const header = document.querySelector("header");

// header DOM da belirdikten sonra fonksiyonumuz cagiriyoruz ki window un scrollY pozisyonuna göre
// istenen header stilleri "header-change" class i ile eklensin. Kodun önceki hali bu islemi sadece
// "scroll" event listener i icinde yapiyodu, fakat önceki halinin calisma prensibi scrolla dayali
// oldugu icin, hizli sayfa yenilemelerde bazen sayfa dogrudan scrollanmis olarak ekrana yaziliyordu
// boyle olunca da bazi sayfa yenilemelerde, otomatik olarak "scroll" eventi ateslenmediginden
// istenen sonuc olusmuyordu. Burda bu fonksiyonu cagirarak, header DOM da belirince sayfanin o anki
// durumuna göre header stillerinin olmasi gerektigi gibi islenmesini garanti altina almis oluyoruz.
togglePositionalHeaderStyles();

// Yukarda ki fonksiyon ilk göruntuyu garanti altina aldiktan sonra da "scroll" event listeneri ile
// header stillerinin nasil degiscegini belirliyoruz.
window.addEventListener("scroll", () => {

    // Öncelikle fonksiyonumuzu timeoutsuz cagiriyoruz. Bunun sebebi, "scrollbar" en tepede iken,
    // yani headerin arka plani yari saydam iken, "scroll" eventi ateslendigi gibi, arka planin
    // siyaha donusmesini garanti altina almak. Sayfa en tepede iken (yani window.scrollY === 0) iken
    // asagi surukleme oldugunda ateslenen "scroll" eventi fonksiyonu cagirdiginda (fonksiyonu tekrar
    // okursak) fonksiyon okuyacagi window.scrollY degeri 0 dan buyuk bi deger olacagi icin, header in
    // classList ine "header-change" classi direk eklenecektir.
    // Sayfa en tepede degil ise de, fonksiyonun icine tekrar dikkat edersek, fonksiyon hic bisey
    // yapmayacaktir, cunku window.scrollY iken, fonksiyon ayni zamanda && ile headerin classListinde
    // "header-change" var mi yok mu ona da bakiyor. Sayfa en tepede degilke bu "header-change" zaten
    // classListin icinde olcagindan, fonksiyon hic bir islem yapmayacaktir. Bu da daha optimize bir
    // yaklasimdir.
    togglePositionalHeaderStyles();

    // Yukarda (const header dan önce) let timeoutID = null; olarak baslattigimiz timeoutID de null degil
    // de baska bir deger varsa, su anda yurumekte olan ve bu timeoutID ye atanmis olan timeout u 
    // clearTimeout ile iptal ediyoruz. Bunu yapmamizin sebebi bir sonraki asama da daha belirgin olacaktir.
    if (timeoutID) clearTimeout(timeoutID);

    // Burda yeni bir timeout baslatiyoruz ve bu timeoutu yukarda ilk basta null olarak deger atadigimiz
    // timeoutID ye atiyoruz. Bu timeout bitince de window.scrollY pozisyonuna göre "header-change" classini
    // atayan fonksiyonumuz cagiriyoruz. Diyelim ki sayfada cok seri scrollama hareketi yapiliyor. "scroll"
    // eventi bu yuzden cok seri bi sekilde defalarca pespese atesleniyor. Alt satirda bu her "scroll" eventi
    // icin yeni bir timeoutID atamasi yapiliyor, lakin ust satirda tekrar bakarsak, bir önceki "scroll"
    // eventinden yapilmis bir timeoutID atamasi yapilmis ise, yeni timeoutID atamasi asagida yapilmadan once
    // onceki atama clearTimeout fonksiyonu ile siliniyor. Yani altta timeout ile yapilan togglePositionalHeaderStyles
    // fonksiyon cagrisi, yeni bir "scroll" eventi geldiginde, iptal ediliyor, bosu bosuna eski "scroll" eventi icin
    // cagirilmiyor, ve en son scroll eventi icin cagriliyor. Kisacasi kullanici scrollamayi biraktiktan 50 milisaniye
    // sonra header in stilleri islenmis oluyor.
    timeoutID = setTimeout(() => {
        togglePositionalHeaderStyles();
    }, 50);
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
        video.volume = 0.05;
        video.classList.add("active");
    };

    video.onmouseleave = () => {
        video.pause();
        video.classList.remove("active");
    };

    video.ontouchmove = () => {
        video.play();
        video.volume = 0.05;
        video.classList.add("active");
    };

    video.ontouchend = () => {
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

$(document).ready(function () {
    // keyup ile inputa herhangi bir değer girilince fonksiyonu tetikliyoruz
    $("#searchTags9").keyup(function () {
        // inputa yazılan değeri alıyoruz
        var value = $("#searchTags9").val();
        // eğer input içinde değer yoksa yani boşsa tüm menüyü çıkartıyoruz
        if (value.length == 0) {
            $("#menuFull9 li").show();
            // arama yapılmışsa ilk olarak tüm menüyü gizliyoruz ve girilen değer ile eşleşen kısmı çıkarıyoruz
        } else {
            $("#menuFull9 li").hide();
            $("#menuFull9 li:contains(" + value + ")").show();
        }

    });
});










