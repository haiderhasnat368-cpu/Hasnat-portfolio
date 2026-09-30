/* =====================================================
   PREMIUM ANIMATIONS
===================================================== */


/* =====================================================
   SCROLL REVEAL
===================================================== */

function setupRevealAnimation() {

    const elements =
        document.querySelectorAll(
            ".reveal"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: .12
            }
        );


    elements.forEach(
        element =>
            observer.observe(element)
    );

}


/* =====================================================
   NUMBER COUNTERS
===================================================== */

function setupCounters() {

    const counters =
        document.querySelectorAll(
            "[data-count]"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (
                        !entry.isIntersecting
                    ) return;


                    const counter =
                        entry.target;


                    const target =
                        Number(
                            counter.dataset.count
                        );


                    let current = 0;


                    const duration = 1200;


                    const start =
                        performance.now();


                    function update(time) {

                        const progress =
                            Math.min(
                                (time - start) /
                                duration,
                                1
                            );


                        const ease =
                            1 -
                            Math.pow(
                                1 - progress,
                                3
                            );


                        current =
                            Math.floor(
                                target * ease
                            );


                        counter.textContent =
                            current;


                        if (
                            progress < 1
                        ) {

                            requestAnimationFrame(
                                update
                            );

                        } else {

                            counter.textContent =
                                target;

                        }

                    }


                    requestAnimationFrame(
                        update
                    );


                    observer.unobserve(
                        counter
                    );

                });

            },
            {
                threshold: .5
            }
        );


    counters.forEach(
        counter =>
            observer.observe(counter)
    );

}


/* =====================================================
   CARD TILT
===================================================== */

function setupCardTilt() {

    if (
        window.matchMedia(
            "(max-width: 800px)"
        ).matches
    ) return;


    const cards =
        document.querySelectorAll(
            ".skill-card, .stat-card"
        );


    cards.forEach(card => {

        card.addEventListener(
            "mousemove",
            event => {

                const rect =
                    card.getBoundingClientRect();


                const x =
                    event.clientX -
                    rect.left;


                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;


                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                    centerY) * -3;


                const rotateY =
                    ((x - centerX) /
                    centerX) * 3;


                card.style.transform =
                    `
                    perspective(800px)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    translateY(-5px)
                    `;

            }
        );


        card.addEventListener(
            "mouseleave",
            () => {

                card.style.transform =
                    "";

            }
        );

    });

}


/* =====================================================
   MOUSE CURSOR GLOW
===================================================== */

function setupCursorGlow() {

    const glow =
        document.querySelector(
            ".cursor-glow"
        );


    if (!glow) return;


    window.addEventListener(
        "mousemove",
        event => {

            glow.style.left =
                `${event.clientX}px`;


            glow.style.top =
                `${event.clientY}px`;

        }
    );

}


/* =====================================================
   START
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        setupRevealAnimation();

        setupCounters();

        setupCardTilt();

        setupCursorGlow();

    }
);