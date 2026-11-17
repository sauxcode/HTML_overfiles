//------------------------------------------------------------------------- Hi, if you damaged me, Im the hell for you ;) ---------------------------------------------------------------->

        // --- MAPA INTERACTIVO Logica ---
        const latRD = 18.4724;
        const lonRD = -69.9392;
        let map = null;
        let marcadoresActivos = [];
        let marcadorUsuario = null;

        const puntosBancarios = [
            {
                tipo: 'oficina',
                nombre: 'Oficina Principal Winston Churchill',
                lat: 18.4716,
                lon: -69.9412,
                info: '<b>Oficina Winston Churchill</b><br>Horario: Lun-Vie 8:30 AM - 4:00 PM.'
            },
            {
                tipo: 'oficina',
                nombre: 'Sucursal Av. 27 de Febrero',
                lat: 18.4745,
                lon: -69.9250,
                info: '<b>Sucursal 27 de Febrero</b><br>Horario: Lun-Vie 8:30 AM - 5:00 PM.'
            },
            {
                tipo: 'cajero',
                nombre: 'Cajero Automático Bella Vista Mall',
                lat: 18.4498,
                lon: -69.9425,
                info: '<b>ATM Bella Vista Mall</b><br>Disponible: 24 horas.'
            },
            {
                tipo: 'cajero',
                nombre: 'Cajero Automático Ágora Mall',
                lat: 18.4834,
                lon: -69.9396,
                info: '<b>ATM Ágora Mall</b><br>Disponible: horario del mall.'
            },
            {
                tipo: 'cajero',
                nombre: 'Cajero Automático Sambil Dominicana',
                lat: 18.4812,
                lon: -69.9180,
                info: '<b>ATM Sambil</b><br>Disponible: 24 horas.'
            }
        ];

        window.activarYCentrarMapa = function () {
            const contenedor = document.getElementById('mapSectionContainer');
            const boton = document.getElementById('btnEncuentraSucursal');

            if (!contenedor || !window.L) return;

            contenedor.classList.add('map-active');
            if (boton) boton.style.display = 'none';

            if (!map) {
                map = L.map('map').setView([latRD, lonRD], 13);

                L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png', {
                    attribution: '&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors &copy; <a href="https://carto.com">CARTO</a>',
                    subdomains: 'abcd',
                    maxZoom: 20
                }).addTo(map);

                filtrarMapa('todos');
            }

 	    setTimeout(() => {
              map.invalidateSize();
       	      solicitarUbicacionReal();
            }, 550);
        };

        function solicitarUbicacionReal() {
            if (!navigator.geolocation || !map) return;

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLat = position.coords.latitude;
                    const userLon = position.coords.longitude;

                    map.setView([userLat, userLon], 14);

                    if (marcadorUsuario) {
                        map.removeLayer(marcadorUsuario);
                    }

                    marcadorUsuario = L.marker([userLat, userLon])
                        .addTo(map)
                        .bindPopup('<b>📍 ¡Usted está aquí!</b><br>Visualizando opciones cercanas.')
                        .openPopup();
                },
                (error) => {
                    console.warn('No se pudo obtener la ubicación. Se mostrará la vista general.', error);
                    map.setView([latRD, lonRD], 13);
                }
            );
        }

        window.filtrarMapa = function (filtro) {
            if (!map) return;

            marcadoresActivos.forEach((marker) => map.removeLayer(marker));
            marcadoresActivos = [];

            puntosBancarios.forEach((punto) => {
                if (filtro === 'todos' || punto.tipo === filtro) {
                    const marcador = L.marker([punto.lat, punto.lon])
                        .addTo(map)
                        .bindPopup(punto.info);

                    marcadoresActivos.push(marcador);
                }
            });
        };







        // --- MECANISMO PESTAÑAS DE NECESIDADES ---
        const needTexts = {
            casa: 'Con nuestras soluciones financieras puedes amueblar tu casa como prefieras. Cuenta con facilidades de financiamiento adaptadas a ti.',
            carro: 'Obtén el vehículo de tus sueños con tasas de financiamiento fijas y plazos flexibles que se adaptan a tu presupuesto.',
            remodela: 'Dale nueva vida a tus espacios. Te ofrecemos líneas de crédito para pintar, ampliar o redecorar tu hogar.',
            estudio: 'Invierte en educación superior, maestrías y certificaciones internacionales con financiamientos diseñados para impulsar tu éxito.'
        };







//Cookies advanced
// --- COOKIES (Con Configuración Avanzada) ---

// 1. Vincular el botón "Configurar" original de tu HTML al hacer clic
document.addEventListener("DOMContentLoaded", () => {
    const btnConfig = document.querySelector('.btn-config');
    if (btnConfig) {
        btnConfig.addEventListener('click', abrirModalCookies);
    }

    // Comprobación inicial: si ya tomó una decisión antes, no mostrar el banner
    const banner = document.getElementById('cookieBanner');
    if (banner && localStorage.getItem('cookiesAceptadas')) {
        banner.style.display = 'none';
    }
});

function abrirModalCookies() {
    const modal = document.getElementById('cookieModal');
    if (modal) {
        modal.style.display = 'flex';
        
        // Cargar las preferencias previas si existen guardadas
        if(localStorage.getItem('cookiesAnaliticas') === 'true') {
            document.getElementById('cookieAnaliticas').checked = true;
        }
        if(localStorage.getItem('cookiesMarketing') === 'true') {
            document.getElementById('cookieMarketing').checked = true;
        }
    }
}

function cerrarModalCookies() {
    const modal = document.getElementById('cookieModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

function guardarConfiguracionCookies() {
    const banner = document.getElementById('cookieBanner');
    
    // Obtener el estado real de los checkboxes del usuario
    const analiticas = document.getElementById('cookieAnaliticas').checked;
    const marketing = document.getElementById('cookieMarketing').checked;

    // Guardar la configuración granular en el navegador
    localStorage.setItem('cookiesAceptadas', 'personalizado');
    localStorage.setItem('cookiesAnaliticas', analiticas);
    localStorage.setItem('setItem', marketing);

    // Ocultar modal y banner general
    cerrarModalCookies();
    if (banner) {
        banner.style.display = 'none';
    }
}

//Aceptas cookies?
function acceptCookies() {
    const banner = document.getElementById('cookieBanner');
    if (banner) {
        banner.style.display = 'none';
        // El botón "Aceptar" activa todo de forma rápida por defecto
        localStorage.setItem('cookiesAceptadas', 'true');
        localStorage.setItem('cookiesAnaliticas', 'true');
        localStorage.setItem('cookiesMarketing', 'true');
    }
}

// Hacer las funciones disponibles de forma global en el navegador
window.acceptCookies = acceptCookies;
window.abrirModalCookies = abrirModalCookies;
window.cerrarModalCookies = cerrarModalCookies;
window.guardarConfiguracionCookies = guardarConfiguracionCookies;


        // Mantiene la función disponible para el onclick del botón.
        window.acceptCookies = acceptCookies;




        // --- INICIALIZACIÓN DE LA PÁGINA ---
        document.addEventListener('DOMContentLoaded', () => {
            const banner = document.getElementById('cookieBanner');

            if (banner && localStorage.getItem('cookiesAceptadas') === 'true') {
                banner.style.display = 'none';
            }

            const tabs = document.querySelectorAll('.tab-item');
            const textDisplay = document.getElementById('dynamic-need-text');

            tabs.forEach((tab) => {
                tab.addEventListener('click', () => {
                    tabs.forEach((item) => item.classList.remove('active'));
                    tab.classList.add('active');

                    const target = tab.dataset.target;
                    if (textDisplay && needTexts[target]) {
                        textDisplay.textContent = needTexts[target];
                    }
                });
            });

        });
// ==========================================
// 1. MECANISMO DE AUTENTICACIÓN (LOGIN/LOGOUT)
// ==========================================

function procesarLogin(event) {
    // Detiene el refresco automático nativo del formulario HTML
    event.preventDefault();
    
    const usuario = document.getElementById('username').value;
    const recordar = document.getElementById('rememberMe').checked;
    
    console.log("Intentando autenticar al usuario: " + usuario);
    console.log("¿Guardar sesión de forma local?: " + recordar);

    // Guardamos el nombre ingresado de manera persistente en la memoria del navegador
    localStorage.setItem('usuarioBanca', usuario);

    // Redirección directa hacia la página privada del dashboard
    window.location.href = "dashboard.html";
}

function ejecutarLogout() {
    console.log("Cerrando sesión de forma segura y eliminando datos temporales...");
    
    // Eliminamos el registro del usuario del navegador por seguridad
    localStorage.removeItem('usuarioBanca');
    
    // Redirige de vuelta a la pantalla de acceso
    window.location.href = "login.html";
}

// ==========================================
// 2. CONTROL DE PERSISTENCIA Y CARGA CENTRAL
// ==========================================

window.onload = function() {
    const usuarioGuardado = localStorage.getItem('usuarioBanca');
    const pathActual = window.location.pathname;
    const userDisplayEl = document.getElementById('userDisplay');

    // Validación de sesión activa
    if (usuarioGuardado) {
        if (userDisplayEl) {
            userDisplayEl.textContent = usuarioGuardado;
        }
    } else {
        // Redirección defensiva si el usuario intenta ingresar al dashboard sin loguearse primero
        if (!pathActual.includes("login.html") && !pathActual.includes("hellow.html")) {
            window.location.href = "login.html";
        }
    }

    // DISPARADOR: Inicializa el carrusel automático de forma segura
    inicializarCarrusel();
};

// ==========================================
// 3. COMPONENTES INTERACTIVOS (SLIDER/CARRUSEL)
// ==========================================

function inicializarCarrusel() {
    let currentSlide = 0;
    const slider = document.getElementById('heroSlider');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    // Validación defensiva para evitar errores si no se encuentra el Slider en pantalla (ej: en el dashboard)
    if (slider && totalSlides > 1) {
        window.setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            slider.style.transform = `translateX(-${currentSlide * 100}%)`;
        }, 5000);
    }
}
