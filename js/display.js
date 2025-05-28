class Display {
    constructor() {
        this.clauLocalStorage = "ranking";
    }

    obtenirRanking() {
        const dades = localStorage.getItem(this.clauLocalStorage);
        return dades ? JSON.parse(dades) : [];
    }

    guardarRanking(ranking) {
        localStorage.setItem(this.clauLocalStorage, JSON.stringify(ranking));
    }

    setPuntuacio(nomjugador, puntuacio) {
        const ranking = this.obtenirRanking();

        ranking.push({ nomjugador, puntuacio });

        ranking.sort((a, b) => b.puntuacio - a.puntuacio);

        this.guardarRanking(ranking);
    }

    mostrarRanking() {
        const ranking = this.obtenirRanking();
        const table = document.getElementById("ranking");

        table.querySelectorAll("tr:not(:first-child)").forEach(tr => tr.remove());

        ranking.forEach(jugador => {
            const fila = document.createElement("tr");
            const nomTd = document.createElement("td");
            nomTd.textContent = jugador.nomjugador;
            const puntuacioTd = document.createElement("td");
            puntuacioTd.textContent = jugador.puntuacio;
            fila.appendChild(nomTd);
            fila.appendChild(puntuacioTd);
            table.appendChild(fila);
        });
    }

    reiniciarRanking() {
        localStorage.removeItem(this.clauLocalStorage);
    }
}
