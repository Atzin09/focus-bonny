
let tiempoRestante = 25 * 60;
let intervalo = null;
let tiempoInicial = 25 * 60;
let ejecutando = false;

let sesionesCompletadas =
    Number(localStorage.getItem("focusBunnySesiones")) || 0;

let minutosConcentracion =
    Number(localStorage.getItem("focusBunnyMinutos")) || 0;

// Segundos acumulados para no perder el progreso de sesiones cortas.
let segundosConcentracion =
    Number(localStorage.getItem("focusBunnySegundos")) || 0;

function guardarEstadisticas() {
    localStorage.setItem("focusBunnySesiones", sesionesCompletadas);
    localStorage.setItem("focusBunnyMinutos", minutosConcentracion);
    localStorage.setItem("focusBunnySegundos", segundosConcentracion);

    mostrarLogros();
}

let duracionTotal = 60;
let modoActual = "enfoque";

const barraProgreso = document.getElementById("barraProgreso");
const contenedorProgreso = document.querySelector(".progreso-temporizador");
const textoProgreso = document.getElementById("textoProgreso");
const reloj = document.getElementById("temporizador");
const mensaje = document.getElementById("mensaje");
const botonIniciar = document.getElementById("iniciar");


function actualizarReloj() {
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;

    reloj.textContent =
        String(minutos).padStart(2, "0") + ":" +
        String(segundos).padStart(2, "0");

    const porcentaje = duracionTotal > 0
        ? Math.max(0, Math.min(100, (tiempoRestante / duracionTotal) * 100))
        : 0;

    if (barraProgreso) {
        barraProgreso.style.width = porcentaje + "%";
    }

    if (contenedorProgreso) {
        contenedorProgreso.setAttribute(
            "aria-valuenow",
            String(Math.round(porcentaje))
        );
    }

    if (textoProgreso) {
        textoProgreso.textContent =
            Math.round(porcentaje) + "% del tiempo restante";
    }
}

function iniciarTemporizador() {
    if (ejecutando) return;

    if (tiempoRestante <= 0) {
        tiempoRestante = tiempoInicial;
        actualizarReloj();
    }

    ejecutando = true;
    botonIniciar.textContent = "▶ En marcha";
    mensaje.textContent = "¡Tú puedes! Bunny cree en ti. 💙";

    intervalo = setInterval(() => {
        tiempoRestante--;
        actualizarReloj();

        if (tiempoRestante <= 0) {
            clearInterval(intervalo);
            intervalo = null;
            ejecutando = false;

            botonIniciar.textContent = "▶ Iniciar";
            mensaje.textContent =
                "¡Lo lograste! Toca descansar un poquito. 🐰✨";

const bunny = document.querySelector("#pagina-temporizador .conejito");

if (bunny) {
    bunny.classList.remove("celebrando");

    // Reinicia la animación para que se repita en cada sesión.
    void bunny.offsetWidth;

    bunny.classList.add("celebrando");

    bunny.addEventListener("animationend", function terminarCelebracion() {
        bunny.classList.remove("celebrando");
        bunny.removeEventListener("animationend", terminarCelebracion);
    });
}

if (modoActual === "enfoque") {
    // Registrar únicamente sesiones de enfoque terminadas.
    sesionesCompletadas++;

    // Acumular los segundos reales de esta sesión.
    segundosConcentracion += tiempoInicial;

    // Convertir cada 60 segundos acumulados en un minuto.
    const minutosNuevos = Math.floor(segundosConcentracion / 60);

    minutosConcentracion += minutosNuevos;
    segundosConcentracion %= 60;

    guardarEstadisticas();
}


            alert("¡Tiempo terminado! ¡Buen trabajo! 🐇");
        }
    }, 1000);
}

function pausarTemporizador() {
    clearInterval(intervalo);
    intervalo = null;
    ejecutando = false;

    botonIniciar.textContent = "▶ Continuar";
    mensaje.textContent = "Pausa activada. Respira con calma. 🌷";
}

function reiniciarTemporizador() {
    clearInterval(intervalo);
    intervalo = null;
    ejecutando = false;

    tiempoRestante = tiempoInicial;
    actualizarReloj();

    botonIniciar.textContent = "▶ Iniciar";
    mensaje.textContent = "Lista para empezar de nuevo. 💙";
}

function cambiarModo(minutos) {
    clearInterval(intervalo);
    intervalo = null;
    ejecutando = false;

    tiempoInicial = minutos * 60;
tiempoRestante = tiempoInicial;
duracionTotal = tiempoInicial;
modoActual = minutos === 25 
    ? "enfoque"
    : "descanso";
    actualizarReloj();
    botonIniciar.textContent = "▶ Iniciar";

    if (minutos === 25) {
        mensaje.textContent = "¡Modo enfoque activado! 📚";
    } else if (minutos === 5) {
        mensaje.textContent = "Descanso corto. Estira un poquito. 🌷";
    } else {
        mensaje.textContent = "Descanso largo. ¡Te lo ganaste! ☁️";
    }
}

actualizarReloj();

let tareas = JSON.parse(localStorage.getItem("focusBunnyTareas")) || [];

const formularioTareas = document.getElementById("formTareas");
const entradaTarea = document.getElementById("nuevaTarea");
const listaTareas = document.getElementById("listaTareas");
const contadorTareas = document.getElementById("contadorTareas");

function guardarTareas() {
    localStorage.setItem("focusBunnyTareas", JSON.stringify(tareas));
}

function mostrarTareas() {
    listaTareas.replaceChildren();

    tareas.forEach((tarea) => {
        const elemento = document.createElement("li");
        elemento.className = tarea.completada ? "completada" : "";

        const casilla = document.createElement("input");
        casilla.type = "checkbox";
        casilla.checked = tarea.completada;
        casilla.setAttribute("aria-label", "Marcar tarea como completada");

        casilla.addEventListener("change", () => {
            tarea.completada = casilla.checked;
            guardarTareas();
            mostrarTareas();
        });

        const texto = document.createElement("span");
        texto.textContent = tarea.texto;

        const botonEliminar = document.createElement("button");
        botonEliminar.type = "button";
        botonEliminar.textContent = "🗑️";
        botonEliminar.setAttribute("aria-label", "Eliminar tarea");

        botonEliminar.addEventListener("click", () => {
            tareas = tareas.filter((item) => item.id !== tarea.id);
            guardarTareas();
            mostrarTareas();
        });

        elemento.append(casilla, texto, botonEliminar);
        listaTareas.appendChild(elemento);
    });

    const completadas = tareas.filter((tarea) => tarea.completada).length;
    contadorTareas.textContent =
        `${completadas} de ${tareas.length} tareas completadas`;
}

formularioTareas.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const texto = entradaTarea.value.trim();
    if (!texto) return;

    tareas.push({
        id: Date.now() + Math.random(),
        texto: texto,
        completada: false
    });

    guardarTareas();
    mostrarTareas();
    formularioTareas.reset();
    entradaTarea.focus();
});

mostrarTareas();   


const sonidos = {
    lluvia: new Audio("FocusBunny/audios/lluvia.mp3"),
    cafeteria: new Audio("FocusBunny/audios/cafeteria.mp3"),
    lofi: new Audio("FocusBunny/audios/lofi.mp3")
};

let sonidoActual = null;

const nombresSonido = {
    lluvia: "Lluvia 🌧️",
    cafeteria: "Cafetería ☕",
    lofi: "Lo-fi 🎧"
};

const botonesSonido = {
    lluvia: document.getElementById("btnLluvia"),
    cafeteria: document.getElementById("btnCafeteria"),
    lofi: document.getElementById("btnLofi")
};

const controlVolumen = document.getElementById("volumenSonido");
const valorVolumen = document.getElementById("valorVolumen");
const estadoSonido = document.getElementById("estadoSonido");
const indicadorAudio = document.getElementById("indicadorAudio");

Object.values(sonidos).forEach((audio) => {
    audio.loop = true;
    audio.preload = "none";
});

function actualizarEstadoAudio() {
    Object.keys(sonidos).forEach((tipo) => {
        const activo = sonidos[tipo] === sonidoActual
            && !sonidos[tipo].paused;

        botonesSonido[tipo].classList.toggle("activo", activo);
        botonesSonido[tipo].setAttribute(
            "aria-pressed",
            String(activo)
        );
    });

    const activos = Object.keys(sonidos).filter(
        (tipo) => sonidos[tipo] === sonidoActual
            && !sonidos[tipo].paused
    );

    if (activos.length) {
        estadoSonido.textContent =
            "Reproduciendo: " + nombresSonido[activos[0]];
        indicadorAudio.classList.add("reproduciendo");
    } else {
        estadoSonido.textContent = "Ningún sonido está activo.";
        indicadorAudio.classList.remove("reproduciendo");
    }
}

async function alternarSonido(tipo) {
    const audio = sonidos[tipo];

    if (!audio) return;

    if (sonidoActual === audio && !audio.paused) {
        audio.pause();
        audio.currentTime = 0;
        sonidoActual = null;
        actualizarEstadoAudio();
        return;
    }

    Object.values(sonidos).forEach((otroAudio) => {
        otroAudio.pause();
        otroAudio.currentTime = 0;
    });

    sonidoActual = audio;
    audio.volume = Number(controlVolumen.value) / 100;

    try {
        await audio.play();
        actualizarEstadoAudio();
    } catch (error) {
        sonidoActual = null;
        actualizarEstadoAudio();
        estadoSonido.textContent =
            "No se pudo reproducir. Revisa el archivo de audio.";
    }
}

function detenerSonido() {
    Object.values(sonidos).forEach((audio) => {
        audio.pause();
        audio.currentTime = 0;
    });

    sonidoActual = null;
    actualizarEstadoAudio();
}

controlVolumen.addEventListener("input", () => {
    const volumen = Number(controlVolumen.value);

    valorVolumen.textContent = volumen + "%";

    if (sonidoActual) {
        sonidoActual.volume = volumen / 100;
    }
});

actualizarEstadoAudio();

const paginas = [
    document.getElementById("pagina-temporizador"),
    document.getElementById("pagina-tareas"),
    document.getElementById("pagina-sonidos"),
    document.getElementById("pagina-logros")
];

const indicadorPagina = document.getElementById("indicadorPagina");
let paginaActual = 0;

function mostrarPagina() {
    paginas.forEach((pagina, indice) => {
        if (pagina) {
            pagina.classList.toggle("oculta", indice !== paginaActual);
        }
    });

    if (indicadorPagina) {
        indicadorPagina.textContent =
            `${paginaActual + 1} / ${paginas.length}`;
    }
}

function cambiarPagina(direccion) {
    paginaActual =
        (paginaActual + direccion + paginas.length) % paginas.length;

    mostrarPagina();
}


const totalSesiones = document.getElementById("totalSesiones");
const totalMinutos = document.getElementById("totalMinutos");
const listaInsignias = document.getElementById("listaInsignias");

function mostrarLogros() {
    if (!totalSesiones || !totalMinutos || !listaInsignias) return;

    totalSesiones.textContent = sesionesCompletadas;
    totalMinutos.textContent = minutosConcentracion;

    const insignias = [
        {
            nombre: "Primer paso",
            emoji: "🐣",
            requisito: sesionesCompletadas >= 1,
            descripcion: "Completa 1 sesión"
        },
        {
            nombre: "Enfoque brillante",
            emoji: "⭐",
            requisito: sesionesCompletadas >= 5,
            descripcion: "Completa 5 sesiones"
        },
        {
            nombre: "Conejito constante",
            emoji: "🐰",
            requisito: sesionesCompletadas >= 10,
            descripcion: "Completa 10 sesiones"
        },
        {
            nombre: "Hora de estudiar",
            emoji: "📚",
            requisito: minutosConcentracion >= 60,
            descripcion: "Acumula 60 minutos"
        },
        {
            nombre: "Estrella dedicada",
            emoji: "🌟",
            requisito: minutosConcentracion >= 180,
            descripcion: "Acumula 180 minutos"
        },
        {
            nombre: "Maestro del tiempo",
            emoji: "👑",
            requisito: sesionesCompletadas >= 25,
            descripcion: "Completa 25 sesiones"
        }
    ];

    listaInsignias.replaceChildren();

    insignias.forEach((insignia) => {
        const tarjeta = document.createElement("div");
        tarjeta.className = insignia.requisito
            ? "insignia"
            : "insignia bloqueada";

        const icono = document.createElement("span");
        icono.textContent = insignia.emoji;

        const nombre = document.createElement("strong");
        nombre.textContent = insignia.nombre;

        const descripcion = document.createElement("p");
        descripcion.textContent = insignia.requisito
            ? "¡Desbloqueada!"
            : insignia.descripcion;

        tarjeta.append(icono, nombre, descripcion);
        listaInsignias.appendChild(tarjeta);
    });
}

mostrarLogros();



