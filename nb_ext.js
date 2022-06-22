var mainframe = document.getElementById('mainframe')

function nb_render () {
    var div = document.createElement('div')
    div.classList.add('nb_box')
    div.id = 'nb_box'
    mainframe.appendChild(div)
}

function nb_push (x, p) {
    var box = document.getElementById('nb_box')
    var msg = document.createElement('p') 
    msg.innerHTML = x
    msg.classList.add('nb_msg')
    if (p == 0) {msg.style.color = 'black'}
    if (p == 1) {msg.style.color = 'red'}
    if (p == 2) {msg.style.color = 'blue'}
    box.appendChild(msg)
    box.scrollTop = box.scrollHeight
}