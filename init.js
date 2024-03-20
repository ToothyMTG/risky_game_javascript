function gameinit () {
    renderwelcomescreen ()
    ldb = {}
    rendermenu ()
    // renderinfobox ()
    // rendermenubuttons ()
    // renderstatebox ()
    rendermapframe ()
    centerDiv()
    rendermap ()
    populatemap ()
    renderdiplomacy ()
    renderpreference ()
    Allymap[0] = []
    generatefriendmap ()
    inithistory ()
    renderwhokilled ()
    // savebutton ()
    cw_init ()
    // nb_render ()
    th_init ()
}
function startgamedebug () {
    document.getElementById('newgame').click()
    document.getElementById('selgmo').value = 4
    document.getElementById('selcnt').value = 'noval'
    startgame ()
    ldb.mycnt = 'spectator 0 0'
    ldb.pow = 200
    stoploop ()
    //document.getElementById('savebutton').click()
}
function cw_debug () {
    cw_init ()
    //cw_render ()
    //cw_runner ()
}
function nb_debug () {
    nb_render ()    
}
function ix_debug () {
    ix_tiles ()
}
function th_debug () {
    ldb.tilehistory[700].push([2,2])
    ldb.tilehistory[700].push([2,5])
    ldb.tilehistory[700].push([2,7])
    ldb.tilehistory[700].push([3,2])
    //th_populate ()
    //th_render (700)
}

gameinit ()
//cw_debug()
startgamedebug ()
//th_debug ()
//document.getElementById('loadgame').click()
//nb_debug ()
//ix_debug ()
//du_renderupload ()