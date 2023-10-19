function du_download () {
    ix_tiles()
    var content = JSON.stringify(ldb)
    var contentType = 'text/plain'
    var fileName = 'savefile.json'
    var a = document.createElement("a");
    var file = new Blob([content], { type: contentType });
	a.href = URL.createObjectURL(file);
	a.download = fileName;
	a.click();
}

function du_renderupload () {
    var input = document.createElement('input')
    var lgdiv = document.getElementById('lgdiv')
    input.type = 'file'
    input.id = 'sf-upload'
    input.classList.add('du-renderupload')
    lgdiv.appendChild(input)
    input.onchange = () => {
        du_upload ()
    }
}

function du_upload () {
    var file = document.getElementById('sf-upload').files[0]
    if (file.length <= 0) {
        return false;
    }

    var fr = new FileReader ();
    fr.onload =  (e) => {
        var result = JSON.parse(e.target.result)
        if (result.mycnt == undefined) {
            window.alert('This file is not a savefile or is corrupted')
            return
        }
        du_loadgame(result)
    }

    fr.readAsText(file)
}

function du_loadgame (x) {
    ldb = x
    ix_rendertiles ()
    opacityhandler ()
    loopstate = 0
    document.getElementById('welcomebox').style.display = 'none'
    renderhandbox ()
}