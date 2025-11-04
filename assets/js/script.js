/**
 * script.js
 *
 * Este arquivo JavaScript contém todas as funcionalidades interativas
 * para o portfólio web, utilizando apenas Vanilla JavaScript (sem frameworks).
 *
 * Sumário das funcionalidades:
 * 1. Menu Hamburger (Mobile Navigation Toggle)
 * 2. Validação e Feedback do Formulário de Contato
 * 3. Animação de Barras de Habilidades ao Scroll
 * 4. Atualização Dinâmica do Ano no Footer
 * 5. Smooth Scroll para links de navegação internos
 * 6. Gerenciamento de Foco e Acessibilidade para Interações
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Menu Hamburger (Mobile Navigation Toggle)
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.main-nav ul');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', !isExpanded);
            navToggle.setAttribute('aria-label', !isExpanded ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
            
            // Foco no primeiro item do menu quando aberto, se necessário
            if (!isExpanded) {
                // Para uma melhor acessibilidade, pode-se focar no primeiro link do menu
                // ou apenas deixar o usuário navegar com a tecla Tab.
                // navMenu.querySelector('a')?.focus(); 
            }
        });

        // Fechar menu ao clicar em um link (apenas para mobile)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('nav-open')) {
                    navMenu.classList.remove('nav-open');
                    navToggle.setAttribute('aria-expanded', 'false');
                    navToggle.setAttribute('aria-label', 'Abrir menu de navegação');
                    navToggle.focus(); // Retorna o foco para o botão do menu
                }
            });
        });
    }


    // 2. Validação e Feedback do Formulário de Contato
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Impede o envio padrão do formulário

            // Validação HTML5 nativa
            if (!contactForm.checkValidity()) {
                formMessage.textContent = 'Por favor, preencha todos os campos obrigatórios corretamente.';
                formMessage.className = 'message error';
                // Para exibir mensagens de erro nativas ao lado dos campos
                contactForm.reportValidity();
                return;
            }

            // Simulação de envio (em um ambiente real, você faria uma requisição AJAX aqui)
            // Por exemplo, fetch('/api/send-email', { method: 'POST', body: new FormData(contactForm) })
            // .then(response => response.json())
            // .then(data => { ... })
            // .catch(error => { ... });

            // Simula um delay para o "envio"
            formMessage.textContent = 'Enviando...';
            formMessage.className = 'message loading';

            setTimeout(() => {
                const isSuccess = Math.random() > 0.1; // 90% de chance de sucesso para o protótipo

                if (isSuccess) {
                    formMessage.textContent = 'Mensagem enviada com sucesso! Em breve entrarei em contato.';
                    formMessage.className = 'message success';
                    contactForm.reset(); // Limpa o formulário
                } else {
                    formMessage.textContent = 'Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente mais tarde.';
                    formMessage.className = 'message error';
                }
                // Adiciona um aria-live para leitores de tela
                formMessage.setAttribute('aria-live', 'polite');
            }, 1500);
        });
    }


    // 3. Animação de Barras de Habilidades ao Scroll
    const skillBarsContainer = document.querySelector('.skills-grid'); // Ou o elemento pai das barras
    const skillBars = document.querySelectorAll('.skill-progress-bar span');

    if (skillBarsContainer && skillBars.length > 0) {
        const observerOptions = {
            root: null, // viewport como root
            rootMargin: '0px',
            threshold: 0.5 // Ação quando 50% do elemento está visível
        };

        const skillObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillBars.forEach(bar => {
                        const width = bar.dataset.progress; // Pega a largura do data-progress
                        if (width) {
                            bar.style.width = width;
                            bar.style.opacity = '1';
                        }
                    });
                    observer.unobserve(entry.target); // Para de observar depois de animar
                }
            });
        }, observerOptions);

        skillObserver.observe(skillBarsContainer);
    }


    // 4. Atualização Dinâmica do Ano no Footer
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }


    // 5. Smooth Scroll para links de navegação internos
    // Usa o comportamento nativo de smooth-scroll do CSS se suportado
    // Em navegadores antigos, ele fará o scroll instantâneo.
    // Para um polyfill completo, teríamos que adicionar mais código ou uma biblioteca externa.
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
                // Para acessibilidade, garantir que o foco seja movido para a seção
                targetElement.focus({ preventScroll: true }); 
                // Se a seção não for interativa, pode ser necessário adicionar tabindex="-1"
                // e um evento focus para garantir que leitores de tela a leiam.
                if (!targetElement.hasAttribute('tabindex')) {
                    targetElement.setAttribute('tabindex', '-1');
                }
            }
        });
    });

    // 6. Gerenciamento de Foco para elementos details/summary (acordeões)
    // Os elementos <details> e <summary> já possuem boa acessibilidade nativa.
    // Este bloco serve como um exemplo se customizações fossem necessárias.
    document.querySelectorAll('details').forEach(detailsElement => {
        detailsElement.addEventListener('toggle', () => {
            if (detailsElement.open) {
                // Quando o details é aberto, garantir que o conteúdo seja acessível via Tab
                // Ou, se for um acordeão customizado, focar no primeiro elemento interativo.
            }
        });
        // Garantir que summary é navegável por teclado e tem um papel adequado.
        // O browser já cuida disso para <summary>.
    });

    // 7. Acessibilidade Geral: Adicionar atributos ARIA onde apropriado
    // Este script já adiciona ARIA attributes para o nav-toggle e form-message.
    // Outros elementos semânticos HTML5 como <nav>, <header>, <main>, <footer>
    // já fornecem um bom nível de acessibilidade.

});