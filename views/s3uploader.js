var app =  angular.module('s3uploader', []);
app.controller('fileSelection', function ($http){
		var fileName;
		var file;
		this.fileNameFetch=function() {
			fileName = document.getElementById('myFile');
			console.log(fileName.value);
			file = fileName.files[0];
			var fd = new FormData();
        	fd.append('file', file);
			$http.post('/api/upload', fd, {headers: {'Content-Type': undefined}})
				.then(function(){
					console.log("success");
				}, 
				function(){
					console.log("failure");
				});
		};
	});
