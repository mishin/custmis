KISSY.add("dd",function(d){function g(){g.superclass.constructor.apply(this,arguments);this._init()}function i(b,e,h){h=h||150;if(h===-1)return function(){b.apply(e,arguments)};var j=d.now();return function(){var k=d.now();if(k-j>h){j=k;b.apply(e,arguments)}}}var a=d.Event,c=d.DOM,f=d.Node;d.DD={};g.ATTRS={bufferTime:{value:200},activeDrag:{}};d.extend(g,d.Base,{_init:function(){this._showShimMove=i(this._move,this,30)},_move:function(b){var e=this.get("activeDrag");d.log("move");if(e){b.preventDefault();
this._clearSelection();e._move(b)}},_start:function(b){var e=this,h=e.get("bufferTime")||0;e._registerEvent();if(h)e._bufferTimer=setTimeout(function(){e._bufferStart(b)},h);else e._bufferStart(b)},_bufferStart:function(b){this.set("activeDrag",b);this._activeShim();b._start()},_end:function(b){var e=this.get("activeDrag");this._unregisterEvent();if(this._bufferTimer){clearTimeout(this._bufferTimer);this._bufferTimer=null}this._shim&&this._shim.css({display:"none"});if(e){e._end(b);this.set("activeDrag",
null)}},_activeShim:function(){var b=document;this._shim=(new f("<div style='background-color:red;position:absolute;left:0;width:100%;top:0;z-index:999999;'></div>")).appendTo(b.body);this._shim.css("opacity",0);this._activeShim=this._showShim;this._showShim()},_showShim:function(){this._shim.css({display:"",height:c.docHeight()});this._clearSelection()},_clearSelection:function(){d.log("_clearSelection");if(window.getSelection)window.getSelection().removeAllRanges();else if(document.selection)try{document.selection.empty()}catch(b){}},
_registerEvent:function(){var b=document;d.log("_registerEvent");a.on(b,"mouseup",this._end,this);a.on(b,"mousemove",this._showShimMove,this)},_unregisterEvent:function(){var b=document;d.log("_unregisterEvent");a.remove(b,"mousemove",this._showShimMove,this);a.remove(b,"mouseup",this._end,this)}});d.DD.DDM=new g});
KISSY.add("dd-draggable",function(d){function g(){g.superclass.constructor.apply(this,arguments);this._init()}var i=d.UA;g.ATTRS={node:{setter:function(a){return d.one(a)}},handlers:{value:[],setter:function(a){if(a)for(var c=0;c<a.length;c++)a[c]=d.one(a[c])}}};d.extend(g,d.Base,{_init:function(){var a=this.get("node"),c=this.get("handlers");if(c.length==0)c[0]=a;for(var f=0;f<c.length;f++){var b=c[f],e=b.css("cursor");if(b[0]!=a[0])if(!e||e==="auto")b.css("cursor","move")}a.on("mousedown",this._handleMouseDown,
this)},destroy:function(){for(var a=this.get("node"),c=this.get("handlers"),f=0;f<c.length;f++){var b=c[f];b.css("cursor")=="move"&&b.css("cursor","auto")}a.detach("mousedown",this._handleMouseDown,this)},_check:function(a){for(var c=this.get("handlers"),f=0;f<c.length;f++){var b=c[f];if(b.contains(a)||b[0]==a[0])return true}return false},_handleMouseDown:function(a){if(this._check(new d.Node(a.target))){i.webkit||a.preventDefault();d.DD.DDM._start(this);var c=this.get("node"),f=a.pageX;a=a.pageY;
c=c.offset();this.startMousePos={left:f,top:a};this.startNodePos=c;this._diff={left:f-c.left,top:a-c.top};this.set("diff",this._diff)}},_move:function(a){var c=this.get("diff");d.mix(a,{left:a.pageX-c.left,top:a.pageY-c.top});this.fire("drag",a)},_end:function(){this.fire("dragend")},_start:function(){this.fire("dragstart")}});d.Draggable=g},{host:"dd"});KISSY.Editor.add("dd",function(){});