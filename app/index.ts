import { Grid, Tipo } from "./grid.js";

const Grids = Array.from(document.querySelectorAll('.game div'))

Grids.forEach(grid => {
    grid.addEventListener('click', acao)
    grid.addEventListener('mouseenter', inicioHover)
    grid.addEventListener('mouseleave', fimHover)
})

let tipoAnterior: Tipo = Tipo.x
let tipoAtual : Tipo = Tipo.o

function inicioHover(e: PointerEvent) {
    const elemento = e.target as HTMLElement
    let grid = new Grid(elemento)
    grid.elemento.classList.add(tipoAtual.toString() + "-hover")
}   

function fimHover(e: PointerEvent) {
    const elemento = e.target as HTMLElement
    let grid = new Grid(elemento)
    grid.elemento.classList.remove("x-hover")
    grid.elemento.classList.remove("o-hover")
}

function acao(e: PointerEvent) {
    const elemento = e.target as HTMLElement
    let grid = new Grid(elemento)

    if (tipoAnterior == Tipo.x) {
        grid.setar(Tipo.o)
        tipoAnterior = Tipo.o
        tipoAtual = Tipo.x
    } else {
        grid.setar(Tipo.x)
        tipoAnterior = Tipo.x
        tipoAtual = Tipo.o
    }

    verifica()
}

function verifica() {
    const tipos = ["x", "o"]
    const grids = Grids.map(g => new Grid(g as HTMLElement))

    tipos.forEach(tipo => {
        for (let linha = 1; linha <= 3; linha++) {
            const linhaAtual = grids.filter(g => g.linha == linha)

            if (linhaAtual[0].tipo == tipo && linhaAtual[1].tipo == tipo && linhaAtual[2].tipo == tipo) {
                ganhou(tipo)
                return
            }
        }

        for (let coluna = 1; coluna <= 3; coluna++) {
            const colunaAtual = grids.filter(g => g.coluna == coluna)

            if (colunaAtual[0].tipo == tipo && colunaAtual[1].tipo == tipo && colunaAtual[2].tipo == tipo) {
                ganhou(tipo)
                return
            }
        }

        if (grids.filter(g => g.tipo == tipo && (
            (g.coluna == 1 && g.linha == 1) ||
            (g.coluna == 2 && g.linha == 2) ||
            (g.coluna == 3 && g.linha == 3))).length == 3) {
            ganhou(tipo as Tipo)
            return
        }

        if (grids.filter(g => g.tipo == tipo && (
            (g.coluna == 3 && g.linha == 1) ||
            (g.coluna == 2 && g.linha == 2) ||
            (g.coluna == 1 && g.linha == 3))).length == 3) {
            ganhou(tipo as Tipo)
            return
        }
    })

    if (Grids.filter(g => g.classList.contains('dead')).length == 9) {
        gameOver()
        return
    }
}

function gameOver() {
    alert("Velha")
    iniciar()
}

function ganhou(vencedor: Tipo) {
    alert("Vencedor " + vencedor.toString())
    iniciar()
}

function iniciar() {
    Grids.forEach(f => f.classList.remove("o"))
    Grids.forEach(f => f.classList.remove("x"))
    Grids.forEach(f => f.classList.remove("dead"))
}

iniciar()