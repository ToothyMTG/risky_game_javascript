function gameinit () {
    renderwelcomescreen ()
    ldb = {}
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
    createallymap ()
    inithistory ()
    renderwhokilled ()
    // savebutton ()
    cw_init ()
    cw_distributenocw ()
    // nb_render ()
    th_init ()
    Tiles = document.getElementsByClassName('tile')
}
function startgamedebug () {
    document.getElementById('newgame').click()
    // document.getElementById('selgmo').value = 0
    document.getElementById('selcnt').value = 'ccpl'
    document.getElementById('startbut').click()
    // startgame ()
    // ldb.mycnt = '0 0 0'
    // ldb.mycnt = 'Poland'
    // ldb.pow = 50
    // stoploop ()
    // moveToCentre()
    //document.getElementById('savebutton').click()
    opacityhandler()
}
function cw_debug () {
    cw_init ()
    cw_distributenocw ()
    ldb.cw.cws[5] = 2
    cw_render ()
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
// document.getElementById('newgame').click()
// startgamedebug ()
// signunion('ccpl','cccz')
// askforunion('ccde','ccpl')
// askforpeace('ccfr','ccpl')
// askforunion('ccgb','ccpl')
// document.getElementById('diplomabut').click()
// zoomOnCountry('ccpl')
// everyoneisally()
// getcolormap()
// rendermainmenu()
// populatehistory()
// populatehistory()
// populatehistory()
// renderstatsbox()
// renderpowerpie()
// renderintegritychart()
// renderpowerranking()
// renderteritoryranking()
// loadgame('saveslot0')
// cw_debug()
// ix_t_code('cccz')
// ix_gatherfacts(cix)

//th_debug ()
//document.getElementById('loadgame').click()
//nb_debug ()
//ix_debug ()
//du_renderupload ()