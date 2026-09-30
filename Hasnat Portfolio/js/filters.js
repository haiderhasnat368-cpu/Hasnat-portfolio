/* =====================================================
   PROJECT FILTER SYSTEM
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const buttons =
            document.querySelectorAll(
                ".filter-btn"
            );


        buttons.forEach(button => {

            button.addEventListener(
                "click",
                () => {

                    const filter =
                        button.dataset.filter;


                    /* Active button */

                    buttons.forEach(btn => {

                        btn.classList.remove(
                            "active"
                        );

                    });


                    button.classList.add(
                        "active"
                    );


                    /* Render selected category */

                    if (
                        typeof renderProjects ===
                        "function"
                    ) {

                        renderProjects(filter);

                    }

                }
            );

        });

    }
);