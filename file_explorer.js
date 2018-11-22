const {dialog} = require('electron').remote;
const pic_url="";
//var {dialog} = remote;
document.getElementById('explorer').addEventListener("click", () =>{
  dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'Images', extensions:['jpg', 'png', 'jpeg']}]}, selectedFiles => console.log(selectedFiles));
}, false);
