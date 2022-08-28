export enum Tipo {
    x = "x",
    o = "o"
}

export class Grid {
    linha: number
    coluna: number
    celula: string
    elemento: HTMLElement
    disponivel: boolean
    tipo: Tipo

    constructor(e: HTMLElement) {
        this.elemento = e;
        this.celula = this.elemento.getAttribute('data-celula') as string
        this.linha = parseInt(this.celula.split("/")[0])
        this.coluna = parseInt(this.celula.split("/")[1])
        this.disponivel = !this.elemento.classList.contains("dead")

        if (!this.disponivel) this.tipo = this.elemento.classList.contains("x") ? Tipo.x : Tipo.o
    }

    setar(t: Tipo) {
        if (this.disponivel) {
            this.elemento.classList.add(t.toString())
            this.elemento.classList.add("dead")
        }
    }
}
