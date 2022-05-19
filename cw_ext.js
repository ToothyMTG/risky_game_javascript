function cw_render () {
    ldb.cw = {}
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