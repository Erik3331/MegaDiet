document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const menu = document.querySelector('.menu');

    // Abre/fecha o menu ao clicar no botão de hambúrguer
    hamburger.addEventListener('click', function() {
        menu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Fecha o menu ao clicar fora do menu
    document.addEventListener('click', function(event) {
        if (!menu.contains(event.target) && !hamburger.contains(event.target) && menu.classList.contains('active')) {
            menu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });

    // Evita o fechamento do menu ao clicar dentro dele
    menu.addEventListener('click', function(event) {
        event.stopPropagation();
    });

    // Fecha o menu ao redimensionar a janela se o tamanho for maior que 768px
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            menu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
});
