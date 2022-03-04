console.clear()

var south = 41
var north = -41
var west = -1
var east = 1
var mainframe = document.getElementById('mainframe')
var wherefocus = ''
var maptiles = {}
var tilegather = []

function rendermap () {
    var x = 1
    var y = 1
    var id = 1
    for (let i = 0; i < (50*45); i++) {
        var but = document.createElement('div')
        but.classList.add('fieldbut')
        but.id = id
        maptiles[but.id] = {}
        maptiles[but.id].type = 'Land'
        but.innerHTML = ''
        but.tabIndex = -1
        but.onfocus = (x) => {
            x = but
            var dest = document.getElementById('infobox')
            dest.innerHTML = ''
            dest.innerHTML += 'Id: ' + event.target.id + '<br>'
            dest.innerHTML += 'Value: ' + event.target.innerHTML + '<br>'
            wherefocus = event.target.id
        }
        but.onclick = () => {
            event.target.focus()
        }
        mainframe.appendChild(but)
        id++
    }
}

function rendermenu () {
    var div = document.createElement('div')
    div.classList.add('menu')
    div.id = 'menu'
    mainframe.appendChild(div)
}

function rendermapframe () {
    var mapframe = document.createElement('div')
    mapframe.classList.add('mapframe')
    mapframe.id = 'mapframe'
    mainframe.appendChild(mapframe)
}

function renderinfobox () {
    var infobox = document.createElement('div')
    infobox.classList.add('infobox')
    infobox.id = 'infobox'
    document.getElementById('menu').appendChild(infobox)
}

function rendermapimg () {
    var image = document.createElement('img')
    image.src = 'map.jpg'
    image.classList.add('mapimage')
    mainframe.appendChild(image)
}

function populatemap () {
    for (let i = 0; i < Tiles.length; i++) {
        var tile = document.createElement('div')
        tile.id = Tiles[i].id
        tile.classList.value = Tiles[i].value
        tile.innerHTML = 0
        tile.onfocus = () => {
            wherefocus = event.target.id.split('d')[1]
            showinfo (wherefocus)
        }
        tile.tabIndex = -1
        document.getElementById('mapframe').appendChild(tile)
    }
}

function showinfo (t) {
    var infobox = document.getElementById('infobox')
    var tiletoshow = document.getElementById('field' + wherefocus)
    infobox.innerHTML = ''
    infobox.innerHTML += 'Field ' + wherefocus + '<br>'
    var who
    if (tiletoshow.classList[1] == 'sea') {
        who = 'noone (sea)'
    } else (
        who = Country.filter(x => x.includes(tiletoshow.classList[1]))[0].split(' ')[0]
    )
    infobox.innerHTML += 'Belongs to ' + who + '<br>'
    infobox.innerHTML += 'Power is ' + tiletoshow.innerHTML
}

function opacityhandler () {
    var tiles = document.getElementsByClassName('tile')
    for (let i = 0; i < tiles.length; i++) {
        var opa = (Number(tiles[i].innerHTML)) * 0.05 + 0.55
        tiles[i].style.opacity = opa
    }
}

function removeflash () {
    var removelast = document.getElementsByClassName('neighfocus')
    for (let i = 0; i < removelast.length; i++) {
        removelast[i].classList.remove('neighfocus')
        i--
    }
}

function addflash () {
    for (let i = 0; i < Neigh.length; i++) {
        if (Neigh[i].classList[1] == 'sea') {continue}
        Neigh[i].classList.add('neighfocus')
    }
}

function rendercapitals () {
    for (let i = 0; i < Country.length; i++) {
        var code = Country[i].split(' ')[1]
        var terits = document.getElementsByClassName(code)
        var rand = Math.floor(Math.random() * terits.length)
        terits[rand].innerHTML = 9
    }
}

function distributepower () {
    for (let i = 0; i < Country.length; i++) {
        var who = Country[i].split(' ')[1]
        var power = Country[i].split(' ')[2]
        for (let x = 0; x < (power * 2); x++) {
            var ters = document.getElementsByClassName(who)
            var rand = Math.floor(Math.random() * ters.length)
            var cur = Number(ters[rand].innerHTML)
            cur++
            if (cur > 9) {cur = 9}
            ters[rand].innerHTML = cur
        }
    }
    opacityhandler ()
}

function renderteritoryranking () {
    var existing = document.querySelector('.popup')
    if (existing !== null) {
        existing.remove()
    }
    var div = document.createElement('div')
    div.classList.add('popup')
    mainframe.appendChild(div)
    var exit = document.createElement('div')
    exit.innerHTML = "X"
    exit.classList.add('exitbut')
    exit.onclick = () => {
        event.target.parentElement.remove()
    }
    div.appendChild(exit)
    var title = document.createElement('h1')
    title.innerHTML = "Teritory Ranking"
    div.appendChild(title)
    var table = []
    for (let i = 0; i < Country.length; i++) {
        var code = Country[i].split(' ')[1]
        var name = Country[i].split(' ')[0]
        var number = document.getElementsByClassName(code).length
        table[i] = []
        table[i][0] = number
        table[i][1] = name
    }
    table = table.sort((a,b) => {return b[0] - a[0]})
    for (let i = 0; i < table.length; i++) {
        var pos = document.createElement('h2')
        if (table[i][1] == ldb.mycnt[0]) {
            pos.classList.add('my')
        }
        pos.innerHTML = (i + 1) +' : ' + table[i][1] + ' - ' + table[i][0]
        div.appendChild(pos)
    }    
}

function renderpowerranking () {
    var existing = document.querySelector('.popup')
    if (existing !== null) {
        existing.remove()
    }
    var div = document.createElement('div')
    div.classList.add('popup')
    mainframe.appendChild(div)
    var exit = document.createElement('div')
    exit.innerHTML = "X"
    exit.classList.add('exitbut')
    exit.onclick = () => {
        event.target.parentElement.remove()
    }
    div.appendChild(exit)
    var title = document.createElement('h1')
    title.innerHTML = "Power Ranking"
    div.appendChild(title)
    var table = []
    for (let i = 0; i < Country.length; i++) {
        var code = Country[i].split(' ')[1]
        var name = Country[i].split(' ')[0]
        var terits = document.getElementsByClassName(code)
        table[i] = []
        table[i][0] = 0
        for (let x = 0; x < terits.length; x++) {
            table[i][0] += Number(terits[x].innerHTML)
        }
        table[i][1] = name
    }
    table = table.sort((a,b) => {return b[0] - a[0]})
    for (let i = 0; i < table.length; i++) {
        var pos = document.createElement('h2')
        if (table[i][1] == ldb.mycnt[0]) {
            pos.classList.add('my')
        }
        pos.innerHTML = (i + 1) +' : ' + table[i][1] + ' - ' + table[i][0]
        div.appendChild(pos)
    }    
}

function rendermenubuttons () {
    var but_tr = document.createElement('button')
    but_tr.innerHTML = 'Teritory Ranking (1)'
    but_tr.onclick = () => {renderteritoryranking ()}
    document.getElementById('menu').appendChild(but_tr)
    var but_pr = document.createElement('button')
    but_pr.innerHTML = 'Power Ranking (2)'
    but_pr.onclick = () => {renderpowerranking ()}
    document.getElementById('menu').appendChild(but_pr)
}

ldb = {}
ldb.mycnt = Country[0].split(' ')
rendermenu ()
renderinfobox ()
rendermenubuttons ()
rendermapframe ()
rendermap ()
populatemap ()
rendercapitals ()
opacityhandler ()
distributepower ()
renderpowerranking ()