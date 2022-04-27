function gettiles() {
    ldb.tiles = []
    var tiles = document.getElementsByClassName('tile')
    for (let i = 0; i < tiles.length; i++) {
        var tileS = Number(tiles[i].innerHTML)
        var tileC = tiles[i].classList[1]
        var tilesV = [tileS,tileC]
        ldb.tiles.push(tilesV)
    }
}

function savegame (x) {
    gettiles ()
    var val = ldb.mycnt + '_' + Math.floor(ldb.year) + '_' + ldb.pow
    ldb.savename = val
    var saveslot = 'saveslot' + x
    localStorage[saveslot] = JSON.stringify(ldb)
    if (localStorage.saves == undefined) {
        var saves = []
        localStorage.saves = JSON.stringify(saves)
    }
    var saves = JSON.parse(localStorage.saves)
    var index = saves.indexOf(saveslot)
    console.log(index)
    if (index >= 0) {
        saves[index] = saveslot
    } else {
        saves.push(saveslot)
    }
    localStorage.saves = JSON.stringify(saves)
}

function loadgame (x) {
    ldb = JSON.parse(localStorage[x])
    var tiles = document.getElementsByClassName('tile')
    for (let i = 0; i < tiles.length; i++) { 
        var classRem = tiles[i].classList[1]
        tiles[i].classList.remove(classRem)
        tiles[i].classList.add(ldb.tiles[i][1])
        tiles[i].innerHTML = ldb.tiles[i][0]
    }
    opacityhandler ()
}

