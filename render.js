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
    infobox.innerHTML += 'Power is ' + tiletoshow.innerHTML + '<br>'
    var ally = document.createElement('p')
    ally.innerHTML = "Click here or press A to show allies"
    ally.onclick = () => {
        renderallies(tiletoshow.classList[1])
    }
    infobox.appendChild(ally)
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
        if (number == 0) {continue}
        table[i] = []
        table[i][0] = number
        table[i][1] = name
    }
    table = table.sort((a,b) => {return b[0] - a[0]})
    for (let i = 0; i < table.length; i++) {
        var pos = document.createElement('h2')
        if (table[i][0] == 0) {continue}
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
        if (terits.length == 0) {continue}
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
        if (table[i][0] == 0) {continue}
        if (table[i][1] == ldb.mycnt[0]) {
            pos.classList.add('my')
        }
        pos.innerHTML = (i + 1) +' : ' + table[i][1] + ' - ' + table[i][0]
        div.appendChild(pos)
    }    
}

function renderpowerperteritory () {
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
    title.innerHTML = "Power per Teritory Ranking"
    div.appendChild(title)
    var table = []
    for (let i = 0; i < Country.length; i++) {
        var code = Country[i].split(' ')[1]
        var name = Country[i].split(' ')[0]
        var terits = document.getElementsByClassName(code)
        if (terits.length == 0) {continue}
        table[i] = []
        table[i][0] = 0
        for (let x = 0; x < terits.length; x++) {
            table[i][0] += Number(terits[x].innerHTML)
        }
        table[i][1] = name
        table[i][0] = Math.floor((table[i][0] + terits.length) / 2)
    }
    table = table.sort((a,b) => {return b[0] - a[0]})
    for (let i = 0; i < table.length; i++) {
        var pos = document.createElement('h2')
        if (table[i][0] == 0) {continue}
        if (table[i][1] == ldb.mycnt[0]) {
            pos.classList.add('my')
        }
        pos.innerHTML = (i + 1) +' : ' + table[i][1] + ' - ' + table[i][0]
        div.appendChild(pos)
    }    
}

function rendermenubuttons () {
    var menu = document.getElementById('menu')
    var but_tr = document.createElement('button')
    but_tr.innerHTML = 'Teritory Ranking (1)'
    but_tr.onclick = () => {renderteritoryranking ()}
    menu.appendChild(but_tr)
    var but_pr = document.createElement('button')
    but_pr.innerHTML = 'Power Ranking (2)'
    but_pr.onclick = () => {renderpowerranking ()}
    menu.appendChild(but_pr)
    var but_pt = document.createElement('button')
    but_pt.innerHTML = 'PPT Ranking (3)'
    but_pt.onclick = () => {renderpowerperteritory ()}
    menu.appendChild(but_pt)
    var but_sc = document.createElement('button')
    but_sc.innerHTML = 'Show Country (4)'
    but_sc.onclick = () => (rendercountryinfo ())
    menu.appendChild(but_sc)
    var but_rt = document.createElement('button')
    but_rt.id = 'runturn'
    but_rt.innerHTML = 'Run Turn (R)'
    but_rt.onclick = () => {round()}
    menu.appendChild(but_rt)
    but_tt = document.createElement('button')
    but_tt.innerHTML = "Take turn (Space)"
    but_tt.id = 'taketurn'
    but_tt.style.display = 'none'
    menu.appendChild(but_tt)
}

function renderstatebox () {
    var div = document.createElement('div')
    div.classList.add('statebox')
    div.id = 'statebox'
    document.getElementById('menu').appendChild(div)
}

function renderdiplomacy () {
    Aliances = {}
    Allymap = []
    for (let i = 0; i < Country.length; i++) {
        var who = Country[i].split(' ')[1]
        Aliances[who] = []
    }
}

function renderallies (c) {
    var allies = Aliances[c]
    for (let i = 0; i < allies.length; i++) {
        var tiles = document.getElementsByClassName(allies[i]) 
        for (let x = 0; x < tiles.length; x++) {
            tiles[x].classList.add('showally') 
        }
    }
    setTimeout(() => {
        var findclass = document.getElementsByClassName('showally')
        for (let i = 0; i < findclass.length; i++) {
            findclass[i].classList.remove('showally')
            i--
        }
    },1800)
}

function renderpreference () {
    var prefs = ['e','a']
    ActionPreference = {}
    for (let i = 0; i < Country.length; i++) {
        var code = Country[i].split(' ')[1]
        ActionPreference[code] = []
        var rand = Math.floor(Math.random() * 2)
        if (rand == 0) {ActionPreference[code] = ['e', 'a']}
        if (rand == 1) {ActionPreference[code] = ['a', 'e']}
    }
}

function renderonlycapitalmode () {
    var tiles = document.getElementsByClassName('tile')
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].innerHTML == "0") {
            var old = tiles[i].classList[1] 
            if (old == 'sea') {continue}
            tiles[i].classList.remove(old)
            tiles[i].classList.add('land')
        }
    }
}

function randommode () {
    var tiles = document.getElementsByClassName('tile')
    for (let i = 0; i < tiles.length; i++) {
         if (tiles[i].classList[1] == 'sea') {
             continue
         }
         var old = tiles[i].classList[1]
         tiles[i].classList.remove(old)
         tiles[i].classList.add('land')
         tiles[i].innerHTML = 0
    }
    for (let i = 0; i < Country.length; i++) {
        var available = document.getElementsByClassName('land')
        var taken = Math.floor(Math.random() * available.length)
        var thetile = available[taken]
        thetile.classList.remove('land')
        thetile.classList.add(Country[i].split(' ')[1])
        thetile.innerHTML = 9
    }
}

function renderhandbox () {
    var div = document.createElement('div')
    div.classList.add('handbox')
    div.id = 'handbox'
    mainframe.appendChild(div)
}

function renderwelcomescreen() {
    var div = document.createElement('div')
    div.id = 'welcomebox'
    div.classList.add('welcomebox')
    mainframe.appendChild(div)
    var title = document.createElement('h1')
    title.innerHTML = 'Risky Game'
    div.appendChild(title)
    var newgame = document.createElement('button')
    newgame.innerHTML = 'New Game'
    newgame.id = 'newgame'
    div.appendChild(newgame)
    var ngdiv = document.createElement('div')
    ngdiv.id = 'ngdiv'
    div.appendChild(ngdiv)
    var loadgame = document.createElement('button')
    loadgame.innerHTML = 'Load Game'
    loadgame.id = 'loadgame'
    div.appendChild(loadgame)
    var lgdiv = document.createElement('div')
    lgdiv.id = 'lgdiv'
    div.appendChild(lgdiv)

    newgame.onclick = () => {
        lgdiv.classList.remove('rolldownanim')
        ngdiv.classList.add('rolldownanim')
        newgamediv()
    }
    loadgame.onclick = () => {
        ngdiv.classList.remove('rolldownanim')
        lgdiv.classList.add('rolldownanim')
    }
}

function newgamediv () {
    var ngdiv = document.getElementById('ngdiv')
    ngdiv.innerHTML = ''
    var titcnt = document.createElement('h3')
    titcnt.innerHTML = 'Please select your country'
    ngdiv.appendChild(titcnt)
    var selcnt = document.createElement('select')
    selcnt.id = 'selcnt'
    ngdiv.appendChild(selcnt)
    var blankopt = document.createElement('option')
    blankopt.innerHTML = 'Spectate'
    blankopt.value = 'noval'
    selcnt.appendChild(blankopt)
    for (let i = 0; i < Country.length; i++) {
        var opt = document.createElement('option')
        opt.innerHTML = Country[i].split(' ')[0]
        opt.value = Country[i].split(' ')[1]
        selcnt.appendChild(opt)
    }
    var titgmo = document.createElement('h3')
    titgmo.innerHTML = 'Please select game mode'
    ngdiv.appendChild(titgmo)
    var selgmo = document.createElement('select')
    selgmo.id = 'selgmo'
    ngdiv.appendChild(selgmo)
    for (let i = 0; i < Gamemodes.length; i++) {
        var opt = document.createElement('option')
        opt.innerHTML = Gamemodes[i]
        opt.value = i
        selgmo.appendChild(opt)
    }
    var titpow = document.createElement('h3')
    titpow.innerHTML = 'Please select max power'
    ngdiv.appendChild(titpow)
    var selpow = document.createElement('select')
    selpow.id = 'selpow'
    ngdiv.appendChild(selpow)
    for (let i = 0; i < Maxpowers.length; i++) {
        var opt = document.createElement('option')
        opt.innerHTML = Maxpowers[i]
        opt.value = Maxpowers[i]
        selpow.appendChild(opt)
    }
    var startbut = document.createElement('button')
    startbut.innerHTML = "Start Game"
    startbut.id = 'startbut'
    startbut.onclick = () => {startgame ()}
    ngdiv.appendChild(startbut)
}