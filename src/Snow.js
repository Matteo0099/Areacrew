"use strict";

// Se la data è compresa tra il 13 nov e il 13 gen
function isWithinChristmasPeriod() {
    const now = new Date();
    const currentYear = now.getFullYear();

    // Date di inizio e fine dell’intervallo
    const start = new Date(currentYear, 10, 13); // 13 nov
    const end = new Date(currentYear + 1, 0, 13); // 13 gen dell'anno successivo

    return now >= start && now <= end;
}

// Classe `.natale` in base alla data e attiva l’effetto neve
function initChristmasEffect() {
    const nataleContainer = document.getElementById("natale-container");
    
    if (isWithinChristmasPeriod()) {
        // Mostra l'elemento natalizio e attiva l'effetto neve
        nataleContainer.classList.add("natale");
        nataleContainer.classList.remove("no-natale");
        appendSnowEffect();
    } else {
        // Nascondi l'elemento natalizio e disabilita l'effetto neve
        nataleContainer.classList.add("no-natale");
        nataleContainer.classList.remove("natale");
    }
}

// Effetto neve solo se è nel periodo natalizio
function appendSnowEffect() {
    // Effetto neve
    const LIFE_PER_TICK = 1000 / 60;
    const MAX_FLAKES = Math.min(36, (screen.width / 1280) * 3);
    const flakes = [];
    const period = [
        (n) => 5 * Math.sin(n),
        (n) => 8 * Math.cos(n),
        (n) => 5 * (Math.sin(n) * Math.cos(2 * n)),
        (n) => 2 * (Math.sin(0.25 * n) - Math.cos(0.75 * n) + 1),
        (n) => 5 * (Math.sin(0.75 * n) + Math.cos(0.25 * n) - 1)
    ];
    const fun = ["⛄", "🎁", "🦌", "☃", "🍪"];
    const cssString = `
        .snowfall-container {
            display: block;
            height: 100vh;
            left: 0;
            margin: 0;
            padding: 0;
            -webkit-perspective-origin: top center;
            perspective-origin: top center;
            -webkit-perspective: 150px;
            perspective: 150px;
            pointer-events: none;
            position: fixed;
            top: 0;
            -webkit-transform-style: preserve-3d;
            transform-style: preserve-3d;
            width: 100%;
            z-index: 99999;
        }
        .snowflake {
            pointer-events: none;
            color: #ddf;
            display: block;
            font-size: 24px;
            left: -12px;
            line-height: 24px;
            position: absolute;
            top: -12px;
            -webkit-transform-origin: center;
            transform-origin: center;
        }
    `;

    function ready(fn) {
        if (document.readyState !== "loading") {
            fn();
        } else {
            document.addEventListener("DOMContentLoaded", fn);
        }
    }

    function resetFlake(flake) {
        let x = (flake.dataset.origX = Math.random() * 100);
        let y = (flake.dataset.origY = 0);
        let z = (flake.dataset.origZ = Math.random() < 0.1 ? Math.ceil(Math.random() * 100) + 25 : 0);
        let life = (flake.dataset.life = Math.ceil(Math.random() * 4000) + 6000);
        flake.dataset.origLife = life;
        flake.style.transform = `translate3d(${x}vw, ${y}vh, ${z}px)`;
        flake.style.opacity = 1.0;
        flake.dataset.periodFunction = Math.floor(Math.random() * period.length);
        if (Math.random() < 0.005) {
            flake.innerText = fun[Math.floor(Math.random() * fun.length)];
        }
    }

    function updatePositions() {
        flakes.forEach((flake) => {
            let origLife = parseFloat(flake.dataset.origLife);
            let curLife = parseFloat(flake.dataset.life);
            let dt = (origLife - curLife) / origLife;
            if (dt <= 1.0) {
                let p = period[parseInt(flake.dataset.periodFunction)];
                let x = p(dt * 2 * Math.PI) + parseFloat(flake.dataset.origX);
                let y = 125 * dt;
                let z = parseFloat(flake.dataset.origZ);
                flake.style.transform = `translate3d(${x}vw, ${y}vh, ${z}px)`;
                if (dt >= 0.5) {
                    flake.style.opacity = 1.0 - (dt - 0.5) * 2;
                }
                curLife -= LIFE_PER_TICK;
                flake.dataset.life = curLife;
            } else {
                resetFlake(flake);
            }
        });
        window.requestAnimationFrame(updatePositions);
    }

    function appendSnow() {
        let styles = document.createElement("style");
        styles.innerText = cssString;
        document.querySelector("head").appendChild(styles);

        let field = document.createElement("div");
        field.classList.add("snowfall-container");
        field.setAttribute("aria-hidden", "true");
        field.setAttribute("role", "presentation");
        document.body.appendChild(field);

        let i = 0;
        const addFlake = () => {
            let flake = document.createElement("span");
            flake.classList.add("snowflake");
            flake.setAttribute("aria-hidden", "true");
            flake.setAttribute("role", "presentation");
            flake.innerText = "❄";
            resetFlake(flake);
            flakes.push(flake);
            field.appendChild(flake);
            if (i++ <= MAX_FLAKES) {
                setTimeout(addFlake, Math.ceil(Math.random() * 300) + 100);
            }
        };
        addFlake();

        updatePositions();
    }

    ready(appendSnow);
}

// Attiva l'effetto al caricamento della pagina
document.addEventListener("DOMContentLoaded", initChristmasEffect);