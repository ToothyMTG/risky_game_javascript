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
    }
    if (e.key === '1') {
        renderteritoryranking ()
    }
    if (e.key === '2') {
        renderpowerranking ()
    }
})