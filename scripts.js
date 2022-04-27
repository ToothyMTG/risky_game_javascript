
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
    Necon = []
    for (let i = 0; i < Neigh.length; i++) {
        var nene = Neigh[i].classList[1]
        if (Necon.indexOf(nene) < 0) {
            Necon.push(nene)
        }
    }
}

function getfriends (c) {
    Targets = []
    for (let i = 0; i < Necon.length; i++) {
        var code = Necon[i]
        var val = ldb.friends[c][code]
        if (code == 'land') {
            val = 1
        }
        for (let x = 0; x < val; x++) {
            Targets.push(code)
        }
    }
    //console.log(Targets)
}

function escalate (one,two) {
    if ((one == 'land') || (two == 'land')) {
        return
    }
    ldb.friends[one][two] += 1
    if ( ldb.friends[one][two] > ldb.pow ) {
        ldb.friends[one][two] = ldb.pow
    }
    ldb.friends[two][one] += 1
    if (ldb.friends[two][one] > ldb.pow) {
        ldb.friends[two][one] = ldb.pow
    }
}

function deescalate () {
    for (let i = 0; i < Country.length; i++) {
        var code = Country[i].split(' ')[1]
        for (let x = 0; x < Country.length; x++) {
            var dode = Country[x].split(' ')[1]
            ldb.friends[code][dode] -= 2
            if (ldb.friends[code][dode] < 1) {
                ldb.friends[code][dode] = 1
            }
        }
    }
}

function getownteritories (c) {
    Own = []
    var tiles = document.getElementsByClassName(c)
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].innerHTML == '9') {
            continue
        } else {
            Own.push(tiles[i])
        }   
    }
}

function getenemies (c) {
    Enemies = []
    for (let i = 0; i < Country.length; i++) {
        var code = Country[i].split(' ')[1]
        var check = Aliances[c].indexOf(code)
        if (code == c) {continue}
        if (check !== -1) {
            continue
        } else {
            Enemies.push(code)
        }
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
    if (Power > ldb.pow) {Power = ldb.pow}
    //console.log(c + ' has power of ' + Power)
}

function focuscentral (c) {
    var tiles = document.getElementsByClassName(c)
    tiles[Math.floor(tiles.length/2)].focus()
}

function assignaliance (c, d) {
    Aliances[c].push(d)
    Aliances[d].push(c)
}

function applyforaliance (c) {
    getenemies(c)
    if (Enemies.length == 0) {return}
    var d = Enemies[Math.floor(Math.random() * Enemies.length)]
    var pref = 2 * (ActionPreference[d].indexOf('d') + 1)
    //console.log(pref,)
    var rand = Math.floor(Math.random() * 8 + 1)
    //console.log(rand)
    if (rand >= pref) {
        assignaliance (c, d)
        Allymap[ldb.round].push([c,d])
        //console.log('Alliance signed')
    } else {
        //console.log('Aliance refused')
    }

}

function attack (c) {
    getneigh(c)
    getfriends(c)
    if (Neigh.length == 0) {return}
    var randtarget = Math.floor(Math.random() * Targets.length)
    var lands = Neigh.filter(x => x.className.includes(Targets[randtarget]))
    //console.log(Targets[randtarget],lands)
    var rand = Math.floor(Math.random() * lands.length)
    var target = lands[rand]
    if (target == undefined) { //DEBUG
        console.log(target,randtarget,rand,lands,c,Neigh,Targets)
    }
    //console.log(target)
    var oldcode = target.classList[1]
    escalate(c,oldcode)
    //console.log(target)
    var checkally = Aliances[c].indexOf(target.classList[1])
    //console.log(checkally)
    if (checkally >= 0) {return}
    var val = Number(target.innerHTML)
    val--
    //console.log(val)
    if (val < 0) {
        target.classList.remove(oldcode)
        target.classList.add(c)
        target.innerHTML = 0
    } else {
        target.innerHTML = val
    }
    var countAgressorCode = document.getElementsByClassName(oldcode).length
    if (countAgressorCode == 0) {
        assignwhokilled(c,oldcode)
    }
    //console.log(target)
}

function build (c) {
    getownteritories(c)
    if (Own.length == 0) {return}
    var rand = Math.floor(Math.random() * Own.length)
    var target = Own[rand]
    //console.log(target)
    var val = Number(target.innerHTML)
    val++
    if (val > 9) {val = 9}
    target.innerHTML = val
}

function turn (c) {
    getneigh(c)
    getfriends(c)
    getownteritories(c)
    var pref = ActionPreference[c]
    var totopts
    var prefval
    if (pref[0] == "e") {
        prefval = Neigh.length
        totopts = Neigh.length + (Own.length * 2)
    }
    if (pref[0] == "a") {
        prefval = Neigh.length * 2
        totopts = Own.length + (Neigh.length * 2)
    }
    getpower(c)
    for (let i = 0; i < Power; i++) {
        var type
        rand = Math.floor(Math.random() * totopts)
        //console.log(Neigh.length,Own.length,rand,prefval,totopts, pref)
        if (rand >= prefval) {
            build(c)
            //console.log('built')
        } 
        if (rand < prefval) {
            attack(c)
            //console.log('attacked')
        }  
        //console.log(Power)
    }
    opacityhandler ()
}


function round () {
    var who = Country[ldb.next]
    var name = who.split(' ')[0]
    //console.log(name)
    var code = who.split(' ')[1]
    populatestatebox(name,ldb.round)
    if (name == ldb.mycnt[0]) {
        document.getElementById('runturn').style.display = 'none'
        document.getElementById('taketurn').style.display = 'block'
        focuscentral(code)
        getpower(code)
        Turns = Power
        document.getElementById('taketurn').innerHTML = "Take turn (Space) <br>" + Turns + ' turn(s)'
        getneigh(code)
        addflash()
        return
    }
    turn(code)
    ldb.next++
    if (ldb.next >= Country.length) {
        ldb.next = 0 
        ldb.round++
        ldb.year += 0.25
        //console.log(ldb.round)
        //clearaliances(ldb.round)
        deescalate ()
        Country = Country.sort(() => 0.5 - Math.random())
        Allymap[ldb.round] = []
        Allymap[ldb.round - 3] = []
        populatehandbox ()
        populatehistory ()
        var randifResistance = Math.floor(Math.random() * 5)
        if (randifResistance == 0 ) {
            resistance ()
        }
    }
}

function clearaliances (n) {
    var which = ldb.round - 3
    if (which < 0) {return}
    var aliances = Allymap[which]
    for (let i = 0; i < aliances.length; i++) {
        var c1 = aliances[i][0]
        var c2 = aliances[i][1]
        var res = Aliances[c1].indexOf[c2]
        if (res !== -1) {
            Aliances[c1].splice[res,1]
        }
        var des = Aliances[c2].indexOf[c1]
        if (des !== -1) {
            Aliances[c2].splice[des,1]
        }
    }
}

function populatehandbox () {
    var handbox = document.getElementById('handbox')
    handbox.innerHTML = ''
    var title = document.createElement('h1')
    title.innerHTML = "Top 10 Countries"
    handbox.appendChild(title)
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
        //table[i][0] = Math.floor((table[i][0] + terits.length) / 2)
    }
    table = table.sort((a,b) => {return b[0] - a[0]})
    for (let i = 0; i < 10; i++) {
        var pos = document.createElement('h2')
        if (table[i][1] == ldb.mycnt[0]) {
            pos.classList.add('my')
        }
        if (table[i][0] == 0) {
            continue
        }
        pos.innerHTML = (i + 1) +' : ' + table[i][1] + ' - ' + table[i][0]
        handbox.appendChild(pos)
    }    
}

function populatestatebox (c,t) {
    var statebox = document.getElementById('statebox')
    statebox.innerHTML = ''
    var year = document.createElement('h1')
    var whatyear = ldb.year
    year.innerHTML = Math.floor(whatyear)
    statebox.appendChild(year)   
    var yearprog = document.createElement('div')
    yearprog.style.width = (whatyear - Math.floor(whatyear)) * 100 + 12.5 + "%"
    yearprog.classList.add('progressbar')
    statebox.appendChild(yearprog)   
    var who = document.createElement('h2')
    who.innerHTML = c
    statebox.appendChild(who)
}

function act () {
    var tile = event.target
    var ifneigh = Neigh.filter(x => x.id.includes(tile.id))[0]
    //console.log(ifneigh)
    if (tile.classList[1] == ldb.mycnt[1]) {
        var power = Number(tile.innerHTML)
        power++
        if (power > 9) {
            power = 9
            return
        }
        tile.innerHTML = power
        Turns--
    }
    if (ifneigh == tile) {
        var power = Number(tile.innerHTML)
        power--
        //console.log(power)
        if (power < 0) {
            tile.classList.remove(tile.classList[1])
            tile.classList.add(ldb.mycnt[1])
            power = 0
        }
        tile.innerHTML = power
        removeflash()
        getneigh(ldb.mycnt[1])
        addflash()
        Turns--
        escalate(ldb.mycnt[1],tile.classList[1])
    }
    opacityhandler ()
    if (Turns < 1) {
        document.getElementById('taketurn').style.display = 'none'
        document.getElementById('runturn').style.display = 'block'
        removeflash()
        ldb.next++
        if (ldb.next >= Country.length) {
            ldb.next = 0 
            ldb.round++
            ldb.year += 0.25
            //console.log(ldb.round)
            clearaliances(ldb.round)
            Country = Country.sort(() => 0.5 - Math.random())
            Allymap[ldb.round] = []
            Allymap[ldb.round - 3] = []
            populatehandbox ()
            populatehistory ()
        }
    }
    document.getElementById('taketurn').innerHTML = "Take turn (Space) <br>" + Turns + ' turn(s)'
}

function startgame () {
    ldb.next = 0
    ldb.round = 0
    Country = Country.sort(() => 0.5 - Math.random())
    document.getElementById('welcomebox').style.display = 'none'
    var teamval = document.getElementById('selcnt').value
    if (teamval == 'noval') {
        ldb.mycnt = 'noval'
    } else {
        ldb.mycnt = Country.filter(x => x.includes(teamval))[0].split(' ')
    }
    renderhandbox ()
    var gmode = document.getElementById('selgmo').value
    if (gmode == 0) { // Europe as of 2022
        //rendercapitals ()
        distributepower ()
        opacityhandler ()
        ldb.year = 2022
    }
    if (gmode == 1) { // Europe powered with capitals
        rendercapitals ()
        opacityhandler ()
        ldb.year = 1995
    }
    if (gmode == 2) { // Europe but single cities
        rendercapitals ()
        renderonlycapitalmode ()
        opacityhandler ()
        ldb.year = 1
    }
    if (gmode == 3) { // Random spawn of cities
        randommode ()
        opacityhandler ()
        ldb.year = 1
    }
    if (gmode == 4) {
        mapgenerator ()
        randommode ()
        opacityhandler ()
        ldb.year = 1
    }
    var gpow = Number(document.getElementById('selpow').value)
    ldb.pow = gpow
    //console.log(teamval,gmode,gpow)
}

function resistance () {
    var tiles = document.getElementsByClassName('tile')
    var isnotsea = []
    for (let i = 0; i < tiles.length; i++) {
        if (tiles[i].classList[1] == 'sea') {
            continue
        }
        isnotsea.push(tiles[i])
    }
    var randtile = Math.floor(Math.random() * isnotsea.length)
    var theTile = isnotsea[randtile]
    var sourceCode = theTile.classList[1]
    if (ldb.whokilled[sourceCode].length == 0) {
        return
    }
    var randwhoResists = Math.floor(Math.random() * ldb.whokilled[sourceCode].length)
    console.log(sourceCode,randwhoResists)
    var whoResists = ldb.whokilled[sourceCode][randwhoResists]
    theTile.classList.remove(sourceCode)
    theTile.classList.add(whoResists)
    var powerRange = Math.floor(Math.random() * document.getElementsByClassName(sourceCode).length) * 3
    console.log(powerRange)
    for (let i = 0; i < powerRange; i++) {
        rand = Math.floor(Math.random() * 2)
        //console.log(Neigh.length,Own.length,rand,prefval,totopts, pref)
        if (rand == 0) {
            build(whoResists)
            //console.log('built')
        } 
        if (rand == 1) {
            attack(whoResists)
            //console.log('attacked')
        }  
    //console.log(Power)
    }
    ldb.whokilled[sourceCode].splice(randwhoResists, 1)
}

function populatehistory () {
    for (let i = 0; i < Country.length; i++) {
        var code = Country[i].split(' ')[1]
        var tiles = document.getElementsByClassName(code)
        if (tiles.length == 0) {
            continue
        }
        var power = 0
        for (let x = 0; x < tiles.length; x++) {
             power += Number(tiles[x].innerHTML)
        }
        var vals = [ldb.year,tiles.length,power]
        ldb.history[code].push(vals)
    }
}

function searchcountry() {
    var field = document.getElementById('cntsearchfield')
    var resultfield = document.getElementById('cntresultfield')
    resultfield.style.color = 'white'
    resultfield.innerHTML = ''
    var value = field.value
    var results = Country.filter(x => x.includes(value))
    if (value.length > 1) {
        for (let i = 0; i < results.length; i++) {
            resultfield.innerHTML += results[i].split(' ')[0] + '<br>'
        }
    }
    if (results.length == 1) {
        document.getElementById('cntresultfield').style.color = 'yellow'
        document.getElementById('cntgraph').innerHTML = ''
        document.getElementById('powgraph').innerHTML = ''
        renderhistorygraph (results[0].split(' ')[1])
    }
}

function assignwhokilled(a,b) {
    ldb.whokilled[a].push(b)
    console.log(a + ' anihilated ' + b)
}