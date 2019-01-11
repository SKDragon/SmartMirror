// const {dialog} = require('electron').remote;
// const pic_url="";
// //var {dialog} = remote;
// document.getElementById('explorer').addEventListener("click", () =>{
//   dialog.showOpenDialog({properties: ['openFile'], filters: [{name: 'Images',
//   extensions:['jpg', 'png', 'jpeg']}]}, selectedFiles => console.log(selectedFiles));
// }, false);

// const {dialog} = require('electron').remote;
// var app = angular.module('app', ['ngRoute']);
//
// // const {remote} = require('electron');
//
// app.service('image', function() {
// 	var imagePath = "";
// 	var dimesions = [];
// 	this.setImagePath = function(path) {
// 		imagePath = path;
// 	};
// 	this.getImagePath = function() {
// 		return imagePath;
// 	};
// 	this.setImageDimensions = function(imgDimesions) {
// 		dimesions = imgDimesions;
// 	};
// 	this.getImageDimensions = function() {
// 		return dimesions;
// 	};
// });
//
// app.controller('homeCtrl', function($scope, $location, image) {
// 	$scope.pickFile = function() {
// 		dialog.showOpenDialog({
// 			properties: ['openFile'],
// 			filters: [{
// 				name: 'Images',
// 				extensions: ['jpg', 'jpeg', 'png']
// 			}]
// 		}, function(file) {
// 			if(!!file) {
// 				var path = file[0];
// 				image.setImagePath(path);
// 				var sizeof = require('image-size');
//
// 				var dimesions = sizeof(path); // dimesions.width and dimesions.height
//
// 				image.setImageDimensions(dimesions);
// 				$location.path('/edit');
// 				$scope.$apply();
// 			}
// 		});
// 	};
// });

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
