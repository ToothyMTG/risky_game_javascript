function me_render () {
    document.getElementById('welcomebox').style.display = 'none'
    document.getElementById('menu').innerHTML = ''
    renderinfobox ()
    document.getElementById('savebutton').remove()
    var tiles = document.getElementsByClassName('tile')
    me_rendermenu ()
}

function me_rendermenu () {
    var menu = document.getElementById('menu') 
    
    var setbackground = document.createElement('input')
    setbackground.type = 'text'
    setbackground.id = 'me-setbg'
    setbackground.placeholder = 'Set BG'
    setbackground.onkeydown = () => {event.stopPropagation()}
    setbackground.onchange = () => {
        me_setbg(setbackground.value)
    }
    menu.appendChild(setbackground)

    var selectcountry = document.createElement('select')
    selectcountry.id = 'me-selcnt'
    selectcountry.onkeydown = () => {event.stopPropagation()}
    selectcountry.onchange = () => {
        console.log(selectcountry.value)
    }
    menu.appendChild(selectcountry)

    for (let i = 0; i < Country.length; i++) {
        var option = document.createElement('option')
        option.innerHTML = Country[i].split(' ')[0]
        option.classList.add(Country[i].split(' ')[1])
        selectcountry.appendChild(option) 
    }
}

function me_setbg (x) {
    var img = document.getElementById('me-image')
    if (img != undefined) {
        img.remove()
    }
    var mapframe = document.getElementById('mapframe')
    var image = document.createElement('img')
    image.id = 'me-image'
    image.src = x
    image.style.opacity = 0.5
    image.classList.add('mapimage')
    mainframe.appendChild(image)
}

function me_clearcnts () {
    var tiles = document.getElementsByClassName('tile')
    for (let i = 0; i < tiles.length; i++) {
       if (tiles[i].className != 'tile sea') {
            tiles[i].className = 'tile land'
       } 
    }
}

function me_clearall () {
    var tiles = document.getElementsByClassName('tile')
    for (let x = 0; x < tiles.length; x++) {
        tiles[x].className = 'tile sea'
    }

}