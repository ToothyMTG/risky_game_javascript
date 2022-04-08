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
        var newid = Number(cur.id) - 41
        document.getElementById('field' + newid).focus()  
    }
    if (e.key === 'ArrowDown') {
        var cur = document.getElementById(wherefocus)
        var newid = Number(cur.id) + 41
        document.getElementById('field' + newid).focus()  
    }
    if (e.key === 'Escape') {
        var item = document.querySelector('.exitbut')
        if (item == null) {return}
        item.parentElement.remove()
        focuscentral(ldb.mycnt[1])
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
        round()
    }
    if (e.code == 'Space') {
        if (Turns > 0) {
            act ()      
        }
    }
})