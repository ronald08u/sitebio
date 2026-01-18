// Gemini AI Configuration
const GEMINI_API_KEY = 'AIzaSyA_dS6938TCo8vd5DGRde0lDH4Wk8cHOSc';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

// Doctor profiles data
const doctorProfiles = {
    maria: {
        name: 'Dra. María González',
        avatar: 'DM',
        specialty: 'Cardióloga Especialista',
        institution: 'Hospital General Central',
        experience: '15',
        patients: '2,500+',
        rating: '4.9',
        bio: 'Especialista en cardiología preventiva con amplia experiencia en el tratamiento de enfermedades cardiovasculares. Dedicada a promover la salud del corazón a través de la educación y el cuidado personalizado.'
    }
};

// Groups data
const groupsData = {
    prevencion: {
        title: 'Prevención Cardiovascular',
        members: '2,345',
        icon: '🛡️',
        doctor: 'Dr. Carlos Mendoza',
        doctorAvatar: 'CM',
        gradient: 'linear-gradient(135deg, #92B8FF, #AECEFF)'
    },
    nutricion: {
        title: 'Nutrición para el Corazón',
        members: '1,892',
        icon: '🥗',
        doctor: 'Dra. Patricia Reyes',
        doctorAvatar: 'PR',
        gradient: 'linear-gradient(135deg, #AECEFF, #C6E4FE)'
    },
    actividad: {
        title: 'Actividad Física Saludable',
        members: '3,156',
        icon: '🏃',
        doctor: 'Dr. Roberto Torres',
        doctorAvatar: 'RT',
        gradient: 'linear-gradient(135deg, #92B8FF, #C6E4FE)'
    },
    habitos: {
        title: 'Hábitos Saludables',
        members: '2,678',
        icon: '🧘',
        doctor: 'Dra. Sandra López',
        doctorAvatar: 'SL',
        gradient: 'linear-gradient(135deg, #AECEFF, #92B8FF)'
    },
    apoyo: {
        title: 'Apoyo a Pacientes',
        members: '4,521',
        icon: '💙',
        doctor: 'Dr. Eduardo Vásquez',
        doctorAvatar: 'EV',
        gradient: 'linear-gradient(135deg, #92B8FF, #6B9AE8)'
    },
    rehabilitacion: {
        title: 'Rehabilitación Cardíaca',
        members: '1,234',
        icon: '💪',
        doctor: 'Dr. Miguel Ángel Ruiz',
        doctorAvatar: 'MR',
        gradient: 'linear-gradient(135deg, #92B8FF, #AECEFF)'
    },
    hipertension: {
        title: 'Hipertensión y Bienestar',
        members: '2,890',
        icon: '📊',
        doctor: 'Dra. Laura Martínez',
        doctorAvatar: 'LM',
        gradient: 'linear-gradient(135deg, #AECEFF, #C6E4FE)'
    },
    postinfarto: {
        title: 'Apoyo Post-Infarto',
        members: '987',
        icon: '🫀',
        doctor: 'Dra. Ana Gutiérrez',
        doctorAvatar: 'AG',
        gradient: 'linear-gradient(135deg, #92B8FF, #C6E4FE)'
    },
    colesterol: {
        title: 'Manejo del Colesterol',
        members: '1,567',
        icon: '📉',
        doctor: 'Dr. Fernando Silva',
        doctorAvatar: 'FS',
        gradient: 'linear-gradient(135deg, #AECEFF, #92B8FF)'
    }
};

let currentUser = '';

// Check for existing session on page load
window.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('healthcareUser');
    if (savedUser) {
        const userData = JSON.parse(savedUser);
        currentUser = userData.name;
        loadUserSession();
    }
});

// Login functionality
const loginForm = document.getElementById('loginForm');
const loginScreen = document.getElementById('loginScreen');
const appContainer = document.getElementById('appContainer');
const welcomeMessage = document.getElementById('welcomeMessage');
const userAvatar = document.getElementById('userAvatar');
const postAvatar = document.getElementById('postAvatar');
const profileAvatarLarge = document.getElementById('profileAvatarLarge');
const profileName = document.getElementById('profileName');

// Login form submission
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();

    if (username) {
        currentUser = username;
        const userData = {
            name: username,
            isPremium: false
        };
        localStorage.setItem('healthcareUser', JSON.stringify(userData));
        loadUserSession();
    }
});

function loadUserSession() {
    const initials = 'U';
    
    userAvatar.textContent = initials;
    postAvatar.textContent = initials;
    profileAvatarLarge.textContent = initials;
    profileName.textContent = 'Usuario';
    welcomeMessage.textContent = `¡Bienvenido/a, Usuario!`;
    
    loginScreen.classList.add('hidden');
    appContainer.classList.add('active');
}

// Logout functionality
window.logout = function() {
    if (confirm('¿Estás seguro de que deseas cerrar sesión?')) {
        localStorage.removeItem('healthcareUser');
        location.reload();
    }
};

// Navigation
const navItems = document.querySelectorAll('.nav-item');
const feedSection = document.getElementById('feedSection');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        const section = item.dataset.section;
        if (section !== 'feed') {
            alert(`Sección "${item.querySelector('span').textContent}" en desarrollo`);
        }
    });
});

// Post creation
const publishBtn = document.getElementById('publishBtn');
const postInput = document.getElementById('postInput');
const postsContainer = document.getElementById('postsContainer');
let postIdCounter = 2;

publishBtn.addEventListener('click', () => {
    const content = postInput.value.trim();
    if (content) {
        createPost(content);
        postInput.value = '';
    }
});

function createPost(content) {
    const initials = 'U';
    const postId = postIdCounter++;
    const post = document.createElement('div');
    post.className = 'post-card';
    post.dataset.postId = postId;
    post.innerHTML = `
        <div class="post-header">
            <div class="post-avatar">${initials}</div>
            <div class="post-info">
                <h4>Usuario</h4>
                <p>Ahora mismo</p>
            </div>
        </div>
        <div class="post-content">${content}</div>
        <div class="post-interactions">
            <span class="interaction-count">
                <span class="likes-count">0</span> apoyos
            </span>
            <span class="interaction-count">
                <span class="comments-count">0</span> comentarios
            </span>
            <span class="interaction-count">
                <span class="shares-count">0</span> compartidas
            </span>
        </div>
        <div class="post-actions">
            <button class="action-btn like-btn" data-action="like">
                <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
                <span>Apoyar</span>
            </button>
            <button class="action-btn" data-action="comment">
                <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
                </svg>
                <span>Comentar</span>
            </button>
            <button class="action-btn" data-action="share">
                <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11c.54.5 1.25.81 2.04.81 1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3c0 .24.04.47.09.7L8.04 9.81C7.5 9.31 6.79 9 6 9c-1.66 0-3 1.34-3 3s1.34 3 3 3c.79 0 1.5-.31 2.04-.81l7.12 4.16c-.05.21-.08.43-.08.65 0 1.61 1.31 2.92 2.92 2.92 1.61 0 2.92-1.31 2.92-2.92s-1.31-2.92-2.92-2.92z"/>
                </svg>
                <span>Compartir</span>
            </button>
        </div>
    `;
    postsContainer.insertBefore(post, postsContainer.firstChild);
    setupPostInteractions(post);
}

// Setup post interactions
function setupPostInteractions(post) {
    const likeBtn = post.querySelector('[data-action="like"]');
    const commentBtn = post.querySelector('[data-action="comment"]');
    const shareBtn = post.querySelector('[data-action="share"]');
    
    if (likeBtn) {
        likeBtn.addEventListener('click', function() {
            handlePostAction(post, 'like', this);
        });
    }
    
    if (commentBtn) {
        commentBtn.addEventListener('click', function() {
            handlePostAction(post, 'comment', this);
        });
    }
    
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            handlePostAction(post, 'share', this);
        });
    }
}

function handlePostAction(post, action, button) {
    const countElement = post.querySelector(`.${action === 'like' ? 'likes' : action === 'comment' ? 'comments' : 'shares'}-count`);
    if (!countElement) return;
    
    let count = parseInt(countElement.textContent);
    
    if (action === 'like') {
        if (button.classList.contains('liked')) {
            button.classList.remove('liked');
            count = Math.max(0, count - 1);
        } else {
            button.classList.add('liked');
            count++;
            triggerHeartReaction();
        }
        countElement.textContent = count;
    } else if (action === 'comment') {
        toggleCommentsSection(post);
    } else if (action === 'share') {
        alert('¡Publicación compartida!');
        count++;
        countElement.textContent = count;
        triggerHeartReaction();
    }
}

// Toggle comments section
function toggleCommentsSection(post) {
    let commentsSection = post.querySelector('.comments-section');
    
    if (!commentsSection) {
        commentsSection = createCommentsSection(post);
        post.appendChild(commentsSection);
        
        // Load AI-generated comments after a short delay
        setTimeout(() => {
            loadAIComments(post);
        }, 500);
    }
    
    commentsSection.classList.toggle('active');
}

// Create comments section
function createCommentsSection(post) {
    const postId = post.dataset.postId;
    const userInitials = 'U';
    
    const section = document.createElement('div');
    section.className = 'comments-section';
    section.innerHTML = `
        <div class="comments-list" id="comments-list-${postId}">
            <div class="loading-comments">Cargando comentarios</div>
        </div>
        <div class="comment-input-container">
            <div class="comment-input-avatar">${userInitials}</div>
            <div class="comment-input-wrapper">
                <input type="text" class="comment-input" placeholder="Escribe un comentario..." id="comment-input-${postId}">
                <button class="comment-submit-btn" onclick="submitComment(${postId})">Enviar</button>
            </div>
        </div>
    `;
    
    return section;
}

// Submit user comment
window.submitComment = async function(postId) {
    const input = document.getElementById(`comment-input-${postId}`);
    const commentText = input.value.trim();
    
    if (!commentText) return;
    
    const post = document.querySelector(`[data-post-id="${postId}"]`);
    const commentsList = document.getElementById(`comments-list-${postId}`);
    const userInitials = 'U';
    
    // Add user comment
    addCommentToPost(commentsList, {
        author: 'Usuario',
        initials: userInitials,
        text: commentText,
        time: 'Ahora mismo',
        isAI: false
    });
    
    input.value = '';
    
    // Update comment count
    const countElement = post.querySelector('.comments-count');
    if (countElement) {
        let count = parseInt(countElement.textContent);
        countElement.textContent = count + 1;
    }
    
    // Generate Cardi response
    setTimeout(async () => {
        await generateAICommentResponse(commentsList, commentText, postId);
    }, 1500);
};

// Load AI-generated comments
async function loadAIComments(post) {
    const postId = post.dataset.postId;
    const commentsList = document.getElementById(`comments-list-${postId}`);
    
    // Comentarios preestablecidos de Cardi
    const cardiComments = [
        {
            author: 'Cardi',
            initials: '❤️',
            text: '¡Excelente recordatorio! La salud del corazón comienza con pequeñas acciones diarias. 💪',
            time: 'Hace 15 min',
            isAI: true
        },
        {
            author: 'Cardi',
            initials: '❤️',
            text: 'Me encanta ver que estás tomando en serio tu salud cardiovascular. ¡Sigue así! 🫀',
            time: 'Hace 20 min',
            isAI: true
        },
        {
            author: 'Cardi',
            initials: '❤️',
            text: 'Gran consejo. Recuerden que la constancia es clave para un corazón saludable. 💙',
            time: 'Hace 25 min',
            isAI: true
        },
        {
            author: 'Cardi',
            initials: '❤️',
            text: '¡Muy importante! No olviden consultar con su médico antes de comenzar cualquier rutina nueva.',
            time: 'Hace 30 min',
            isAI: true
        },
        {
            author: 'Cardi',
            initials: '❤️',
            text: 'Esto es fundamental. Una buena alimentación y ejercicio regular son la base de la salud cardiovascular. 🥗',
            time: 'Hace 35 min',
            isAI: true
        },
        {
            author: 'Cardi',
            initials: '❤️',
            text: '¡Me alegra ver contenido tan útil! La prevención es siempre la mejor medicina. ❤️',
            time: 'Hace 40 min',
            isAI: true
        },
        {
            author: 'Cardi',
            initials: '❤️',
            text: 'Comparto totalmente. El cuidado del corazón debe ser prioridad para todos. 💕',
            time: 'Hace 45 min',
            isAI: true
        },
        {
            author: 'Cardi',
            initials: '❤️',
            text: 'Recuerden: un corazón feliz es un corazón saludable. ¡Cuídense! 😊',
            time: 'Hace 50 min',
            isAI: true
        }
    ];
    
    // Select 2-3 random comments from Cardi
    const numComments = Math.floor(Math.random() * 2) + 2; // 2 or 3 comments
    const selectedComments = [];
    const usedIndexes = new Set();
    
    while (selectedComments.length < numComments) {
        const randomIndex = Math.floor(Math.random() * cardiComments.length);
        if (!usedIndexes.has(randomIndex)) {
            usedIndexes.add(randomIndex);
            selectedComments.push(cardiComments[randomIndex]);
        }
    }
    
    // Clear loading message
    commentsList.innerHTML = '';
    
    // Add Cardi comments with delay
    selectedComments.forEach((comment, index) => {
        setTimeout(() => {
            addCommentToPost(commentsList, comment);
        }, index * 300);
    });
    
    // Update comment count
    const countElement = post.querySelector('.comments-count');
    if (countElement) {
        countElement.textContent = parseInt(countElement.textContent) + selectedComments.length;
    }
}

// Generate Cardi response to user comment
async function generateAICommentResponse(commentsList, userComment, postId) {
    // Respuestas preestablecidas de Cardi
    const cardiResponses = [
        '¡Gracias por compartir tu experiencia! Es muy valiosa para la comunidad. ❤️',
        '¡Excelente punto! Me alegra que formes parte de esta comunidad. 💙',
        'Totalmente de acuerdo contigo. Juntos podemos lograr una mejor salud cardiovascular. 🫀',
        '¡Muy bien dicho! La comunidad se enriquece con aportes como el tuyo. 💕',
        'Gracias por tu participación. Es importante que todos compartamos nuestras experiencias. 😊',
        '¡Me encanta tu actitud positiva! Eso es clave para una vida saludable. 💪',
        'Excelente reflexión. Sigue así y cuida mucho tu corazón. ❤️',
        '¡Qué bueno leerte! Tu compromiso con tu salud es inspirador. 💙'
    ];
    
    const randomResponse = cardiResponses[Math.floor(Math.random() * cardiResponses.length)];
    
    setTimeout(() => {
        addCommentToPost(commentsList, {
            author: 'Cardi',
            initials: '❤️',
            text: randomResponse,
            time: 'Ahora mismo',
            isAI: true
        });
        
        // Update count
        const post = document.querySelector(`[data-post-id="${postId}"]`);
        const countElement = post.querySelector('.comments-count');
        if (countElement) {
            countElement.textContent = parseInt(countElement.textContent) + 1;
        }
    }, 1000);
}

// Add comment to post
function addCommentToPost(commentsList, comment) {
    const commentDiv = document.createElement('div');
    commentDiv.className = 'comment-item';
    const avatarClass = comment.author === 'Cardi' ? 'comment-avatar cardi-avatar' : 'comment-avatar';
    commentDiv.innerHTML = `
        <div class="${avatarClass}">${comment.initials}</div>
        <div class="comment-content">
            <div class="comment-header">
                <span class="comment-author">${comment.author}</span>
                ${comment.isAI ? '<span class="ai-comment-badge"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/></svg>IA</span>' : ''}
                <span class="comment-time">${comment.time}</span>
            </div>
            <div class="comment-text">${comment.text}</div>
        </div>
    `;
    commentsList.appendChild(commentDiv);
}

// Initialize interactions for existing posts
document.querySelectorAll('.post-card').forEach(post => {
    setupPostInteractions(post);
});

// Doctor profile modal
document.addEventListener('click', (e) => {
    const doctorNameElement = e.target.closest('.doctor-name');
    if (doctorNameElement) {
        const doctorKey = doctorNameElement.dataset.doctor;
        if (doctorKey && doctorProfiles[doctorKey]) {
            openDoctorModal(doctorProfiles[doctorKey]);
        }
    }
});

function openDoctorModal(doctor) {
    const doctorModal = document.getElementById('doctorModal');
    if (!doctorModal) return;
    
    document.getElementById('doctorAvatar').textContent = doctor.avatar;
    document.getElementById('doctorName').innerHTML = `
        ${doctor.name}
        <span class="verified-badge">
            <svg viewBox="0 0 24 24">
                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
            </svg>
        </span>
    `;
    document.getElementById('doctorSpecialty').textContent = doctor.specialty;
    document.getElementById('doctorInstitution').textContent = doctor.institution;
    document.getElementById('doctorExperience').textContent = doctor.experience;
    document.getElementById('doctorPatients').textContent = doctor.patients;
    document.getElementById('doctorRating').textContent = doctor.rating;
    const bioP = document.getElementById('doctorBio').querySelector('p');
    if (bioP) bioP.textContent = doctor.bio;
    
    doctorModal.classList.add('active');
}

window.closeDoctorModal = function() {
    const doctorModal = document.getElementById('doctorModal');
    if (doctorModal) {
        doctorModal.classList.remove('active');
    }
};

// Group navigation
document.querySelectorAll('.group-item, .profile-group-item').forEach(item => {
    item.addEventListener('click', function() {
        const groupKey = this.dataset.group;
        if (groupKey && groupsData[groupKey]) {
            openGroupView(groupsData[groupKey]);
            triggerHeartReaction();
        }
    });
});

function openGroupView(group) {
    const feedSection = document.getElementById('feedSection');
    const groupsSidebar = document.querySelector('.groups-sidebar');
    const profileSidebar = document.querySelector('.profile-sidebar');
    const groupView = document.getElementById('groupView');
    const groupBanner = document.getElementById('groupBanner');
    
    if (feedSection) feedSection.style.display = 'none';
    if (groupsSidebar) groupsSidebar.style.display = 'none';
    if (profileSidebar) profileSidebar.style.display = 'none';
    
    if (groupBanner) groupBanner.style.background = group.gradient;
    
    const groupTitle = document.getElementById('groupTitle');
    const groupMembers = document.getElementById('groupMembers');
    const groupModAvatar = document.getElementById('groupModAvatar');
    const groupModName = document.getElementById('groupModName');
    
    if (groupTitle) groupTitle.textContent = group.title;
    if (groupMembers) groupMembers.textContent = `${group.members} miembros`;
    if (groupModAvatar) groupModAvatar.textContent = group.doctorAvatar;
    if (groupModName) groupModName.textContent = group.doctor;
    
    if (groupView) groupView.classList.add('active');
    
    // Load group posts
    const groupPosts = document.getElementById('groupPosts');
    if (groupPosts) {
        const userInitials = postAvatar ? postAvatar.textContent : 'U';
        groupPosts.innerHTML = `
            <div class="create-post-card">
                <div class="create-post-input">
                    <div class="create-post-avatar">${userInitials}</div>
                    <textarea placeholder="Comparte algo con el grupo..."></textarea>
                </div>
                <div class="create-post-actions">
                    <button class="post-btn">Publicar en el grupo</button>
                </div>
            </div>
            <div class="post-card">
                <div class="post-header">
                    <div class="post-avatar">${group.doctorAvatar}</div>
                    <div class="post-info">
                        <h4>${group.doctor}</h4>
                        <p>Moderador • Hace 1 día</p>
                    </div>
                </div>
                <div class="post-content">
                    Bienvenidos a ${group.title}. Este es un espacio para compartir experiencias, hacer preguntas y apoyarnos mutuamente en nuestro camino hacia una mejor salud cardiovascular.
                </div>
                <div class="post-interactions">
                    <span class="interaction-count"><span>23</span> apoyos</span>
                    <span class="interaction-count"><span>8</span> comentarios</span>
                </div>
                <div class="post-actions">
                    <button class="action-btn"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg><span>Apoyar</span></button>
                    <button class="action-btn"><svg fill="currentColor" viewBox="0 0 24 24"><path d="M21.99 4c0-1.1-.89-2-1.99-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4-.01-18zM18 14H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/></svg><span>Comentar</span></button>
                </div>
            </div>
        `;
    }
}

window.closeGroupView = function() {
    const groupView = document.getElementById('groupView');
    const feedSection = document.getElementById('feedSection');
    const groupsSidebar = document.querySelector('.groups-sidebar');
    const profileSidebar = document.querySelector('.profile-sidebar');
    
    if (groupView) groupView.classList.remove('active');
    if (feedSection) feedSection.style.display = 'block';
    if (groupsSidebar) groupsSidebar.style.display = 'block';
    if (window.innerWidth >= 768 && profileSidebar) {
        profileSidebar.style.display = 'block';
    }
};

// Chatbot functionality with Gemini AI
const heartChatbot = document.getElementById('heartChatbot');
const chatWindow = document.getElementById('chatWindow');
const closeChat = document.getElementById('closeChat');
const chatInput = document.getElementById('chatInput');
const sendMessage = document.getElementById('sendMessage');
const chatMessages = document.getElementById('chatMessages');

// Verificar que todos los elementos del chatbot existan
if (heartChatbot && chatWindow) {
    heartChatbot.addEventListener('click', () => {
        chatWindow.classList.toggle('active');
        triggerHeartReaction();
    });
}

if (closeChat && chatWindow) {
    closeChat.addEventListener('click', () => {
        chatWindow.classList.remove('active');
    });
}

if (sendMessage && chatInput) {
    sendMessage.addEventListener('click', sendChatMessage);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            sendChatMessage();
        }
    });
}

async function sendChatMessage() {
    if (!chatInput || !chatMessages) {
        console.error('Elementos del chat no encontrados');
        return;
    }
    
    const message = chatInput.value.trim();
    if (!message) return;
    
    // Añadir mensaje del usuario
    addChatMessage(message, true);
    chatInput.value = '';
    
    // Mostrar indicador de escritura
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message typing-indicator';
    typingDiv.innerHTML = `
        <svg class="message-avatar" viewBox="0 0 100 100" fill="none">
            <path d="M50 85C50 85 15 60 15 35C15 20 25 15 35 15C42 15 47 19 50 25C53 19 58 15 65 15C75 15 85 20 85 35C85 60 50 85 50 85Z" fill="#E63946"/>
        </svg>
        <div class="message-bubble">Escribiendo...</div>
    `;
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    try {
        const response = await getGeminiResponse(message);
        typingDiv.remove();
        addChatMessage(response, false);
        triggerHeartReaction();
    } catch (error) {
        console.error('Error al obtener respuesta de Gemini:', error);
        typingDiv.remove();
        addChatMessage('Lo siento, hubo un error al procesar tu consulta. Por favor, intenta de nuevo más tarde.', false);
    }
}

async function getGeminiResponse(userMessage) {
    const systemPrompt = `Eres Cardi, un asistente especializado en salud cardiovascular. Tu rol es:

1. Proporcionar información general sobre salud cardiovascular, prevención, nutrición y ejercicio
2. NUNCA diagnosticar enfermedades ni dar diagnósticos médicos
3. SIEMPRE recomendar consultar a un profesional de la salud para diagnósticos y tratamientos específicos
4. Ser empático, amable y alentador
5. Usar un lenguaje claro y accesible
6. Limitar respuestas a máximo 3-4 oraciones para mantener conversaciones fluidas

IMPORTANTE: Si te preguntan sobre síntomas específicos o solicitan un diagnóstico, debes responder: "No puedo proporcionar diagnósticos médicos. Te recomiendo encarecidamente que consultes con un profesional de la salud para una evaluación adecuada."

Mensaje del usuario: ${userMessage}`;

    const requestBody = {
        contents: [{
            parts: [{
                text: systemPrompt
            }]
        }],
        generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300,
        }
    };

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error('Error de API:', errorData);
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            return data.candidates[0].content.parts[0].text;
        } else {
            throw new Error('Respuesta inválida de la API');
        }
    } catch (error) {
        console.error('Error detallado:', error);
        throw error;
    }
}

function addChatMessage(message, isUser) {
    if (!chatMessages) return;
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user' : ''}`;
    
    if (isUser) {
        const initials = 'U';
        messageDiv.innerHTML = `
            <div class="message-avatar" style="background: linear-gradient(135deg, #92B8FF, #C6E4FE); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">${initials}</div>
            <div class="message-bubble">${message}</div>
        `;
    } else {
        messageDiv.innerHTML = `
            <svg class="message-avatar" viewBox="0 0 100 100" fill="none">
                <path d="M50 85C50 85 15 60 15 35C15 20 25 15 35 15C42 15 47 19 50 25C53 19 58 15 65 15C75 15 85 20 85 35C85 60 50 85 50 85Z" fill="#E63946"/>
            </svg>
            <div class="message-bubble">${message}</div>
        `;
    }
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function triggerHeartReaction() {
    const heart = document.getElementById('heartChatbot');
    if (heart) {
        heart.style.transform = 'scale(1.2)';
        setTimeout(() => {
            heart.style.transform = 'scale(1)';
        }, 300);
    }
}

// Trigger heart reaction on various actions
document.addEventListener('click', (e) => {
    if (e.target.closest('.post-btn') || 
        e.target.closest('.group-item') ||
        e.target.closest('.nav-item')) {
        triggerHeartReaction();
    }
});

// Close modal when clicking outside
const doctorModal = document.getElementById('doctorModal');
if (doctorModal) {
    doctorModal.addEventListener('click', (e) => {
        if (e.target.id === 'doctorModal') {
            closeDoctorModal();
        }
    });
}

// Premium functionality
const premiumBtn = document.getElementById('premiumBtn');
const premiumModal = document.getElementById('premiumModal');

if (premiumBtn) {
    premiumBtn.addEventListener('click', () => {
        openPremiumModal();
    });
}

function openPremiumModal() {
    if (premiumModal) {
        premiumModal.classList.add('active');
    }
}

window.closePremiumModal = function() {
    if (premiumModal) {
        premiumModal.classList.remove('active');
    }
};

// Close premium modal when clicking outside
if (premiumModal) {
    premiumModal.addEventListener('click', (e) => {
        if (e.target.id === 'premiumModal') {
            closePremiumModal();
        }
    });
}

// Subscribe button functionality
document.addEventListener('click', (e) => {
    if (e.target.closest('.subscribe-btn')) {
        alert('¡Gracias por tu interés en Premium! Esta funcionalidad estará disponible próximamente.');
        closePremiumModal();
    }
});
