
function getneigh (c) {
    Neigh = []
    var tiles = document.getElementsByClassName(c)
    for (let i = 0; i < tiles.length; i++) {
        var id = Number(tiles[i].id.split('d')[1])
        var idS = id + south
        var idN = id + north
        var idW = id + west
        var idE = id + east
        if (idN < 1) {idN = 1}
        var S = document.getElementById('field' + idS)
        if ((S.classList[1] !== c) && (S.classList[1] !== 'sea')) {Neigh.push(S)}
        var N = document.getElementById('field' + idN)
        if ((N.classList[1] !== c) && (N.classList[1] !== 'sea')) {Neigh.push(N)}
        var W = document.getElementById('field' + idW)
        if ((W.classList[1] !== c) && (W.classList[1] !== 'sea')) {Neigh.push(W)}
        var E = document.getElementById('field' + idE)
        if ((E.classList[1] !== c) && (E.classList[1] !== 'sea')) {Neigh.push(E)}
    }
}

function getpower (c) {
    var ters = document.getElementsByClassName(c)
    Power = 0
    for (let i = 0; i < ters.length; i++) {
        Power += Number(ters[i].innerHTML)
    }
    Power = Math.floor(Power/9)
    if (Power < 1) {Power = 1}
    if (Power > 90) {Power = 90}
    console.log(c + ' has power of ' + Power)
}