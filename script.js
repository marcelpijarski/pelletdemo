document.addEventListener('DOMContentLoaded', () => {
    const nawigacja = document.getElementById('nawigacja');
    const menuMobilne = document.getElementById('menuMobilne');
    const menuNawigacji = document.getElementById('menuNawigacji');
    const linkiNawigacji = document.querySelectorAll('.link-nawigacji');
    const elementyAnimowane = document.querySelectorAll('.animacja');
    const pytania = document.querySelectorAll('.pytanie');

    const aktualizujNawigacje = () => {
        nawigacja.classList.toggle('przewinieta', window.scrollY > 40);
    };

    const zamknijMenu = () => {
        menuMobilne.classList.remove('otwarte');
        menuNawigacji.classList.remove('otwarte');
    };

    window.addEventListener('scroll', aktualizujNawigacje, { passive: true });
    aktualizujNawigacje();

    menuMobilne.addEventListener('click', () => {
        menuMobilne.classList.toggle('otwarte');
        menuNawigacji.classList.toggle('otwarte');
    });

    linkiNawigacji.forEach(link => {
        link.addEventListener('click', zamknijMenu);
    });

    if ('IntersectionObserver' in window && elementyAnimowane.length) {
        elementyAnimowane.forEach(element => {
            const pozycja = element.getBoundingClientRect();

            if (pozycja.top < window.innerHeight * .92) {
                element.classList.add('widoczna');
            }
        });

        const obserwator = new IntersectionObserver(wpisy => {
            wpisy.forEach(wpis => {
                if (!wpis.isIntersecting) {
                    return;
                }

                wpis.target.classList.add('widoczna');
                obserwator.unobserve(wpis.target);
            });
        }, {
            threshold: .14,
            rootMargin: '0px 0px -40px 0px'
        });

        elementyAnimowane.forEach(element => obserwator.observe(element));
        document.documentElement.classList.add('animacje-aktywne');
    }

    pytania.forEach(pytanie => {
        const przycisk = pytanie.querySelector('.pytanie-przycisk');
        const odpowiedz = pytanie.querySelector('.pytanie-odpowiedz');

        przycisk.addEventListener('click', () => {
            const byloOtwarte = pytanie.classList.contains('aktywne');

            pytania.forEach(innePytanie => {
                innePytanie.classList.remove('aktywne');
                innePytanie.querySelector('.pytanie-odpowiedz').style.maxHeight = null;
            });

            if (!byloOtwarte) {
                pytanie.classList.add('aktywne');
                odpowiedz.style.maxHeight = `${odpowiedz.scrollHeight}px`;
            }
        });
    });
});