console.clear()
var mainframe = document.getElementById('mainframe')
var wherefocus = ''
var maptiles = {}

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

function assignterrain (t) {
    document.addEventListener('keydown', x => {
        if (x.code === 'Space') {
            maptiles[wherefocus].type = t
            var w = document.getElementById(wherefocus)
            if (t == 'Sea') {
                w.style.backgroundColor = 'lightblue'
            }
        }
    })
}

function populatemap () {
    for (let i = 0; i < Tiles.length; i++) {
        console.log(Tiles[i])
    }
}

rendermenu ()
renderinfobox ()
rendermapimg ()
rendermap ()
assignterrain ('Sea')
populatemap ()