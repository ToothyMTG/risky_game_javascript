function cw_init () {
    ldb.cw = []
    var cw_colors = ['#BC6AFF','#49A6E0','#FA8375','#E0BE61','#7CFF6A','white']
    for (let i = 0; i < cw_colors.length; i++) {
        ldb.cw[i] = {}
        ldb.cw[i].styling = 'inset 0 0 0 2px ' + cw_colors[i]
        ldb.cw[i].countries = []
        ldb.cw[i].pow = 3
    }
}

function cw_render () {
    var tiles = document.getElementsByClassName('tile')
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].style.boxShadow = ''
    }   
    for (let i = 0; i < ldb.cw.length; i++) {
        var countries = ldb.cw[i].countries
        for (let c = 0; c < countries.length; c++) {
            var country = countries[c]
            var fields = document.getElementsByClassName(country)
            for (let f = 0; f < fields.length; f++) {
                fields[f].style.boxShadow = ldb.cw[i].styling
            }
        }
    }
}

function cw_boolalies (a,b) {
    cw_check = 0
    cw_findcw(a,b)
    if ((cw_cindex == -1) || (cw_dindex == -1)) {
        cw_check = 0
        return
    }
    if (cw_cindex == cw_dindex) {
        cw_check = 1        
    }
}

function cw_getaliveteams () {
    cw_aliveteams = []
    for (let i = 0; i < Country.length; i++) {
        var code = Country[i].split(' ')[1]
        var onmap = document.getElementsByClassName(code)
        if (onmap.length == 0 ) {
            continue
        } else {
            cw_aliveteams.push(code)
        } 
    }
}

function cw_teamelection () {
    var rand = Math.floor(Math.random() * cw_aliveteams.length)
    cw_elected = cw_aliveteams[rand]
}

function cw_getallies (c) {
    cw_friends = []
    getneigh(c)
    for (let i = 0; i < Neigh.length; i++) {
        var cnt = Neigh[i].classList[1]
        if (cnt == 'land') {
            continue
        }
        var enemval = ldb.friends[c][cnt]
        if (enemval <= ldb.pow / 5) {
            cw_friends.push(cnt)
        }
    }
    //console.log(cw_friends)
}

function cw_electfriend() {
    if (cw_friends.length == 0) {
        cw_friend = 0
    }
    var rand = Math.floor(Math.random() * cw_friends.length)
    cw_friend = cw_friends[rand]
}

function cw_findspare () {
    var spares = []
    for (let i = 0; i < ldb.cw.length; i++) {
        if (ldb.cw[i].countries.length == 0) {
            spares.push(i)
        }
    }
    //console.log(spares)
    if (spares.length == 0) {
        cw_freecw = -1
        return
    }
    var rand = Math.floor(Math.random() * spares.length)
    cw_freecw = spares[rand]
    //console.log(cw_freecw)
}

function cw_createcw(i,c,d) {
    if (d == undefined) {
        return
    }
    ldb.cw[i].countries.push(c)
    ldb.cw[i].countries.push(d)
    //console.log(ldb.cw[i].countries)
    ldb.cw[i].str = 8
}

function cw_findcw(c,d) {
    cw_cindex = -1
    cw_dindex = -1
    for (let i = 0; i < ldb.cw.length; i++) {
        var bool = ldb.cw[i].countries.indexOf(c)
        if (bool > -1) {
            cw_cindex = i
        }
        var bool = ldb.cw[i].countries.indexOf(d)
        if (bool > -1) {
            cw_dindex = i
        }
    }
    //rconsole.log(cw_cindex,cw_dindex)
}

function cw_emptycw () {
    for (let i = 0; i < ldb.cw.length; i++) {
        if (ldb.cw[i].countries.length == 1) {
            ldb.cw[i].countries = []
        } 
    }
}

function cw_managerstr () {
    for (let i = 0; i < ldb.cw.length; i++) {
        var str = ldb.cw[i].str
        var rand = Math.floor(Math.random() * 2)
        if (rand == 0) {
            ldb.cw[i].str--
        }
        if (rand == 1) {
           ldb.cw[i].str++
        }
        if (ldb.cw[i].str == 0) {
            ldb.cw[i].countries = []
            ldb.cw[i].str = 0
        }
        if (ldb.cw[i].str > 10) {
            ldb.cw[i].str = 10
        }
    }
}

function cw_action (c, d) {
    cw_getaliveteams ()
    cw_teamelection ()
    c = cw_elected
    cw_getallies(c)
    cw_electfriend()
    d = cw_friend
    var bool = 0
    var boolfr = 0
    for (let i = 0; i < ldb.cw.length; i++) {
        var boolcheck = ldb.cw[i].countries.indexOf(c)
        if (boolcheck > -1) {
            bool = 1
        } 
        boolcheck2 = ldb.cw[i].countries.indexOf(d)
        if (boolcheck2 > -1) {
            boolfr = 1
        }
    }
    //console.log(c, bool, d, boolfr)
    if (d == 0) {
        return
    }
    if ((bool == 0) && (boolfr == 0)) {
        cw_findspare ()
        if (cw_freecw == -1) {
            return
        }
        cw_createcw(cw_freecw,c,d)
        var c_name = Country.filter(x => x.includes(c))[0].split(' ')[0]
        var d_name = Country.filter(x => x.includes(d))[0].split(' ')[0]
        var nb_msg = c_name + ' and ' + d_name + ' signed an alliance !'
        nb_push(nb_msg, 2)
    }
    if (bool == 1) {
        cw_findcw(c,d)
        if (cw_cindex == cw_dindex) {
            return
        }
        ldb.cw[cw_cindex].countries.push(d)
        var c_name = Country.filter(x => x.includes(c))[0].split(' ')[0]
        var d_name = Country.filter(x => x.includes(d))[0].split(' ')[0]
         var nb_msg = d_name + ' joined ' + c_name + "'s alliance!"
        nb_push(nb_msg, 2)
        if (cw_dindex != -1) {
            var dindex = ldb.cw[cw_dindex].countries.indexOf(d)
            ldb.cw[cw_dindex].countries.splice(dindex,1)
            //console.log('done')
        }
    }
    if (bool == 0) {
        cw_findcw(c,d)
        if (boolfr == 1) {
            ldb.cw[cw_dindex].countries.push(c)
            var c_name = Country.filter(x => x.includes(c))[0].split(' ')[0]
            var d_name = Country.filter(x => x.includes(d))[0].split(' ')[0]
            var nb_msg = c_name + ' joined ' + d_name + "'s alliance!"
            nb_push(nb_msg, 2)
        }
    }
    cw_emptycw ()
    opacityhandler ()

}

function cw_signcommotwealth (c) {
    getneigh(c)
    var friends = []
    for (let i = 0; i < Neigh.length; i++) {
        var cnt = Neigh[i].classList[1]
        if (cnt == 'land') {
            continue
        }
        var enemval = ldb.friends[c][cnt]
        if (enemval <= ldb.pow / 5) {
            friends.push(cnt)
        }
    }
    if (friends.length == 0 ) {
        return
    }
    var randfrnd = Math.floor(Math.random() * friends.length)
    var getfrnbase = friends[randfrnd]


    
    var pow_one = document.getElementsByClassName(c).length
    var pow_two = document.getElementsByClassName(getfrnbase).length
    var major
    var minor
    if (pow_one > pow_two) {
        major = c
        minor = getfrnbase 
    } else {
        major = getfrnbase
        minor = c
    }

    var tiles = document.getElementsByClassName(minor)
    for (let i = 0; i < tiles.length; i++) {
        tiles[i].classList.add(major)
        tiles[i].classList.remove(minor)
        i--
    }
    ldb.whokilled[major].push(minor)
}

function cw_runner () {
    cw_getaliveteams ()
    var randcountry = Math.floor(Math.random() * cw_aliveteams.length)
    var cntchosen = cw_aliveteams[randcountry]
    cw_signcommotwealth (cntchosen)
}

function cw_getoptions (c) {
    cw_options = 0
    var tiles = document.getElementsByClassName(c)
    for (let i = 0; i < tiles.length; i++) {
        if (Number(tiles[i].innerHTML) == 9) {
            continue
        } else {
            cw_options++
        }
    }
    //console.log(cw_options)
    getneigh(c)
    for (let i = 0; i < Neigh.length; i++) {
        var d = Neigh[i].classList[1]
        cw_findcw(c,d)
        if (cw_cindex == -1) {
            cw_options++
            continue
        } 
        if (cw_cindex == cw_dindex) {
            continue
        } else {
            cw_options++
        }
    }
    //console.log(cw_options)
}