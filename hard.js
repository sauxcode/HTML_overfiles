
        // Cambia dinámicamente entre las secciones principales del menú superior (Cuentas, Inversiones, Tarjetas)
        function cargarModulo(idModulo) {
            // Ocultar todos los módulos principales del espacio de trabajo
            document.getElementById('modulo-cuentas').style.display = 'none';
            document.getElementById('modulo-inversiones').style.display = 'none';
            document.getElementById('modulo-tarjetas').style.display = 'none';

            // Mostrar el módulo que solicitó el usuario
            document.getElementById('modulo-' + idModulo).style.display = 'flex';

	   const parrafo = document.getElementById('parrafo-bienvenida');
    if (parrafo) {
        parrafo.style.display = 'none';
    }
        }

        // Cambia dinámicamente la información detallada según la opción elegida en los menús laterales (Sidebars)
        function mostrarSubContenido(idSubVista) {
            // Buscamos todas las sub-vistas del documento y las ocultamos
            const vistas = document.querySelectorAll('.sub-view');
            vistas.forEach(vista => {
                vista.style.display = 'none';
            });

            // Mostramos exclusivamente el contenedor solicitado
            document.getElementById('sub-' + idSubVista).style.display = 'block';
        }




