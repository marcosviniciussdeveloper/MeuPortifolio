document.addEventListener('DOMContentLoaded', () => {
    // Inicializa as partículas de fundo (Efeito Infraestrutura SRE/Cloud/Data Nodes)
    // Garante que a fonte Font Awesome carregou antes de desenhar no Canvas
    document.fonts.ready.then(() => {
        tsParticles.load("tsparticles", {
            background: {
                color: {
                    value: "transparent",
                },
            },
            fpsLimit: 60,
            interactivity: {
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "grab",
                    },
                    resize: true,
                },
                modes: {
                    push: {
                        quantity: 2,
                    },
                    grab: {
                        distance: 180,
                        links: {
                            opacity: 0.8,
                            color: "#00d2ff"
                        }
                    },
                },
            },
            particles: {
                color: {
                    value: ["#00d2ff", "#475569", "#25d366", "#ffffff"],
                },
                links: {
                    color: "#475569",
                    distance: 140,
                    enable: true,
                    opacity: 0.3,
                    width: 1.5,
                },
                collisions: {
                    enable: false,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outModes: {
                        default: "bounce",
                    },
                    random: true,
                    speed: 1,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        area: 800,
                    },
                    value: 35, // Quantidade menor para não poluir a tela com ícones grandes
                },
                opacity: {
                    value: { min: 0.3, max: 0.8 },
                    animation: {
                        enable: true,
                        speed: 1.5,
                        sync: false
                    }
                },
                shape: {
                    type: "char",
                    options: {
                        char: [
                            // Ícones Sólidos (Font Awesome 6 Free - weight 900)
                            { fill: true, font: "Font Awesome 6 Free", style: "", weight: "900", value: ["\uf0c2"] }, // fa-cloud
                            { fill: true, font: "Font Awesome 6 Free", style: "", weight: "900", value: ["\uf233"] }, // fa-server
                            { fill: true, font: "Font Awesome 6 Free", style: "", weight: "900", value: ["\uf126"] }, // fa-code-branch (CI/CD)
                            { fill: true, font: "Font Awesome 6 Free", style: "", weight: "900", value: ["\uf534"] }, // fa-infinity (DevOps)
                            { fill: true, font: "Font Awesome 6 Free", style: "", weight: "900", value: ["\uf1c0"] }, // fa-database
                            { fill: true, font: "Font Awesome 6 Free", style: "", weight: "900", value: ["\uf6ff"] }, // fa-network-wired
                            
                            // Ícones Brands (Font Awesome 6 Brands - weight 400)
                            { fill: true, font: "Font Awesome 6 Brands", style: "", weight: "400", value: ["\uf395"] }, // fa-docker
                            { fill: true, font: "Font Awesome 6 Brands", style: "", weight: "400", value: ["\uf375"] }, // fa-aws
                            { fill: true, font: "Font Awesome 6 Brands", style: "", weight: "400", value: ["\uf17c"] }  // fa-linux
                        ]
                    }
                },
                size: {
                    value: { min: 10, max: 22 }, // Tamanho aumentado para legibilidade dos ícones
                    animation: {
                        enable: true,
                        speed: 2,
                        sync: false
                    }
                },
            },
            detectRetina: true,
        });
    });

    // Lógica do Carrossel de Projetos (Loop Infinito)
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (carouselContainer) {
        const projectsGrid = carouselContainer.querySelector('.projects-carousel .projects-grid');
        const prevButton = carouselContainer.querySelector('.carousel-button.prev');
        const nextButton = carouselContainer.querySelector('.carousel-button.next');
        const projectCards = Array.from(projectsGrid.querySelectorAll('.project-card'));

        if (projectCards.length > 0) {
            const gap = 40; // O mesmo valor do gap no CSS
            
            // Clona os primeiros e últimos cards para criar o efeito infinito
            const firstCardsClone = projectCards.slice(0, 2).map(card => card.cloneNode(true));
            const lastCardsClone = projectCards.slice(-2).map(card => card.cloneNode(true));

            lastCardsClone.forEach(clone => projectsGrid.prepend(clone));
            firstCardsClone.forEach(clone => projectsGrid.append(clone));

            const allCards = projectsGrid.querySelectorAll('.project-card');
        const cardWidth = allCards[0].offsetWidth;
        
        let currentIndex = 2; // Começa no primeiro card real (após os clones do início)
        let isTransitioning = false;

        // Configura a posição inicial sem animação
        projectsGrid.style.transition = 'none';
        updateCarouselPosition();
        
        // Força o reflow para garantir que a transição 'none' seja aplicada antes de ativar novamente
        projectsGrid.offsetHeight;
        projectsGrid.style.transition = 'transform 0.5s ease-in-out';

        nextButton.addEventListener('click', () => {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex++;
            projectsGrid.style.transition = 'transform 0.5s ease-in-out';
            updateCarouselPosition();
        });

        prevButton.addEventListener('click', () => {
            if (isTransitioning) return;
            isTransitioning = true;
            currentIndex--;
            projectsGrid.style.transition = 'transform 0.5s ease-in-out';
            updateCarouselPosition();
        });

        projectsGrid.addEventListener('transitionend', () => {
            isTransitioning = false;
            
            // Se chegou no clone do final, pula para o primeiro item real
            if (currentIndex >= allCards.length - 2) {
                projectsGrid.style.transition = 'none';
                currentIndex = 2;
                updateCarouselPosition();
                // Força reflow
                projectsGrid.offsetHeight;
            }
            
            // Se chegou no clone do início, pula para o último item real
            if (currentIndex <= 0) {
                projectsGrid.style.transition = 'none';
                currentIndex = allCards.length - 4; // Total menos (2 clones do início + 2 clones do final)
                updateCarouselPosition();
                // Força reflow
                projectsGrid.offsetHeight;
            }
        });

        function updateCarouselPosition() {
            const offset = -currentIndex * (cardWidth + gap) + (lastCardsClone.length * (cardWidth + gap)); // Ajuste do offset inicial
            const finalOffset = offset - (lastCardsClone.length * (cardWidth + gap));
            projectsGrid.style.transform = `translateX(${finalOffset}px)`;
        }
    }
    }
});