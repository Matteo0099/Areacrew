/**navbar script**/
document.addEventListener("DOMContentLoaded", () => {
    let navbarBurger = document.querySelector(".navbar-burger");
    let navbarMenu = document.querySelector(".navbar-menu");
    if (navbarBurger && navbarMenu) {
        navbarBurger.addEventListener("click", function () {
            navbarBurger.classList.toggle("is-active");
            if (navbarBurger.classList.contains("is-active")) {
                navbarMenu.style.display = "block";
                if (navbarMenu.querySelectorAll("a[href]")) {
                    [].forEach.call(navbarMenu.querySelectorAll("a[href]"), function (navURL) {
                        navURL.addEventListener("click", function () {
                            navbarMenu.style.display = "none";
                            navbarBurger.classList.remove("is-active");
                        });
                    });
                }
            } else navbarMenu.style.display = "none";
        });
    }
    if (document.querySelectorAll(".navbar-dropdown")) {
        [].forEach.call(document.querySelectorAll(".navbar-dropdown"), function (elDrop) {
            elDrop.style.display = "none";
        });
    }
    if (document.querySelectorAll(".navbar-link")) {
        [].forEach.call(document.querySelectorAll(".navbar-link"), function (elLink) {
            if (elLink.classList.contains("is-active")) elLink.classList.toggle("is-active");
            if (elLink.nextElementSibling.classList.contains("navbar-dropdown") && elLink.nextElementSibling.hasChildNodes()) {
                elLink.addEventListener("click", function () {
                    elLink.classList.toggle("is-active");
                    if (elLink.classList.contains("is-active") && elLink.nextElementSibling.style.display === "none") elLink.nextElementSibling.style.display = "block";
                    else if (!elLink.classList.contains("is-active") && elLink.nextElementSibling.style.display === "block") elLink.nextElementSibling.style.display = "none";
                    [].forEach.call(elLink.nextElementSibling.childNodes, function (siblingChild) {
                        siblingChild.addEventListener("click", function () {
                            siblingChild.parentNode.style.display = "none";
                            if (elLink.classList.contains("is-active")) elLink.classList.toggle("is-active");
                        });
                    });
                });
                elLink.nextElementSibling.addEventListener("mouseleave", function () {
                    elLink.nextElementSibling.style.display = "none";
                    if (elLink.classList.contains("is-active")) elLink.classList.toggle("is-active");
                });
            }
        });
    }
});

/**
 * 
 * Color picker from the t-shirt
 * 
*/

/*
function bgchange(color) {
    document.body.style.background = colorarray[color];
}

var colorarray = ["#e58e26", "#f9b4ab", "#B1FB17", "#78e08f", "#fd79a8"];
var str = "";
for (var i = 0; i < colorarray.length; i++) {
    str += '<span onclick="bgchange(' + i + ')'
    style = "background-color:'+colorarray[i]+'" > '+colorarray[i]+</span >'
}
document.getElementById("colorbox").innerHTML = str;
*/

/**
 * How to make event listeners passive to improve scrolling performance 
 * Add a passive flag to every event listener that Lighthouse identified.
 */
document.querySelector('body').addEventListener('touchstart', onTouchStart, {
    passive: true
});
/**new tab on click img**/
function newtab() {
    url = "http://127.0.0.1:5500/img/Logo/LogoAreaCrewVerro.jpeg";
    img = '<img src="' + url + '">';
    popup = window.open();
    popup.document.write(img);
    popup.print();
}

/** add class active 
 * nav bar active state 
 * target = a;
 */
// Add active class to the current button (highlight it)
var header = document.querySelector("#nav-lins-all");
var btns = document.getElementsByClassName("nav-btn");
for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}

/**form(modulo)**/
function Modulo() {
    // Variabili associate ai campi del modulo
    var nome = document.modulo.nome.value;
    var cognome = document.modulo.cognome.value;
    var email = document.modulo.email.value;
    // Espressione regolare dell'email
    var email_reg_exp = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-]{2,})+.)+([a-zA-Z0-9]{2,})+$/;
    //Effettua il controllo sul campo NOME
    if ((nome == "") || (nome == "undefined")) {
        alert("Il campo Nome è obbligatorio.");
        document.modulo.nome.focus();
        return false;
    }
    //Effettua il controllo sul campo COGNOME
    else if ((cognome == "") || (cognome == "undefined")) {
        alert("Il campo Cognome è obbligatorio.");
        document.modulo.cognome.focus();
        return false;
    }
    //INVIA IL MODULO
    else {
        document.modulo.action = open('mailto:matteomania09@gmail.com');
        document.modulo.submit();
    }
}
$(document).ready(function () {
    var $input1 = $("#logindata1 input");
    var $input2 = $("#logindata2 input");

    function onChangeInput1() {
        $input1.css("background-color", "#00007F");
        var value = $.trim($input1.val());
        if (value.length === 0) {
            $input1.css("background-color", "transparent");
        }
    }

    function onChangeInput2() {
        $input2.css("background-color", "#00007F");
        var value = $.trim($input2.val());
        if (value.length === 0) {
            $input2.css("background-color", "transparent");
        }
    }
    $input1.on("keyup", onChangeInput1);
    $input2.on("keyup", onChangeInput2);
});

/**back to top button**/
const showOnPx = 100;
const backToTopButton = document.querySelector(".back-to-top");
//const pageProgressBar = document.querySelector(".progress-bar");
const scrollContainer = () => {
    return document.documentElement || document.body;
};
const goToTop = () => {
    document.body.scrollIntoView({
        behavior: "smooth"
    });
};
/**fine script**/