document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') {
        var cur = document.getElementById(wherefocus)
        var newid = Number(cur.id) - 1
        document.getElementById(newid).focus()  
    }
    if (e.key === 'ArrowRight') {
        var cur = document.getElementById(wherefocus)
        var newid = Number(cur.id) + 1
        document.getElementById(newid).focus()  
    }
    if (e.key === 'ArrowUp') {
        var cur = document.getElementById(wherefocus)
        var newid = Number(cur.id) - 50
        document.getElementById(newid).focus()  
    }
    if (e.key === 'ArrowDown') {
        var cur = document.getElementById(wherefocus)
        var newid = Number(cur.id) + 50
        document.getElementById(newid).focus()  
    }
})