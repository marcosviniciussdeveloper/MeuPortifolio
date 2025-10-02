// Menu hambúrguer
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Scroll suave para as seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        }
    });
});

// Filtro de projetos
const filterButtons = document.querySelectorAll('.filter-btn');
const projetoCards = document.querySelectorAll('.projeto-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active de todos os botões
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Adiciona active no botão clicado
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        // Filtra os projetos
        projetoCards.forEach(card => {
            const categories = card.getAttribute('data-category').split(' ');
            if (filter === 'all' || categories.includes(filter)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Formulário de contato
const contatoForm = document.getElementById('formulario-contato');

contatoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
    contatoForm.reset();
});

// Animação de entrada dos elementos
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
        }
    });
}, {
    threshold: 0.1
});

// Observar elementos para animação
document.querySelectorAll('.skill-card, .projeto-card, .section-title').forEach(element => {
    observer.observe(element);
});

// Função para adicionar novos projetos dinamicamente (opcional)
function adicionarProjeto(titulo, categoria, descricao, imgSrc, demoLink, codeLink) {
    const projetosGrid = document.getElementById('projetos-grid');
    const novoCard = document.createElement('div');
    novoCard.className = 'projeto-card';
    novoCard.setAttribute('data-category', categoria);

    novoCard.innerHTML = `
        <img src="${imgSrc}" alt="${titulo}" class="projeto-img">
        <div class="projeto-overlay">
            <h3 class="projeto-title">${titulo}</h3>
            <p class="projeto-categoria">${categoria}</p>
            <p>${descricao}</p>
            <div class="projeto-links">
                <a href="${demoLink}" target="_blank">Demo</a>
                <a href="${codeLink}" target="_blank">GitHub</a>
            </div>
        </div>
    `;

    projetosGrid.appendChild(novoCard);
    observer.observe(novoCard);
}