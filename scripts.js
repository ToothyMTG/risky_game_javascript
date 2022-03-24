
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
Powur = 9
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
        Allymap[Round].push([c,d])
        //console.log('Alliance signed')
    } else {
        //console.log('Aliance refused')
    }

}

function attack (c) {
    getneigh(c)
    if (Neigh.length == 0) {return}
    var rand = Math.floor(Math.random() * Neigh.length)
    var target = Neigh[rand]
    var oldcode = target.classList[1]
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

Next = 0
Round = 0
Year = 2022
Country = Country.sort(() => 0.5 - Math.random())

function round () {
    var who = Country[Next]
    var name = who.split(' ')[0]
    //console.log(name)
    var code = who.split(' ')[1]
    populatestatebox(name,Round)
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
    Next++
    if (Next >= Country.length) {
        Next = 0 
        Round++
        //console.log(Round)
        clearaliances(Round)
        Country = Country.sort(() => 0.5 - Math.random())
        Allymap[Round] = []
        Allymap[Round - 3] = []
        Powur++
        populatehandbox ()
    }
}

function clearaliances (n) {
    var which = Round - 3
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
    var whatyear = Year + (t / 4)
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
    console.log(ifneigh)
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
        console.log(power)
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
    }
    opacityhandler ()
    if (Turns < 1) {
        document.getElementById('taketurn').style.display = 'none'
        document.getElementById('runturn').style.display = 'block'
        removeflash()
        Next++
        if (Next >= Country.length) {
            Next = 0 
            Round++
            //console.log(Round)
            clearaliances(Round)
            Country = Country.sort(() => 0.5 - Math.random())
            Allymap[Round] = []
            Allymap[Round - 3] = []
            Powur++
            populatehandbox ()
        }
    }
    document.getElementById('taketurn').innerHTML = "Take turn (Space) <br>" + Turns + ' turn(s)'
}

function startgame () {
    document.getElementById('welcomebox').style.display = 'none'
    var teamval = document.getElementById('selcnt').value
    if (teamval == 'noval') {
        ldb.mycnt = 'noval'
    } else {
        ldb.mycnt = Country.filter(x => x.includes(teamval))[0].split(' ')
    }
    renderhandbox ()
    var gmode = document.getElementById('selgmo').value
    var gpow = Number(document.getElementById('selpow').value)
    ldb.pow = gpow
    console.log(teamval,gmode,gpow)
}