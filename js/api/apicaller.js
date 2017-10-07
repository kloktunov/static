QFramework.Api = {	

	init: function (domain){
		QFramework.Api.domain = domain;
	}, 

	domain: null,

	call: function (method, param, func){
			param.method = method;
			urlParam = $.param(param);

			$.getJSON(QFramework.Api.domain + "/" + method + "?" +urlParam+"&callback=?", function (data) {
				console.log(data);
				func(data);
			});
		}
	},

	Me: {
		uid: 0,
		auth_hash: ""
	},
	
	server_time: 0
}