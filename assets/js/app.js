class aboutApp extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="window">
                <div class="window-control">
                    <h1>PlasmaOS About</h1>
                    <button>X</button>
                </div
                <div class="window-content">
                    <p>PlasmaOS is an OS concept built in the web with html and css. PlasmaOS is open source and made for Hackclub Flavortown project.</p>
                    <p>PlasmaOS V1<p>
                    <br>
                    <p><a href="https//github.com/alarixfr/plasmaOS" target="_blank">VIEW GITHUB REPO</a><p>
                <div>
            </div>
        `;
    }
}

customElements.define('about-app', aboutApp)