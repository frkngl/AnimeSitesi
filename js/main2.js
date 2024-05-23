/*NAVBAR'DAKİ LİNK ACTİVE*/
document.querySelectorAll('nav a').forEach(link => {
    link.classList.remove('active');

    if (link.href === window.location.href) {
        link.classList.add('active');
    }
});

/*SEASON ACTİVE KISMI*/
document.querySelectorAll('content3 season box').forEach(links => {
    links.classList.remove('active');

    if(links.href === window.location.href){
        links.classList.add('active');
    }
})


/*EPISODE ACTİVE KISMI*/
document.querySelectorAll('content episode btn').forEach(linkss => {
    linkss.classList.remove('active');

    if(linkss.href === window.location.href){
        linkss.classList.add('active');
    }
})


/*YÜKLEME EKRANI KODU*/
window.addEventListener('load', loaderfunc);

function loaderfunc() {
    document.getElementById('loader').style.display = 'none';
}





/*PAROLA GÖSTEME KODU*/
const img = document.getElementById('images');
let toggle = true;
img.addEventListener('click', function () {
    toggle = !toggle;
    if (toggle) {
        img.src = 'img\\Eye.svg';
    }
    else {
        img.src = 'img\\Eye Off.svg';
    }
})
function parolaGoster(id) {
    let x = document.getElementById(id);
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
