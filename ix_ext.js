function ix_tiles () {
    ldb.tix = []
    var tiles = document.getElementsByClassName('tile')
    for (let i = 0; i < tiles.length; i++) {
        ldb.tix[i] = []
        var code = tiles[i].classList[1]
        var lookup = Country.filter(x => x.includes(' ' + code))[0]
        var cix = Country.indexOf(lookup)
        ldb.tix[i].push(cix)
        var str = Number(tiles[i].innerHTML)
        ldb.tix[i].push(str)
        var val = tiles[i].value
        ldb.tix[i].push(val)
        var isowned = tiles[i].isOwned
        ldb.tix[i].push(isowned)
    }
}

function ix_t_tile(x) {
    var tile = document.getElementById(x)
    var code = tile.classList[1]
    ix_t_code(code)
}

function ix_t_code (c) {
    var lookup = Country.filter(x => x.includes(' ' + c))[0]
    var index = Country.indexOf(lookup)
    if (index == -1) {
        return
    }
    ix_country(index)   
}

function ix_country (n) {
    cix = {}
    var source = Country[n].split(' ')
    cix.name = source[0]
    cix.code = source[1]
    cix.initstr = source[2]
    cix.ix = n
}
function ix_gatherfacts (x) {
    cfx = {}
    console.log(x)
    var tiles = document.getElementsByClassName(x.code)
    cfx.tiles = tiles.length
    cfx.economy = 0
    cfx.safety = 0
    for (let i = 0; i < tiles.length; i++) {
        cfx.economy += Number(tiles[i].innerHTML)
        cfx.safety += tiles[i].value
    }
    cfx.safetyrate = Math.floor((cfx.safety/10) / cfx.tiles * 10000)/100
    cfx.economyrate = Math.floor((cfx.economy/9) / cfx.tiles * 10000)/100
    
    console.log(cfx)

}

function ix_rendertiles () {
    var src = ldb.tix
    var tiles = document.getElementsByClassName('tile')
    for (let i = 0; i < tiles.length; i++) {
        ix_country(src[i][0]) 
        tiles[i].className = 'tile ' + cix.code
        tiles[i].innerHTML = src[i][1]
        tiles[i].value = src[i][2]
        tiles[i].isOwned = src[i][3]
    }
}