// JavaScript pour EcoPro Nettoyage Paris

document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const backToTopButton = document.getElementById('backToTop');
    const header = document.getElementById('header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const faqItems = document.querySelectorAll('.faq-item');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    // Fonction pour afficher/masquer le bouton "retour en haut"
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
        
        // Header sticky avec classe réduite
        if (window.pageYOffset > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // Fonction pour le menu mobile
    mobileMenuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('active');
        this.classList.toggle('active');
    });
    
    // Fermer le menu mobile lors du clic sur un lien
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mainNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
    
    // Gestion des FAQ (accordéon)
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
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
    });
    
    // Smooth scroll pour les liens d'ancrage
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
        });
    });
    
    // Gestion du formulaire de contact
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
    
    // Animations au défilement
    const animateElements = document.querySelectorAll('.animate');
    
    function checkIfInView() {
        const windowHeight = window.innerHeight;
        const windowTopPosition = window.pageYOffset;
        const windowBottomPosition = windowTopPosition + windowHeight;
        
        animateElements.forEach(element => {
            const elementHeight = element.offsetHeight;
            const elementTopPosition = element.offsetTop;
            const elementBottomPosition = elementTopPosition + elementHeight;
            
            // Vérifier si l'élément est visible
            if (
                (elementBottomPosition >= windowTopPosition) &&
                (elementTopPosition <= windowBottomPosition)
            ) {
                element.classList.add('visible');
            }
        });
    }
    
    // Vérifier les animations au chargement et au défilement
    window.addEventListener('load', checkIfInView);
    window.addEventListener('scroll', checkIfInView);
    
    // Ajouter des classes d'animation aux sections
    document.querySelectorAll('section').forEach((section, index) => {
        section.classList.add('animate');
        section.classList.add(`delay-${index % 4 + 1}`);
    });
    
    // Navigation active en fonction de la section visible
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {
                document.querySelectorAll('.main-nav a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // Initialiser l'état actif du menu au chargement
    setActiveNavLink();
});
