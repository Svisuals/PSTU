// Garden Gnome Software - Skin
// Pano2VR 6.0.6/17336
// Filename: PSTU.ggsk
// Generated 2024-06-25T15:31:15

function pano2vrSkin(player,base) {
	player.addVariable('opt_3d_preview', 2, true);
	var me=this;
	var skin=this;
	var flag=false;
	var hotspotTemplates={};
	var skinKeyPressed = 0;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	var hs,el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	this.callNodeChange=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggNodeChange) {
				e.ggNodeChange();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('configloaded', function() { me.callNodeChange(me.divSkin); });
	player.addListener('changenode', function() { me.ggUserdata=player.userdata; me.callNodeChange(me.divSkin); });
	
	var parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		el=me._enter_vr=document.createElement('div');
		els=me._enter_vr__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMH'+
			'B4IiB5PSIwcHgiIHdpZHRoPSIzMnB4Ig0KCSBoZWlnaHQ9IjMycHgiIHZpZXdCb3g9Ii0zMzQ1LjI1IC0yNjA2IDMyIDMyIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IC0zMzQ1LjI1IC0yNjA2IDMyIDMyIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnIGlkPSJMYXllcl8xIj4NCjwvZz4NCjxnIGlkPSJFYmVuZV8xIj4NCgk8Zz4NCgkJPGc+DQoJCQk8cGF0aCBmaWxsPSIjMUExNzFCIiBkPSJNLTMzMjkuMjQ5LTI2MDIuNWMtNi44OTIsMC0xMi41LDUuNjA3LTEyLjUsMTIuNXM1LjYwNywxMi41LDEyLjUsMTIuNWM2Ljg5MywwLDEyLjUtNS42MDcsMTIuNS0xMi41DQoJCQkJUy0zMzIyLjM1NS0y'+
			'NjAyLjUtMzMyOS4yNDktMjYwMi41eiBNLTMzMjkuMjQ5LTI1ODAuMTMyYy01LjQ0MSwwLTkuODctNC40MjctOS44Ny05Ljg2OGMwLTUuNDQyLDQuNDI5LTkuODY5LDkuODctOS44NjkNCgkJCQljNS40NDIsMCw5Ljg3LDQuNDI4LDkuODcsOS44NjlDLTMzMTkuMzc4LTI1ODQuNTYtMzMyMy44MDUtMjU4MC4xMzItMzMyOS4yNDktMjU4MC4xMzJ6Ii8+DQoJCQk8cGF0aCBmaWxsPSIjMUExNzFCIiBkPSJNLTMzMjEuNTg5LTI1OTMuODA4Yy0wLjktMS4yNi0yLjM5OS0xLjQyMi0zLjYwNC0xLjQyMmgtMS43MDR2LTEuNjQ2YzAtMC42NjgtMC41NDItMS4yMDktMS4yMS0xLjIwOQ0KCQkJCWgtMi4yOD'+
			'FjLTAuNjY4LDAtMS4yMSwwLjU0MS0xLjIxLDEuMjA5djEuNjQ2aC0xLjcwMmMtMS4yMDUsMC0yLjcwNCwwLjE2Mi0zLjYwNiwxLjQyMmMtMC42ODgsMC45NjEtMS4wMDcsMi4yMi0xLjAwNywzLjk2Mw0KCQkJCWMwLDIuMSwwLjYwMSwzLjgxNywxLjYwOSw0LjU5M2MwLjg4MSwwLjY3OSwxLjUwNiwwLjc5MywyLjU3MywwLjc5M2MxLjI1OCwwLDIuMjE0LTAuNDksMi45ODItMC44ODMNCgkJCQljMC41NzktMC4yOTcsMS4wMzYtMC41MzEsMS41MDEtMC41MzFzMC45MjMsMC4yMzQsMS41MDIsMC41MzJjMC43NjcsMC4zOTMsMS43MjQsMC44ODIsMi45ODIsMC44ODINCgkJCQljMS4wNjUsMCwxLjY5'+
			'LTAuMTE0LDIuNTcyLTAuNzkyYzEuMDA5LTAuNzc2LDEuNjExLTIuNDkzLDEuNjExLTQuNTk1Qy0zMzIwLjU4MS0yNTkxLjU4OC0zMzIwLjkwMi0yNTkyLjg0OC0zMzIxLjU4OS0yNTkzLjgwOHoNCgkJCQkgTS0zMzIzLjY2Ny0yNTg3LjE2OGMtMC4zMzUsMC4yNTktMC4zNzgsMC4yOTItMS4wOTcsMC4yOTJjLTAuNjc1LDAtMS4yMzMtMC4yODctMS44NzktMC42MTgNCgkJCQljLTAuNzI5LTAuMzczLTEuNTU3LTAuNzk2LTIuNjA1LTAuNzk2cy0xLjg3NSwwLjQyMy0yLjYwNCwwLjc5NmMtMC42NDYsMC4zMzItMS4yMDQsMC42MTgtMS44NzksMC42MTgNCgkJCQljLTAuNzE5LDAtMC43NjItMC4wMz'+
			'MtMS4wOTYtMC4yOTJjLTAuMTQyLTAuMTEyLTAuNjY4LTAuODkzLTAuNjY4LTIuNjc3YzAtMS4xOTcsMC4xODEtMi4wMzMsMC41NTUtMi41NTUNCgkJCQljMC4xMjYtMC4xNzYsMC40MzQtMC40MTEsMS42NC0wLjQxMWg4LjEwN2MxLjIwNSwwLDEuNTEyLDAuMjM0LDEuNjM4LDAuNDExYzAuMzc0LDAuNTIyLDAuNTU2LDEuMzU4LDAuNTU2LDIuNTU1DQoJCQkJQy0zMzIzLTI1ODguMDYtMzMyMy41MjctMjU4Ny4yOC0zMzIzLjY2Ny0yNTg3LjE2OHoiLz4NCgkJPC9nPg0KCQk8ZyBvcGFjaXR5PSIwLjQiPg0KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMUExNzFCIiBzdHJva2Utd2lkdGg9'+
			'IjEuNSIgZD0iTS0zMzI5LjI0OS0yNjAyLjVjLTYuODkyLDAtMTIuNSw1LjYwNy0xMi41LDEyLjVzNS42MDcsMTIuNSwxMi41LDEyLjUNCgkJCQljNi44OTMsMCwxMi41LTUuNjA3LDEyLjUtMTIuNVMtMzMyMi4zNTUtMjYwMi41LTMzMjkuMjQ5LTI2MDIuNXogTS0zMzI5LjI0OS0yNTgwLjEzMmMtNS40NDEsMC05Ljg3LTQuNDI3LTkuODctOS44NjgNCgkJCQljMC01LjQ0Miw0LjQyOS05Ljg2OSw5Ljg3LTkuODY5YzUuNDQyLDAsOS44Nyw0LjQyOCw5Ljg3LDkuODY5Qy0zMzE5LjM3OC0yNTg0LjU2LTMzMjMuODA1LTI1ODAuMTMyLTMzMjkuMjQ5LTI1ODAuMTMyeiIvPg0KCQkJPHBhdGggZmlsbD'+
			'0ibm9uZSIgc3Ryb2tlPSIjMUExNzFCIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTS0zMzIxLjU4OS0yNTkzLjgwOGMtMC45LTEuMjYtMi4zOTktMS40MjItMy42MDQtMS40MjJoLTEuNzA0di0xLjY0Ng0KCQkJCWMwLTAuNjY4LTAuNTQyLTEuMjA5LTEuMjEtMS4yMDloLTIuMjgxYy0wLjY2OCwwLTEuMjEsMC41NDEtMS4yMSwxLjIwOXYxLjY0NmgtMS43MDJjLTEuMjA1LDAtMi43MDQsMC4xNjItMy42MDYsMS40MjINCgkJCQljLTAuNjg4LDAuOTYxLTEuMDA3LDIuMjItMS4wMDcsMy45NjNjMCwyLjEsMC42MDEsMy44MTcsMS42MDksNC41OTNjMC44ODEsMC42NzksMS41MDYsMC43OTMsMi41NzMs'+
			'MC43OTMNCgkJCQljMS4yNTgsMCwyLjIxNC0wLjQ5LDIuOTgyLTAuODgzYzAuNTc5LTAuMjk3LDEuMDM2LTAuNTMxLDEuNTAxLTAuNTMxczAuOTIzLDAuMjM0LDEuNTAyLDAuNTMyDQoJCQkJYzAuNzY3LDAuMzkzLDEuNzI0LDAuODgyLDIuOTgyLDAuODgyYzEuMDY1LDAsMS42OS0wLjExNCwyLjU3Mi0wLjc5MmMxLjAwOS0wLjc3NiwxLjYxMS0yLjQ5MywxLjYxMS00LjU5NQ0KCQkJCUMtMzMyMC41ODEtMjU5MS41ODgtMzMyMC45MDItMjU5Mi44NDgtMzMyMS41ODktMjU5My44MDh6IE0tMzMyMy42NjctMjU4Ny4xNjhjLTAuMzM1LDAuMjU5LTAuMzc4LDAuMjkyLTEuMDk3LDAuMjkyDQoJCQkJYy'+
			'0wLjY3NSwwLTEuMjMzLTAuMjg3LTEuODc5LTAuNjE4Yy0wLjcyOS0wLjM3My0xLjU1Ny0wLjc5Ni0yLjYwNS0wLjc5NnMtMS44NzUsMC40MjMtMi42MDQsMC43OTYNCgkJCQljLTAuNjQ2LDAuMzMyLTEuMjA0LDAuNjE4LTEuODc5LDAuNjE4Yy0wLjcxOSwwLTAuNzYyLTAuMDMzLTEuMDk2LTAuMjkyYy0wLjE0Mi0wLjExMi0wLjY2OC0wLjg5My0wLjY2OC0yLjY3Nw0KCQkJCWMwLTEuMTk3LDAuMTgxLTIuMDMzLDAuNTU1LTIuNTU1YzAuMTI2LTAuMTc2LDAuNDM0LTAuNDExLDEuNjQtMC40MTFoOC4xMDdjMS4yMDUsMCwxLjUxMiwwLjIzNCwxLjYzOCwwLjQxMQ0KCQkJCWMwLjM3NCwwLjUyMiww'+
			'LjU1NiwxLjM1OCwwLjU1NiwyLjU1NUMtMzMyMy0yNTg4LjA2LTMzMjMuNTI3LTI1ODcuMjgtMzMyMy42NjctMjU4Ny4xNjh6Ii8+DQoJCTwvZz4NCgkJPGc+DQoJCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTMzMjkuMjQ5LTI2MDIuNWMtNi44OTIsMC0xMi41LDUuNjA3LTEyLjUsMTIuNXM1LjYwNywxMi41LDEyLjUsMTIuNWM2Ljg5MywwLDEyLjUtNS42MDcsMTIuNS0xMi41DQoJCQkJUy0zMzIyLjM1NS0yNjAyLjUtMzMyOS4yNDktMjYwMi41eiBNLTMzMjkuMjQ5LTI1ODAuMTMyYy01LjQ0MSwwLTkuODctNC40MjctOS44Ny05Ljg2OGMwLTUuNDQyLDQuNDI5LTkuODY5LDkuODctOS44Nj'+
			'kNCgkJCQljNS40NDIsMCw5Ljg3LDQuNDI4LDkuODcsOS44NjlDLTMzMTkuMzc4LTI1ODQuNTYtMzMyMy44MDUtMjU4MC4xMzItMzMyOS4yNDktMjU4MC4xMzJ6Ii8+DQoJCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTMzMjEuNTg5LTI1OTMuODA4Yy0wLjktMS4yNi0yLjM5OS0xLjQyMi0zLjYwNC0xLjQyMmgtMS43MDR2LTEuNjQ2YzAtMC42NjgtMC41NDItMS4yMDktMS4yMS0xLjIwOQ0KCQkJCWgtMi4yODFjLTAuNjY4LDAtMS4yMSwwLjU0MS0xLjIxLDEuMjA5djEuNjQ2aC0xLjcwMmMtMS4yMDUsMC0yLjcwNCwwLjE2Mi0zLjYwNiwxLjQyMmMtMC42ODgsMC45NjEtMS4wMDcsMi4yMi0x'+
			'LjAwNywzLjk2Mw0KCQkJCWMwLDIuMSwwLjYwMSwzLjgxNywxLjYwOSw0LjU5M2MwLjg4MSwwLjY3OSwxLjUwNiwwLjc5MywyLjU3MywwLjc5M2MxLjI1OCwwLDIuMjE0LTAuNDksMi45ODItMC44ODMNCgkJCQljMC41NzktMC4yOTcsMS4wMzYtMC41MzEsMS41MDEtMC41MzFzMC45MjMsMC4yMzQsMS41MDIsMC41MzJjMC43NjcsMC4zOTMsMS43MjQsMC44ODIsMi45ODIsMC44ODINCgkJCQljMS4wNjUsMCwxLjY5LTAuMTE0LDIuNTcyLTAuNzkyYzEuMDA5LTAuNzc2LDEuNjExLTIuNDkzLDEuNjExLTQuNTk1Qy0zMzIwLjU4MS0yNTkxLjU4OC0zMzIwLjkwMi0yNTkyLjg0OC0zMzIxLjU4OS0yNT'+
			'kzLjgwOHoNCgkJCQkgTS0zMzIzLjY2Ny0yNTg3LjE2OGMtMC4zMzUsMC4yNTktMC4zNzgsMC4yOTItMS4wOTcsMC4yOTJjLTAuNjc1LDAtMS4yMzMtMC4yODctMS44NzktMC42MTgNCgkJCQljLTAuNzI5LTAuMzczLTEuNTU3LTAuNzk2LTIuNjA1LTAuNzk2cy0xLjg3NSwwLjQyMy0yLjYwNCwwLjc5NmMtMC42NDYsMC4zMzItMS4yMDQsMC42MTgtMS44NzksMC42MTgNCgkJCQljLTAuNzE5LDAtMC43NjItMC4wMzMtMS4wOTYtMC4yOTJjLTAuMTQyLTAuMTEyLTAuNjY4LTAuODkzLTAuNjY4LTIuNjc3YzAtMS4xOTcsMC4xODEtMi4wMzMsMC41NTUtMi41NTUNCgkJCQljMC4xMjYtMC4xNzYsMC40'+
			'MzQtMC40MTEsMS42NC0wLjQxMWg4LjEwN2MxLjIwNSwwLDEuNTEyLDAuMjM0LDEuNjM4LDAuNDExYzAuMzc0LDAuNTIyLDAuNTU2LDEuMzU4LDAuNTU2LDIuNTU1DQoJCQkJQy0zMzIzLTI1ODguMDYtMzMyMy41MjctMjU4Ny4yOC0zMzIzLjY2Ny0yNTg3LjE2OHoiLz4NCgkJPC9nPg0KCQk8Zz4NCgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFBMTcxQiIgc3Ryb2tlLXdpZHRoPSIwLjIiIGQ9Ik0tMzMyOS4yNDktMjYwMi41Yy02Ljg5MiwwLTEyLjUsNS42MDctMTIuNSwxMi41czUuNjA3LDEyLjUsMTIuNSwxMi41DQoJCQkJYzYuODkzLDAsMTIuNS01LjYwNywxMi41LTEyLjVTLTMzMj'+
			'IuMzU1LTI2MDIuNS0zMzI5LjI0OS0yNjAyLjV6IE0tMzMyOS4yNDktMjU4MC4xMzJjLTUuNDQxLDAtOS44Ny00LjQyNy05Ljg3LTkuODY4DQoJCQkJYzAtNS40NDIsNC40MjktOS44NjksOS44Ny05Ljg2OWM1LjQ0MiwwLDkuODcsNC40MjgsOS44Nyw5Ljg2OUMtMzMxOS4zNzgtMjU4NC41Ni0zMzIzLjgwNS0yNTgwLjEzMi0zMzI5LjI0OS0yNTgwLjEzMnoiLz4NCgkJCTxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzFBMTcxQiIgc3Ryb2tlLXdpZHRoPSIwLjIiIGQ9Ik0tMzMyMS41ODktMjU5My44MDhjLTAuOS0xLjI2LTIuMzk5LTEuNDIyLTMuNjA0LTEuNDIyaC0xLjcwNHYtMS42NDYNCgkJ'+
			'CQljMC0wLjY2OC0wLjU0Mi0xLjIwOS0xLjIxLTEuMjA5aC0yLjI4MWMtMC42NjgsMC0xLjIxLDAuNTQxLTEuMjEsMS4yMDl2MS42NDZoLTEuNzAyYy0xLjIwNSwwLTIuNzA0LDAuMTYyLTMuNjA2LDEuNDIyDQoJCQkJYy0wLjY4OCwwLjk2MS0xLjAwNywyLjIyLTEuMDA3LDMuOTYzYzAsMi4xLDAuNjAxLDMuODE3LDEuNjA5LDQuNTkzYzAuODgxLDAuNjc5LDEuNTA2LDAuNzkzLDIuNTczLDAuNzkzDQoJCQkJYzEuMjU4LDAsMi4yMTQtMC40OSwyLjk4Mi0wLjg4M2MwLjU3OS0wLjI5NywxLjAzNi0wLjUzMSwxLjUwMS0wLjUzMXMwLjkyMywwLjIzNCwxLjUwMiwwLjUzMg0KCQkJCWMwLjc2NywwLj'+
			'M5MywxLjcyNCwwLjg4MiwyLjk4MiwwLjg4MmMxLjA2NSwwLDEuNjktMC4xMTQsMi41NzItMC43OTJjMS4wMDktMC43NzYsMS42MTEtMi40OTMsMS42MTEtNC41OTUNCgkJCQlDLTMzMjAuNTgxLTI1OTEuNTg4LTMzMjAuOTAyLTI1OTIuODQ4LTMzMjEuNTg5LTI1OTMuODA4eiBNLTMzMjMuNjY3LTI1ODcuMTY4Yy0wLjMzNSwwLjI1OS0wLjM3OCwwLjI5Mi0xLjA5NywwLjI5Mg0KCQkJCWMtMC42NzUsMC0xLjIzMy0wLjI4Ny0xLjg3OS0wLjYxOGMtMC43MjktMC4zNzMtMS41NTctMC43OTYtMi42MDUtMC43OTZzLTEuODc1LDAuNDIzLTIuNjA0LDAuNzk2DQoJCQkJYy0wLjY0NiwwLjMzMi0xLjIw'+
			'NCwwLjYxOC0xLjg3OSwwLjYxOGMtMC43MTksMC0wLjc2Mi0wLjAzMy0xLjA5Ni0wLjI5MmMtMC4xNDItMC4xMTItMC42NjgtMC44OTMtMC42NjgtMi42NzcNCgkJCQljMC0xLjE5NywwLjE4MS0yLjAzMywwLjU1NS0yLjU1NWMwLjEyNi0wLjE3NiwwLjQzNC0wLjQxMSwxLjY0LTAuNDExaDguMTA3YzEuMjA1LDAsMS41MTIsMC4yMzQsMS42MzgsMC40MTENCgkJCQljMC4zNzQsMC41MjIsMC41NTYsMS4zNTgsMC41NTYsMi41NTVDLTMzMjMtMjU4OC4wNi0zMzIzLjUyNy0yNTg3LjI4LTMzMjMuNjY3LTI1ODcuMTY4eiIvPg0KCQk8L2c+DQoJPC9nPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KPC'+
			'9nPg0KPC9zdmc+DQo=';
		me._enter_vr__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;enter_vr;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._enter_vr__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMH'+
			'B4IiB5PSIwcHgiIHdpZHRoPSIzMnB4Ig0KCSBoZWlnaHQ9IjMycHgiIHZpZXdCb3g9Ii0zMzQ1LjI1IC0yNTcxLjMzMyAzMiAzMiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAtMzM0NS4yNSAtMjU3MS4zMzMgMzIgMzIiIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGcgaWQ9IkxheWVyXzEiPg0KPC9nPg0KPGcgaWQ9IkViZW5lXzEiPg0KCTxnPg0KCQk8Zz4NCgkJCTxwYXRoIGZpbGw9IiMxQTE3MUIiIGQ9Ik0tMzMyOS4yNS0yNTY5LjA4M2MtNy41ODEsMC0xMy43NSw2LjE2OC0xMy43NSwxMy43NDljMCw3LjU4Myw2LjE2OCwxMy43NSwxMy43NSwxMy43NQ0KCQkJCWM3LjU4MywwLDEzLjc1LTYu'+
			'MTY3LDEzLjc1LTEzLjc1Qy0zMzE1LjUtMjU2Mi45MTUtMzMyMS42NjctMjU2OS4wODMtMzMyOS4yNS0yNTY5LjA4M3ogTS0zMzI5LjI1LTI1NDQuNDc5DQoJCQkJYy01Ljk4NSwwLTEwLjg1Ny00Ljg2OS0xMC44NTctMTAuODU1YzAtNS45ODYsNC44NzItMTAuODU1LDEwLjg1Ny0xMC44NTVjNS45ODcsMCwxMC44NTcsNC44NzEsMTAuODU3LDEwLjg1NQ0KCQkJCUMtMzMxOC4zOTMtMjU0OS4zNDktMzMyMy4yNjItMjU0NC40NzktMzMyOS4yNS0yNTQ0LjQ3OXoiLz4NCgkJCTxwYXRoIGZpbGw9IiMxQTE3MUIiIGQ9Ik0tMzMyMC44MjUtMjU1OS41MjFjLTAuOTktMS4zODctMi42MzktMS41NjQtMy'+
			'45NjUtMS41NjRoLTEuODc1di0xLjgxMmMwLTAuNzM0LTAuNTk2LTEuMzMtMS4zMzEtMS4zMw0KCQkJCWgtMi41MDljLTAuNzM1LDAtMS4zMzEsMC41OTYtMS4zMzEsMS4zM3YxLjgxMmgtMS44NzNjLTEuMzI1LDAtMi45NzQsMC4xNzgtMy45NjcsMS41NjRjLTAuNzU2LDEuMDU3LTEuMTA3LDIuNDQyLTEuMTA3LDQuMzU5DQoJCQkJYzAsMi4zMSwwLjY2Miw0LjE5OSwxLjc3LDUuMDUzYzAuOTY5LDAuNzQ3LDEuNjU3LDAuODczLDIuODMxLDAuODczYzEuMzg0LDAsMi40MzYtMC41MzksMy4yODEtMC45NzENCgkJCQljMC42MzctMC4zMjcsMS4xNC0wLjU4NCwxLjY1MS0wLjU4NGMwLjUxMiwwLDEu'+
			'MDE1LDAuMjU3LDEuNjUyLDAuNTg0YzAuODQ0LDAuNDMyLDEuODk3LDAuOTcsMy4yODEsMC45Nw0KCQkJCWMxLjE3MSwwLDEuODU5LTAuMTI1LDIuODMtMC44NzFjMS4xMDktMC44NTQsMS43NzItMi43NDMsMS43NzItNS4wNTRDLTMzMTkuNzE1LTI1NTcuMDgxLTMzMjAuMDY4LTI1NTguNDY2LTMzMjAuODI1LTI1NTkuNTIxeg0KCQkJCSBNLTMzMjMuMTExLTI1NTIuMjE4Yy0wLjM2OSwwLjI4NS0wLjQxNiwwLjMyMS0xLjIwNiwwLjMyMWMtMC43NDIsMC0xLjM1Ny0wLjMxNS0yLjA2Ny0wLjY3OQ0KCQkJCWMtMC44MDItMC40MTEtMS43MTItMC44NzYtMi44NjYtMC44NzZjLTEuMTUzLDAtMi4wNj'+
			'IsMC40NjUtMi44NjUsMC44NzZjLTAuNzEsMC4zNjQtMS4zMjUsMC42NzktMi4wNjcsMC42NzkNCgkJCQljLTAuNzkxLDAtMC44MzgtMC4wMzYtMS4yMDUtMC4zMmMtMC4xNTYtMC4xMjMtMC43MzUtMC45ODEtMC43MzUtMi45NDVjMC0xLjMxNywwLjItMi4yMzYsMC42MS0yLjgxMQ0KCQkJCWMwLjEzOC0wLjE5NCwwLjQ3Ny0wLjQ1MiwxLjgwMy0wLjQ1Mmg4LjkxOGMxLjMyNiwwLDEuNjYzLDAuMjU3LDEuODAxLDAuNDUyYzAuNDEyLDAuNTc1LDAuNjExLDEuNDk0LDAuNjExLDIuODExDQoJCQkJQy0zMzIyLjM3Ny0yNTUzLjE5OS0zMzIyLjk1Ni0yNTUyLjM0MS0zMzIzLjExMS0yNTUyLjIxOHoi'+
			'Lz4NCgkJPC9nPg0KCQk8ZyBvcGFjaXR5PSIwLjQiPg0KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMUExNzFCIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTS0zMzI5LjI1LTI1NjkuMDgzYy03LjU4MSwwLTEzLjc1LDYuMTY4LTEzLjc1LDEzLjc0OQ0KCQkJCWMwLDcuNTgzLDYuMTY4LDEzLjc1LDEzLjc1LDEzLjc1YzcuNTgzLDAsMTMuNzUtNi4xNjcsMTMuNzUtMTMuNzVDLTMzMTUuNS0yNTYyLjkxNS0zMzIxLjY2Ny0yNTY5LjA4My0zMzI5LjI1LTI1NjkuMDgzeg0KCQkJCSBNLTMzMjkuMjUtMjU0NC40NzljLTUuOTg1LDAtMTAuODU3LTQuODY5LTEwLjg1Ny0xMC44NTVjMC01Ljk4Ni'+
			'w0Ljg3Mi0xMC44NTUsMTAuODU3LTEwLjg1NQ0KCQkJCWM1Ljk4NywwLDEwLjg1Nyw0Ljg3MSwxMC44NTcsMTAuODU1Qy0zMzE4LjM5My0yNTQ5LjM0OS0zMzIzLjI2Mi0yNTQ0LjQ3OS0zMzI5LjI1LTI1NDQuNDc5eiIvPg0KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMUExNzFCIiBzdHJva2Utd2lkdGg9IjEuNSIgZD0iTS0zMzIwLjgyNS0yNTU5LjUyMWMtMC45OS0xLjM4Ny0yLjYzOS0xLjU2NC0zLjk2NS0xLjU2NGgtMS44NzUNCgkJCQl2LTEuODEyYzAtMC43MzQtMC41OTYtMS4zMy0xLjMzMS0xLjMzaC0yLjUwOWMtMC43MzUsMC0xLjMzMSwwLjU5Ni0xLjMzMSwxLjMzdjEuODEy'+
			'aC0xLjg3M2MtMS4zMjUsMC0yLjk3NCwwLjE3OC0zLjk2NywxLjU2NA0KCQkJCWMtMC43NTYsMS4wNTctMS4xMDcsMi40NDItMS4xMDcsNC4zNTljMCwyLjMxLDAuNjYyLDQuMTk5LDEuNzcsNS4wNTNjMC45NjksMC43NDcsMS42NTcsMC44NzMsMi44MzEsMC44NzMNCgkJCQljMS4zODQsMCwyLjQzNi0wLjUzOSwzLjI4MS0wLjk3MWMwLjYzNy0wLjMyNywxLjE0LTAuNTg0LDEuNjUxLTAuNTg0YzAuNTEyLDAsMS4wMTUsMC4yNTcsMS42NTIsMC41ODQNCgkJCQljMC44NDQsMC40MzIsMS44OTcsMC45NywzLjI4MSwwLjk3YzEuMTcxLDAsMS44NTktMC4xMjUsMi44My0wLjg3MWMxLjEwOS0wLjg1NC'+
			'wxLjc3Mi0yLjc0MywxLjc3Mi01LjA1NA0KCQkJCUMtMzMxOS43MTUtMjU1Ny4wODEtMzMyMC4wNjgtMjU1OC40NjYtMzMyMC44MjUtMjU1OS41MjF6IE0tMzMyMy4xMTEtMjU1Mi4yMThjLTAuMzY5LDAuMjg1LTAuNDE2LDAuMzIxLTEuMjA2LDAuMzIxDQoJCQkJYy0wLjc0MiwwLTEuMzU3LTAuMzE1LTIuMDY3LTAuNjc5Yy0wLjgwMi0wLjQxMS0xLjcxMi0wLjg3Ni0yLjg2Ni0wLjg3NmMtMS4xNTMsMC0yLjA2MiwwLjQ2NS0yLjg2NSwwLjg3Ng0KCQkJCWMtMC43MSwwLjM2NC0xLjMyNSwwLjY3OS0yLjA2NywwLjY3OWMtMC43OTEsMC0wLjgzOC0wLjAzNi0xLjIwNS0wLjMyYy0wLjE1Ni0wLjEy'+
			'My0wLjczNS0wLjk4MS0wLjczNS0yLjk0NQ0KCQkJCWMwLTEuMzE3LDAuMi0yLjIzNiwwLjYxLTIuODExYzAuMTM4LTAuMTk0LDAuNDc3LTAuNDUyLDEuODAzLTAuNDUyaDguOTE4YzEuMzI2LDAsMS42NjMsMC4yNTcsMS44MDEsMC40NTINCgkJCQljMC40MTIsMC41NzUsMC42MTEsMS40OTQsMC42MTEsMi44MTFDLTMzMjIuMzc3LTI1NTMuMTk5LTMzMjIuOTU2LTI1NTIuMzQxLTMzMjMuMTExLTI1NTIuMjE4eiIvPg0KCQk8L2c+DQoJCTxnPg0KCQkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0zMzI5LjI1LTI1NjkuMDgzYy03LjU4MSwwLTEzLjc1LDYuMTY4LTEzLjc1LDEzLjc0OWMwLDcuNT'+
			'gzLDYuMTY4LDEzLjc1LDEzLjc1LDEzLjc1DQoJCQkJYzcuNTgzLDAsMTMuNzUtNi4xNjcsMTMuNzUtMTMuNzVDLTMzMTUuNS0yNTYyLjkxNS0zMzIxLjY2Ny0yNTY5LjA4My0zMzI5LjI1LTI1NjkuMDgzeiBNLTMzMjkuMjUtMjU0NC40NzkNCgkJCQljLTUuOTg1LDAtMTAuODU3LTQuODY5LTEwLjg1Ny0xMC44NTVjMC01Ljk4Niw0Ljg3Mi0xMC44NTUsMTAuODU3LTEwLjg1NWM1Ljk4NywwLDEwLjg1Nyw0Ljg3MSwxMC44NTcsMTAuODU1DQoJCQkJQy0zMzE4LjM5My0yNTQ5LjM0OS0zMzIzLjI2Mi0yNTQ0LjQ3OS0zMzI5LjI1LTI1NDQuNDc5eiIvPg0KCQkJPHBhdGggZmlsbD0iI0ZGRkZGRiIg'+
			'ZD0iTS0zMzIwLjgyNS0yNTU5LjUyMWMtMC45OS0xLjM4Ny0yLjYzOS0xLjU2NC0zLjk2NS0xLjU2NGgtMS44NzV2LTEuODEyYzAtMC43MzQtMC41OTYtMS4zMy0xLjMzMS0xLjMzDQoJCQkJaC0yLjUwOWMtMC43MzUsMC0xLjMzMSwwLjU5Ni0xLjMzMSwxLjMzdjEuODEyaC0xLjg3M2MtMS4zMjUsMC0yLjk3NCwwLjE3OC0zLjk2NywxLjU2NGMtMC43NTYsMS4wNTctMS4xMDcsMi40NDItMS4xMDcsNC4zNTkNCgkJCQljMCwyLjMxLDAuNjYyLDQuMTk5LDEuNzcsNS4wNTNjMC45NjksMC43NDcsMS42NTcsMC44NzMsMi44MzEsMC44NzNjMS4zODQsMCwyLjQzNi0wLjUzOSwzLjI4MS0wLjk3MQ0KCQ'+
			'kJCWMwLjYzNy0wLjMyNywxLjE0LTAuNTg0LDEuNjUxLTAuNTg0YzAuNTEyLDAsMS4wMTUsMC4yNTcsMS42NTIsMC41ODRjMC44NDQsMC40MzIsMS44OTcsMC45NywzLjI4MSwwLjk3DQoJCQkJYzEuMTcxLDAsMS44NTktMC4xMjUsMi44My0wLjg3MWMxLjEwOS0wLjg1NCwxLjc3Mi0yLjc0MywxLjc3Mi01LjA1NEMtMzMxOS43MTUtMjU1Ny4wODEtMzMyMC4wNjgtMjU1OC40NjYtMzMyMC44MjUtMjU1OS41MjF6DQoJCQkJIE0tMzMyMy4xMTEtMjU1Mi4yMThjLTAuMzY5LDAuMjg1LTAuNDE2LDAuMzIxLTEuMjA2LDAuMzIxYy0wLjc0MiwwLTEuMzU3LTAuMzE1LTIuMDY3LTAuNjc5DQoJCQkJYy0w'+
			'LjgwMi0wLjQxMS0xLjcxMi0wLjg3Ni0yLjg2Ni0wLjg3NmMtMS4xNTMsMC0yLjA2MiwwLjQ2NS0yLjg2NSwwLjg3NmMtMC43MSwwLjM2NC0xLjMyNSwwLjY3OS0yLjA2NywwLjY3OQ0KCQkJCWMtMC43OTEsMC0wLjgzOC0wLjAzNi0xLjIwNS0wLjMyYy0wLjE1Ni0wLjEyMy0wLjczNS0wLjk4MS0wLjczNS0yLjk0NWMwLTEuMzE3LDAuMi0yLjIzNiwwLjYxLTIuODExDQoJCQkJYzAuMTM4LTAuMTk0LDAuNDc3LTAuNDUyLDEuODAzLTAuNDUyaDguOTE4YzEuMzI2LDAsMS42NjMsMC4yNTcsMS44MDEsMC40NTJjMC40MTIsMC41NzUsMC42MTEsMS40OTQsMC42MTEsMi44MTENCgkJCQlDLTMzMjIuMz'+
			'c3LTI1NTMuMTk5LTMzMjIuOTU2LTI1NTIuMzQxLTMzMjMuMTExLTI1NTIuMjE4eiIvPg0KCQk8L2c+DQoJCTxnPg0KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMUExNzFCIiBzdHJva2Utd2lkdGg9IjAuMiIgZD0iTS0zMzI5LjI1LTI1NjkuMDgzYy03LjU4MSwwLTEzLjc1LDYuMTY4LTEzLjc1LDEzLjc0OQ0KCQkJCWMwLDcuNTgzLDYuMTY4LDEzLjc1LDEzLjc1LDEzLjc1YzcuNTgzLDAsMTMuNzUtNi4xNjcsMTMuNzUtMTMuNzVDLTMzMTUuNS0yNTYyLjkxNS0zMzIxLjY2Ny0yNTY5LjA4My0zMzI5LjI1LTI1NjkuMDgzeg0KCQkJCSBNLTMzMjkuMjUtMjU0NC40NzljLTUuOTg1LDAt'+
			'MTAuODU3LTQuODY5LTEwLjg1Ny0xMC44NTVjMC01Ljk4Niw0Ljg3Mi0xMC44NTUsMTAuODU3LTEwLjg1NQ0KCQkJCWM1Ljk4NywwLDEwLjg1Nyw0Ljg3MSwxMC44NTcsMTAuODU1Qy0zMzE4LjM5My0yNTQ5LjM0OS0zMzIzLjI2Mi0yNTQ0LjQ3OS0zMzI5LjI1LTI1NDQuNDc5eiIvPg0KCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMUExNzFCIiBzdHJva2Utd2lkdGg9IjAuMiIgZD0iTS0zMzIwLjgyNS0yNTU5LjUyMWMtMC45OS0xLjM4Ny0yLjYzOS0xLjU2NC0zLjk2NS0xLjU2NGgtMS44NzUNCgkJCQl2LTEuODEyYzAtMC43MzQtMC41OTYtMS4zMy0xLjMzMS0xLjMzaC0yLjUwOWMtMC'+
			'43MzUsMC0xLjMzMSwwLjU5Ni0xLjMzMSwxLjMzdjEuODEyaC0xLjg3M2MtMS4zMjUsMC0yLjk3NCwwLjE3OC0zLjk2NywxLjU2NA0KCQkJCWMtMC43NTYsMS4wNTctMS4xMDcsMi40NDItMS4xMDcsNC4zNTljMCwyLjMxLDAuNjYyLDQuMTk5LDEuNzcsNS4wNTNjMC45NjksMC43NDcsMS42NTcsMC44NzMsMi44MzEsMC44NzMNCgkJCQljMS4zODQsMCwyLjQzNi0wLjUzOSwzLjI4MS0wLjk3MWMwLjYzNy0wLjMyNywxLjE0LTAuNTg0LDEuNjUxLTAuNTg0YzAuNTEyLDAsMS4wMTUsMC4yNTcsMS42NTIsMC41ODQNCgkJCQljMC44NDQsMC40MzIsMS44OTcsMC45NywzLjI4MSwwLjk3YzEuMTcxLDAs'+
			'MS44NTktMC4xMjUsMi44My0wLjg3MWMxLjEwOS0wLjg1NCwxLjc3Mi0yLjc0MywxLjc3Mi01LjA1NA0KCQkJCUMtMzMxOS43MTUtMjU1Ny4wODEtMzMyMC4wNjgtMjU1OC40NjYtMzMyMC44MjUtMjU1OS41MjF6IE0tMzMyMy4xMTEtMjU1Mi4yMThjLTAuMzY5LDAuMjg1LTAuNDE2LDAuMzIxLTEuMjA2LDAuMzIxDQoJCQkJYy0wLjc0MiwwLTEuMzU3LTAuMzE1LTIuMDY3LTAuNjc5Yy0wLjgwMi0wLjQxMS0xLjcxMi0wLjg3Ni0yLjg2Ni0wLjg3NmMtMS4xNTMsMC0yLjA2MiwwLjQ2NS0yLjg2NSwwLjg3Ng0KCQkJCWMtMC43MSwwLjM2NC0xLjMyNSwwLjY3OS0yLjA2NywwLjY3OWMtMC43OTEsMC'+
			'0wLjgzOC0wLjAzNi0xLjIwNS0wLjMyYy0wLjE1Ni0wLjEyMy0wLjczNS0wLjk4MS0wLjczNS0yLjk0NQ0KCQkJCWMwLTEuMzE3LDAuMi0yLjIzNiwwLjYxLTIuODExYzAuMTM4LTAuMTk0LDAuNDc3LTAuNDUyLDEuODAzLTAuNDUyaDguOTE4YzEuMzI2LDAsMS42NjMsMC4yNTcsMS44MDEsMC40NTINCgkJCQljMC40MTIsMC41NzUsMC42MTEsMS40OTQsMC42MTEsMi44MTFDLTMzMjIuMzc3LTI1NTMuMTk5LTMzMjIuOTU2LTI1NTIuMzQxLTMzMjMuMTExLTI1NTIuMjE4eiIvPg0KCQk8L2c+DQoJPC9nPg0KPC9nPg0KPGcgaWQ9IkxheWVyXzIiPg0KPC9nPg0KPC9zdmc+DQo=';
		me._enter_vr__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;enter_vr;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="enter_vr";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='top : 40px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._enter_vr.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._enter_vr.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(player.getViewerSize().width == true)
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._enter_vr.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._enter_vr.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._enter_vr.style[domTransition]='';
				if (me._enter_vr.ggCurrentLogicStateVisible == 0) {
					me._enter_vr.style.visibility=(Number(me._enter_vr.style.opacity)>0||!me._enter_vr.style.opacity)?'inherit':'hidden';
					me._enter_vr.ggVisible=true;
				}
				else {
					me._enter_vr.style.visibility="hidden";
					me._enter_vr.ggVisible=false;
				}
			}
		}
		me._enter_vr.onmouseover=function (e) {
			me._enter_vr__img.style.visibility='hidden';
			me._enter_vr__imgo.style.visibility='inherit';
			me.elementMouseOver['enter_vr']=true;
			me._tt_enter_vr.logicBlock_visible();
		}
		me._enter_vr.onmouseout=function (e) {
			me._enter_vr__img.style.visibility='inherit';
			me._enter_vr__imgo.style.visibility='hidden';
			me.elementMouseOver['enter_vr']=false;
			me._tt_enter_vr.logicBlock_visible();
		}
		me._enter_vr.ontouchend=function (e) {
			me.elementMouseOver['enter_vr']=false;
			me._tt_enter_vr.logicBlock_visible();
		}
		me._enter_vr.ggUpdatePosition=function (useTransition) {
		}
		el=me._tt_enter_vr=document.createElement('div');
		els=me._tt_enter_vr__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_enter_vr";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 32px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="Enter VR";
		el.appendChild(els);
		me._tt_enter_vr.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_enter_vr.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				(player.getViewerSize().width == true)
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_enter_vr.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_enter_vr.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_enter_vr.style[domTransition]='left 0s, top 0s';
				if (me._tt_enter_vr.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_enter_vr.style.top='-25px';
					me._tt_enter_vr.ggUpdatePosition(true);
				}
				else {
					me._tt_enter_vr.ggDx=0;
					me._tt_enter_vr.style.top='32px';
					me._tt_enter_vr.ggUpdatePosition(true);
				}
			}
		}
		me._tt_enter_vr.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(me.elementMouseOver['enter_vr'] == true)
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_enter_vr.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_enter_vr.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_enter_vr.style[domTransition]='left 0s, top 0s';
				if (me._tt_enter_vr.ggCurrentLogicStateVisible == 0) {
					me._tt_enter_vr.style.visibility=(Number(me._tt_enter_vr.style.opacity)>0||!me._tt_enter_vr.style.opacity)?'inherit':'hidden';
					me._tt_enter_vr.ggVisible=true;
				}
				else {
					me._tt_enter_vr.style.visibility="hidden";
					me._tt_enter_vr.ggVisible=false;
				}
			}
		}
		me._tt_enter_vr.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._enter_vr.appendChild(me._tt_enter_vr);
		me.divSkin.appendChild(me._enter_vr);
		el=me._button_fullscreen=document.createElement('div');
		el.ggId="button_fullscreen";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='height : 32px;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='top : 10px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_fullscreen.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._button_fullscreen.onclick=function (e) {
			player.toggleFullscreen();
		}
		me._button_fullscreen.onmouseover=function (e) {
			me.elementMouseOver['button_fullscreen']=true;
			me._tt_fullscreen.logicBlock_visible();
		}
		me._button_fullscreen.onmouseout=function (e) {
			me.elementMouseOver['button_fullscreen']=false;
			me._tt_fullscreen.logicBlock_visible();
		}
		me._button_fullscreen.ontouchend=function (e) {
			me.elementMouseOver['button_fullscreen']=false;
			me._tt_fullscreen.logicBlock_visible();
		}
		me._button_fullscreen.ggUpdatePosition=function (useTransition) {
		}
		el=me._button_image_normalscreen=document.createElement('div');
		els=me._button_image_normalscreen__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xIEJhc2ljLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLWJhc2ljLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0iYmFzaWMiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIgoJCQl4PSIwcHgiIH'+
			'k9IjBweCIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCIgdmlld0JveD0iMCAwIDMyIDMyIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KCTxnIG9wYWNpdHk9IjAuNCIgc3Ryb2tlPSIjM0MzQzNDIiBzdHJva2Utd2lkdGg9IjEuNSI+Cgk8cGF0aCBkPSJNMTYsMTQuODA0SDQuNjk3Yy0wLjMxNSwwLTAuNjI0LDAuMTI4LTAuODQ2LDAuMzUxQzMuNjI3LDE1LjM3NywzLjUsMTUuNjg2LDMuNSwxNnY4LjEyDQoJCWMwLDAuMzE1LDAuMTI3LDAuNjI0LDAuMzUsMC44NDZjMC4yMjMsMC4yMjQsMC41MzEsMC4zNTEsMC44NDYsMC4zNTFIMTZjMC4zMiwwLDAuNjItMC4xMjQsMC44NDYtMC4zNTENCgkJYzAu'+
			'MjI2LTAuMjI2LDAuMzUtMC41MjUsMC4zNS0wLjg0NlYxNmMwLTAuMzE0LTAuMTI4LTAuNjIzLTAuMzUtMC44NDZDMTYuNjIzLDE0LjkzMiwxNi4zMTQsMTQuODA0LDE2LDE0LjgwNHogTTE0LjgwNCwyMi45MjQNCgkJSDUuODkzdi01LjcyOGg4LjkxMVYyMi45MjR6IE00LjY5NywxMy45OThjMC42NjEsMCwxLjE5Ni0wLjUzNiwxLjE5Ni0xLjE5NnYtMC4zMDhjMC0wLjY2LTAuNTM2LTEuMTk1LTEuMTk2LTEuMTk1DQoJCWMtMC42NjEsMC0xLjE5NiwwLjUzNS0xLjE5NiwxLjE5NXYwLjMwOEMzLjUsMTMuNDYyLDQuMDM2LDEzLjk5OCw0LjY5NywxMy45OTh6IE00LjY5NywxMC40NzdjMC42NjEsMC'+
			'wxLjE5Ny0wLjUzNiwxLjE5Ny0xLjE5N2gwDQoJCVY5LjA3NmMwLjY2MSwwLDEuMTk2LTAuNTM1LDEuMTk2LTEuMTk2YzAtMC42Ni0wLjUzNi0xLjE5Ni0xLjE5Ni0xLjE5Nkg0LjY5N2MtMC4zMTUsMC0wLjYyMywwLjEyNy0wLjg0NiwwLjM1DQoJCUMzLjYyOCw3LjI1NywzLjUsNy41NjQsMy41LDcuODh2MS4zOTlDMy41LDkuOTQsNC4wMzYsMTAuNDc3LDQuNjk3LDEwLjQ3N3ogTTE5LjI4OSw5LjA3NmgwLjI0MmMwLjY2MSwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2DQoJCXMtMC41MzUtMS4xOTYtMS4xOTYtMS4xOTZoLTAuMjQyYy0wLjY2MSwwLTEuMTk3LDAuNTM2LTEuMTk3LDEuMTk2UzE4'+
			'LjYyOCw5LjA3NiwxOS4yODksOS4wNzZ6IE0xNi4xMjIsNi42ODRoLTAuMjQzDQoJCWMtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NnMwLjUzNiwxLjE5NiwxLjE5NiwxLjE5NmgwLjI0M2MwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk2UzE2Ljc4Miw2LjY4NCwxNi4xMjIsNi42ODR6DQoJCSBNMjIuNjk4LDkuMDc2aDAuMjQzYzAuNjYsMCwxLjE5Ni0wLjUzNiwxLjE5Ni0xLjE5NnMtMC41MzYtMS4xOTYtMS4xOTYtMS4xOTZoLTAuMjQzYy0wLjY2LDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTYNCgkJUzIyLjAzOCw5LjA3NiwyMi42OTgsOS4wNzZ6IE05LjA2LDkuMDc2aDAuMj'+
			'QyYzAuNjYsMCwxLjE5Ni0wLjUzNiwxLjE5Ni0xLjE5NlM5Ljk2Miw2LjY4NCw5LjMwMiw2LjY4NEg5LjA2DQoJCWMtMC42NjEsMC0xLjE5NywwLjUzNi0xLjE5NywxLjE5NlM4LjM5OSw5LjA3Niw5LjA2LDkuMDc2eiBNMTIuNDY5LDkuMDc2aDAuMjQzYzAuNjYxLDAsMS4xOTYtMC41MzYsMS4xOTYtMS4xOTYNCgkJcy0wLjUzNi0xLjE5Ni0xLjE5Ni0xLjE5NmgtMC4yNDNjLTAuNjYxLDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTZTMTEuODA4LDkuMDc2LDEyLjQ2OSw5LjA3NnogTTI3LjMwNCwxMS4xMTENCgkJYy0wLjY2MSwwLTEuMTk2LDAuNTM1LTEuMTk2LDEuMTk2djAuMzA4YzAsMC42Niww'+
			'LjUzNSwxLjE5NiwxLjE5NiwxLjE5NmMwLjY2LDAsMS4xOTYtMC41MzYsMS4xOTYtMS4xOTZ2LTAuMzA4DQoJCUMyOC41LDExLjY0NiwyNy45NjQsMTEuMTExLDI3LjMwNCwxMS4xMTF6IE0yNy4zMDQsMTQuNjVjLTAuNjYxLDAtMS4xOTYsMC41MzUtMS4xOTYsMS4xOTZ2MC4zMDhjMCwwLjY2LDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2DQoJCWMwLjY2LDAsMS4xOTYtMC41MzYsMS4xOTYtMS4xOTZ2LTAuMzA4QzI4LjUsMTUuMTg2LDI3Ljk2NCwxNC42NSwyNy4zMDQsMTQuNjV6IE0yNy4zMDQsMjEuNzI4Yy0wLjY2MSwwLTEuMTk2LDAuNTM1LTEuMTk2LDEuMTk2DQoJCWgtMC4yMzRjLTAuNjYsMC'+
			'0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NmMwLDAuNjYxLDAuNTM2LDEuMTk2LDEuMTk2LDEuMTk2aDEuNDMxYzAuMzE0LDAsMC42MjMtMC4xMjgsMC44NDYtMC4zNTENCgkJczAuMzUxLTAuNTMsMC4zNTEtMC44NDZ2LTEuMTk2QzI4LjUsMjIuMjY0LDI3Ljk2NCwyMS43MjgsMjcuMzA0LDIxLjcyOHogTTI3LjMwNCwxOC4xODljLTAuNjYxLDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTZ2MC4zMDgNCgkJYzAsMC42NiwwLjUzNSwxLjE5NiwxLjE5NiwxLjE5NmMwLjY2LDAsMS4xOTYtMC41MzYsMS4xOTYtMS4xOTZ2LTAuMzA4QzI4LjUsMTguNzI2LDI3Ljk2NCwxOC4xODksMjcuMzA0LDE4LjE4OXog'+
			'TTI4LjE0OSw3LjAzMw0KCQljLTAuMjIzLTAuMjIyLTAuNTMxLTAuMzUtMC44NDYtMC4zNWgtMS4xOTZjLTAuNjYxLDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTZjMCwwLjY2MSwwLjUzNSwxLjE5NiwxLjE5NiwxLjE5Ng0KCQljMCwwLjY2MSwwLjUzNSwxLjE5NiwxLjE5NiwxLjE5NmMwLjY2LDAsMS4xOTYtMC41MzUsMS4xOTYtMS4xOTZWNy44OEMyOC41LDcuNTY0LDI4LjM3Miw3LjI1NywyOC4xNDksNy4wMzN6IE0yMS44NjMsMTMuMjYxDQoJCWwwLjIyMS0wLjE0N2MwLjQyOC0wLjI4NSwwLjU0Mi0wLjg2MywwLjI1Ny0xLjI5MWMtMC4yODYtMC40MjgtMC44NjMtMC41NDItMS4yOTEtMC4yNT'+
			'ZsLTAuMjIxLDAuMTQ2DQoJCWMtMC40MjcsMC4yODYtMC41NDIsMC44NjMtMC4yNTcsMS4yOTFjMC4xOCwwLjI2OSwwLjQ3NCwwLjQxNCwwLjc3NCwwLjQxNEMyMS41MjQsMTMuNDE4LDIxLjcwNCwxMy4zNjcsMjEuODYzLDEzLjI2MXoNCgkJIE0xOS4zMjksMjIuOTI0aC0wLjI0MmMtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NmMwLDAuNjYxLDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2aDAuMjQyYzAuNjYxLDAsMS4xOTYtMC41MzUsMS4xOTYtMS4xOTYNCgkJQzIwLjUyNSwyMy40NiwxOS45OSwyMi45MjQsMTkuMzI5LDIyLjkyNHogTTE4LjU4NCwxNS4yNjRjMC4xNzgsMCwwLjM1Ny0w'+
			'LjA1MSwwLjUxNy0wLjE1N2wwLjIyMS0wLjE0Nw0KCQljMC40MjgtMC4yODUsMC41NDItMC44NjMsMC4yNTctMS4yOWMtMC4yODUtMC40MjgtMC44NjMtMC41NDItMS4yOTEtMC4yNTdsLTAuMjIyLDAuMTQ3Yy0wLjQyNywwLjI4Ni0wLjU0MiwwLjg2My0wLjI1NiwxLjI5MQ0KCQlDMTcuOTg5LDE1LjExOSwxOC4yODMsMTUuMjY0LDE4LjU4NCwxNS4yNjR6IE0yMi43MzksMjIuOTI0aC0wLjI0MmMtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5Ng0KCQljMCwwLjY2MSwwLjUzNSwxLjE5NiwxLjE5NiwxLjE5NmgwLjI0MmMwLjY2LDAsMS4xOTYtMC41MzUsMS4xOTYtMS4xOTZDMjMuOTM2LD'+
			'IzLjQ2LDIzLjM5OSwyMi45MjQsMjIuNzM5LDIyLjkyNHogTTI1LjEwNCw5Ljk3Ng0KCQljLTAuMjg1LTAuNDI3LTAuODYzLTAuNTQyLTEuMjkxLTAuMjU2bC0wLjIyMSwwLjE0N2MtMC40MjgsMC4yODUtMC41NDIsMC44NjMtMC4yNTYsMS4yOWMwLjE3OSwwLjI2OSwwLjQ3NCwwLjQxNCwwLjc3NCwwLjQxNA0KCQljMC4xNzgsMCwwLjM1Ny0wLjA1MSwwLjUxNi0wLjE1NmwwLjIyMi0wLjE0OEMyNS4yNzQsMTAuOTgxLDI1LjM4OSwxMC40MDMsMjUuMTA0LDkuOTc2eiIvPg0KCTwvZz4KCTxnIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwLjIiPgoJPHBhdGgg'+
			'ZD0iTTE2LDE0LjgwNEg0LjY5N2MtMC4zMTUsMC0wLjYyNCwwLjEyOC0wLjg0NiwwLjM1MUMzLjYyNywxNS4zNzcsMy41LDE1LjY4NiwzLjUsMTZ2OC4xMg0KCQljMCwwLjMxNSwwLjEyNywwLjYyNCwwLjM1LDAuODQ2YzAuMjIzLDAuMjI0LDAuNTMxLDAuMzUxLDAuODQ2LDAuMzUxSDE2YzAuMzIsMCwwLjYyLTAuMTI0LDAuODQ2LTAuMzUxDQoJCWMwLjIyNi0wLjIyNiwwLjM1LTAuNTI1LDAuMzUtMC44NDZWMTZjMC0wLjMxNC0wLjEyOC0wLjYyMy0wLjM1LTAuODQ2QzE2LjYyMywxNC45MzIsMTYuMzE0LDE0LjgwNCwxNiwxNC44MDR6IE0xNC44MDQsMjIuOTI0DQoJCUg1Ljg5M3YtNS43MjhoOC'+
			'45MTFWMjIuOTI0eiBNNC42OTcsMTMuOTk4YzAuNjYxLDAsMS4xOTYtMC41MzYsMS4xOTYtMS4xOTZ2LTAuMzA4YzAtMC42Ni0wLjUzNi0xLjE5NS0xLjE5Ni0xLjE5NQ0KCQljLTAuNjYxLDAtMS4xOTYsMC41MzUtMS4xOTYsMS4xOTV2MC4zMDhDMy41LDEzLjQ2Miw0LjAzNiwxMy45OTgsNC42OTcsMTMuOTk4eiBNNC42OTcsMTAuNDc3YzAuNjYxLDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTdoMA0KCQlWOS4wNzZjMC42NjEsMCwxLjE5Ni0wLjUzNSwxLjE5Ni0xLjE5NmMwLTAuNjYtMC41MzYtMS4xOTYtMS4xOTYtMS4xOTZINC42OTdjLTAuMzE1LDAtMC42MjMsMC4xMjctMC44NDYsMC4zNQ0K'+
			'CQlDMy42MjgsNy4yNTcsMy41LDcuNTY0LDMuNSw3Ljg4djEuMzk5QzMuNSw5Ljk0LDQuMDM2LDEwLjQ3Nyw0LjY5NywxMC40Nzd6IE0xOS4yODksOS4wNzZoMC4yNDJjMC42NjEsMCwxLjE5Ni0wLjUzNiwxLjE5Ni0xLjE5Ng0KCQlzLTAuNTM1LTEuMTk2LTEuMTk2LTEuMTk2aC0wLjI0MmMtMC42NjEsMC0xLjE5NywwLjUzNi0xLjE5NywxLjE5NlMxOC42MjgsOS4wNzYsMTkuMjg5LDkuMDc2eiBNMTYuMTIyLDYuNjg0aC0wLjI0Mw0KCQljLTAuNjYxLDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTZzMC41MzYsMS4xOTYsMS4xOTYsMS4xOTZoMC4yNDNjMC42NjEsMCwxLjE5Ny0wLjUzNiwxLjE5Ny'+
			'0xLjE5NlMxNi43ODIsNi42ODQsMTYuMTIyLDYuNjg0eg0KCQkgTTIyLjY5OCw5LjA3NmgwLjI0M2MwLjY2LDAsMS4xOTYtMC41MzYsMS4xOTYtMS4xOTZzLTAuNTM2LTEuMTk2LTEuMTk2LTEuMTk2aC0wLjI0M2MtMC42NiwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2DQoJCVMyMi4wMzgsOS4wNzYsMjIuNjk4LDkuMDc2eiBNOS4wNiw5LjA3NmgwLjI0MmMwLjY2LDAsMS4xOTYtMC41MzYsMS4xOTYtMS4xOTZTOS45NjIsNi42ODQsOS4zMDIsNi42ODRIOS4wNg0KCQljLTAuNjYxLDAtMS4xOTcsMC41MzYtMS4xOTcsMS4xOTZTOC4zOTksOS4wNzYsOS4wNiw5LjA3NnogTTEyLjQ2OSw5LjA3Nmgw'+
			'LjI0M2MwLjY2MSwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2DQoJCXMtMC41MzYtMS4xOTYtMS4xOTYtMS4xOTZoLTAuMjQzYy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2UzExLjgwOCw5LjA3NiwxMi40NjksOS4wNzZ6IE0yNy4zMDQsMTEuMTExDQoJCWMtMC42NjEsMC0xLjE5NiwwLjUzNS0xLjE5NiwxLjE5NnYwLjMwOGMwLDAuNjYsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTZjMC42NiwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2di0wLjMwOA0KCQlDMjguNSwxMS42NDYsMjcuOTY0LDExLjExMSwyNy4zMDQsMTEuMTExeiBNMjcuMzA0LDE0LjY1Yy0wLjY2MSwwLTEuMTk2LDAuNT'+
			'M1LTEuMTk2LDEuMTk2djAuMzA4YzAsMC42NiwwLjUzNSwxLjE5NiwxLjE5NiwxLjE5Ng0KCQljMC42NiwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2di0wLjMwOEMyOC41LDE1LjE4NiwyNy45NjQsMTQuNjUsMjcuMzA0LDE0LjY1eiBNMjcuMzA0LDIxLjcyOGMtMC42NjEsMC0xLjE5NiwwLjUzNS0xLjE5NiwxLjE5Ng0KCQloLTAuMjM0Yy0wLjY2LDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTZjMCwwLjY2MSwwLjUzNiwxLjE5NiwxLjE5NiwxLjE5NmgxLjQzMWMwLjMxNCwwLDAuNjIzLTAuMTI4LDAuODQ2LTAuMzUxDQoJCXMwLjM1MS0wLjUzLDAuMzUxLTAuODQ2di0xLjE5NkMyOC41LDIyLjI2'+
			'NCwyNy45NjQsMjEuNzI4LDI3LjMwNCwyMS43Mjh6IE0yNy4zMDQsMTguMTg5Yy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2djAuMzA4DQoJCWMwLDAuNjYsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTZjMC42NiwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2di0wLjMwOEMyOC41LDE4LjcyNiwyNy45NjQsMTguMTg5LDI3LjMwNCwxOC4xODl6IE0yOC4xNDksNy4wMzMNCgkJYy0wLjIyMy0wLjIyMi0wLjUzMS0wLjM1LTAuODQ2LTAuMzVoLTEuMTk2Yy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2YzAsMC42NjEsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTYNCgkJYzAsMC42NjEsMC'+
			'41MzUsMS4xOTYsMS4xOTYsMS4xOTZjMC42NiwwLDEuMTk2LTAuNTM1LDEuMTk2LTEuMTk2VjcuODhDMjguNSw3LjU2NCwyOC4zNzIsNy4yNTcsMjguMTQ5LDcuMDMzeiBNMjEuODYzLDEzLjI2MQ0KCQlsMC4yMjEtMC4xNDdjMC40MjgtMC4yODUsMC41NDItMC44NjMsMC4yNTctMS4yOTFjLTAuMjg2LTAuNDI4LTAuODYzLTAuNTQyLTEuMjkxLTAuMjU2bC0wLjIyMSwwLjE0Ng0KCQljLTAuNDI3LDAuMjg2LTAuNTQyLDAuODYzLTAuMjU3LDEuMjkxYzAuMTgsMC4yNjksMC40NzQsMC40MTQsMC43NzQsMC40MTRDMjEuNTI0LDEzLjQxOCwyMS43MDQsMTMuMzY3LDIxLjg2MywxMy4yNjF6DQoJCSBN'+
			'MTkuMzI5LDIyLjkyNGgtMC4yNDJjLTAuNjYxLDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTZjMCwwLjY2MSwwLjUzNSwxLjE5NiwxLjE5NiwxLjE5NmgwLjI0MmMwLjY2MSwwLDEuMTk2LTAuNTM1LDEuMTk2LTEuMTk2DQoJCUMyMC41MjUsMjMuNDYsMTkuOTksMjIuOTI0LDE5LjMyOSwyMi45MjR6IE0xOC41ODQsMTUuMjY0YzAuMTc4LDAsMC4zNTctMC4wNTEsMC41MTctMC4xNTdsMC4yMjEtMC4xNDcNCgkJYzAuNDI4LTAuMjg1LDAuNTQyLTAuODYzLDAuMjU3LTEuMjljLTAuMjg1LTAuNDI4LTAuODYzLTAuNTQyLTEuMjkxLTAuMjU3bC0wLjIyMiwwLjE0N2MtMC40MjcsMC4yODYtMC41NDIsMC'+
			'44NjMtMC4yNTYsMS4yOTENCgkJQzE3Ljk4OSwxNS4xMTksMTguMjgzLDE1LjI2NCwxOC41ODQsMTUuMjY0eiBNMjIuNzM5LDIyLjkyNGgtMC4yNDJjLTAuNjYxLDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTYNCgkJYzAsMC42NjEsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTZoMC4yNDJjMC42NiwwLDEuMTk2LTAuNTM1LDEuMTk2LTEuMTk2QzIzLjkzNiwyMy40NiwyMy4zOTksMjIuOTI0LDIyLjczOSwyMi45MjR6IE0yNS4xMDQsOS45NzYNCgkJYy0wLjI4NS0wLjQyNy0wLjg2My0wLjU0Mi0xLjI5MS0wLjI1NmwtMC4yMjEsMC4xNDdjLTAuNDI4LDAuMjg1LTAuNTQyLDAuODYzLTAuMjU2LDEuMjlj'+
			'MC4xNzksMC4yNjksMC40NzQsMC40MTQsMC43NzQsMC40MTQNCgkJYzAuMTc4LDAsMC4zNTctMC4wNTEsMC41MTYtMC4xNTZsMC4yMjItMC4xNDhDMjUuMjc0LDEwLjk4MSwyNS4zODksMTAuNDAzLDI1LjEwNCw5Ljk3NnoiLz4NCgk8L2c+Cjwvc3ZnPg==';
		me._button_image_normalscreen__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;button_image_normalscreen;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._button_image_normalscreen__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xIEJhc2ljLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLWJhc2ljLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0iYmFzaWMiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIgoJCQl4PSIwcHgiIH'+
			'k9IjBweCIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCIgdmlld0JveD0iMCAwIDMyIDMyIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KCTxnIG9wYWNpdHk9IjAuNCIgc3Ryb2tlPSIjM0MzQzNDIiBzdHJva2Utd2lkdGg9IjEuNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KCTxwYXRoIGQ9Ik0xNiwxNC44MDRINC42OTdjLTAuMzE1LDAtMC42MjQsMC4xMjgtMC44NDYsMC4zNTFDMy42MjcsMTUuMzc3LDMuNSwxNS42ODYsMy41LDE2djguMTINCgkJYzAsMC4zMTUsMC4xMjcsMC42MjQsMC4zNSwwLjg0NmMwLjIyMywwLjIyNCwwLjUz'+
			'MSwwLjM1MSwwLjg0NiwwLjM1MUgxNmMwLjMyLDAsMC42Mi0wLjEyNCwwLjg0Ni0wLjM1MQ0KCQljMC4yMjYtMC4yMjYsMC4zNS0wLjUyNSwwLjM1LTAuODQ2VjE2YzAtMC4zMTQtMC4xMjgtMC42MjMtMC4zNS0wLjg0NkMxNi42MjMsMTQuOTMyLDE2LjMxNCwxNC44MDQsMTYsMTQuODA0eiBNMTQuODA0LDIyLjkyNA0KCQlINS44OTN2LTUuNzI4aDguOTExVjIyLjkyNHogTTQuNjk3LDEzLjk5OGMwLjY2MSwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2di0wLjMwOGMwLTAuNjYtMC41MzYtMS4xOTUtMS4xOTYtMS4xOTUNCgkJYy0wLjY2MSwwLTEuMTk2LDAuNTM1LTEuMTk2LDEuMTk1djAuMzA4Qz'+
			'MuNSwxMy40NjIsNC4wMzYsMTMuOTk4LDQuNjk3LDEzLjk5OHogTTQuNjk3LDEwLjQ3N2MwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEuMTk3aDANCgkJVjkuMDc2YzAuNjYxLDAsMS4xOTYtMC41MzUsMS4xOTYtMS4xOTZjMC0wLjY2LTAuNTM2LTEuMTk2LTEuMTk2LTEuMTk2SDQuNjk3Yy0wLjMxNSwwLTAuNjIzLDAuMTI3LTAuODQ2LDAuMzUNCgkJQzMuNjI4LDcuMjU3LDMuNSw3LjU2NCwzLjUsNy44OHYxLjM5OUMzLjUsOS45NCw0LjAzNiwxMC40NzcsNC42OTcsMTAuNDc3eiBNMTkuMjg5LDkuMDc2aDAuMjQyYzAuNjYxLDAsMS4xOTYtMC41MzYsMS4xOTYtMS4xOTYNCgkJcy0wLjUzNS0x'+
			'LjE5Ni0xLjE5Ni0xLjE5NmgtMC4yNDJjLTAuNjYxLDAtMS4xOTcsMC41MzYtMS4xOTcsMS4xOTZTMTguNjI4LDkuMDc2LDE5LjI4OSw5LjA3NnogTTE2LjEyMiw2LjY4NGgtMC4yNDMNCgkJYy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2czAuNTM2LDEuMTk2LDEuMTk2LDEuMTk2aDAuMjQzYzAuNjYxLDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTZTMTYuNzgyLDYuNjg0LDE2LjEyMiw2LjY4NHoNCgkJIE0yMi42OTgsOS4wNzZoMC4yNDNjMC42NiwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2cy0wLjUzNi0xLjE5Ni0xLjE5Ni0xLjE5NmgtMC4yNDNjLTAuNjYsMC0xLjE5NiwwLjUzNi'+
			'0xLjE5NiwxLjE5Ng0KCQlTMjIuMDM4LDkuMDc2LDIyLjY5OCw5LjA3NnogTTkuMDYsOS4wNzZoMC4yNDJjMC42NiwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2UzkuOTYyLDYuNjg0LDkuMzAyLDYuNjg0SDkuMDYNCgkJYy0wLjY2MSwwLTEuMTk3LDAuNTM2LTEuMTk3LDEuMTk2UzguMzk5LDkuMDc2LDkuMDYsOS4wNzZ6IE0xMi40NjksOS4wNzZoMC4yNDNjMC42NjEsMCwxLjE5Ni0wLjUzNiwxLjE5Ni0xLjE5Ng0KCQlzLTAuNTM2LTEuMTk2LTEuMTk2LTEuMTk2aC0wLjI0M2MtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NlMxMS44MDgsOS4wNzYsMTIuNDY5LDkuMDc2eiBNMjcuMzA0'+
			'LDExLjExMQ0KCQljLTAuNjYxLDAtMS4xOTYsMC41MzUtMS4xOTYsMS4xOTZ2MC4zMDhjMCwwLjY2LDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2YzAuNjYsMCwxLjE5Ni0wLjUzNiwxLjE5Ni0xLjE5NnYtMC4zMDgNCgkJQzI4LjUsMTEuNjQ2LDI3Ljk2NCwxMS4xMTEsMjcuMzA0LDExLjExMXogTTI3LjMwNCwxNC42NWMtMC42NjEsMC0xLjE5NiwwLjUzNS0xLjE5NiwxLjE5NnYwLjMwOGMwLDAuNjYsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTYNCgkJYzAuNjYsMCwxLjE5Ni0wLjUzNiwxLjE5Ni0xLjE5NnYtMC4zMDhDMjguNSwxNS4xODYsMjcuOTY0LDE0LjY1LDI3LjMwNCwxNC42NXogTTI3LjMwNC'+
			'wyMS43MjhjLTAuNjYxLDAtMS4xOTYsMC41MzUtMS4xOTYsMS4xOTYNCgkJaC0wLjIzNGMtMC42NiwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2YzAsMC42NjEsMC41MzYsMS4xOTYsMS4xOTYsMS4xOTZoMS40MzFjMC4zMTQsMCwwLjYyMy0wLjEyOCwwLjg0Ni0wLjM1MQ0KCQlzMC4zNTEtMC41MywwLjM1MS0wLjg0NnYtMS4xOTZDMjguNSwyMi4yNjQsMjcuOTY0LDIxLjcyOCwyNy4zMDQsMjEuNzI4eiBNMjcuMzA0LDE4LjE4OWMtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NnYwLjMwOA0KCQljMCwwLjY2LDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2YzAuNjYsMCwxLjE5Ni0wLjUzNiwx'+
			'LjE5Ni0xLjE5NnYtMC4zMDhDMjguNSwxOC43MjYsMjcuOTY0LDE4LjE4OSwyNy4zMDQsMTguMTg5eiBNMjguMTQ5LDcuMDMzDQoJCWMtMC4yMjMtMC4yMjItMC41MzEtMC4zNS0wLjg0Ni0wLjM1aC0xLjE5NmMtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NmMwLDAuNjYxLDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2DQoJCWMwLDAuNjYxLDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2YzAuNjYsMCwxLjE5Ni0wLjUzNSwxLjE5Ni0xLjE5NlY3Ljg4QzI4LjUsNy41NjQsMjguMzcyLDcuMjU3LDI4LjE0OSw3LjAzM3ogTTIxLjg2MywxMy4yNjENCgkJbDAuMjIxLTAuMTQ3YzAuNDI4LTAuMjg1LD'+
			'AuNTQyLTAuODYzLDAuMjU3LTEuMjkxYy0wLjI4Ni0wLjQyOC0wLjg2My0wLjU0Mi0xLjI5MS0wLjI1NmwtMC4yMjEsMC4xNDYNCgkJYy0wLjQyNywwLjI4Ni0wLjU0MiwwLjg2My0wLjI1NywxLjI5MWMwLjE4LDAuMjY5LDAuNDc0LDAuNDE0LDAuNzc0LDAuNDE0QzIxLjUyNCwxMy40MTgsMjEuNzA0LDEzLjM2NywyMS44NjMsMTMuMjYxeg0KCQkgTTE5LjMyOSwyMi45MjRoLTAuMjQyYy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2YzAsMC42NjEsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTZoMC4yNDJjMC42NjEsMCwxLjE5Ni0wLjUzNSwxLjE5Ni0xLjE5Ng0KCQlDMjAuNTI1LDIzLjQ2'+
			'LDE5Ljk5LDIyLjkyNCwxOS4zMjksMjIuOTI0eiBNMTguNTg0LDE1LjI2NGMwLjE3OCwwLDAuMzU3LTAuMDUxLDAuNTE3LTAuMTU3bDAuMjIxLTAuMTQ3DQoJCWMwLjQyOC0wLjI4NSwwLjU0Mi0wLjg2MywwLjI1Ny0xLjI5Yy0wLjI4NS0wLjQyOC0wLjg2My0wLjU0Mi0xLjI5MS0wLjI1N2wtMC4yMjIsMC4xNDdjLTAuNDI3LDAuMjg2LTAuNTQyLDAuODYzLTAuMjU2LDEuMjkxDQoJCUMxNy45ODksMTUuMTE5LDE4LjI4MywxNS4yNjQsMTguNTg0LDE1LjI2NHogTTIyLjczOSwyMi45MjRoLTAuMjQyYy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2DQoJCWMwLDAuNjYxLDAuNTM1LDEuMT'+
			'k2LDEuMTk2LDEuMTk2aDAuMjQyYzAuNjYsMCwxLjE5Ni0wLjUzNSwxLjE5Ni0xLjE5NkMyMy45MzYsMjMuNDYsMjMuMzk5LDIyLjkyNCwyMi43MzksMjIuOTI0eiBNMjUuMTA0LDkuOTc2DQoJCWMtMC4yODUtMC40MjctMC44NjMtMC41NDItMS4yOTEtMC4yNTZsLTAuMjIxLDAuMTQ3Yy0wLjQyOCwwLjI4NS0wLjU0MiwwLjg2My0wLjI1NiwxLjI5YzAuMTc5LDAuMjY5LDAuNDc0LDAuNDE0LDAuNzc0LDAuNDE0DQoJCWMwLjE3OCwwLDAuMzU3LTAuMDUxLDAuNTE2LTAuMTU2bDAuMjIyLTAuMTQ4QzI1LjI3NCwxMC45ODEsMjUuMzg5LDEwLjQwMywyNS4xMDQsOS45NzZ6Ii8+DQoJPC9nPgoJPGcg'+
			'ZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAuMiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KCTxwYXRoIGQ9Ik0xNiwxNC44MDRINC42OTdjLTAuMzE1LDAtMC42MjQsMC4xMjgtMC44NDYsMC4zNTFDMy42MjcsMTUuMzc3LDMuNSwxNS42ODYsMy41LDE2djguMTINCgkJYzAsMC4zMTUsMC4xMjcsMC42MjQsMC4zNSwwLjg0NmMwLjIyMywwLjIyNCwwLjUzMSwwLjM1MSwwLjg0NiwwLjM1MUgxNmMwLjMyLDAsMC42Mi0wLjEyNCwwLjg0Ni0wLjM1MQ0KCQljMC4yMjYtMC4yMjYsMC4zNS0wLjUyNS'+
			'wwLjM1LTAuODQ2VjE2YzAtMC4zMTQtMC4xMjgtMC42MjMtMC4zNS0wLjg0NkMxNi42MjMsMTQuOTMyLDE2LjMxNCwxNC44MDQsMTYsMTQuODA0eiBNMTQuODA0LDIyLjkyNA0KCQlINS44OTN2LTUuNzI4aDguOTExVjIyLjkyNHogTTQuNjk3LDEzLjk5OGMwLjY2MSwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2di0wLjMwOGMwLTAuNjYtMC41MzYtMS4xOTUtMS4xOTYtMS4xOTUNCgkJYy0wLjY2MSwwLTEuMTk2LDAuNTM1LTEuMTk2LDEuMTk1djAuMzA4QzMuNSwxMy40NjIsNC4wMzYsMTMuOTk4LDQuNjk3LDEzLjk5OHogTTQuNjk3LDEwLjQ3N2MwLjY2MSwwLDEuMTk3LTAuNTM2LDEuMTk3LTEu'+
			'MTk3aDANCgkJVjkuMDc2YzAuNjYxLDAsMS4xOTYtMC41MzUsMS4xOTYtMS4xOTZjMC0wLjY2LTAuNTM2LTEuMTk2LTEuMTk2LTEuMTk2SDQuNjk3Yy0wLjMxNSwwLTAuNjIzLDAuMTI3LTAuODQ2LDAuMzUNCgkJQzMuNjI4LDcuMjU3LDMuNSw3LjU2NCwzLjUsNy44OHYxLjM5OUMzLjUsOS45NCw0LjAzNiwxMC40NzcsNC42OTcsMTAuNDc3eiBNMTkuMjg5LDkuMDc2aDAuMjQyYzAuNjYxLDAsMS4xOTYtMC41MzYsMS4xOTYtMS4xOTYNCgkJcy0wLjUzNS0xLjE5Ni0xLjE5Ni0xLjE5NmgtMC4yNDJjLTAuNjYxLDAtMS4xOTcsMC41MzYtMS4xOTcsMS4xOTZTMTguNjI4LDkuMDc2LDE5LjI4OSw5Lj'+
			'A3NnogTTE2LjEyMiw2LjY4NGgtMC4yNDMNCgkJYy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2czAuNTM2LDEuMTk2LDEuMTk2LDEuMTk2aDAuMjQzYzAuNjYxLDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTZTMTYuNzgyLDYuNjg0LDE2LjEyMiw2LjY4NHoNCgkJIE0yMi42OTgsOS4wNzZoMC4yNDNjMC42NiwwLDEuMTk2LTAuNTM2LDEuMTk2LTEuMTk2cy0wLjUzNi0xLjE5Ni0xLjE5Ni0xLjE5NmgtMC4yNDNjLTAuNjYsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5Ng0KCQlTMjIuMDM4LDkuMDc2LDIyLjY5OCw5LjA3NnogTTkuMDYsOS4wNzZoMC4yNDJjMC42NiwwLDEuMTk2LTAuNTM2'+
			'LDEuMTk2LTEuMTk2UzkuOTYyLDYuNjg0LDkuMzAyLDYuNjg0SDkuMDYNCgkJYy0wLjY2MSwwLTEuMTk3LDAuNTM2LTEuMTk3LDEuMTk2UzguMzk5LDkuMDc2LDkuMDYsOS4wNzZ6IE0xMi40NjksOS4wNzZoMC4yNDNjMC42NjEsMCwxLjE5Ni0wLjUzNiwxLjE5Ni0xLjE5Ng0KCQlzLTAuNTM2LTEuMTk2LTEuMTk2LTEuMTk2aC0wLjI0M2MtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NlMxMS44MDgsOS4wNzYsMTIuNDY5LDkuMDc2eiBNMjcuMzA0LDExLjExMQ0KCQljLTAuNjYxLDAtMS4xOTYsMC41MzUtMS4xOTYsMS4xOTZ2MC4zMDhjMCwwLjY2LDAuNTM1LDEuMTk2LDEuMTk2LDEuMT'+
			'k2YzAuNjYsMCwxLjE5Ni0wLjUzNiwxLjE5Ni0xLjE5NnYtMC4zMDgNCgkJQzI4LjUsMTEuNjQ2LDI3Ljk2NCwxMS4xMTEsMjcuMzA0LDExLjExMXogTTI3LjMwNCwxNC42NWMtMC42NjEsMC0xLjE5NiwwLjUzNS0xLjE5NiwxLjE5NnYwLjMwOGMwLDAuNjYsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTYNCgkJYzAuNjYsMCwxLjE5Ni0wLjUzNiwxLjE5Ni0xLjE5NnYtMC4zMDhDMjguNSwxNS4xODYsMjcuOTY0LDE0LjY1LDI3LjMwNCwxNC42NXogTTI3LjMwNCwyMS43MjhjLTAuNjYxLDAtMS4xOTYsMC41MzUtMS4xOTYsMS4xOTYNCgkJaC0wLjIzNGMtMC42NiwwLTEuMTk2LDAuNTM2LTEuMTk2LDEu'+
			'MTk2YzAsMC42NjEsMC41MzYsMS4xOTYsMS4xOTYsMS4xOTZoMS40MzFjMC4zMTQsMCwwLjYyMy0wLjEyOCwwLjg0Ni0wLjM1MQ0KCQlzMC4zNTEtMC41MywwLjM1MS0wLjg0NnYtMS4xOTZDMjguNSwyMi4yNjQsMjcuOTY0LDIxLjcyOCwyNy4zMDQsMjEuNzI4eiBNMjcuMzA0LDE4LjE4OWMtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NnYwLjMwOA0KCQljMCwwLjY2LDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2YzAuNjYsMCwxLjE5Ni0wLjUzNiwxLjE5Ni0xLjE5NnYtMC4zMDhDMjguNSwxOC43MjYsMjcuOTY0LDE4LjE4OSwyNy4zMDQsMTguMTg5eiBNMjguMTQ5LDcuMDMzDQoJCWMtMC'+
			'4yMjMtMC4yMjItMC41MzEtMC4zNS0wLjg0Ni0wLjM1aC0xLjE5NmMtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5NmMwLDAuNjYxLDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2DQoJCWMwLDAuNjYxLDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2YzAuNjYsMCwxLjE5Ni0wLjUzNSwxLjE5Ni0xLjE5NlY3Ljg4QzI4LjUsNy41NjQsMjguMzcyLDcuMjU3LDI4LjE0OSw3LjAzM3ogTTIxLjg2MywxMy4yNjENCgkJbDAuMjIxLTAuMTQ3YzAuNDI4LTAuMjg1LDAuNTQyLTAuODYzLDAuMjU3LTEuMjkxYy0wLjI4Ni0wLjQyOC0wLjg2My0wLjU0Mi0xLjI5MS0wLjI1NmwtMC4yMjEsMC4xNDYNCgkJYy0w'+
			'LjQyNywwLjI4Ni0wLjU0MiwwLjg2My0wLjI1NywxLjI5MWMwLjE4LDAuMjY5LDAuNDc0LDAuNDE0LDAuNzc0LDAuNDE0QzIxLjUyNCwxMy40MTgsMjEuNzA0LDEzLjM2NywyMS44NjMsMTMuMjYxeg0KCQkgTTE5LjMyOSwyMi45MjRoLTAuMjQyYy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2YzAsMC42NjEsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTZoMC4yNDJjMC42NjEsMCwxLjE5Ni0wLjUzNSwxLjE5Ni0xLjE5Ng0KCQlDMjAuNTI1LDIzLjQ2LDE5Ljk5LDIyLjkyNCwxOS4zMjksMjIuOTI0eiBNMTguNTg0LDE1LjI2NGMwLjE3OCwwLDAuMzU3LTAuMDUxLDAuNTE3LTAuMTU3bDAuMj'+
			'IxLTAuMTQ3DQoJCWMwLjQyOC0wLjI4NSwwLjU0Mi0wLjg2MywwLjI1Ny0xLjI5Yy0wLjI4NS0wLjQyOC0wLjg2My0wLjU0Mi0xLjI5MS0wLjI1N2wtMC4yMjIsMC4xNDdjLTAuNDI3LDAuMjg2LTAuNTQyLDAuODYzLTAuMjU2LDEuMjkxDQoJCUMxNy45ODksMTUuMTE5LDE4LjI4MywxNS4yNjQsMTguNTg0LDE1LjI2NHogTTIyLjczOSwyMi45MjRoLTAuMjQyYy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2DQoJCWMwLDAuNjYxLDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2aDAuMjQyYzAuNjYsMCwxLjE5Ni0wLjUzNSwxLjE5Ni0xLjE5NkMyMy45MzYsMjMuNDYsMjMuMzk5LDIyLjkyNCwy'+
			'Mi43MzksMjIuOTI0eiBNMjUuMTA0LDkuOTc2DQoJCWMtMC4yODUtMC40MjctMC44NjMtMC41NDItMS4yOTEtMC4yNTZsLTAuMjIxLDAuMTQ3Yy0wLjQyOCwwLjI4NS0wLjU0MiwwLjg2My0wLjI1NiwxLjI5YzAuMTc5LDAuMjY5LDAuNDc0LDAuNDE0LDAuNzc0LDAuNDE0DQoJCWMwLjE3OCwwLDAuMzU3LTAuMDUxLDAuNTE2LTAuMTU2bDAuMjIyLTAuMTQ4QzI1LjI3NCwxMC45ODEsMjUuMzg5LDEwLjQwMywyNS4xMDQsOS45NzZ6Ii8+DQoJPC9nPgo8L3N2Zz4=';
		me._button_image_normalscreen__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;button_image_normalscreen;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="button_image_normalscreen";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_image_normalscreen.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_image_normalscreen.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(player.getIsFullscreen() == true)
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._button_image_normalscreen.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._button_image_normalscreen.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._button_image_normalscreen.style[domTransition]='';
				if (me._button_image_normalscreen.ggCurrentLogicStateVisible == 0) {
					me._button_image_normalscreen.style.visibility=(Number(me._button_image_normalscreen.style.opacity)>0||!me._button_image_normalscreen.style.opacity)?'inherit':'hidden';
					me._button_image_normalscreen.ggVisible=true;
				}
				else {
					me._button_image_normalscreen.style.visibility="hidden";
					me._button_image_normalscreen.ggVisible=false;
				}
			}
		}
		me._button_image_normalscreen.onmouseover=function (e) {
			me._button_image_normalscreen__img.style.visibility='hidden';
			me._button_image_normalscreen__imgo.style.visibility='inherit';
		}
		me._button_image_normalscreen.onmouseout=function (e) {
			me._button_image_normalscreen__img.style.visibility='inherit';
			me._button_image_normalscreen__imgo.style.visibility='hidden';
		}
		me._button_image_normalscreen.ggUpdatePosition=function (useTransition) {
		}
		me._button_fullscreen.appendChild(me._button_image_normalscreen);
		el=me._button_image_fullscreen=document.createElement('div');
		els=me._button_image_fullscreen__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xIEJhc2ljLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLWJhc2ljLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0iYmFzaWMiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIgoJCQl4PSIwcHgiIH'+
			'k9IjBweCIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCIgdmlld0JveD0iMCAwIDMyIDMyIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KCTxnIG9wYWNpdHk9IjAuNCIgc3Ryb2tlPSIjM0MzQzNDIiBzdHJva2Utd2lkdGg9IjEuNSI+Cgk8cGF0aCBkPSJNMjguMTQ5LDcuMDM0Yy0wLjIyMy0wLjIyMy0wLjUzMS0wLjM1MS0wLjg0Ni0wLjM1MUg0LjY5N2MtMC4zMTUsMC0wLjYyNCwwLjEyOC0wLjg0NiwwLjM1MQ0KCQlTMy41LDcuNTY1LDMuNSw3Ljg4djE2LjI0YzAsMC4zMTUsMC4xMjgsMC42MjMsMC4zNTEsMC44NDZjMC4yMjMsMC4yMjQsMC41MzEsMC4zNTEsMC44NDYsMC4zNTFoMjIuNjA3DQoJ'+
			'CWMwLjMxOSwwLDAuNjItMC4xMjQsMC44NDYtMC4zNTFjMC4yMjctMC4yMjYsMC4zNTEtMC41MjYsMC4zNTEtMC44NDZWNy44OEMyOC41LDcuNTY1LDI4LjM3Miw3LjI1NywyOC4xNDksNy4wMzR6IE01Ljg5MywyMi45MjQNCgkJVjkuMDc2aDIwLjIxNXYxMy44NDhINS44OTN6IE0xNiwxOS4yNGMtMC42NjEsMC0xLjE5NywwLjUzNS0xLjE5NywxLjE5NnYwLjQ0OGMwLDAuNjYxLDAuNTM2LDEuMTk2LDEuMTk3LDEuMTk2DQoJCWMwLjY2LDAsMS4xOTYtMC41MzUsMS4xOTYtMS4xOTZ2LTAuNDQ4QzE3LjE5NiwxOS43NzUsMTYuNjYxLDE5LjI0LDE2LDE5LjI0eiBNMTEuNjcsMTQuODA0aC0wLjM0Mg'+
			'0KCQljLTAuNjYxLDAtMS4xOTcsMC41MzUtMS4xOTcsMS4xOTZjMCwwLjY2MSwwLjUzNiwxLjE5NiwxLjE5NywxLjE5NmgwLjM0MmMwLjY2MSwwLDEuMTk2LTAuNTM1LDEuMTk2LTEuMTk2DQoJCUMxMi44NjYsMTUuMzM5LDEyLjMzMSwxNC44MDQsMTEuNjcsMTQuODA0eiBNOC4xOTUsMTQuODA0SDcuODU0Yy0wLjY2MSwwLTEuMTk3LDAuNTM1LTEuMTk3LDEuMTk2DQoJCWMwLDAuNjYxLDAuNTM2LDEuMTk2LDEuMTk3LDEuMTk2aDAuMzQxYzAuNjYsMCwxLjE5Ni0wLjUzNSwxLjE5Ni0xLjE5NkM5LjM5MiwxNS4zMzksOC44NTUsMTQuODA0LDguMTk1LDE0LjgwNHogTTE4LjI4NywxMy40MTINCgkJ'+
			'bC0wLjIyMiwwLjE0OGMtMC40MjcsMC4yODUtMC41NDEsMC44NjMtMC4yNTYsMS4yOWMwLjE4LDAuMjY5LDAuNDc0LDAuNDE0LDAuNzc0LDAuNDE0YzAuMTc4LDAsMC4zNTctMC4wNSwwLjUxNy0wLjE1Nw0KCQlsMC4yMjEtMC4xNDhjMC40MjgtMC4yODUsMC41NDItMC44NjMsMC4yNTctMS4yOUMxOS4yOTMsMTMuMjQyLDE4LjcxNSwxMy4xMjYsMTguMjg3LDEzLjQxMnogTTIzLjgxMyw5LjcybC0wLjIyMiwwLjE0Nw0KCQljLTAuNDI3LDAuMjg2LTAuNTQyLDAuODY0LTAuMjU2LDEuMjkxYzAuMTc5LDAuMjY5LDAuNDc0LDAuNDE0LDAuNzc0LDAuNDE0YzAuMTc4LDAsMC4zNTctMC4wNSwwLjUxNy'+
			'0wLjE1N2wwLjIyMS0wLjE0OA0KCQljMC40MjctMC4yODUsMC41NDItMC44NjMsMC4yNTYtMS4yOTFDMjQuODE4LDkuNTQ5LDI0LjI0MSw5LjQzNCwyMy44MTMsOS43MnogTTE2LDE0LjgwNGgtMS4xOTZjLTAuNjYxLDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTYNCgkJYzAsMC42NiwwLjUzNSwxLjE5NiwxLjE5NiwxLjE5NmMwLDAuNjYxLDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2YzAuNjYsMCwxLjE5Ni0wLjUzNSwxLjE5Ni0xLjE5NlYxNg0KCQljMC0wLjMxNS0wLjEyOC0wLjYyMy0wLjM1LTAuODQ2QzE2LjYyMywxNC45MzEsMTYuMzE0LDE0LjgwNCwxNiwxNC44MDR6IE0yMS4wNSwxMS41NjVs'+
			'LTAuMjIxLDAuMTQ4DQoJCWMtMC40MjcsMC4yODYtMC41NDIsMC44NjMtMC4yNTcsMS4yOTFjMC4xOCwwLjI2OCwwLjQ3NSwwLjQxMywwLjc3NCwwLjQxM2MwLjE3OCwwLDAuMzU3LTAuMDUxLDAuNTE3LTAuMTU3bDAuMjIxLTAuMTQ4DQoJCWMwLjQyOC0wLjI4NiwwLjU0Mi0wLjg2MywwLjI1Ny0xLjI5MVMyMS40NzgsMTEuMjgsMjEuMDUsMTEuNTY1eiIvPg0KCTwvZz4KCTxnIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIwLjIiPgoJPHBhdGggZD0iTTI4LjE0OSw3LjAzNGMtMC4yMjMtMC4yMjMtMC41MzEtMC4zNTEtMC44NDYtMC4zNTFINC42OTdjLTAuMz'+
			'E1LDAtMC42MjQsMC4xMjgtMC44NDYsMC4zNTENCgkJUzMuNSw3LjU2NSwzLjUsNy44OHYxNi4yNGMwLDAuMzE1LDAuMTI4LDAuNjIzLDAuMzUxLDAuODQ2YzAuMjIzLDAuMjI0LDAuNTMxLDAuMzUxLDAuODQ2LDAuMzUxaDIyLjYwNw0KCQljMC4zMTksMCwwLjYyLTAuMTI0LDAuODQ2LTAuMzUxYzAuMjI3LTAuMjI2LDAuMzUxLTAuNTI2LDAuMzUxLTAuODQ2VjcuODhDMjguNSw3LjU2NSwyOC4zNzIsNy4yNTcsMjguMTQ5LDcuMDM0eiBNNS44OTMsMjIuOTI0DQoJCVY5LjA3NmgyMC4yMTV2MTMuODQ4SDUuODkzeiBNMTYsMTkuMjRjLTAuNjYxLDAtMS4xOTcsMC41MzUtMS4xOTcsMS4xOTZ2MC40'+
			'NDhjMCwwLjY2MSwwLjUzNiwxLjE5NiwxLjE5NywxLjE5Ng0KCQljMC42NiwwLDEuMTk2LTAuNTM1LDEuMTk2LTEuMTk2di0wLjQ0OEMxNy4xOTYsMTkuNzc1LDE2LjY2MSwxOS4yNCwxNiwxOS4yNHogTTExLjY3LDE0LjgwNGgtMC4zNDINCgkJYy0wLjY2MSwwLTEuMTk3LDAuNTM1LTEuMTk3LDEuMTk2YzAsMC42NjEsMC41MzYsMS4xOTYsMS4xOTcsMS4xOTZoMC4zNDJjMC42NjEsMCwxLjE5Ni0wLjUzNSwxLjE5Ni0xLjE5Ng0KCQlDMTIuODY2LDE1LjMzOSwxMi4zMzEsMTQuODA0LDExLjY3LDE0LjgwNHogTTguMTk1LDE0LjgwNEg3Ljg1NGMtMC42NjEsMC0xLjE5NywwLjUzNS0xLjE5NywxLj'+
			'E5Ng0KCQljMCwwLjY2MSwwLjUzNiwxLjE5NiwxLjE5NywxLjE5NmgwLjM0MWMwLjY2LDAsMS4xOTYtMC41MzUsMS4xOTYtMS4xOTZDOS4zOTIsMTUuMzM5LDguODU1LDE0LjgwNCw4LjE5NSwxNC44MDR6IE0xOC4yODcsMTMuNDEyDQoJCWwtMC4yMjIsMC4xNDhjLTAuNDI3LDAuMjg1LTAuNTQxLDAuODYzLTAuMjU2LDEuMjljMC4xOCwwLjI2OSwwLjQ3NCwwLjQxNCwwLjc3NCwwLjQxNGMwLjE3OCwwLDAuMzU3LTAuMDUsMC41MTctMC4xNTcNCgkJbDAuMjIxLTAuMTQ4YzAuNDI4LTAuMjg1LDAuNTQyLTAuODYzLDAuMjU3LTEuMjlDMTkuMjkzLDEzLjI0MiwxOC43MTUsMTMuMTI2LDE4LjI4Nywx'+
			'My40MTJ6IE0yMy44MTMsOS43MmwtMC4yMjIsMC4xNDcNCgkJYy0wLjQyNywwLjI4Ni0wLjU0MiwwLjg2NC0wLjI1NiwxLjI5MWMwLjE3OSwwLjI2OSwwLjQ3NCwwLjQxNCwwLjc3NCwwLjQxNGMwLjE3OCwwLDAuMzU3LTAuMDUsMC41MTctMC4xNTdsMC4yMjEtMC4xNDgNCgkJYzAuNDI3LTAuMjg1LDAuNTQyLTAuODYzLDAuMjU2LTEuMjkxQzI0LjgxOCw5LjU0OSwyNC4yNDEsOS40MzQsMjMuODEzLDkuNzJ6IE0xNiwxNC44MDRoLTEuMTk2Yy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2DQoJCWMwLDAuNjYsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTZjMCwwLjY2MSwwLjUzNSwxLjE5Ni'+
			'wxLjE5NiwxLjE5NmMwLjY2LDAsMS4xOTYtMC41MzUsMS4xOTYtMS4xOTZWMTYNCgkJYzAtMC4zMTUtMC4xMjgtMC42MjMtMC4zNS0wLjg0NkMxNi42MjMsMTQuOTMxLDE2LjMxNCwxNC44MDQsMTYsMTQuODA0eiBNMjEuMDUsMTEuNTY1bC0wLjIyMSwwLjE0OA0KCQljLTAuNDI3LDAuMjg2LTAuNTQyLDAuODYzLTAuMjU3LDEuMjkxYzAuMTgsMC4yNjgsMC40NzUsMC40MTMsMC43NzQsMC40MTNjMC4xNzgsMCwwLjM1Ny0wLjA1MSwwLjUxNy0wLjE1N2wwLjIyMS0wLjE0OA0KCQljMC40MjgtMC4yODYsMC41NDItMC44NjMsMC4yNTctMS4yOTFTMjEuNDc4LDExLjI4LDIxLjA1LDExLjU2NXoiLz4N'+
			'Cgk8L2c+Cjwvc3ZnPg==';
		me._button_image_fullscreen__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;button_image_fullscreen;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		elo=me._button_image_fullscreen__imgo=document.createElement('img');
		elo.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHYXJkZW4gR25vbWUgU29mdHdhcmUgLSBTa2luIEJ1dHRvbnMgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xIEJhc2ljLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLWJhc2ljLmR0ZCI+CjxzdmcgdmVyc2lvbj0iMS4xIiBiYXNlUHJvZmlsZT0iYmFzaWMiIGlkPSJMYXllcl8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIgoJCQl4PSIwcHgiIH'+
			'k9IjBweCIgd2lkdGg9IjMycHgiIGhlaWdodD0iMzJweCIgdmlld0JveD0iMCAwIDMyIDMyIiB4bWw6c3BhY2U9InByZXNlcnZlIj4KCTxnIG9wYWNpdHk9IjAuNCIgc3Ryb2tlPSIjM0MzQzNDIiBzdHJva2Utd2lkdGg9IjEuNSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KCTxwYXRoIGQ9Ik0yOC4xNDksNy4wMzRjLTAuMjIzLTAuMjIzLTAuNTMxLTAuMzUxLTAuODQ2LTAuMzUxSDQuNjk3Yy0wLjMxNSwwLTAuNjI0LDAuMTI4LTAuODQ2LDAuMzUxDQoJCVMzLjUsNy41NjUsMy41LDcuODh2MTYuMjRjMCwwLjMxNSwwLjEyOCwwLjYy'+
			'MywwLjM1MSwwLjg0NmMwLjIyMywwLjIyNCwwLjUzMSwwLjM1MSwwLjg0NiwwLjM1MWgyMi42MDcNCgkJYzAuMzE5LDAsMC42Mi0wLjEyNCwwLjg0Ni0wLjM1MWMwLjIyNy0wLjIyNiwwLjM1MS0wLjUyNiwwLjM1MS0wLjg0NlY3Ljg4QzI4LjUsNy41NjUsMjguMzcyLDcuMjU3LDI4LjE0OSw3LjAzNHogTTUuODkzLDIyLjkyNA0KCQlWOS4wNzZoMjAuMjE1djEzLjg0OEg1Ljg5M3ogTTE2LDE5LjI0Yy0wLjY2MSwwLTEuMTk3LDAuNTM1LTEuMTk3LDEuMTk2djAuNDQ4YzAsMC42NjEsMC41MzYsMS4xOTYsMS4xOTcsMS4xOTYNCgkJYzAuNjYsMCwxLjE5Ni0wLjUzNSwxLjE5Ni0xLjE5NnYtMC40ND'+
			'hDMTcuMTk2LDE5Ljc3NSwxNi42NjEsMTkuMjQsMTYsMTkuMjR6IE0xMS42NywxNC44MDRoLTAuMzQyDQoJCWMtMC42NjEsMC0xLjE5NywwLjUzNS0xLjE5NywxLjE5NmMwLDAuNjYxLDAuNTM2LDEuMTk2LDEuMTk3LDEuMTk2aDAuMzQyYzAuNjYxLDAsMS4xOTYtMC41MzUsMS4xOTYtMS4xOTYNCgkJQzEyLjg2NiwxNS4zMzksMTIuMzMxLDE0LjgwNCwxMS42NywxNC44MDR6IE04LjE5NSwxNC44MDRINy44NTRjLTAuNjYxLDAtMS4xOTcsMC41MzUtMS4xOTcsMS4xOTYNCgkJYzAsMC42NjEsMC41MzYsMS4xOTYsMS4xOTcsMS4xOTZoMC4zNDFjMC42NiwwLDEuMTk2LTAuNTM1LDEuMTk2LTEuMTk2'+
			'QzkuMzkyLDE1LjMzOSw4Ljg1NSwxNC44MDQsOC4xOTUsMTQuODA0eiBNMTguMjg3LDEzLjQxMg0KCQlsLTAuMjIyLDAuMTQ4Yy0wLjQyNywwLjI4NS0wLjU0MSwwLjg2My0wLjI1NiwxLjI5YzAuMTgsMC4yNjksMC40NzQsMC40MTQsMC43NzQsMC40MTRjMC4xNzgsMCwwLjM1Ny0wLjA1LDAuNTE3LTAuMTU3DQoJCWwwLjIyMS0wLjE0OGMwLjQyOC0wLjI4NSwwLjU0Mi0wLjg2MywwLjI1Ny0xLjI5QzE5LjI5MywxMy4yNDIsMTguNzE1LDEzLjEyNiwxOC4yODcsMTMuNDEyeiBNMjMuODEzLDkuNzJsLTAuMjIyLDAuMTQ3DQoJCWMtMC40MjcsMC4yODYtMC41NDIsMC44NjQtMC4yNTYsMS4yOTFjMC'+
			'4xNzksMC4yNjksMC40NzQsMC40MTQsMC43NzQsMC40MTRjMC4xNzgsMCwwLjM1Ny0wLjA1LDAuNTE3LTAuMTU3bDAuMjIxLTAuMTQ4DQoJCWMwLjQyNy0wLjI4NSwwLjU0Mi0wLjg2MywwLjI1Ni0xLjI5MUMyNC44MTgsOS41NDksMjQuMjQxLDkuNDM0LDIzLjgxMyw5LjcyeiBNMTYsMTQuODA0aC0xLjE5NmMtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5Ng0KCQljMCwwLjY2LDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2YzAsMC42NjEsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTZjMC42NiwwLDEuMTk2LTAuNTM1LDEuMTk2LTEuMTk2VjE2DQoJCWMwLTAuMzE1LTAuMTI4LTAuNjIzLTAuMzUt'+
			'MC44NDZDMTYuNjIzLDE0LjkzMSwxNi4zMTQsMTQuODA0LDE2LDE0LjgwNHogTTIxLjA1LDExLjU2NWwtMC4yMjEsMC4xNDgNCgkJYy0wLjQyNywwLjI4Ni0wLjU0MiwwLjg2My0wLjI1NywxLjI5MWMwLjE4LDAuMjY4LDAuNDc1LDAuNDEzLDAuNzc0LDAuNDEzYzAuMTc4LDAsMC4zNTctMC4wNTEsMC41MTctMC4xNTdsMC4yMjEtMC4xNDgNCgkJYzAuNDI4LTAuMjg2LDAuNTQyLTAuODYzLDAuMjU3LTEuMjkxUzIxLjQ3OCwxMS4yOCwyMS4wNSwxMS41NjV6Ii8+DQoJPC9nPgoJPGcgZmlsbD0iI0ZGRkZGRiIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjAuMiIgdHJhbnNmb3JtPSJ0cm'+
			'Fuc2xhdGUoMTYsMTYpIHNjYWxlKDEuMSkgdHJhbnNsYXRlKC0xNiwtMTYpIj4KCTxwYXRoIGQ9Ik0yOC4xNDksNy4wMzRjLTAuMjIzLTAuMjIzLTAuNTMxLTAuMzUxLTAuODQ2LTAuMzUxSDQuNjk3Yy0wLjMxNSwwLTAuNjI0LDAuMTI4LTAuODQ2LDAuMzUxDQoJCVMzLjUsNy41NjUsMy41LDcuODh2MTYuMjRjMCwwLjMxNSwwLjEyOCwwLjYyMywwLjM1MSwwLjg0NmMwLjIyMywwLjIyNCwwLjUzMSwwLjM1MSwwLjg0NiwwLjM1MWgyMi42MDcNCgkJYzAuMzE5LDAsMC42Mi0wLjEyNCwwLjg0Ni0wLjM1MWMwLjIyNy0wLjIyNiwwLjM1MS0wLjUyNiwwLjM1MS0wLjg0NlY3Ljg4QzI4LjUsNy41NjUs'+
			'MjguMzcyLDcuMjU3LDI4LjE0OSw3LjAzNHogTTUuODkzLDIyLjkyNA0KCQlWOS4wNzZoMjAuMjE1djEzLjg0OEg1Ljg5M3ogTTE2LDE5LjI0Yy0wLjY2MSwwLTEuMTk3LDAuNTM1LTEuMTk3LDEuMTk2djAuNDQ4YzAsMC42NjEsMC41MzYsMS4xOTYsMS4xOTcsMS4xOTYNCgkJYzAuNjYsMCwxLjE5Ni0wLjUzNSwxLjE5Ni0xLjE5NnYtMC40NDhDMTcuMTk2LDE5Ljc3NSwxNi42NjEsMTkuMjQsMTYsMTkuMjR6IE0xMS42NywxNC44MDRoLTAuMzQyDQoJCWMtMC42NjEsMC0xLjE5NywwLjUzNS0xLjE5NywxLjE5NmMwLDAuNjYxLDAuNTM2LDEuMTk2LDEuMTk3LDEuMTk2aDAuMzQyYzAuNjYxLDAsMS'+
			'4xOTYtMC41MzUsMS4xOTYtMS4xOTYNCgkJQzEyLjg2NiwxNS4zMzksMTIuMzMxLDE0LjgwNCwxMS42NywxNC44MDR6IE04LjE5NSwxNC44MDRINy44NTRjLTAuNjYxLDAtMS4xOTcsMC41MzUtMS4xOTcsMS4xOTYNCgkJYzAsMC42NjEsMC41MzYsMS4xOTYsMS4xOTcsMS4xOTZoMC4zNDFjMC42NiwwLDEuMTk2LTAuNTM1LDEuMTk2LTEuMTk2QzkuMzkyLDE1LjMzOSw4Ljg1NSwxNC44MDQsOC4xOTUsMTQuODA0eiBNMTguMjg3LDEzLjQxMg0KCQlsLTAuMjIyLDAuMTQ4Yy0wLjQyNywwLjI4NS0wLjU0MSwwLjg2My0wLjI1NiwxLjI5YzAuMTgsMC4yNjksMC40NzQsMC40MTQsMC43NzQsMC40MTRj'+
			'MC4xNzgsMCwwLjM1Ny0wLjA1LDAuNTE3LTAuMTU3DQoJCWwwLjIyMS0wLjE0OGMwLjQyOC0wLjI4NSwwLjU0Mi0wLjg2MywwLjI1Ny0xLjI5QzE5LjI5MywxMy4yNDIsMTguNzE1LDEzLjEyNiwxOC4yODcsMTMuNDEyeiBNMjMuODEzLDkuNzJsLTAuMjIyLDAuMTQ3DQoJCWMtMC40MjcsMC4yODYtMC41NDIsMC44NjQtMC4yNTYsMS4yOTFjMC4xNzksMC4yNjksMC40NzQsMC40MTQsMC43NzQsMC40MTRjMC4xNzgsMCwwLjM1Ny0wLjA1LDAuNTE3LTAuMTU3bDAuMjIxLTAuMTQ4DQoJCWMwLjQyNy0wLjI4NSwwLjU0Mi0wLjg2MywwLjI1Ni0xLjI5MUMyNC44MTgsOS41NDksMjQuMjQxLDkuNDM0LD'+
			'IzLjgxMyw5LjcyeiBNMTYsMTQuODA0aC0xLjE5NmMtMC42NjEsMC0xLjE5NiwwLjUzNi0xLjE5NiwxLjE5Ng0KCQljMCwwLjY2LDAuNTM1LDEuMTk2LDEuMTk2LDEuMTk2YzAsMC42NjEsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTZjMC42NiwwLDEuMTk2LTAuNTM1LDEuMTk2LTEuMTk2VjE2DQoJCWMwLTAuMzE1LTAuMTI4LTAuNjIzLTAuMzUtMC44NDZDMTYuNjIzLDE0LjkzMSwxNi4zMTQsMTQuODA0LDE2LDE0LjgwNHogTTIxLjA1LDExLjU2NWwtMC4yMjEsMC4xNDgNCgkJYy0wLjQyNywwLjI4Ni0wLjU0MiwwLjg2My0wLjI1NywxLjI5MWMwLjE4LDAuMjY4LDAuNDc1LDAuNDEzLDAuNzc0LDAu'+
			'NDEzYzAuMTc4LDAsMC4zNTctMC4wNTEsMC41MTctMC4xNTdsMC4yMjEtMC4xNDgNCgkJYzAuNDI4LTAuMjg2LDAuNTQyLTAuODYzLDAuMjU3LTEuMjkxUzIxLjQ3OCwxMS4yOCwyMS4wNSwxMS41NjV6Ii8+DQoJPC9nPgo8L3N2Zz4=';
		me._button_image_fullscreen__imgo.setAttribute('src',hs);
		elo.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;visibility:hidden;pointer-events:none;button_image_fullscreen;');
		elo['ondragstart']=function() { return false; };
		el.appendChild(elo);
		el.ggId="button_image_fullscreen";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 32px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : 0px;';
		hs+='visibility : inherit;';
		hs+='width : 32px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_image_fullscreen.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_image_fullscreen.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(player.getIsFullscreen() == true)
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._button_image_fullscreen.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._button_image_fullscreen.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._button_image_fullscreen.style[domTransition]='';
				if (me._button_image_fullscreen.ggCurrentLogicStateVisible == 0) {
					me._button_image_fullscreen.style.visibility="hidden";
					me._button_image_fullscreen.ggVisible=false;
				}
				else {
					me._button_image_fullscreen.style.visibility=(Number(me._button_image_fullscreen.style.opacity)>0||!me._button_image_fullscreen.style.opacity)?'inherit':'hidden';
					me._button_image_fullscreen.ggVisible=true;
				}
			}
		}
		me._button_image_fullscreen.onmouseover=function (e) {
			me._button_image_fullscreen__img.style.visibility='hidden';
			me._button_image_fullscreen__imgo.style.visibility='inherit';
		}
		me._button_image_fullscreen.onmouseout=function (e) {
			me._button_image_fullscreen__img.style.visibility='inherit';
			me._button_image_fullscreen__imgo.style.visibility='hidden';
		}
		me._button_image_fullscreen.ggUpdatePosition=function (useTransition) {
		}
		me._button_fullscreen.appendChild(me._button_image_fullscreen);
		el=me._tt_fullscreen=document.createElement('div');
		els=me._tt_fullscreen__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_fullscreen";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : 32px;';
		hs+='visibility : hidden;';
		hs+='width : 100px;';
		hs+='pointer-events:auto;';
		hs+='text-shadow: 1px 1px 4px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: auto;';
		hs+='height: auto;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='text-align: center;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="";
		el.appendChild(els);
		me._tt_fullscreen.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._tt_fullscreen.logicBlock_position = function() {
			var newLogicStatePosition;
			if (
				(player.getIsMobile() == true)
			)
			{
				newLogicStatePosition = 0;
			}
			else {
				newLogicStatePosition = -1;
			}
			if (me._tt_fullscreen.ggCurrentLogicStatePosition != newLogicStatePosition) {
				me._tt_fullscreen.ggCurrentLogicStatePosition = newLogicStatePosition;
				me._tt_fullscreen.style[domTransition]='left 0s, top 0s';
				if (me._tt_fullscreen.ggCurrentLogicStatePosition == 0) {
					this.ggDx = 0;
					me._tt_fullscreen.style.top='-25px';
					me._tt_fullscreen.ggUpdatePosition(true);
				}
				else {
					me._tt_fullscreen.ggDx=0;
					me._tt_fullscreen.style.top='32px';
					me._tt_fullscreen.ggUpdatePosition(true);
				}
			}
		}
		me._tt_fullscreen.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(me.elementMouseOver['button_fullscreen'] == true)
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_fullscreen.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_fullscreen.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_fullscreen.style[domTransition]='left 0s, top 0s';
				if (me._tt_fullscreen.ggCurrentLogicStateVisible == 0) {
					me._tt_fullscreen.style.visibility=(Number(me._tt_fullscreen.style.opacity)>0||!me._tt_fullscreen.style.opacity)?'inherit':'hidden';
					me._tt_fullscreen.ggVisible=true;
				}
				else {
					me._tt_fullscreen.style.visibility="hidden";
					me._tt_fullscreen.ggVisible=false;
				}
			}
		}
		me._tt_fullscreen.logicBlock_text = function() {
			var newLogicStateText;
			if (
				(player.getIsFullscreen() == false)
			)
			{
				newLogicStateText = 0;
			}
			else if (
				(player.getIsFullscreen() == true)
			)
			{
				newLogicStateText = 1;
			}
			else {
				newLogicStateText = -1;
			}
			if (me._tt_fullscreen.ggCurrentLogicStateText != newLogicStateText) {
				me._tt_fullscreen.ggCurrentLogicStateText = newLogicStateText;
				me._tt_fullscreen.style[domTransition]='left 0s, top 0s';
				if (me._tt_fullscreen.ggCurrentLogicStateText == 0) {
					me._tt_fullscreen.ggText="Enter Fullscreen";
					me._tt_fullscreen__text.innerHTML=me._tt_fullscreen.ggText;
					if (me._tt_fullscreen.ggUpdateText) {
					me._tt_fullscreen.ggUpdateText=function() {
						var hs="Enter Fullscreen";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_fullscreen.ggUpdatePosition) me._tt_fullscreen.ggUpdatePosition();
					}
				}
				else if (me._tt_fullscreen.ggCurrentLogicStateText == 1) {
					me._tt_fullscreen.ggText="Exit Fullscreen";
					me._tt_fullscreen__text.innerHTML=me._tt_fullscreen.ggText;
					if (me._tt_fullscreen.ggUpdateText) {
					me._tt_fullscreen.ggUpdateText=function() {
						var hs="Exit Fullscreen";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_fullscreen.ggUpdatePosition) me._tt_fullscreen.ggUpdatePosition();
					}
				}
				else {
					me._tt_fullscreen.ggText="";
					me._tt_fullscreen__text.innerHTML=me._tt_fullscreen.ggText;
					if (me._tt_fullscreen.ggUpdateText) {
					me._tt_fullscreen.ggUpdateText=function() {
						var hs="";
						if (hs!=this.ggText) {
							this.ggText=hs;
							this.ggTextDiv.innerHTML=hs;
							if (this.ggUpdatePosition) this.ggUpdatePosition();
						}
					}
					} else {
						if (me._tt_fullscreen.ggUpdatePosition) me._tt_fullscreen.ggUpdatePosition();
					}
				}
			}
		}
		me._tt_fullscreen.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
			this.style[domTransition]='left 0';
			this.ggTextDiv.style.left=((98-this.ggTextDiv.offsetWidth)/2) + 'px';
		}
		me._button_fullscreen.appendChild(me._tt_fullscreen);
		me.divSkin.appendChild(me._button_fullscreen);
		player.addListener('sizechanged', function() {
			me.updateSize(me.divSkin);
		});
	};
	this.hotspotProxyClick=function(id, url) {
	}
	this.hotspotProxyDoubleClick=function(id, url) {
	}
	me.hotspotProxyOver=function(id, url) {
	}
	me.hotspotProxyOut=function(id, url) {
	}
	me.callChildLogicBlocksHotspot_ht_node_changenode = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._hs_preview_image && hotspotTemplates['ht_node'][i]._hs_preview_image.logicBlock_alpha) {
					hotspotTemplates['ht_node'][i]._hs_preview_image.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_node'][i]._tt_ht_3d && hotspotTemplates['ht_node'][i]._tt_ht_3d.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._tt_ht_3d.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._hs_tt && hotspotTemplates['ht_node'][i]._hs_tt.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._hs_tt.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._ht_checkmark_tick && hotspotTemplates['ht_node'][i]._ht_checkmark_tick.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_checkmark_tick.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_configloaded = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._hs_preview_image && hotspotTemplates['ht_node'][i]._hs_preview_image.logicBlock_alpha) {
					hotspotTemplates['ht_node'][i]._hs_preview_image.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_node'][i]._tt_ht_3d && hotspotTemplates['ht_node'][i]._tt_ht_3d.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._tt_ht_3d.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_mouseover = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._chevron_white_lower && hotspotTemplates['ht_node'][i]._chevron_white_lower.logicBlock_alpha) {
					hotspotTemplates['ht_node'][i]._chevron_white_lower.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_node'][i]._chevron_black && hotspotTemplates['ht_node'][i]._chevron_black.logicBlock_alpha) {
					hotspotTemplates['ht_node'][i]._chevron_black.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_node'][i]._chevron_white && hotspotTemplates['ht_node'][i]._chevron_white.logicBlock_alpha) {
					hotspotTemplates['ht_node'][i]._chevron_white.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_node'][i]._hs_preview_image && hotspotTemplates['ht_node'][i]._hs_preview_image.logicBlock_alpha) {
					hotspotTemplates['ht_node'][i]._hs_preview_image.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_node'][i]._tt_ht_3d && hotspotTemplates['ht_node'][i]._tt_ht_3d.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._tt_ht_3d.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_active = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._ht_checkmark_tick && hotspotTemplates['ht_node'][i]._ht_checkmark_tick.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._ht_checkmark_tick.logicBlock_visible();
				}
			}
		}
	}
	me.callChildLogicBlocksHotspot_ht_node_varchanged_opt_3d_preview = function(){
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				if (hotspotTemplates['ht_node'][i]._hs_preview_image && hotspotTemplates['ht_node'][i]._hs_preview_image.logicBlock_alpha) {
					hotspotTemplates['ht_node'][i]._hs_preview_image.logicBlock_alpha();
				}
				if (hotspotTemplates['ht_node'][i]._tt_ht_3d && hotspotTemplates['ht_node'][i]._tt_ht_3d.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._tt_ht_3d.logicBlock_visible();
				}
				if (hotspotTemplates['ht_node'][i]._hs_tt && hotspotTemplates['ht_node'][i]._hs_tt.logicBlock_visible) {
					hotspotTemplates['ht_node'][i]._hs_tt.logicBlock_visible();
				}
			}
		}
	}
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
	});
	me.skinTimerEvent=function() {
		me.ggCurrentTime=new Date().getTime();
	};
	player.addListener('timer', me.skinTimerEvent);
	function SkinHotspotClass_ht_node(parentScope,hotspot) {
		var me=this;
		var flag=false;
		var hs='';
		me.parentScope=parentScope;
		me.hotspot=hotspot;
		var nodeId=String(hotspot.url);
		nodeId=(nodeId.charAt(0)=='{')?nodeId.substr(1, nodeId.length - 2):'';
		me.ggUserdata=skin.player.getNodeUserdata(nodeId);
		me.elementMouseDown=[];
		me.elementMouseOver=[];
		me.findElements=function(id,regex) {
			return skin.findElements(id,regex);
		}
		el=me._ht_node=document.createElement('div');
		el.ggId="ht_node";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_hotspot ";
		el.ggType='hotspot';
		hs ='';
		hs+='height : 0px;';
		hs+='left : 75px;';
		hs+='position : absolute;';
		hs+='top : 220px;';
		hs+='visibility : inherit;';
		hs+='width : 0px;';
		hs+='pointer-events:auto;';
		hs+='transform-style: preserve-3d;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_node.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return me.hotspot.url.substr(1, me.hotspot.url.length - 2);
		}
		me._ht_node.onclick=function (e) {
			player.openNext(me.hotspot.url,me.hotspot.target);
			skin.hotspotProxyClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.ondblclick=function (e) {
			skin.hotspotProxyDoubleClick(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.onmouseover=function (e) {
			player.setActiveHotspot(me.hotspot);
			me.elementMouseOver['ht_node']=true;
			me._chevron_white_lower.logicBlock_alpha();
			me._chevron_black.logicBlock_alpha();
			me._chevron_white.logicBlock_alpha();
			me._hs_preview_image.logicBlock_alpha();
			me._tt_ht_3d.logicBlock_visible();
			skin.hotspotProxyOver(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.onmouseout=function (e) {
			player.setActiveHotspot(null);
			me.elementMouseOver['ht_node']=false;
			me._chevron_white_lower.logicBlock_alpha();
			me._chevron_black.logicBlock_alpha();
			me._chevron_white.logicBlock_alpha();
			me._hs_preview_image.logicBlock_alpha();
			me._tt_ht_3d.logicBlock_visible();
			skin.hotspotProxyOut(me.hotspot.id, me.hotspot.url);
		}
		me._ht_node.ontouchend=function (e) {
			me.elementMouseOver['ht_node']=false;
			me._chevron_white_lower.logicBlock_alpha();
			me._chevron_black.logicBlock_alpha();
			me._chevron_white.logicBlock_alpha();
			me._hs_preview_image.logicBlock_alpha();
			me._tt_ht_3d.logicBlock_visible();
		}
		me._ht_node.ggUpdatePosition=function (useTransition) {
		}
		el=me._chevron_white_lower=document.createElement('div');
		els=me._chevron_white_lower__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMCIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDAwIDEwMDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEwMDAgMTAwMDsiIHhtbDpzcG'+
			'FjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zNC45LDQzOS43bDQwMC00MDFjMTcuOS0xNy45LDQxLjctMjUuNCw2NS4yLTI0YzIzLjQtMS40LDQ3LjIsNi4xLDY1LjEsMjRsNDAwLDQwMQoJCWMzMy4yLDMzLjMsMzMuMiw4Ny40LDAsMTIwLjdjLTMzLjIsMzMuMy04Ny4xLDMzLjMtMTIwLjQsMEw1MDAsMjE0LjdMMTU1LjIsNTYwLjRjLTMzLjIsMzMuMy04Ny4xLDMzLjMtMTIwLjQsMAoJCVMxLjcsNDczLDM0LjksNDM5Ljd6Ii8+CjwvZz4KPC9zdmc+Cg==';
		me._chevron_white_lower__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;chevron_white_lower;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="chevron_white_lower";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 80px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.6;';
		hs+='position : absolute;';
		hs+='top : -145px;';
		hs+='visibility : inherit;';
		hs+='width : 80px;';
		hs+='pointer-events:auto;';
		hs+='transform:translate3d(0px,0px,-1px);';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._chevron_white_lower.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._chevron_white_lower.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(me.elementMouseOver['ht_node'] == true)
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._chevron_white_lower.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._chevron_white_lower.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._chevron_white_lower.style[domTransition]='opacity 500ms ease 0ms, visibility 500ms ease 0ms';
				if (me._chevron_white_lower.ggCurrentLogicStateAlpha == 0) {
					me._chevron_white_lower.style.visibility=me._chevron_white_lower.ggVisible?'inherit':'hidden';
					me._chevron_white_lower.style.opacity=1;
				}
				else {
					me._chevron_white_lower.style.visibility=me._chevron_white_lower.ggVisible?'inherit':'hidden';
					me._chevron_white_lower.style.opacity=0.6;
				}
			}
		}
		me._chevron_white_lower.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._ht_node.appendChild(me._chevron_white_lower);
		el=me._chevron_black=document.createElement('div');
		els=me._chevron_black__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMCIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDAwIDEwMDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEwMDAgMTAwMDsiIHhtbDpzcG'+
			'FjZT0icHJlc2VydmUiPgo8Zz4KCTxwYXRoIGQ9Ik0zNC45LDQzOS43bDQwMC00MDFjMTcuOS0xNy45LDQxLjctMjUuNCw2NS4yLTI0YzIzLjQtMS40LDQ3LjIsNi4xLDY1LjEsMjRsNDAwLDQwMWMzMy4yLDMzLjMsMzMuMiw4Ny40LDAsMTIwLjcKCQljLTMzLjIsMzMuMy04Ny4xLDMzLjMtMTIwLjQsMEw1MDAsMjE0LjdMMTU1LjIsNTYwLjRjLTMzLjIsMzMuMy04Ny4xLDMzLjMtMTIwLjQsMFMxLjcsNDczLDM0LjksNDM5Ljd6Ii8+CjwvZz4KPC9zdmc+Cg==';
		me._chevron_black__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;chevron_black;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="chevron_black";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 80px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.4;';
		hs+='position : absolute;';
		hs+='top : -145px;';
		hs+='visibility : inherit;';
		hs+='width : 80px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._chevron_black.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._chevron_black.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(me.elementMouseOver['ht_node'] == true)
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._chevron_black.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._chevron_black.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._chevron_black.style[domTransition]='opacity 500ms ease 0ms, visibility 500ms ease 0ms';
				if (me._chevron_black.ggCurrentLogicStateAlpha == 0) {
					me._chevron_black.style.visibility=me._chevron_black.ggVisible?'inherit':'hidden';
					me._chevron_black.style.opacity=1;
				}
				else {
					me._chevron_black.style.visibility=me._chevron_black.ggVisible?'inherit':'hidden';
					me._chevron_black.style.opacity=0.4;
				}
			}
		}
		me._chevron_black.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._ht_node.appendChild(me._chevron_black);
		el=me._chevron_white=document.createElement('div');
		els=me._chevron_white__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIyLjEuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMCIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAxMDAwIDEwMDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDEwMDAgMTAwMDsiIHhtbDpzcG'+
			'FjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNGRkZGRkY7fQo8L3N0eWxlPgo8Zz4KCTxwYXRoIGNsYXNzPSJzdDAiIGQ9Ik0zNC45LDQzOS43bDQwMC00MDFjMTcuOS0xNy45LDQxLjctMjUuNCw2NS4yLTI0YzIzLjQtMS40LDQ3LjIsNi4xLDY1LjEsMjRsNDAwLDQwMQoJCWMzMy4yLDMzLjMsMzMuMiw4Ny40LDAsMTIwLjdjLTMzLjIsMzMuMy04Ny4xLDMzLjMtMTIwLjQsMEw1MDAsMjE0LjdMMTU1LjIsNTYwLjRjLTMzLjIsMzMuMy04Ny4xLDMzLjMtMTIwLjQsMAoJCVMxLjcsNDczLDM0LjksNDM5Ljd6Ii8+CjwvZz4KPC9zdmc+Cg==';
		me._chevron_white__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;chevron_white;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="chevron_white";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 80px;';
		hs+='left : -10000px;';
		hs+='opacity : 0.6;';
		hs+='position : absolute;';
		hs+='top : -145px;';
		hs+='visibility : inherit;';
		hs+='width : 80px;';
		hs+='pointer-events:auto;';
		hs+='transform:translate3d(0px,0px,1px);';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._chevron_white.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._chevron_white.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(me.elementMouseOver['ht_node'] == true)
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._chevron_white.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._chevron_white.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._chevron_white.style[domTransition]='opacity 500ms ease 0ms, visibility 500ms ease 0ms';
				if (me._chevron_white.ggCurrentLogicStateAlpha == 0) {
					me._chevron_white.style.visibility=me._chevron_white.ggVisible?'inherit':'hidden';
					me._chevron_white.style.opacity=1;
				}
				else {
					me._chevron_white.style.visibility=me._chevron_white.ggVisible?'inherit':'hidden';
					me._chevron_white.style.opacity=0.6;
				}
			}
		}
		me._chevron_white.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._ht_node.appendChild(me._chevron_white);
		el=me._hs_preview_image=document.createElement('div');
		els=me._hs_preview_image__img=document.createElement('img');
		els.className='ggskin ggskin_nodeimage';
		els.setAttribute('src',basePath + "images/hs_preview_image_" + nodeId + ".jpg");
		el.ggNodeId=nodeId;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;hs_preview_image;');
		els.className='ggskin ggskin_nodeimage';
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="hs_preview_image";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_nodeimage ";
		el.ggType='nodeimage';
		hs ='';
		hs+='z-index: -5;';
		hs+='height : 90px;';
		hs+='left : -10000px;';
		hs+='opacity : 0;';
		hs+='position : absolute;';
		hs+='top : -220px;';
		hs+='visibility : hidden;';
		hs+='width : 140px;';
		hs+='pointer-events:none;';
		hs+='border-radius: 5px; overflow: hidden; box-shadow: 0px 0px 2px #ffffff; transform:translate3d(0px,0px,80px) rotateX(-90deg) scale(1.5); transform-style: preserve-3d; -webkit-backface-visibility: hidden; backface-visibility: hidden;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._hs_preview_image.ggIsActive=function() {
			return player.getCurrentNode()==this.ggElementNodeId();
		}
		el.ggElementNodeId=function() {
			return this.ggNodeId;
		}
		me._hs_preview_image.logicBlock_alpha = function() {
			var newLogicStateAlpha;
			if (
				(me.elementMouseOver['ht_node'] == true) && 
				(player.getVariableValue('opt_3d_preview') == true) && 
				(player.getIsTour() == true)
			)
			{
				newLogicStateAlpha = 0;
			}
			else {
				newLogicStateAlpha = -1;
			}
			if (me._hs_preview_image.ggCurrentLogicStateAlpha != newLogicStateAlpha) {
				me._hs_preview_image.ggCurrentLogicStateAlpha = newLogicStateAlpha;
				me._hs_preview_image.style[domTransition]='opacity 500ms ease 0ms, visibility 500ms ease 0ms';
				if (me._hs_preview_image.ggCurrentLogicStateAlpha == 0) {
					me._hs_preview_image.style.visibility=me._hs_preview_image.ggVisible?'inherit':'hidden';
					me._hs_preview_image.style.opacity=1;
				}
				else {
					me._hs_preview_image.style.visibility="hidden";
					me._hs_preview_image.style.opacity=0;
				}
			}
		}
		me._hs_preview_image.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._hs_tt=document.createElement('div');
		els=me._hs_tt__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="hs_tt";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='bottom : 0px;';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 140px;';
		hs+='pointer-events:none;';
		hs+='text-shadow: 1px 1px 2px #000000;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='bottom:  0px;';
		hs+='width: 140px;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='background: #000000;';
		hs+='background: rgba(0,0,0,0.196078);';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 12px;';
		hs+='font-weight: inherit;';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._hs_tt.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._hs_tt.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(player.getVariableValue('opt_3d_preview') == false) || 
				(me.hotspot.title == "")
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._hs_tt.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._hs_tt.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._hs_tt.style[domTransition]='';
				if (me._hs_tt.ggCurrentLogicStateVisible == 0) {
					me._hs_tt.style.visibility="hidden";
					me._hs_tt.ggVisible=false;
				}
				else {
					me._hs_tt.style.visibility=(Number(me._hs_tt.style.opacity)>0||!me._hs_tt.style.opacity)?'inherit':'hidden';
					me._hs_tt.ggVisible=true;
				}
			}
		}
		me._hs_tt.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._hs_preview_image.appendChild(me._hs_tt);
		el=me._ht_checkmark_tick=document.createElement('div');
		els=me._ht_checkmark_tick__img=document.createElement('img');
		els.className='ggskin ggskin_svg';
		hs='data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCIgWw0KCTwhRU5USVRZIG5zX2Zsb3dzICJodHRwOi8vbnMuYWRvYmUuY29tL0Zsb3dzLzEuMC8iPg0KCTwhRU5USVRZIG5zX2V4dGVuZCAiaHR0cDovL25zLmFkb2JlLmNvbS9FeHRlbn'+
			'NpYmlsaXR5LzEuMC8iPg0KCTwhRU5USVRZIG5zX2FpICJodHRwOi8vbnMuYWRvYmUuY29tL0Fkb2JlSWxsdXN0cmF0b3IvMTAuMC8iPg0KCTwhRU5USVRZIG5zX2dyYXBocyAiaHR0cDovL25zLmFkb2JlLmNvbS9HcmFwaHMvMS4wLyI+DQpdPg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zOng9IiZuc19leHRlbmQ7IiB4bWxuczppPSImbnNfYWk7IiB4bWxuczpncmFwaD0iJm5zX2dyYXBoczsiDQoJIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOmE9Imh0dHA6Ly9ucy5hZG9iZS5jb20vQWRv'+
			'YmVTVkdWaWV3ZXJFeHRlbnNpb25zLzMuMC8iDQoJIHg9IjBweCIgeT0iMHB4IiB3aWR0aD0iMzJweCIgaGVpZ2h0PSIzMnB4IiB2aWV3Qm94PSItMzcyMiAtMjYwNiAzMiAzMiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAtMzcyMiAtMjYwNiAzMiAzMiINCgkgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+DQo8ZyBpZD0iTGF5ZXJfMSI+DQo8L2c+DQo8ZyBpZD0iRWJlbmVfMSI+DQo8L2c+DQo8ZyBpZD0iTGF5ZXJfMiI+DQoJPGc+DQoJCTxnPg0KCQkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0zNjk1LjQ3My0yNTk4LjE0NmMtMC41MTktMC41MTktMS4zNjEtMC41MTktMS44NzksMGwtOC43ODcsOC'+
			'43ODdsLTIuMjkxLTIuMjQzDQoJCQkJYy0wLjUyNS0wLjUxMy0xLjM2Ni0wLjUwNC0xLjg4LDAuMDJjLTAuNTEzLDAuNTI1LTAuNTA0LDEuMzY3LDAuMDIxLDEuODhsMy4yMywzLjE2M2MwLjI1OSwwLjI1MywwLjU5NCwwLjM3OSwwLjkzLDAuMzc5DQoJCQkJYzAuMzQsMCwwLjY4LTAuMTMsMC45NC0wLjM5bDkuNzE3LTkuNzE3Qy0zNjk0Ljk1NC0yNTk2Ljc4NS0zNjk0Ljk1NC0yNTk3LjYyNi0zNjk1LjQ3My0yNTk4LjE0NnoiLz4NCgkJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0tMzY5OS45Ni0yNTgzLjgzN2gtMTIuMzI1di0xMi4zMjZoMTEuODIxbDIuMjUyLTIuMjUyYy0wLjE2Ni0wLjA4'+
			'Ni0wLjM1Mi0wLjE0MS0wLjU1Mi0wLjE0MWgtMTQuNzE4DQoJCQkJYy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2djE0LjcxOWMwLDAuNjYsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTZoMTQuNzE4YzAuNjYxLDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTZ2LTEwLjQwMw0KCQkJCWwtMi4zOTMsMi4zOTNWLTI1ODMuODM3eiIvPg0KCQk8L2c+DQoJCTxnIG9wYWNpdHk9IjAuNCIgIGE6YWRvYmUtYmxlbmRpbmctbW9kZT0ibXVsdGlwbHkiPg0KCQkJDQoJCQkJPHBhdGggZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMUExNzFCIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW'+
			'5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiAgYTphZG9iZS1ibGVuZGluZy1tb2RlPSJub3JtYWwiIGQ9Ig0KCQkJCU0tMzY5NS40NzMtMjU5OC4xNDZjLTAuNTE5LTAuNTE5LTEuMzYxLTAuNTE5LTEuODc5LDBsLTguNzg3LDguNzg3bC0yLjI5MS0yLjI0M2MtMC41MjUtMC41MTMtMS4zNjYtMC41MDQtMS44OCwwLjAyDQoJCQkJYy0wLjUxMywwLjUyNS0wLjUwNCwxLjM2NywwLjAyMSwxLjg4bDMuMjMsMy4xNjNjMC4yNTksMC4yNTMsMC41OTQsMC4zNzksMC45MywwLjM3OWMwLjM0LDAsMC42OC0wLjEzLDAuOTQtMC4zOWw5LjcxNy05LjcxNw0KCQkJCUMtMzY5NC45NTQtMjU5Ni43ODUtMzY5'+
			'NC45NTQtMjU5Ny42MjYtMzY5NS40NzMtMjU5OC4xNDZ6Ii8+DQoJCQkNCgkJCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMxQTE3MUIiIHN0cm9rZS13aWR0aD0iMS41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiICBhOmFkb2JlLWJsZW5kaW5nLW1vZGU9Im5vcm1hbCIgZD0iDQoJCQkJTS0zNjk5Ljk2LTI1ODMuODM3aC0xMi4zMjV2LTEyLjMyNmgxMS44MjFsMi4yNTItMi4yNTJjLTAuMTY2LTAuMDg2LTAuMzUyLTAuMTQxLTAuNTUyLTAuMTQxaC0xNC43MTgNCgkJCQljLTAuNjYxLDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTZ2MTQuNzE5YzAsMC'+
			'42NiwwLjUzNSwxLjE5NiwxLjE5NiwxLjE5NmgxNC43MThjMC42NjEsMCwxLjE5Ny0wLjUzNiwxLjE5Ny0xLjE5NnYtMTAuNDAzDQoJCQkJbC0yLjM5MywyLjM5M1YtMjU4My44Mzd6Ii8+DQoJCTwvZz4NCgkJPGc+DQoJCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNLTM2OTUuNDczLTI1OTguMTQ2Yy0wLjUxOS0wLjUxOS0xLjM2MS0wLjUxOS0xLjg3OSwwbC04Ljc4Nyw4Ljc4N2wtMi4yOTEtMi4yNDMNCgkJCQljLTAuNTI1LTAuNTEzLTEuMzY2LTAuNTA0LTEuODgsMC4wMmMtMC41MTMsMC41MjUtMC41MDQsMS4zNjcsMC4wMjEsMS44OGwzLjIzLDMuMTYzYzAuMjU5LDAuMjUzLDAuNTk0LDAu'+
			'Mzc5LDAuOTMsMC4zNzkNCgkJCQljMC4zNCwwLDAuNjgtMC4xMywwLjk0LTAuMzlsOS43MTctOS43MTdDLTM2OTQuOTU0LTI1OTYuNzg1LTM2OTQuOTU0LTI1OTcuNjI2LTM2OTUuNDczLTI1OTguMTQ2eiIvPg0KCQkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTS0zNjk5Ljk2LTI1ODMuODM3aC0xMi4zMjV2LTEyLjMyNmgxMS44MjFsMi4yNTItMi4yNTJjLTAuMTY2LTAuMDg2LTAuMzUyLTAuMTQxLTAuNTUyLTAuMTQxaC0xNC43MTgNCgkJCQljLTAuNjYxLDAtMS4xOTYsMC41MzYtMS4xOTYsMS4xOTZ2MTQuNzE5YzAsMC42NiwwLjUzNSwxLjE5NiwxLjE5NiwxLjE5NmgxNC43MThjMC42NjEsMC'+
			'wxLjE5Ny0wLjUzNiwxLjE5Ny0xLjE5NnYtMTAuNDAzDQoJCQkJbC0yLjM5MywyLjM5M1YtMjU4My44Mzd6Ii8+DQoJCTwvZz4NCgkJPGc+DQoJCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMxQTE3MUIiIHN0cm9rZS13aWR0aD0iMC4yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik0tMzY5NS40NzMtMjU5OC4xNDYNCgkJCQljLTAuNTE5LTAuNTE5LTEuMzYxLTAuNTE5LTEuODc5LDBsLTguNzg3LDguNzg3bC0yLjI5MS0yLjI0M2MtMC41MjUtMC41MTMtMS4zNjYtMC41MDQtMS44OCwwLjAyDQoJCQkJYy0wLjUxMywwLjUyNS0wLjUwNCwxLjM2'+
			'NywwLjAyMSwxLjg4bDMuMjMsMy4xNjNjMC4yNTksMC4yNTMsMC41OTQsMC4zNzksMC45MywwLjM3OWMwLjM0LDAsMC42OC0wLjEzLDAuOTQtMC4zOWw5LjcxNy05LjcxNw0KCQkJCUMtMzY5NC45NTQtMjU5Ni43ODUtMzY5NC45NTQtMjU5Ny42MjYtMzY5NS40NzMtMjU5OC4xNDZ6Ii8+DQoJCQk8cGF0aCBmaWxsPSJub25lIiBzdHJva2U9IiMxQTE3MUIiIHN0cm9rZS13aWR0aD0iMC4yIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGQ9Ik0tMzY5OS45Ni0yNTgzLjgzNw0KCQkJCWgtMTIuMzI1di0xMi4zMjZoMTEuODIxbDIuMjUyLTIuMjUyYy0wLjE2Ni'+
			'0wLjA4Ni0wLjM1Mi0wLjE0MS0wLjU1Mi0wLjE0MWgtMTQuNzE4Yy0wLjY2MSwwLTEuMTk2LDAuNTM2LTEuMTk2LDEuMTk2djE0LjcxOQ0KCQkJCWMwLDAuNjYsMC41MzUsMS4xOTYsMS4xOTYsMS4xOTZoMTQuNzE4YzAuNjYxLDAsMS4xOTctMC41MzYsMS4xOTctMS4xOTZ2LTEwLjQwM2wtMi4zOTMsMi4zOTNWLTI1ODMuODM3eiIvPg0KCQk8L2c+DQoJPC9nPg0KPC9nPg0KPC9zdmc+DQo=';
		me._ht_checkmark_tick__img.setAttribute('src',hs);
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;ht_checkmark_tick;');
		els['ondragstart']=function() { return false; };
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="ht_checkmark_tick";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_svg ";
		el.ggType='svg';
		hs ='';
		hs+='height : 30px;';
		hs+='position : absolute;';
		hs+='right : 0px;';
		hs+='top : 0px;';
		hs+='visibility : hidden;';
		hs+='width : 30px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._ht_checkmark_tick.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._ht_checkmark_tick.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(player.nodeVisited(me._ht_checkmark_tick.ggElementNodeId()) == true) || 
				(me._ht_checkmark_tick.ggIsActive() == true)
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._ht_checkmark_tick.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._ht_checkmark_tick.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._ht_checkmark_tick.style[domTransition]='';
				if (me._ht_checkmark_tick.ggCurrentLogicStateVisible == 0) {
					me._ht_checkmark_tick.style.visibility=(Number(me._ht_checkmark_tick.style.opacity)>0||!me._ht_checkmark_tick.style.opacity)?'inherit':'hidden';
					me._ht_checkmark_tick.ggVisible=true;
				}
				else {
					me._ht_checkmark_tick.style.visibility="hidden";
					me._ht_checkmark_tick.ggVisible=false;
				}
			}
		}
		me._ht_checkmark_tick.ggUpdatePosition=function (useTransition) {
		}
		me._hs_preview_image.appendChild(me._ht_checkmark_tick);
		me._ht_node.appendChild(me._hs_preview_image);
		el=me.__code=document.createElement('div');
		els=me.__code__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="_code";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 37px;';
		hs+='left : 0px;';
		hs+='position : absolute;';
		hs+='top : -39px;';
		hs+='visibility : hidden;';
		hs+='width : 66px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 68px;';
		hs+='height: 39px;';
		hs+='pointer-events: none;';
		hs+='background: #ffffff;';
		hs+='border: 1px solid #000000;';
		hs+='color: #000000;';
		hs+='text-align: left;';
		hs+='white-space: nowrap;';
		hs+='padding: 0px 1px 0px 1px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML="";
this.onUpdatePosition=function(player,hotspot) {
var vs=player.getViewerSize();
var y=vs.height * (1/6*(1+Math.cos(player.getTilt() * Math.PI/90.0)));
var hs= 'perspective(500px) translate3d(0px,' + (y) + 'px,0px) ';
hs += 'rotateZ(' + ( player.getRoll()).toFixed(10) + 'deg) ';
hs += 'rotateX(' + ( player.getTilt()).toFixed(10) + 'deg) ';
hs += 'rotateY(' + (-player.getPan()).toFixed(10)  + 'deg) ';
hs += 'rotateY(' + ( hotspot.pan).toFixed(2)  + 'deg) ';
hs += 'rotateX(' + (-hotspot.tilt).toFixed(2) + 'deg) ';
hs += 'rotateX(90deg) ';
this.__div.style.transform=hs;
this.__div.style.left = vs.width / 2 + "px";
this.__div.style.top = vs.height / 2 + "px";
};
		el.appendChild(els);
		me.__code.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me.__code.ggUpdatePosition=function (useTransition) {
		}
		me._ht_node.appendChild(me.__code);
		el=me._tt_ht_3d=document.createElement('div');
		els=me._tt_ht_3d__text=document.createElement('div');
		el.className='ggskin ggskin_textdiv';
		el.ggTextDiv=els;
		el.ggId="tt_ht_3d";
		el.ggDx=0;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=false;
		el.className="ggskin ggskin_text ";
		el.ggType='text';
		hs ='';
		hs+='height : 20px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='top : -170px;';
		hs+='visibility : hidden;';
		hs+='width : 150px;';
		hs+='pointer-events:none;';
		hs+='transform:translate3d(0px,0px,40px) rotateX(-90deg); text-shadow: 1px 1px 2px #000000; -webkit-backface-visibility: hidden; backface-visibility: hidden;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 100%';
		hs ='position:absolute;';
		hs += 'box-sizing: border-box;';
		hs+='cursor: default;';
		hs+='left: 0px;';
		hs+='top:  0px;';
		hs+='width: 150px;';
		hs+='height: auto;';
		hs+='pointer-events: none;';
		hs+='border: 0px solid #000000;';
		hs+='color: rgba(255,255,255,1);';
		hs+='font-size: 18px;';
		hs+='font-weight: inherit;';
		hs+='text-align: center;';
		hs+='white-space: pre-wrap;';
		hs+='padding: 2px 3px 2px 3px;';
		hs+='overflow: hidden;';
		els.setAttribute('style',hs);
		els.innerHTML=me.hotspot.title;
		el.appendChild(els);
		me._tt_ht_3d.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return me.ggNodeId;
		}
		me._tt_ht_3d.logicBlock_visible = function() {
			var newLogicStateVisible;
			if (
				(player.getIsTour() == false) && 
				(me.hotspot.title != "") && 
				(me.elementMouseOver['ht_node'] == true) && 
				(player.getVariableValue('opt_3d_preview') == true)
			)
			{
				newLogicStateVisible = 0;
			}
			else {
				newLogicStateVisible = -1;
			}
			if (me._tt_ht_3d.ggCurrentLogicStateVisible != newLogicStateVisible) {
				me._tt_ht_3d.ggCurrentLogicStateVisible = newLogicStateVisible;
				me._tt_ht_3d.style[domTransition]='';
				if (me._tt_ht_3d.ggCurrentLogicStateVisible == 0) {
					me._tt_ht_3d.style.visibility=(Number(me._tt_ht_3d.style.opacity)>0||!me._tt_ht_3d.style.opacity)?'inherit':'hidden';
					me._tt_ht_3d.ggVisible=true;
				}
				else {
					me._tt_ht_3d.style.visibility="hidden";
					me._tt_ht_3d.ggVisible=false;
				}
			}
		}
		me._tt_ht_3d.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth + 0;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me._ht_node.appendChild(me._tt_ht_3d);
		me.__div = me._ht_node;
	};
	me.addSkinHotspot=function(hotspot) {
		var hsinst = null;
		{
			hotspot.skinid = 'ht_node';
			hsinst = new SkinHotspotClass_ht_node(me, hotspot);
			if (!hotspotTemplates.hasOwnProperty(hotspot.skinid)) {
				hotspotTemplates[hotspot.skinid] = [];
			}
			hotspotTemplates[hotspot.skinid].push(hsinst);
			me.callChildLogicBlocksHotspot_ht_node_changenode();;
			me.callChildLogicBlocksHotspot_ht_node_configloaded();;
			me.callChildLogicBlocksHotspot_ht_node_mouseover();;
			me.callChildLogicBlocksHotspot_ht_node_active();;
			me.callChildLogicBlocksHotspot_ht_node_varchanged_opt_3d_preview();;
		}
		return hsinst;
	}
	me.removeSkinHotspots=function() {
		if(hotspotTemplates['ht_node']) {
			var i;
			for(i = 0; i < hotspotTemplates['ht_node'].length; i++) {
				hotspotTemplates['ht_node'][i] = null;
			}
		}
		hotspotTemplates = [];
	}
	me.addSkin();
	me._enter_vr.logicBlock_visible();
	me._tt_enter_vr.logicBlock_position();
	me._button_image_normalscreen.logicBlock_visible();
	me._button_image_fullscreen.logicBlock_visible();
	me._tt_fullscreen.logicBlock_text();
	me._tt_fullscreen.logicBlock_position();
	player.addListener('sizechanged', function(args) { me._enter_vr.logicBlock_visible();me._tt_enter_vr.logicBlock_position(); });
	player.addListener('fullscreenenter', function(args) { me._button_image_normalscreen.logicBlock_visible();me._button_image_fullscreen.logicBlock_visible();me._tt_fullscreen.logicBlock_text(); });
	player.addListener('fullscreenexit', function(args) { me._button_image_normalscreen.logicBlock_visible();me._button_image_fullscreen.logicBlock_visible();me._tt_fullscreen.logicBlock_text(); });
	player.addListener('configloaded', function(args) { me._tt_fullscreen.logicBlock_position(); });
	player.addListener('changenode', function(args) { me.callChildLogicBlocksHotspot_ht_node_changenode(); });
	player.addListener('configloaded', function(args) { me.callChildLogicBlocksHotspot_ht_node_configloaded(); });
	player.addListener('mouseover', function(args) { me.callChildLogicBlocksHotspot_ht_node_mouseover(); });
	player.addListener('changenode', function(args) { me.callChildLogicBlocksHotspot_ht_node_active(); });
	player.addListener('varchanged_opt_3d_preview', function(args) { me.callChildLogicBlocksHotspot_ht_node_varchanged_opt_3d_preview(); });
	player.addListener('hotspotsremoved', function(args) { me.removeSkinHotspots(); });
	me.skinTimerEvent();
};