function ix_tiles () {
    ldb.tix = []
    var tiles = document.getElementsByClassName('tile')
    for (let i = 0; i < tiles.length; i++) {
        ldb.tix[i] = []
        var code = tiles[i].classList[1]
        var lookup = Country.filter(x => x.includes(code))[0]
        var cix = Country.indexOf(lookup)
        ldb.tix[i].push(cix)
        var str = Number(tiles[i].innerHTML)
        ldb.tix[i].push(str)
    }
}

function ix_t_code (c) {
    var lookup = Country.filter(x => x.includes(c))[0]
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