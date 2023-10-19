function th_init () {
    ldb.tilehistory = []
    var tiles = document.getElementsByClassName('tile')
    for (let i = 0; i < tiles.length; i++) {
        ldb.tilehistory[i] = []
    }
}

function th_populate () {
    var tiles = document.getElementsByClassName('tile')
    for (let i = 0; i < tiles.length; i++) {
        var code = tiles[i].classList[1]
        ix_t_code(code)
        if (cix.code == 'sea') {
            continue
        }
        var vals = [cix.ix,Number(tiles[i].innerHTML)]
        ldb.tilehistory[i].push(vals)
    }
}

function th_render (x) {
    var mainframe = document.getElementById('mainframe')
    th_remover ()

    var div = document.createElement('div')
    div.classList.add('th_box')
    mainframe.appendChild(div)
    var src = ldb.tilehistory[x]
    for (let i = 0; i < src.length; i++) {
        var val = src[i]
        //console.log(val)
        ix_country(val[0])
        var th_tile = document.createElement('div')
        th_tile.style.width = '100%'
        th_tile.style.height = 100 / src.length + '%'
        th_tile.style.float = 'left'
        th_tile.style.opacity = val[1] / 20 + 0.5
        th_tile.classList.add(cix.code)
        div.appendChild(th_tile)
    }
}

function th_maker () {
    var val = Number(wherefocus) - 1
    stoploop()
    th_render (val)
}

function th_remover () {
    var existing = document.querySelector('.th_box')
    if (existing !== null) {
        existing.remove()
    }
}