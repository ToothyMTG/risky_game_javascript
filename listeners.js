document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
        if (document.getElementById('thmap') != null) {movetilehistory('l')}
        var cur = document.getElementById(wherefocus)
        var newid = Number(cur.id) - 1
        document.getElementById('field' + newid).focus()
    }
    if (e.key === 'ArrowRight') {
        if (document.getElementById('thmap') != null) {movetilehistory('r')}
        var cur = document.getElementById(wherefocus)
        var newid = Number(cur.id) + 1
        document.getElementById('field' + newid).focus()
    }
    if (e.key === 'ArrowUp') {
        var cur = document.getElementById(wherefocus)
        var newid = Number(cur.id) - 50
        document.getElementById('field' + newid).focus()  
    }
    if (e.key === 'ArrowDown') {
        var cur = document.getElementById(wherefocus)
        var newid = Number(cur.id) + 50
        document.getElementById('field' + newid).focus()  
    }
    if (e.key === 'Escape') {
        var item = document.querySelector('.exitbut')
        if (item == null) {return}
        item.parentElement.remove()
        if (ldb.mycnt == 'noval') {
            focuscentral('tile')
        } else {
            focuscentral(ldb.mycnt[1])
        }
        }
    if (e.key === '1') {
        renderteritoryranking ()
    }
    if (e.key === '2') {
        renderpowerranking ()
    }
    if (e.key === '3') {
        renderpowerperteritory ()
    }
    if (e.key === '4') {
        rendercountrystats ()
        document.getElementById('cntsearchfield').focus()
        document.getElementById('cntsearchfield').innerHTML = ''
    }
    if (e.key == 'a') {
        var code = document.getElementById('field'+wherefocus).classList[1]
        renderallies(code)
    }
    if (e.key == 'r') {
            runturnbut()
        // if (document.getElementById('runturn').style.display != 'none') {
        //     runturnbut()
        // }
    }
    if (e.key == 't') {
        th_maker ()
    }
    if (e.key == 's') {
        rendersavefield ()
    }
    if (e.code == 'Space') {
        if (MapEditorMode == true) {
            removehandbox()
            thetile = event.target
            mapeditormake(thetile)
            return
        }
        if (Turns > 0) {
            act ()      
        }
    }
    if (e.key == "z") {
        // this is for selecting which country to paint tile with
        if (MapEditorMode == true) {
            var tileselect = document.getElementById('tileselect')
            tileselect.focus()
            tileselect.onkeydown = (event) => {
                event.stopPropagation()
                if (event.code == 'Enter') {
                    tileselect.size = 1
                    tileselect.blur()
                }
            }
        // if i press enter, it sets the country and closes the selection box
        }
    }
    // i, j, k, l moves the background image when in map editor mode
    // o, p makes the background image smaller or bigger
    // [ and ] increases or decreases the opacity of the background image, bgopacity is an input range element
    if (MapEditorMode == true) {
        if (e.key == 'i') {
            var bg = document.getElementById('bgup').click()
        }
        if (e.key == 'k') {
            var bg = document.getElementById('bgdown').click()
        }
        if (e.key == 'j') {
            var bg = document.getElementById('bgleft').click()
        }
        if (e.key == 'l') {
            var bg = document.getElementById('bgright').click()
        }
        if (e.key == 'o') {
            var bg = document.getElementById('bgsmaller').click()
        }
        if (e.key == 'p') {
            var bg = document.getElementById('bgbigger').click()
        }
        if (e.key == '[') {
            var bg = document.getElementById('bgopacity')
            if (bg.value > 0) {
                bg.value = Number(bg.value) - 0.1
                bg.dispatchEvent(new Event('input'))
            }
        }
        if (e.key == ']') {
            var bg = document.getElementById('bgopacity')
            if (bg.value < 1) {
                bg.value = Number(bg.value) + 0.1
                bg.dispatchEvent(new Event('input'))
            }
        }   
    }
})

// document.addEventListener('mousedown', movemap)
document.addEventListener("mousedown", (event) => {
    if (event.button === 1) {
        removehandbox()
    //   console.log("Middle mouse button clicked!");
        var x = event.target
        centerScreen(x)
        console.log(event.target)
    }
    if (event.button === 0) {
    //   console.log("Left mouse button clicked");
        if (event.target.parentElement.id == 'handbox') { return }
        removehandbox()
        thetile = event.target
        if (MapEditorMode == true) {mapeditormake(event.target)}
    }
    if (event.button === 2) {
    //   console.log("Right mouse button clicked");
        removehandbox()
        renderhandbox(event.target)
        console.log(event.target)
    }
  });

document.addEventListener('contextmenu', () => {
    event.preventDefault()
})

document.addEventListener('wheel', () => {
    removehandbox()
    deltaY = event.deltaY
    var e = event.target
    if (deltaY < 0) {
        zoomIn(e)
      } else if (deltaY > 0) {
        zoomOut(e)
      }
    centerScreen(e)
})

var resizeTimer
window.addEventListener('resize', () => {
    removehandbox()
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(centerDiv(), 100)
})
