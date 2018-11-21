const remote = require('electron');

function openfile(){
  var {dialog} = remote;
  dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'Images', extensions:['jpg', 'png', 'jpeg']}]});
  function(file){
    console.log(file);
  }



}
