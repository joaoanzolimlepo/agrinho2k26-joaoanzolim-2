/**
 * Modo Escuro - AgroFuturo
 * Funcionalidade completa de inversão de cores com responsividade
 */

// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
   
    // ==================== ELEMENTOS ====================
    const botaoInversao = document.querySelector('.inversao');
    const body = document.body;
   
    // Verifica se o botão existe
    if (!botaoInversao) {
        console.error('Botão de inversão não encontrado!');
        return;
    }
   
    // ==================== FUNÇÕES ====================
   
    /**
     * Ativa o modo escuro
     */
    function ativarModoEscuro() {
        body.classList.add('modo-escuro');
        localStorage.setItem('modoEscuro', 'true');
        botaoInversao.innerHTML = '☀️ Modo Claro';
        botaoInversao.setAttribute('aria-label', 'Alternar para modo claro');
    }
   
    /**
     * Desativa o modo escuro
     */
    function desativarModoEscuro() {
        body.classList.remove('modo-escuro');
        localStorage.setItem('modoEscuro', 'false');
        botaoInversao.innerHTML = '🌙 Modo Escuro';
        botaoInversao.setAttribute('aria-label', 'Alternar para modo escuro');
    }
   
    /**
     * Alterna entre os modos
     */
    function alternarModo() {
        if (body.classList.contains('modo-escuro')) {
            desativarModoEscuro();
        } else {
            ativarModoEscuro();
        }
    }
   
    // ==================== INICIALIZAÇÃO ====================
   
    // Verifica preferência salva no localStorage
    const modoEscuroSalvo = localStorage.getItem('modoEscuro');
   
    if (modoEscuroSalvo === 'true') {
        ativarModoEscuro();
    } else if (modoEscuroSalvo === 'false') {
        desativarModoEscuro();
    } else {
        // Verifica preferência do sistema operacional
        const prefereDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefereDark) {
            ativarModoEscuro();
        }
    }
   
    // ==================== EVENTOS ====================
   
    // Clique no botão
    botaoInversao.addEventListener('click', alternarModo);
   
    // Detecta mudanças no tema do sistema
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeMediaQuery.addEventListener('change', function(e) {
        // Só aplica se não houver preferência manual salva
        if (localStorage.getItem('modoEscuro') === null) {
            if (e.matches) {
                ativarModoEscuro();
            } else {
                desativarModoEscuro();
            }
        }
    });
   
    // ==================== RESPONSIVIDADE ====================
   
    /**
     * Ajusta elementos para responsividade no modo escuro
     */
    function ajustarResponsividade() {
        const imagens = document.querySelectorAll('.img-problema');
        imagens.forEach(img => {
            if (body.classList.contains('modo-escuro')) {
                img.style.opacity = '0.95';
            } else {
                img.style.opacity = '1';
            }
        });
    }
   
    // Observa mudanças no tema para ajustar responsividade
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'class') {
                ajustarResponsividade();
            }
        });
    });
   
    observer.observe(body, { attributes: true });
    ajustarResponsividade();
});