
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
    startgame ()
    stoploop ()
    ldb.cw[0].countries = ['ccir','ccgb']
    ldb.mycnt = ['Ireland','ccir','1']
}

function cw_debug () {
    cw_init ()
    //cw_render ()
    //cw_runner ()
}

cw_debug()
//startgamedebug ()