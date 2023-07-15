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
 * box switch (jam photo)
**/
const tabsContainer = document.querySelector(".tabs-container");
const tabsList = tabsContainer.querySelector("ul");
const tabButtons = tabsList.querySelectorAll("a");
const tabPanels = tabsContainer.querySelectorAll(".tabs__panels > div");

tabsList.setAttribute("role", "tablist");

tabsList.querySelectorAll("li").forEach((listitem) => {
    listitem.setAttribute("role", "presentation");
});

tabButtons.forEach((tab, index) => {
    tab.setAttribute("role", "tab");
    if (index === 0) {
        tab.setAttribute("aria-selected", "true");
        // we'll add something here
    } else {
        tab.setAttribute("tabindex", "-1");
        tabPanels[index].setAttribute("hidden", "");
    }
});

tabPanels.forEach((panel) => {
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("tabindex", "0");
});

tabsContainer.addEventListener("click", (e) => {
    const clickedTab = e.target.closest("a");
    if (!clickedTab) return;
    e.preventDefault();

    switchTab(clickedTab);
});

tabsContainer.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            moveLeft();
            break;
        case "ArrowRight":
            moveRight();
            break;
        case "Home":
            e.preventDefault();
            switchTab(tabButtons[0]);
            break;
        case "End":
            e.preventDefault();
            switchTab(tabButtons[tabButtons.length - 1]);
            break;
    }
});

function moveLeft() {
    const currentTab = document.activeElement;
    if (!currentTab.parentElement.previousElementSibling) {
        switchTab(tabButtons[tabButtons.length - 1]);
    } else {
        switchTab(
            currentTab.parentElement.previousElementSibling.querySelector("a")
        );
    }
}

function moveRight() {
    const currentTab = document.activeElement;
    if (!currentTab.parentElement.nextElementSibling) {
        switchTab(tabButtons[0]);
    } else {
        switchTab(currentTab.parentElement.nextElementSibling.querySelector("a"));
    }
}

function switchTab(newTab) {
    const activePanelId = newTab.getAttribute("href");
    const activePanel = tabsContainer.querySelector(activePanelId);

    tabButtons.forEach((button) => {
        button.setAttribute("aria-selected", false);
        button.setAttribute("tabindex", "-1");
    });

    tabPanels.forEach((panel) => {
        panel.setAttribute("hidden", true);
    });

    activePanel.removeAttribute("hidden", false);

    newTab.setAttribute("aria-selected", true);
    newTab.setAttribute("tabindex", "0");
    newTab.focus();
}


/**
 * PHOTOSSSSSSSSSSS
 * carico tutte le foto e le carico nella galleria. 
**/
const containers = {
    "imageContainer1": {
        "folder": "img/1th JAM/foto jam 2022 compr/",
        "year": 2022,
        "lenght": 68
    },
    "imageContainer2": {
        "folder": "img/2nd JAM/foto jam 2023/",
        "year": 2023,
        "lenght": 69
    }
    /** aggiunggere altri per le iterazioni **/
};

/* itera per ogni container presente ↑ */
Object.keys(containers).forEach(containerId => {
    const container = document.querySelector(`#${containerId}`);
    const folder = containers[containerId].folder;
    const lenghtFiles = containers[containerId].lenght
    const year = containers[containerId].year;

    for (let i = 1; i <= lenghtFiles; i++) {
        let a = document.createElement('a');
        a.href = `#img${i}`;
        let img = document.createElement('img');
        img.loading = 'lazy';
        img.width = '800';
        img.height = '550';
        img.src = `${folder}${i}.jpeg`;
        img.classList.add('small');
        if (i === 2) {
            img.id = 'formato';
        }
        a.appendChild(img);
        container.appendChild(a);
    }
});

/**new tab on click img**/
function newtab() {
    url = "http://127.0.0.1:5500/img/Logo/LogoAreaCrewVerro.jpeg";
    img = '<img src="' + url + '">';
    popup = window.open();
    popup.document.write(img);
    popup.print();
}

// Add active class to the current button (highlight it)
var header = document.querySelector("#nav-lins-all");
var btns = document.getElementsByClassName("nav-btn");

for (var i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("active");
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" active", "");
        }
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
        //php for backend richiesto
        document.modulo.submit();
    }
}

$(document).ready(function () {
    var $input1 = $("#logindata1 input");
    var $input2 = $("#logindata2 input");

    function onChangeInput1() {
        $input1.css("background-color", "#e5e5e5");
        var value = $.trim($input1.val());
        if (value.length === 0) {
            $input1.css("background-color", "transparent");
        }
    }

    function onChangeInput2() {
        $input2.css("background-color", "#e5e5e5");
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