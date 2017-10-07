QFramework.UI = (function (){

	var UI = {

		format: {
			numberof: function (numberof, value, suffix){ keys = [2, 0, 1, 1, 1, 2]; mod = numberof % 100; suffix_key = mod > 4 && mod < 20 ? 2 : keys[Math.min(mod%10, 5)]; return value+suffix[suffix_key]; },
			utToDate: function (utime, st){ nDateTime = Math.abs(Quack.server_time - parseInt(utime)); nDate = nDateTime; stringStart = ''; if(nDate >= 60){	nDate /= 60; if(nDate >= 60){ nDate /= 60;	if(nDate >= 24){nDate /= 24;	if(nDate >= 31){	nDate /= 31;	if(nDate >= 12){ nDate /= 12; stringStart = ''; arrayEnd = ['год', 'года', 'лет']; } else { stringStart = 'месяц'; arrayEnd = ['', 'а', 'ев']; }	}else{ stringStart = 'д'; arrayEnd = ['ень', 'ня', 'ней']; } }else{ stringStart = 'час'; arrayEnd = ['', 'а', 'ов'];} } else{ stringStart = 'мин'; arrayEnd = ['уту', 'уты', 'ут']; } } else { stringStart = 'сек'; arrayEnd = ['унду', 'унды', 'унд']; } nDate = Math.floor(nDate); if(st == undefined){ nDate = '<span class="dateRedactFunc" id="time'+parseInt(utime)+'">' + nDate + ' ' + QFramework.UI
			.format.numberof(nDate, stringStart, arrayEnd) + '</span>'; } else { nDate = nDate + ' ' + QFramework.UI.format.numberof(nDate, stringStart, arrayEnd); } return nDate;  }
		},

		windows: {

			controls: {
				open: function (content){
					var layer = UI.windows.createLayer(content);
					layer.id = UI.windows.stack.length;

					if(UI.windows.stack.length > 0){
						$(UI.windows.stack[UI.windows.stack.length - 1].view).addClass('hidden');
					}

					UI.windows.stack.push(layer);

					var windows = document.getElementsByClassName('windows')[0];
					windows.appendChild(layer.view);

					var width_withScroll = parseInt($('body').css('width'));
					$(windows).removeClass("hidden");

					$('body').css({'overflow': 'hidden'});
					$('body').css({paddingRight:  parseInt($('body').css('width')) - width_withScroll});
				},

				close: function (){
					var layer = UI.windows.stack[UI.windows.stack.length - 1];

					var windows = document.getElementsByClassName('windows')[0];
					console.log(layer.view.innerHTML);
					windows.removeChild(layer.view);

					UI.windows.stack.splice(layer.id, 1);
					console.log(UI.windows.stack );
					
					if(UI.windows.stack.length > 0){
						$(UI.windows.stack[UI.windows.stack.length - 1].view).removeClass('hidden');

					} else {
						$('body').css({'overflow': ''});
						$('body').css({paddingRight:  ''});

						$(windows).addClass('hidden');
					}
				}
			},

			createLayer: function (content){
				var newLayer = document.createElement('div');
				newLayer.className = "window";

				newLayer.appendChild(content);



				return {
					id: -1,
					view: newLayer
				};

			},

			stack: [],

		},

		alert: function (title, content, buttons){
			var root_alert = document.createElement('div');
			root_alert.className = "alert_center";

			var alertDiv = document.createElement('div');
			alertDiv.className = "alert";

				var panelDiv = document.createElement('div');
				panelDiv.className = "panel";

					var textDiv = document.createElement('div');
					textDiv.className  = "text";
					textDiv.innerHTML = title;

					var funcDiv = document.createElement('div');
					funcDiv.className = "func";

						var closeDiv = document.createElement('div');
						closeDiv.className = "close";
						closeDiv.addEventListener('click', function (e){
							UI.windows.controls.close();
						});

					funcDiv.appendChild(closeDiv);

				panelDiv.appendChild(textDiv);
				panelDiv.appendChild(funcDiv);

				alertDiv.appendChild(panelDiv);

				if(content){

					var contentDiv = document.createElement('div');
					contentDiv.className = "content";

					if (content.nodeName){
						contentDiv.appendChild(content);
					} else {
						contentDiv.innerHTML = content;
					}

					alertDiv.appendChild(contentDiv);

				}

				if(buttons){

					var buttonsDiv = document.createElement('div');
					buttonsDiv.className = "buttons";

					if (buttons.nodeName){
						buttonsDiv.appendChild(buttons);
					} else {
						buttonsDiv.innerHTML = buttons;
					}


					alertDiv.appendChild(buttonsDiv);
				}
			

			root_alert.appendChild(alertDiv);
			UI.windows.controls.open(root_alert);
		}
	}

	return UI;
})();