"use strict";
var storageLocal=function(){
	var r=function(r,t,a){
		var e={};
		return e[r]=JSON.stringify(t),
		chrome.storage.local.set(e,a),!0
	},
	t=function(r,t,a){
		var e={};
		return e[r]=JSON.stringify(t),
		chrome.storage.local.get(e,
		function(t){
			var e={};
			e[r]=JSON.parse(t[r]),
			a(e)
		}),!0
	};
	return{
		save:r,load:t
	}
}();