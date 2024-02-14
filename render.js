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
    var mapframe = document.getElementById('mapframe')
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
        mapframe.appendChild(but)
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
        who = Country.filter(x => x.includes(' '+tiletoshow.classList[1]))[0].split(' ')[0]
    )
    infobox.innerHTML += 'Belongs to ' + who + '<br>'
    infobox.innerHTML += 'Power is ' + tiletoshow.innerHTML + '<br>'
    var ally = document.createElement('p')
    ally.innerHTML = "Click here or press A to show enemies"
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
    cw_render ()
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
        cw_boolalies(ldb.mycnt[1],Neigh[i].classList[1])
        //console.log(cw_cindex,cw_dindex)
        if ((cw_cindex == cw_dindex) && (cw_cindex > -1)) {
            continue
        }
        if (Neigh[i].classList[1] == 'sea') {continue}
        Neigh[i].classList.add('neighfocus')
    }
}

function rendercapitals () {
    for (let i = 0; i < ldb.countries.length; i++) {
        ix_country(ldb.countries[i])
        var code = cix.code
        var terits = document.getElementsByClassName(code)
        var rand = Math.floor(Math.random() * terits.length)
        terits[rand].innerHTML = 9
    }
}

function distributepower () {
    for (let i = 0; i < ldb.countries.length; i++) {
        ix_country(ldb.countries[i])
        var who = cix.code
        var power = cix.initstr
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
    but_sc.onclick = () => (rendercountrystats ())
    menu.appendChild(but_sc)
    var but_rt = document.createElement('button')
    but_rt.id = 'runturn'
    but_rt.innerHTML = 'Run Turn (R)'
    but_rt.onclick = () => {runturnbut()}
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
    ix_t_code(c)
    var allies = ldb.friends[cix.ix]
    for (let i = 0; i < Country.length; i++) {
        var cnt = Country[i].split(' ')[1]
        if (allies[i] > (ldb.pow / 2)) {
            //console.log(allies[cnt])
            //console.log('Enemy!' + cnt)
        var tiles = document.getElementsByClassName(cnt) 
        for (let x = 0; x < tiles.length; x++) {
            tiles[x].classList.add('showally') 
        }
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
    for (let i = 0; i < ldb.countries.length; i++) {
        var available = document.getElementsByClassName('land')
        var taken = Math.floor(Math.random() * available.length)
        var thetile = available[taken]
        thetile.classList.remove('land')
        ix_country(ldb.countries[i])
        thetile.classList.add(cix.code)
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
    var loadgame = document.createElement('button')
    loadgame.innerHTML = 'Load Game'
    loadgame.id = 'loadgame'
    div.appendChild(loadgame)
    var mapeditor = document.createElement('button')
    mapeditor.innerHTML = 'Map Editor'
    mapeditor.id = 'mapeditor'
    div.appendChild(mapeditor)
    var ngdiv = document.createElement('div')
    ngdiv.id = 'ngdiv'
    div.appendChild(ngdiv)
    var lgdiv = document.createElement('div')
    lgdiv.id = 'lgdiv'
    div.appendChild(lgdiv)

    newgame.onclick = () => {
        lgdiv.classList.remove('rolldownanim')
        lgdiv.innerHTML = ''
        ngdiv.classList.add('rolldownanim')
        newgamediv()
    }
    loadgame.onclick = () => {
        ngdiv.classList.remove('rolldownanim')
        ngdiv.innerHTML = ''
        lgdiv.classList.add('rolldownanim')
        loadgamediv ()
    }
}

function newgamediv () {
    var ngdiv = document.getElementById('ngdiv')
    ngdiv.innerHTML = ''
    var titgmo = document.createElement('h3')
    titgmo.innerHTML = 'Please select game mode'
    ngdiv.appendChild(titgmo)
    var selgmo = document.createElement('select')
    selgmo.id = 'selgmo'
    ngdiv.appendChild(selgmo)
    var blank = document.createElement('option')
    blank.innerHTML = ''
    blank.value = 'noval'
    selgmo.appendChild(blank)
    for (let i = 0; i < Gamemodes.length; i++) {
        var opt = document.createElement('option')
        opt.innerHTML = Gamemodes[i]
        opt.value = i
        selgmo.appendChild(opt)
    }
    var titcnt = document.createElement('h3')
    titcnt.innerHTML = 'Please select your country'
    ngdiv.appendChild(titcnt)
    var selcnt = document.createElement('select')
    selcnt.id = 'selcnt'
    ngdiv.appendChild(selcnt)
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
    startbut.style.marginLeft = '33.33%'
    startbut.onclick = () => {startgame ()}
    ngdiv.appendChild(startbut)

    selgmo.onchange = () => {
        console.log(selgmo.value)
        var mode = New_GameModes[selgmo.value]
        selcnt.innerHTML = ''       
        var blankopt = document.createElement('option')
        blankopt.innerHTML = 'Spectate'
        blankopt.value = 'noval'
        selcnt.appendChild(blankopt)
        for (let i = 0; i < mode.countries.length; i++) {
            var a = mode.countries[i]
            ix_country(a)
            var opt = document.createElement('option')
            opt.innerHTML = cix.name   
            opt.value = cix.code
            selcnt.appendChild(opt)
        }
        var randomopt = document.createElement('option')
        randomopt.innerHTML = 'Random'
        randomopt.value = 'rand'
        selcnt.appendChild(randomopt)
    }
}

function loadgamediv () {
    var lgdiv = document.getElementById('lgdiv')
    if (localStorage.saves == undefined) {
        var initsave = []
        localStorage.saves = JSON.stringify(initsave)
        return
    }
    var saves = JSON.parse(localStorage.saves)
    for (let i = 0; i < 5; i++) {
        var savedet = JSON.parse(localStorage[saves[i]]).savename.split('_')
        //console.log(savedet)
        var div = document.createElement('span')
        div.classList.add('lgdiv-div')
        lgdiv.appendChild(div)
        var teamtim = document.createElement('p')
        teamtim.innerHTML = savedet[0].split(',')[0]
        teamtim.style.width = '40%'
        div.appendChild(teamtim)
        var year = document.createElement('p')
        year.innerHTML = 'Year: ' + savedet[1]
        year.style.width = '15%'
        div.appendChild(year)
        var pow = document.createElement('p')
        pow.innerHTML = 'Power: ' + savedet[2]
        pow.style.width = '20%'
        div.appendChild(pow)
        var startbut = document.createElement('button')
        startbut.innerHTML = 'Start'
        startbut.style.width = '25%'
        startbut.value = saves[i]
        startbut.onclick = () => {
            document.getElementById('welcomebox').style.display = 'none'
            renderhandbox ()
            loadgame(event.target.value)
        }
        div.appendChild(startbut)
    }
    du_renderupload ()
}

function generatefriendmap () {
    ldb.friends = {}
    for (let i = 0; i < Country.length; i++) {
        var code = Country[i].split(' ')[1]
        ldb.friends[i] = {}
        for (let x = 0; x < Country.length; x++) {
            var dode = Country[x].split(' ')[1]
            ldb.friends[i][x] = 1
        }
    }
}

function inithistory () {
    ldb.history = {}
    for (let i = 0; i < Country.length; i++) {
        var cnt = Country[i].split(' ')[1]
        ldb.history[i] = []
    }
}

function rendercountrystats () {
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
    title.innerHTML = "Team stats"
    div.appendChild(title)
    var typefield = document.createElement('input')
    typefield.type = 'text'
    typefield.placeholder = 'Start typing country name or code'
    typefield.id = 'cntsearchfield'
    typefield.onkeydown = e => {
        event.stopPropagation ()
        searchcountry ()
        if (e.key == 'Escape') {    
            var item = document.querySelector('.exitbut')
            if (item == null) {return}
            item.parentElement.remove()
            if (ldb.mycnt == 'noval') {
                focuscentral('tile')
            } else {
                focuscentral(ldb.mycnt[1])
            }
        }
    }
    div.appendChild(typefield)
    setTimeout(() => {
        document.getElementById('cntsearchfield').value = ''
    },100)
    var resultfield = document.createElement('h5')
    resultfield.id = 'cntresultfield'
    div.appendChild(resultfield)
    var graphfield = document.createElement('div')
    graphfield.id = 'cntgraph'
    div.appendChild(graphfield)
    var powfield = document.createElement('div')
    powfield.id = 'powgraph'
    div.appendChild(powfield)
}

function renderhistorygraph (c) {
    var graph = document.getElementById('cntgraph')
    ix_t_code(c)
    var source = ldb.history[cix.ix]
    var pilewidth = 100 / source.length
    var pilemaxheight = 0
    for (let i = 0; i < source.length; i++) {
        if (source[i][1] > pilemaxheight) {
            pilemaxheight = source[i][1]
        } 
    }
    //var pilemaxheight = source[Math.floor(source.length/2)][1]
    //if (pilemaxheight < source[source.length - 1][1]) {
    //    pilemaxheight = source[source.length - 1][1]
    //}
    for (let i = 0; i < source.length; i++) {
        var pile = document.createElement('div')
        pile.style.backgroundColor = ''
        pile.id = 'pile1'
        pile.style.height = 100 - (source[i][1] / pilemaxheight) * 90 + '%'
        pile.style.width = pilewidth + '%'
        pile.style.float = 'left'
        //pile.innerHTML = source[i][1]
        graph.appendChild(pile) 
    }
    var graph2 = document.getElementById('powgraph')
    pilemaxheight = 0
    for (let i = 0; i < source.length; i++) {
        if (source[i][2] > pilemaxheight) {
            pilemaxheight = source[i][2]
        } 
    }
    //var pilemaxheight = source[Math.floor(source.length/2)][2]
    //if (pilemaxheight < source[source.length - 1][2]) {
    //    pilemaxheight = source[source.length - 1][2]
    //}
    for (let i = 0; i < source.length; i++) {
        var pile = document.createElement('div')
        pile.style.backgroundColor = ''
        pile.id = 'pile2'
        pile.style.height = 100 - (source[i][2] / pilemaxheight) * 90 + '%'
        pile.style.width = pilewidth + '%'
        pile.style.float = 'left'
        //pile.innerHTML = source[i][2]
        graph2.appendChild(pile) 
    }
}

function renderwhokilled () {
    ldb.whokilled = {}
    for (let i = 0; i < Country.length; i++) {
        var code = Country[i].split(' ')[1] 
        ix_t_code(code)
        ldb.whokilled[cix.ix] = []
    }
}

function mapgenerator () {
    var tiles = document.getElementsByClassName('tile')
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].className = 'tile sea'
        tiles[i].innerHTML = '0' 
    }
    for (let i = 0; i < 20; i++) {
        var randland = Math.floor(Math.random() * tiles.length)
        tiles[randland].className = 'tile land' 
    }
    //var randhowmuch = Math.floor(Math.random() * 30) + 50
    //var tilesLimit = Math.floor(tiles.length * (randhowmuch / 100))
    var directions = [1,-1,41,-41]
    for (let i = 0; i < (tiles.length * 6); i++) {
        var tile = document.getElementsByClassName('land')
        var randtile = Math.floor(Math.random() * tile.length)
        var theTile = tile[randtile]
        var randDirection = directions[Math.floor(Math.random() * 4)]
        var oldid = Number(theTile.id.split('d')[1])
        var newid = oldid + randDirection
        if (newid < 1) {
            continue
        }
        if (newid > 1353) {
            continue
        }
        var newtile = document.getElementById('field' + newid)
        newtile.className = 'tile land'
    }
    var sparetiles = []
    var d = 0
    for (let i = 0; i < 33; i++) {
        sparetiles.push(d)
        d += 41 
    }
    //console.log(sparetiles)
    for (let i = 0; i < sparetiles.length; i++) {
        var value = sparetiles[i]
        tiles[value].className = 'tile sea'
    }
    for (let i = sparetiles[sparetiles.length - 1]; i < (sparetiles[sparetiles.length - 1] + 41); i++) {
        //console.log(i)
        tiles[i].className = 'tile sea' 
    }
}

function savebutton () {
    var button = document.createElement('button')
    button.classList.add('savebutton')
    button.innerHTML = 'Save Game (S)'
    button.id = 'savebutton'
    savebuttonswitch = 0
    button.onclick = () => {
        rendersavefield() 
    }
    mainframe.appendChild(button)
}

function rendersavefield () {
    if (savebuttonswitch == 1) {
        document.getElementById('savebox').remove()
        savebuttonswitch = 0
        return
    }
    savebuttonswitch = 1
    //console.log('works')
    var div = document.createElement('div')
    div.id = 'savebox'
    div.classList.add('savebox')
    mainframe.appendChild(div)
    if (localStorage.saves == undefined) {
        var savesSS = []
        localStorage.saves = JSON.stringify(savesSS)
    }
    var saves = JSON.parse(localStorage.saves)
    for (let i = 0; i < 5; i++) {
        var slot = document.createElement('div')
        slot.classList.add('saveboxslot')
        var lookup = 'saveslot' + i
        var lookupVal = saves.indexOf(lookup)
        if (lookupVal == -1) {
            slot.innerHTML = 'Empty'
            slot.classList.add('saveboxslotempty')
        } else {
            var values = JSON.parse(localStorage[lookup])
            var savename = values.savename.split('_')
            slot.innerHTML = savename[0] + '<br> Year: ' + savename[1] + '<br> Power: ' + savename[2]
        }
        slot.id = 'saveslot_' + i
        slot.onclick = () => {
            var slotId = event.target.id.split('_')
            //console.log(slotId[1])
            savegame(Number(slotId[1]))
            event.target.innerHTML = "Game Saved!"
            setTimeout(() => {div.remove()},1000)
            savebuttonswitch = 0
        }
        div.appendChild(slot)
    }
    var button = document.createElement('button')
    button.innerHTML = 'Save to file'
    button.classList.add('saveboxbutton')
    button.onclick = () => {
        du_download ()
    }
    div.appendChild(button)
}

function zoom_in() {
    
}