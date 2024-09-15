function toggleMenu() {
    const menu = document.getElementById('nav-menu');
    const header = document.querySelector('header');
    menu.classList.toggle('menu-open');
    header.classList.toggle('menu-open');
}
