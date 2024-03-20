document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
        var cur = document.getElementById(wherefocus)
        var newid = Number(cur.id) - 1
        document.getElementById('field' + newid).focus()  
    }
    if (e.key === 'ArrowRight') {
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
        if (Turns > 0) {
            act ()      
        }
    }
})

// document.addEventListener('mousedown', movemap)
document.addEventListener("mousedown", (event) => {
    if (event.button === 1) {
    //   console.log("Middle mouse button clicked!");
      var x = event.target
      centerScreen(x)
    }
    if (event.button === 0) {
      console.log("Left mouse button clicked");
      console.log(event.target)
      thetile = event.target
    }
    if (event.button === 2) {
      console.log("Right mouse button clicked");
    }
  });

document.addEventListener('contextmenu', () => {
    event.preventDefault()
})

document.addEventListener('wheel', () => {
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
    clearTimeout(resizeTimer)
    resizeTimer = setTimeout(centerDiv(), 100)
})
