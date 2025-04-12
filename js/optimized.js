// JavaScript optimisé pour les performances

// Fonction pour charger les ressources de manière différée
function loadDeferredResources() {
    // Chargement différé des images
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.classList.add('loaded');
        });
    }
    
    // Chargement différé des scripts non critiques
    const deferScripts = document.querySelectorAll('script[data-defer]');
    deferScripts.forEach(script => {
        const newScript = document.createElement('script');
        Array.from(script.attributes).forEach(attr => {
            if (attr.name !== 'data-defer') {
                newScript.setAttribute(attr.name, attr.value);
            }
        });
        newScript.innerHTML = script.innerHTML;
        script.parentNode.replaceChild(newScript, script);
    });
}

// Fonction pour optimiser les animations
function optimizeAnimations() {
    const animatedElements = document.querySelectorAll('.animate');
    
    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    // Désinscrire après l'animation pour économiser des ressources
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        animatedElements.forEach(element => {
            animationObserver.observe(element);
        });
    } else {
        // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
        animatedElements.forEach(element => {
            element.classList.add('visible');
        });
    }
}

// Fonction pour optimiser les événements de défilement
function optimizeScrollEvents() {
    let ticking = false;
    
    function onScroll() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                // Mettre à jour les éléments basés sur le défilement
                updateHeaderOnScroll();
                updateActiveNavLink();
                showBackToTopButton();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll, { passive: true });
}

// Fonction pour mettre à jour l'en-tête lors du défilement
function updateHeaderOnScroll() {
    const header = document.getElementById('header');
    if (header) {
        if (window.pageYOffset > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    }
}

// Fonction pour mettre à jour le lien de navigation actif
function updateActiveNavLink() {
    const navLinks = document.querySelectorAll('.main-nav a');
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Fonction pour afficher/masquer le bouton "retour en haut"
function showBackToTopButton() {
    const backToTopButton = document.getElementById('backToTop');
    if (backToTopButton) {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    }
}

// Fonction pour initialiser le menu mobile
function initMobileMenu() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
            
            // Accessibilité
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
        });
        
        // Fermer le menu mobile lors du clic sur un lien
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    mainNav.classList.remove('active');
                    if (mobileMenuToggle) {
                        mobileMenuToggle.classList.remove('active');
                        mobileMenuToggle.setAttribute('aria-expanded', 'false');
                    }
                }
            });
        });
    }
}

// Fonction pour initialiser le défilement fluide
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Fonction pour initialiser l'accordéon FAQ
function initFaqAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                // Fermer tous les autres items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
                
                // Basculer l'état actif de l'item cliqué
                item.classList.toggle('active');
            });
        }
    });
}

// Fonction pour initialiser le formulaire de contact
function initContactForm() {
    const contactForm = document.getElementById('devisForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simuler l'envoi du formulaire
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            submitButton.disabled = true;
            submitButton.textContent = 'Envoi en cours...';
            
            // Simuler un délai d'envoi
            setTimeout(function() {
                // Réinitialiser le formulaire
                contactForm.reset();
                
                // Afficher un message de confirmation
                const formMessage = document.createElement('div');
                formMessage.className = 'form-message success';
                formMessage.textContent = 'Votre demande a été envoyée avec succès ! Nous vous contacterons dans les plus brefs délais.';
                
                contactForm.appendChild(formMessage);
                
                // Restaurer le bouton
                submitButton.disabled = false;
                submitButton.textContent = originalText;
                
                // Supprimer le message après 5 secondes
                setTimeout(function() {
                    formMessage.remove();
                }, 5000);
            }, 1500);
        });
    }
}

// Fonction principale d'initialisation
function init() {
    // Détecter si JavaScript est activé
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');
    
    // Initialiser les fonctionnalités
    initMobileMenu();
    initSmoothScroll();
    initFaqAccordion();
    initContactForm();
    
    // Optimiser les performances
    optimizeScrollEvents();
    optimizeAnimations();
    
    // Charger les ressources différées après le chargement initial
    if (document.readyState === 'complete') {
        loadDeferredResources();
    } else {
        window.addEventListener('load', loadDeferredResources);
    }
    
    // Ajuster le padding du body en fonction de la hauteur de l'en-tête
    function adjustBodyPadding() {
        const headerHeight = document.getElementById('header').offsetHeight;
        document.body.style.paddingTop = headerHeight + 'px';
    }
    
    // Ajuster le padding au chargement et au redimensionnement
    window.addEventListener('load', adjustBodyPadding);
    window.addEventListener('resize', adjustBodyPadding);
}

// Initialiser lorsque le DOM est prêt
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
