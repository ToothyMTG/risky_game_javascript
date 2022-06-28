
renderwelcomescreen ()
ldb = {}
//ldb.mycnt = Country[5].split(' ')
//ldb.mycnt = 'hehe'
rendermenu ()
renderinfobox ()
rendermenubuttons ()
renderstatebox ()
rendermapframe ()
rendermap ()
populatemap ()
//rendercapitals ()
//renderonlycapitalmode ()
//randommode ()
//opacityhandler ()
//distributepower ()
renderdiplomacy ()
renderpreference ()
Allymap[0] = []
//renderpowerranking ()
//renderhandbox ()
//populatehandbox ()
//document.getElementById('newgame').click()
generatefriendmap ()
inithistory ()
renderwhokilled ()
//populatehistory ()
//startgame ()
//stoploop ()
//ldb.friends.ccpl.ccde = 10
//renderallies('ccpl')
//setTimeout(stoploop,5000)
//rendercountrystats ()
//mapgenerator ()
//ldb = JSON.parse(localStorage.debug)
//renderhistorygraph ('ccit')
//gettiles ()
savebutton ()
//document.getElementById('savebutton').click()

function startgamedebug () {
    document.getElementById('newgame').click()
    document.getElementById('selgmo').value = 0
    document.getElementById('selcnt').value = 'noval'
    startgame ()
    ldb.mycnt = 'specator 0 0'
    stoploop ()
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
cw_debug()
//startgamedebug ()
nb_debug ()
ix_debug ()