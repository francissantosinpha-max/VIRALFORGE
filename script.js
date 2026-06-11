// ============================================
// FUNCIONES MODALES
// ============================================

function abrirLogin() {
    document.getElementById('login-modal').classList.add('active');
}

function abrirRegistro() {
    document.getElementById('registro-modal').classList.add('active');
}

function cerrarModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function cambiarModal(fromModal, toModal) {
    event.preventDefault();
    cerrarModal(fromModal);
    document.getElementById(toModal).classList.add('active');
}

function manejarLogin(event) {
    event.preventDefault();
    mostrarNotificacion('¡Bienvenido a ViralForge! Acceso realizado correctamente.');
    cerrarModal('login-modal');
}

function manejarRegistro(event) {
    event.preventDefault();
    mostrarNotificacion('¡Cuenta creada exitosamente! Bienvenido a ViralForge.');
    cerrarModal('registro-modal');
}

// ============================================
// FUNCIONES DE NOTIFICACIÓN
// ============================================

function mostrarNotificacion(mensaje) {
    const notif = document.getElementById('notificacion');
    notif.textContent = mensaje;
    notif.classList.add('active');
    setTimeout(() => {
        notif.classList.remove('active');
    }, 3000);
}

// ============================================
// FUNCIONES DE HERRAMIENTAS
// ============================================

function abrirTitulos() {
    mostrarNotificacion('Abriendo Generador de Títulos...');
    // Simulación de apertura
}

function abrirDescripciones() {
    mostrarNotificacion('Abriendo Generador de Descripciones...');
}

function abrirThumbnails() {
    mostrarNotificacion('Abriendo Diseñador de Thumbnails...');
}

function abrirKeywords() {
    mostrarNotificacion('Abriendo Análisis de Keywords...');
}

function abrirPlanificador() {
    mostrarNotificacion('Abriendo Planificador de Contenido...');
}

function abrirEditor() {
    mostrarNotificacion('Abriendo Editor de Videos en la Nube...');
}

function verDemo() {
    mostrarNotificacion('Iniciando demo en vivo...');
    // Aquí iría la integración con video demo
}

// ============================================
// FUNCIONES DE YOUTUBE API
// ============================================

// Datos simulados de YouTube API
const datosYouTube = {
    vistas: 125400,
    likes: 8950,
    comentarios: 1240,
    suscriptores: 15800,
    lastUpdate: new Date()
};

function conectarYouTube() {
    const apiKey = document.getElementById('youtube-api').value;
    const channelId = document.getElementById('channel-id').value;

    if (!apiKey || !channelId) {
        mostrarNotificacion('Por favor completa todos los campos');
        return;
    }

    // Simular conexión a YouTube API
    mostrarNotificacion('Conectando con YouTube... Por favor espera.');
    
    setTimeout(() => {
        // Mostrar status de conexión
        document.getElementById('api-status').style.display = 'flex';
        mostrarNotificacion('¡Conectado exitosamente a YouTube!');
        
        // Actualizar estadísticas
        actualizarEstadisticas();
    }, 1500);
}

function actualizarEstadisticas() {
    document.getElementById('vistas-total').textContent = datosYouTube.vistas.toLocaleString();
    document.getElementById('likes-total').textContent = datosYouTube.likes.toLocaleString();
    document.getElementById('shares-total').textContent = Math.floor(datosYouTube.vistas * 0.05);
    document.getElementById('suscriptores-total').textContent = datosYouTube.suscriptores.toLocaleString();
    
    // Actualizar gráficos
    crearGraficos();
}

function crearGraficos() {
    // Gráfico de vistas
    const ctxViews = document.getElementById('viewsChart');
    if (ctxViews && ctxViews.getContext) {
        new Chart(ctxViews, {
            type: 'line',
            data: {
                labels: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'],
                datasets: [{
                    label: 'Vistas',
                    data: [12000, 15000, 18000, 16000, 20000, 25000, 22000],
                    borderColor: '#FF0000',
                    backgroundColor: 'rgba(255, 0, 0, 0.1)',
                    tension: 0.4,
                    fill: true,
                    borderWidth: 3
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: true
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    // Gráfico de engagement
    const ctxEngagement = document.getElementById('engagementChart');
    if (ctxEngagement && ctxEngagement.getContext) {
        new Chart(ctxEngagement, {
            type: 'bar',
            data: {
                labels: ['Video 1', 'Video 2', 'Video 3', 'Video 4', 'Video 5'],
                datasets: [{
                    label: 'Engagement %',
                    data: [8.5, 12.3, 9.8, 15.2, 11.7],
                    backgroundColor: [
                        '#FF0000',
                        '#FF3366',
                        '#FF6699',
                        '#FF99CC',
                        '#FFCCEE'
                    ],
                    borderRadius: 8
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}

// ============================================
// FUNCIONES DE TABS
// ============================================

function cambiarTab(tabName) {
    // Ocultar todos los contenidos
    const contents = document.querySelectorAll('.studio-content');
    contents.forEach(content => {
        content.classList.remove('active');
    });

    // Desactivar todos los tabs
    const tabs = document.querySelectorAll('.studio-tab');
    tabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Mostrar contenido seleccionado
    document.getElementById(tabName).classList.add('active');

    // Activar tab seleccionado
    event.target.closest('.studio-tab').classList.add('active');

    // Cargar datos específicos del tab
    if (tabName === 'trending') {
        cargarTrending();
    } else if (tabName === 'colabs') {
        buscarColaboradores();
    }
}

// ============================================
// FUNCIONES DE UPLOAD DE VIDEO
// ============================================

function manejarDrop(event) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        manejarArchivos(files[0]);
    }
}

function prevenirDefault(event) {
    event.preventDefault();
}

function manejarUpload() {
    const input = document.getElementById('video-upload');
    if (input.files.length > 0) {
        manejarArchivos(input.files[0]);
    }
}

function manejarArchivos(file) {
    const tamaño = (file.size / (1024 * 1024)).toFixed(2);
    mostrarNotificacion(`Video "${file.name}" (${tamaño}MB) subido correctamente`);
}

function programarVideo() {
    const titulo = document.getElementById('video-titulo').value;
    const descripcion = document.getElementById('video-descripcion').value;
    const categoria = document.getElementById('categoria').value;
    const privacidad = document.getElementById('privacidad').value;

    if (!titulo || !descripcion || !categoria) {
        mostrarNotificacion('Por favor completa todos los campos');
        return;
    }

    mostrarNotificacion(`Video "${titulo}" programado exitosamente en ${privacidad}`);
    
    // Limpiar formulario
    document.getElementById('video-titulo').value = '';
    document.getElementById('video-descripcion').value = '';
    document.getElementById('categoria').value = '';
}

// ============================================
// FUNCIONES DE MONETIZACIÓN
// ============================================

function activarGoogle() {
    mostrarNotificacion('Habilitando Google Ads en tu canal...');
    setTimeout(() => {
        mostrarNotificacion('¡Google Ads activado! Tus videos ganarán dinero.');
    }, 1500);
}

function activarSuperChats() {
    mostrarNotificacion('Habilitando Super Chats para tus suscriptores...');
    setTimeout(() => {
        mostrarNotificacion('¡Super Chats activado! Tus fans pueden donar durante streams.');
    }, 1500);
}

function crearMembresias() {
    mostrarNotificacion('Creando niveles de membresía personalizados...');
    setTimeout(() => {
        mostrarNotificacion('¡Membresías creadas! Ahora tus suscriptores pueden acceder a contenido exclusivo.');
    }, 1500);
}

function abrirAfiliados() {
    mostrarNotificacion('Abriendo panel de enlaces de afiliado...');
}

// ============================================
// FUNCIONES DE COLABORADORES
// ============================================

function buscarColaboradores() {
    const busqueda = document.getElementById('buscar-colab').value;
    const resultados = document.getElementById('colabs-resultados');

    // Datos simulados de colaboradores
    const colaboradores = [
        {
            nombre: 'Juan Tech',
            suscriptores: '250K',
            categoria: 'Tecnología',
            avatar: 'https://i.pravatar.cc/150?img=1'
        },
        {
            nombre: 'Laura Gaming',
            suscriptores: '180K',
            categoria: 'Gaming',
            avatar: 'https://i.pravatar.cc/150?img=2'
        },
        {
            nombre: 'Carlos Vlogs',
            suscriptores: '95K',
            categoria: 'Vlogs',
            avatar: 'https://i.pravatar.cc/150?img=3'
        },
        {
            nombre: 'María Educación',
            suscriptores: '320K',
            categoria: 'Educación',
            avatar: 'https://i.pravatar.cc/150?img=4'
        },
        {
            nombre: 'Luis Comedia',
            suscriptores: '145K',
            categoria: 'Comedia',
            avatar: 'https://i.pravatar.cc/150?img=5'
        },
        {
            nombre: 'Sophie Fashion',
            suscriptores: '210K',
            categoria: 'Moda',
            avatar: 'https://i.pravatar.cc/150?img=6'
        }
    ];

    // Filtrar si hay búsqueda
    let filtered = colaboradores;
    if (busqueda) {
        filtered = colaboradores.filter(c => 
            c.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
            c.categoria.toLowerCase().includes(busqueda.toLowerCase())
        );
    }

    // Renderizar tarjetas
    resultados.innerHTML = filtered.map(colab => `
        <div class="colab-card">
            <img src="${colab.avatar}" alt="${colab.nombre}" class="colab-avatar">
            <h4>${colab.nombre}</h4>
            <p class="colab-suscriptores">${colab.suscriptores} suscriptores</p>
            <div class="colab-category">${colab.categoria}</div>
            <button class="btn btn-primary btn-small" onclick="enviarProuestaColab('${colab.nombre}')">
                <i class="fas fa-envelope"></i> Proponer
            </button>
        </div>
    `).join('');

    mostrarNotificacion(`Encontrados ${filtered.length} colaboradores potenciales`);
}

function enviarProuestaColab(nombre) {
    mostrarNotificacion(`Propuesta de colaboración enviada a ${nombre}`);
}

// ============================================
// FUNCIONES DE TRENDING
// ============================================

function cargarTrending() {
    const container = document.getElementById('trending-videos');
    
    // Datos simulados de videos trending
    const trendingVideos = [
        {
            titulo: 'Increíble Transformación en 30 Días',
            canal: 'FitnessExperts',
            vistas: '2.4M',
            likes: '180K',
            trending: true
        },
        {
            titulo: '¿Es Real esta Nueva Tecnología?',
            canal: 'TechReview Pro',
            vistas: '1.8M',
            likes: '145K',
            trending: true
        },
        {
            titulo: 'Receta Viral que Todos Buscan',
            canal: 'CocinaFácil',
            vistas: '3.2M',
            likes: '256K',
            trending: true
        },
        {
            titulo: 'Top 10 Errores de YouTubers',
            canal: 'CreatorAcademy',
            vistas: '980K',
            likes: '75K',
            trending: false
        },
        {
            titulo: 'Challenge Imposible - Parte 2',
            canal: 'AdventureX',
            vistas: '2.1M',
            likes: '198K',
            trending: true
        },
        {
            titulo: 'Tutorial Completo en 5 Minutos',
            canal: 'QuickTutorials',
            vistas: '1.5M',
            likes: '112K',
            trending: false
        }
    ];

    container.innerHTML = trendingVideos.map(video => `
        <div class="trending-card">
            <div class="trending-thumbnail">
                ${video.trending ? '<span style="position: absolute; top: 10px; right: 10px; background: #FF0000; color: white; padding: 5px 12px; border-radius: 5px; font-size: 11px; font-weight: 700;">TRENDING</span>' : ''}
                <div class="trending-play">
                    <i class="fas fa-play"></i>
                </div>
            </div>
            <div class="trending-info">
                <h5>${video.titulo}</h5>
                <p style="color: #666; font-size: 12px; margin-bottom: 8px;">${video.canal}</p>
                <div class="trending-meta">
                    <span>${video.vistas} vistas</span>
                    <span><i class="fas fa-thumbs-up"></i> ${video.likes}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// ============================================
// FUNCIONES DE COMUNIDAD
// ============================================

function publicarPost() {
    const contenido = document.getElementById('nuevo-post').value;
    
    if (!contenido.trim()) {
        mostrarNotificacion('Por favor escribe algo antes de publicar');
        return;
    }

    mostrarNotificacion('¡Tu post ha sido publicado! La comunidad ya lo puede ver.');
    document.getElementById('nuevo-post').value = '';
}

function abrirRecurso(tipo) {
    const textos = {
        'seo': 'Abriendo Guía Completa de SEO en YouTube...',
        'thumbnails': 'Iniciando Masterclass: Thumbnails Virales...',
        'competencia': 'Cargando Herramienta de Análisis de Competencia...'
    };
    
    mostrarNotificacion(textos[tipo] || 'Cargando recurso...');
}

// ============================================
// INICIALIZACIÓN
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Cerrar modales al hacer clic fuera
    document.addEventListener('click', function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('active');
        }
    });

    // Cargar datos iniciales
    console.log('ViralForge cargado correctamente');
});

// ============================================
// FUNCIONES DE UTILIDAD
// ============================================

// Simulación de API calls
async function llamarAPI(endpoint, datos = {}) {
    try {
        console.log(`Llamando a: ${endpoint}`, datos);
        // En producción, aquí iría fetch real
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ success: true, data: datos });
            }, 800);
        });
    } catch (error) {
        console.error('Error en API:', error);
        mostrarNotificacion('Error en la conexión. Intenta de nuevo.');
    }
}

// Animación de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});