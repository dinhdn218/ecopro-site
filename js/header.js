// JavaScript spécifique pour la fonctionnalité de l'en-tête

document.addEventListener('DOMContentLoaded', function() {
    // Variables
    const header = document.getElementById('header');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    // Fonction pour rendre l'en-tête sticky lors du défilement
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });
    
    // Fonction pour le menu mobile
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
            
            // Accessibilité - Changer l'attribut aria-expanded
            const expanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !expanded);
        });
    }
    
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
    
    // Fermer le menu mobile lors du clic en dehors
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!e.target.closest('.main-nav') && !e.target.closest('.mobile-menu-toggle') && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                if (mobileMenuToggle) {
                    mobileMenuToggle.classList.remove('active');
                    mobileMenuToggle.setAttribute('aria-expanded', 'false');
                }
            }
        }
    });
    
    // Mettre à jour la classe active dans la navigation en fonction de la section visible
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section');
        const scrollPosition = window.pageYOffset + 150; // Offset pour tenir compte de l'en-tête
        
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
    
    // Mettre à jour la navigation active lors du défilement
    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initialiser l'état actif au chargement
    updateActiveNavLink();
    
    // Smooth scroll pour les liens d'ancrage
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Ajouter des attributs d'accessibilité
    if (mobileMenuToggle) {
        mobileMenuToggle.setAttribute('aria-expanded', 'false');
        mobileMenuToggle.setAttribute('aria-label', 'Menu de navigation');
    }
    
    // Gestion des sous-menus (si ajoutés ultérieurement)
    const hasSubmenu = document.querySelectorAll('.has-submenu');
    
    hasSubmenu.forEach(item => {
        const submenuToggle = item.querySelector('.submenu-toggle');
        const submenu = item.querySelector('.submenu');
        
        if (submenuToggle && submenu) {
            submenuToggle.setAttribute('aria-expanded', 'false');
            
            submenuToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const expanded = this.getAttribute('aria-expanded') === 'true' || false;
                this.setAttribute('aria-expanded', !expanded);
                
                submenu.classList.toggle('active');
            });
        }
    });
    
    // Ajuster la hauteur du padding-top du body en fonction de la hauteur de l'en-tête
    function adjustBodyPadding() {
        const headerHeight = header.offsetHeight;
        document.body.style.paddingTop = headerHeight + 'px';
    }
    
    // Ajuster le padding au chargement et au redimensionnement
    window.addEventListener('load', adjustBodyPadding);
    window.addEventListener('resize', adjustBodyPadding);
});
