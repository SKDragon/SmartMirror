var pic_url= "";
const {dialog}= require('electron').remote;
document.getElementById('explorer').addEventListener("click", ()=>{
  dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'Images',
  extensions:['jpg', 'png', 'jpeg']}]}, function (files) {
        if (files !== undefined) {
            //alert(files[0]);
						document.getElementById('pic').src= files[0];
						//alert(document.getElementById('pic').getImagePath);
        }
			});
		});
