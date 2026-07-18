document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('#theme-toggle');
    const themeToggleIcon = themeToggle.querySelector('.theme-toggle-icon');

    const updateThemeToggle = () => {
        const isLightTheme = document.documentElement.dataset.theme === 'light';
        const actionLabel = isLightTheme ? 'Ativar tema escuro' : 'Ativar tema claro';

        themeToggle.setAttribute('aria-label', actionLabel);
        themeToggle.setAttribute('title', actionLabel);
        themeToggleIcon.className = `fa-solid ${isLightTheme ? 'fa-moon' : 'fa-sun'} theme-toggle-icon`;
    };

    themeToggle.addEventListener('click', () => {
        const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';

        document.documentElement.classList.add('theme-switching');
        document.documentElement.dataset.theme = nextTheme;
        updateThemeToggle();

        requestAnimationFrame(() => {
            requestAnimationFrame(() => document.documentElement.classList.remove('theme-switching'));
        });

        try {
            localStorage.setItem('portfolio-theme', nextTheme);
        } catch {
            // O tema continua funcionando mesmo quando o armazenamento está indisponível.
        }
    });

    updateThemeToggle();

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

    // Navegação do carrossel de certificações
    const certificationsContainer = document.querySelector('.certifications-carousel-container');

    if (certificationsContainer) {
        const certificationsCarousel = certificationsContainer.querySelector('.certifications-carousel');
        const certCards = certificationsCarousel.querySelectorAll('.cert-card');
        const certPrevButton = certificationsContainer.querySelector('.cert-carousel-button.prev');
        const certNextButton = certificationsContainer.querySelector('.cert-carousel-button.next');
        const certProgress = certificationsContainer.querySelector('.cert-carousel-progress');
        const certProgressBar = certProgress.querySelector('span');

        if (certCards.length > 0) {
            const updateCertProgress = () => {
                const maxScroll = certificationsCarousel.scrollWidth - certificationsCarousel.clientWidth;
                const progress = maxScroll > 0 ? certificationsCarousel.scrollLeft / maxScroll : 1;
                const progressWidth = 0.25 + (progress * 0.75);

                certProgressBar.style.transform = `scaleX(${progressWidth})`;
                certProgress.setAttribute('aria-valuenow', Math.round(progress * 100));
            };

            const moveCertifications = (direction) => {
                const gap = parseFloat(getComputedStyle(certificationsCarousel).gap) || 0;
                const step = certCards[0].getBoundingClientRect().width + gap;
                const maxScroll = certificationsCarousel.scrollWidth - certificationsCarousel.clientWidth;
                const isAtStart = certificationsCarousel.scrollLeft <= 2;
                const isAtEnd = certificationsCarousel.scrollLeft >= maxScroll - 2;

                if (direction > 0 && isAtEnd) {
                    certificationsCarousel.scrollTo({ left: 0, behavior: 'smooth' });
                } else if (direction < 0 && isAtStart) {
                    certificationsCarousel.scrollTo({ left: maxScroll, behavior: 'smooth' });
                } else {
                    certificationsCarousel.scrollBy({ left: direction * step, behavior: 'smooth' });
                }
            };

            certPrevButton.addEventListener('click', () => moveCertifications(-1));
            certNextButton.addEventListener('click', () => moveCertifications(1));
            certificationsCarousel.addEventListener('scroll', updateCertProgress, { passive: true });
            window.addEventListener('resize', updateCertProgress);

            certificationsCarousel.addEventListener('keydown', (event) => {
                if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
                    event.preventDefault();
                    moveCertifications(event.key === 'ArrowRight' ? 1 : -1);
                }
            });

            updateCertProgress();
        }
    }

    const projectDetails = {
        'AWS Private S3 Uplink': {
            description: 'API desenvolvida em .NET 8 para realizar uploads seguros no Amazon S3 a partir de uma infraestrutura privada. A solução utiliza permissões controladas por IAM e acesso operacional via AWS Systems Manager, evitando a exposição direta dos recursos à internet.',
            features: [
                'Upload seguro de arquivos para buckets Amazon S3',
                'Controle de acesso baseado em IAM Roles',
                'Execução em ambiente de rede privada na AWS',
                'Acesso administrativo utilizando SSM Port Forwarding',
                'Aplicação empacotada e executada com Docker'
            ]
        },
        'SindRelatorios': {
            description: 'Aplicação web construída para simplificar a geração e a visualização de relatórios. O projeto combina backend em C#/.NET, interface em HTML e uma esteira automatizada no GitHub Actions para tornar as entregas mais rápidas e confiáveis.',
            features: [
                'Geração e organização de relatórios pela aplicação web',
                'Visualização estruturada das informações processadas',
                'Backend desenvolvido com C# e .NET',
                'Pipeline automatizada de integração e entrega contínua',
                'Versionamento e rastreabilidade das alterações no GitHub'
            ]
        },
        'Prometheus & Grafana Docker Stack': {
            description: 'Stack local de observabilidade preparada para monitorar servidores Linux e serviços de infraestrutura. Prometheus coleta as métricas disponibilizadas pelo Node Exporter, enquanto o Grafana transforma os dados em painéis para análise operacional em tempo real.',
            features: [
                'Coleta contínua de métricas com Prometheus',
                'Monitoramento de recursos Linux por meio do Node Exporter',
                'Dashboards de infraestrutura configurados no Grafana',
                'Orquestração completa dos serviços com Docker Compose',
                'Ambiente reproduzível para estudos e práticas de SRE'
            ]
        },
        'Automated AWS Infra with Terraform': {
            description: 'Projeto de Infraestrutura como Código criado para automatizar o provisionamento de recursos na AWS. As definições em Terraform ficam versionadas e integradas ao GitHub Actions, permitindo uma execução padronizada e rastreável da infraestrutura.',
            features: [
                'Provisionamento automatizado de recursos na AWS',
                'Infraestrutura declarativa e versionada com Terraform',
                'Pipeline de CI/CD executada pelo GitHub Actions',
                'Padronização da criação e atualização dos ambientes',
                'Maior rastreabilidade das mudanças de infraestrutura'
            ]
        }
    };

    const projectModal = document.querySelector('#project-modal');
    const projectModalTitle = projectModal.querySelector('#project-modal-title');
    const projectModalDescription = projectModal.querySelector('#project-modal-description');
    const projectModalTechs = projectModal.querySelector('#project-modal-techs');
    const projectModalFeatures = projectModal.querySelector('#project-modal-features');
    const projectModalGithub = projectModal.querySelector('#project-modal-github');
    const projectModalCloseButton = projectModal.querySelector('.project-modal-close');
    let projectModalLastFocus = null;

    const openProjectModal = (card) => {
        const title = card.querySelector('h3').textContent.trim();
        const description = projectDetails[title];
        const technologies = Array.from(card.querySelectorAll('.project-techs span'))
            .map(technology => technology.textContent.trim());
        const githubLink = card.querySelector('.project-link').href;

        if (!description) return;

        projectModalTitle.textContent = title;
        projectModalDescription.textContent = description.description;
        projectModalGithub.href = githubLink;
        projectModalTechs.replaceChildren();
        projectModalFeatures.replaceChildren();

        technologies.forEach(technology => {
            const tag = document.createElement('span');
            tag.textContent = technology;
            projectModalTechs.appendChild(tag);
        });

        description.features.forEach(feature => {
            const item = document.createElement('li');
            item.textContent = feature;
            projectModalFeatures.appendChild(item);
        });

        projectModalLastFocus = document.activeElement;
        projectModal.classList.add('is-open');
        projectModal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('project-modal-open');
        projectModalCloseButton.focus();
    };

    const closeProjectModal = () => {
        if (!projectModal.classList.contains('is-open')) return;

        projectModal.classList.remove('is-open');
        projectModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('project-modal-open');

        if (projectModalLastFocus) {
            projectModalLastFocus.focus();
        }
    };

    projectModal.querySelectorAll('[data-project-modal-close]').forEach(control => {
        control.addEventListener('click', closeProjectModal);
    });

    document.addEventListener('keydown', (event) => {
        if (!projectModal.classList.contains('is-open')) return;

        if (event.key === 'Escape') {
            closeProjectModal();
            return;
        }

        if (event.key === 'Tab') {
            const focusableElements = Array.from(projectModal.querySelectorAll('button, a[href]'));
            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement.focus();
            } else if (!event.shiftKey && document.activeElement === lastElement) {
                event.preventDefault();
                firstElement.focus();
            }
        }
    });

    // Lógica do Carrossel de Projetos (Loop Infinito)
    const carouselContainer = document.querySelector('.carousel-container');
    
    if (carouselContainer) {
        const projectsGrid = carouselContainer.querySelector('.projects-carousel .projects-grid');
        const prevButton = carouselContainer.querySelector('.carousel-button.prev');
        const nextButton = carouselContainer.querySelector('.carousel-button.next');
        const projectCards = Array.from(projectsGrid.querySelectorAll('.project-card'));

        if (projectCards.length > 0) {
            projectCards.forEach(card => {
                const projectLink = card.querySelector('.project-link');
                const projectTitle = card.querySelector('h3').textContent.trim();
                const actions = document.createElement('div');
                const detailsButton = document.createElement('button');

                actions.className = 'project-actions';
                detailsButton.className = 'project-details-trigger';
                detailsButton.type = 'button';
                detailsButton.innerHTML = '<i class="fa-solid fa-circle-info" aria-hidden="true"></i> Ver detalhes';
                projectLink.setAttribute('aria-label', `Ver ${projectTitle} no GitHub`);
                projectLink.setAttribute('title', 'Ver código no GitHub');

                projectLink.before(actions);
                actions.append(detailsButton, projectLink);
            });

            const gap = 40; // O mesmo valor do gap no CSS
            
            // Clona os primeiros e últimos cards para criar o efeito infinito
            const createProjectClone = (card) => {
                const clone = card.cloneNode(true);

                clone.classList.add('project-card-clone');
                clone.setAttribute('aria-hidden', 'true');
                clone.querySelectorAll('a, button').forEach(control => control.setAttribute('tabindex', '-1'));
                return clone;
            };

            const firstCardsClone = projectCards.slice(0, 2).map(createProjectClone);
            const lastCardsClone = projectCards.slice(-2).map(createProjectClone);

            lastCardsClone.forEach(clone => projectsGrid.prepend(clone));
            firstCardsClone.forEach(clone => projectsGrid.append(clone));

            const allCards = projectsGrid.querySelectorAll('.project-card');

        projectsGrid.addEventListener('click', (event) => {
            if (event.target.closest('.project-link')) return;

            const selectedCard = event.target.closest('.project-card');
            if (selectedCard) {
                openProjectModal(selectedCard);
            }
        });

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
