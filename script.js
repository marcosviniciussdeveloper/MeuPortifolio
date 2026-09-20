document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('#theme-toggle');
    const themeToggleIcon = themeToggle?.querySelector('.theme-toggle-icon');

    const updateThemeToggle = () => {
        if (!themeToggle || !themeToggleIcon) return;

        const isLightTheme = document.documentElement.dataset.theme === 'light';
        const actionLabel = isLightTheme ? 'Ativar tema escuro' : 'Ativar tema claro';

        themeToggle.setAttribute('aria-label', actionLabel);
        themeToggle.setAttribute('title', actionLabel);
        themeToggleIcon.className = `fa-solid ${isLightTheme ? 'fa-moon' : 'fa-sun'} theme-toggle-icon`;
    };

    themeToggle?.addEventListener('click', () => {
        const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
        document.documentElement.dataset.theme = nextTheme;
        updateThemeToggle();

        try {
            localStorage.setItem('portfolio-theme', nextTheme);
        } catch {
            // O tema permanece funcional mesmo sem acesso ao armazenamento local.
        }
    });

    updateThemeToggle();

    const projectDetails = {
        'aws-s3': {
            title: 'AWS Private S3 Uplink API',
            description: 'Aplicação executada em uma EC2 privada para envio seguro de objetos ao Amazon S3, sem exposição direta por IP público. O acesso operacional é realizado pelo AWS Systems Manager e as permissões são controladas com IAM.',
            features: [
                'Infraestrutura privada em VPC com Security Groups',
                'Upload de objetos para Amazon S3 com permissões IAM',
                'Acesso e gerenciamento seguro via Systems Manager',
                'Aplicação conteinerizada com Docker',
                'Infraestrutura e entrega automatizadas com Terraform e GitHub Actions'
            ],
            github: 'https://github.com/marcosviniciussdeveloper/aws-private-s3-uplink'
        },
        'terraform-aws': {
            title: 'Automação de Infraestrutura AWS com Terraform',
            description: 'Projeto de Infrastructure as Code para provisionar recursos AWS de maneira padronizada, versionada e rastreável, com estado remoto no S3 e automação por GitHub Actions.',
            features: [
                'Provisionamento automatizado de recursos na AWS',
                'Infraestrutura declarativa e versionada com Terraform',
                'Remote state armazenado no Amazon S3',
                'Pipeline de CI/CD no GitHub Actions',
                'Fluxo repetível para criação e atualização de ambientes'
            ],
            github: 'https://github.com/marcosviniciussdeveloper/Automatic_Apllicattion'
        },
        'aws-network': {
            title: 'Arquitetura de Rede AWS com Terraform',
            description: 'Laboratório de Infrastructure as Code voltado à criação de uma base de rede na AWS, com endereçamento definido por CIDR e separação entre sub-redes pública e privada.',
            features: [
                'Provisionamento de uma VPC com DNS habilitado',
                'Definição de sub-redes pública e privada',
                'Endereçamento de rede configurado com blocos CIDR',
                'Instância EC2 provisionada na sub-rede pública',
                'Infraestrutura declarativa com Terraform'
            ],
            github: 'https://github.com/marcosviniciussdeveloper/aws-terraform-ec2-s3-architecture'
        }
    };

    const modal = document.querySelector('#project-modal');
    const modalTitle = document.querySelector('#project-modal-title');
    const modalDescription = document.querySelector('#project-modal-description');
    const modalFeatures = document.querySelector('#project-modal-features');
    const modalGithub = document.querySelector('#project-modal-github');
    const modalClose = modal?.querySelector('.project-modal-close');
    let lastFocusedElement = null;

    const closeModal = () => {
        if (!modal?.classList.contains('is-open')) return;

        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('project-modal-open');
        lastFocusedElement?.focus();
    };

    const openModal = (projectKey, trigger) => {
        const project = projectDetails[projectKey];
        if (!project || !modal || !modalTitle || !modalDescription || !modalFeatures || !modalGithub) return;

        modalTitle.textContent = project.title;
        modalDescription.textContent = project.description;
        modalFeatures.replaceChildren();

        project.features.forEach(feature => {
            const item = document.createElement('li');
            item.textContent = feature;
            modalFeatures.appendChild(item);
        });

        if (project.github) {
            modalGithub.href = project.github;
            modalGithub.hidden = false;
        } else {
            modalGithub.hidden = true;
            modalGithub.removeAttribute('href');
        }

        lastFocusedElement = trigger;
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('project-modal-open');
        modalClose?.focus();
    };

    document.querySelectorAll('.project-details-trigger').forEach(button => {
        button.addEventListener('click', () => {
            const card = button.closest('[data-project]');
            openModal(card?.dataset.project, button);
        });
    });

    modal?.querySelectorAll('[data-project-modal-close]').forEach(control => {
        control.addEventListener('click', closeModal);
    });

    document.addEventListener('keydown', event => {
        if (!modal?.classList.contains('is-open')) return;

        if (event.key === 'Escape') {
            closeModal();
            return;
        }

        if (event.key === 'Tab') {
            const focusable = Array.from(modal.querySelectorAll('button:not([hidden]), a[href]:not([hidden])'));
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });
});
