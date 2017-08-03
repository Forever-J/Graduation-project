/*
 COPYRIGHT 2009 ESRI

 TRADE SECRETS: ESRI PROPRIETARY AND CONFIDENTIAL
 Unpublished material - all rights reserved under the
 Copyright Laws of the United States and applicable international
 laws, treaties, and conventions.

 For additional information, contact:
 Environmental Systems Research Institute, Inc.
 Attn: Contracts and Legal Services Department
 380 New York Street
 Redlands, California, 92373
 USA

 email: contracts@esri.com
 */
//>>built
require({cache:{"url:esri/dijit/templates/OverviewMap.html":'\x3cdiv class\x3d"esriOverviewMap"\x3e\n  \x3cdiv class\x3d"ovwContainer" dojoattachpoint\x3d"_body" style\x3d"width: ${width}px; height: ${height}px;"\x3e\n    \x3cdiv id\x3d"${id}-map" style\x3d"width: 100%; height: 100%;"\x3e\n      \x3cdiv class\x3d"ovwHighlight" dojoattachpoint\x3d"_focusDiv" title\x3d"${NLS_drag}" style\x3d"border: 1px solid ${color}; background-color: ${color};"\x3e\x3c/div\x3e\n    \x3c/div\x3e\n  \x3c/div\x3e\n  \x3cdiv class\x3d"ovwButton ovwController" title\x3d"${NLS_show}" dojoattachpoint\x3d"_controllerDiv" dojoattachevent\x3d"onclick: _visibilityHandler"\x3e\n  \x3c/div\x3e\n  \x3cdiv class\x3d"ovwButton ovwMaximizer" title\x3d"${NLS_maximize}" dojoattachpoint\x3d"_maximizerDiv" dojoattachevent\x3d"onclick: _maximizeHandler"\x3e\n  \x3c/div\x3e\n\x3c/div\x3e\n'}});
define("esri/dijit/OverviewMap","require dojo/_base/declare dojo/_base/lang dojo/_base/connect dojo/_base/html dojo/has dojo/sniff dojo/dom-class dojo/dom-style dojo/dnd/Moveable dijit/_Widget dijit/_Templated esri/map esri/geometry/Point esri/geometry/ScreenPoint esri/layers/TiledMapServiceLayer esri/layers/DynamicMapServiceLayer esri/layers/ArcGISTiledMapServiceLayer esri/layers/ArcGISDynamicMapServiceLayer esri/layers/ArcGISImageServiceLayer esri/layers/OpenStreetMapLayer esri/virtualearth/VETiledLayer esri/kernel esri/config esri/domUtils dojo/text!esri/dijit/templates/OverviewMap.html dojo/i18n!esri/nls/jsapi".split(" "),
function(k,q,l,c,r,p,H,d,g,s,t,u,v,m,w,x,y,z,A,B,C,D,E,n,f,F,G){k=q([t,u],{declaredClass:"esri.dijit.OverviewMap",widgetsInTemplate:!0,templateString:F,basePath:k.toUrl("esri/dijit")+"/",constructor:function(a,b){l.mixin(this,G.widgets.overviewMap);a=a||{};if(a.map){var e={};b&&(this._detached=!0,e=r.coords(b,!0));this.map=a.map;this.baseLayer=a.baseLayer;this.width=a.width||e.w||this.map.width/4;this.height=a.height||e.h||this.map.height/4;this.attachTo=a.attachTo||"top-right";this.expandFactor=
a.expandFactor||2;this.color=a.color||"#000000";this.opacity=a.opacity||0.5;this.maximizeButton=!!a.maximizeButton;this.visible=!!a.visible;if(this.map.loaded)this._initialSetup();else var h=c.connect(this.map,"onLoad",this,function(){c.disconnect(h);h=null;this._initialSetup()});this._detached&&(this.visible=!0);this._maximized=!1}else console.error("esri.dijit.OverviewMap: "+this.NLS_noMap)},startup:function(){this.inherited(arguments);p("ie")?this.domNode.parentElement||this.map.container.appendChild(this.domNode):
this.domNode.parentNode||this.map.container.appendChild(this.domNode);this._detached?(g.set(this._body,"display","block"),g.set(this._controllerDiv,"display","none"),g.set(this._maximizerDiv,"display","none"),this.map.loaded?this._initialize():c.connect(this.map,"onLoad",this,this._initialize)):("bottom"===this.attachTo.split("-")[0]&&this.domNode.insertBefore(this._maximizerDiv,this._controllerDiv),this.maximizeButton||d.add(this._maximizerDiv,"ovwDisabledButton"),d.add(this.domNode,{"top-left":"ovwTL",
"top-right":"ovwTR","bottom-left":"ovwBL","bottom-right":"ovwBR"}[this.attachTo]),d.add(this._controllerDiv,"ovwShow"),d.add(this._maximizerDiv,"ovwMaximize"),this.visible&&this.map.loaded&&(this.visible=!1,this.show()));g.set(this._focusDiv,"opacity",this.opacity)},destroy:function(){this._deactivate();this.overviewMap&&this.overviewMap.destroy();this.overviewMap=this.baseLayer=null;this.inherited(arguments)},resize:function(a){a&&!(0>=a.w||0>=a.h)&&this._resize(a.w,a.h)},show:function(){if(!this.visible){var a=
this._controllerDiv;a.title=this.NLS_hide;d.remove(a,"ovwShow");d.add(a,"ovwHide");f.show(this._body);f.show(this._maximizerDiv);this._initialize();this.visible=!0}},hide:function(){if(this.visible){var a=this._controllerDiv;a.title=this.NLS_show;d.remove(a,"ovwHide");d.add(a,"ovwShow");this._maximized&&this._maximizeHandler();f.hide(this._body);f.hide(this._maximizerDiv);this._deactivate();this.visible=!1}},_initialSetup:function(){if(this._mainMapLayer=this.map.getLayer(this.map.layerIds[0])){var a=
this.baseLayer||this._mainMapLayer,b=this.map.spatialReference,e=a.spatialReference;if(e.wkid!==b.wkid&&e.wkt!==b.wkt)console.error("esri.dijit.OverviewMap: "+this.NLS_invalidSR);else{b=a.declaredClass;if(a instanceof x)if(-1!==b.indexOf("VETiledLayer"))this.baseLayer=new D({resourceInfo:a.getResourceInfo(),culture:a.culture,mapStyle:a.mapStyle,bingMapsKey:a.bingMapsKey});else if(-1!==b.indexOf("OpenStreetMapLayer"))this.baseLayer=new C({tileServers:a.tileServers});else if(-1!==b.indexOf("WebTiledLayer")){var b=
a.initialExtent,e=a.fullExtent,h=a.tileInfo;this.baseLayer=new a.constructor(a.urlTemplate,{initialExtent:b&&new b.constructor(b.toJson()),fullExtent:e&&new e.constructor(e.toJson()),tileInfo:h&&new h.constructor(h.toJson()),tileServers:a.tileServers&&a.tileServers.slice(0)})}else this.baseLayer=new z(a.url,{resourceInfo:a.getResourceInfo()});else if(a instanceof y)-1!==b.indexOf("ArcGISImageServiceLayer")?this.baseLayer=new B(a.url):(this.baseLayer=new A(a.url),this.baseLayer.setImageFormat("png24"));
else{console.error("esri.dijit.OverviewMap: "+this.NLS_invalidType);return}!this._detached&&(this.visible&&this._controllerDiv)&&(a=function(){this.visible=!1;this.show()},this.baseLayer.loaded?a.call(this):c.connect(this.baseLayer,"onLoad",this,a))}}else console.error("esri.dijit.OverviewMap: "+this.NLS_noLayer)},_visibilityHandler:function(){this.visible?this.hide():this.show()},_maximizeHandler:function(){var a=this._maximizerDiv;this._maximized?(a.title=this.NLS_maximize,d.remove(a,"ovwRestore"),
d.add(a,"ovwMaximize"),this._resize(this.width,this.height)):(a.title=this.NLS_restore,d.remove(a,"ovwMaximize"),d.add(a,"ovwRestore"),this._resize(this.map.width,this.map.height));this._maximized=!this._maximized},_resize:function(a,b){g.set(this._body,{width:a+"px",height:b+"px"});var e=n.defaults.map.panDuration,c=this.overviewMap;n.defaults.map.panDuration=0;c.resize(!0);c.centerAt(this._focusExtent.getCenter());n.defaults.map.panDuration=e},_initialize:function(){if(this.overviewMap)this._activate();
else{var a;a=this.overviewMap=new v(this.id+"-map",{slider:!1,showAttribution:!1,logo:!1,lods:this._overviewLods,wrapAround180:this.map.wrapAround180});c.connect(a,"onLoad",this,function(){this._map_resize_override=l.hitch(a,this._map_resize_override);a.disableMapNavigation();this._activate()});a.addLayer(this.baseLayer)}},_activate:function(){var a=this.map,b=this.overviewMap;this._moveableHandle=new s(this._focusDiv);this._soeConnect=c.connect(a,"onExtentChange",this,this._syncOverviewMap);this._ufoConnect=
c.connect(a,"onPan",this,this._updateFocus);this._oecConnect=c.connect(b,"onExtentChange",this,this._ovwExtentChangeHandler);this._opaConnect=c.connect(b,"onPan",this,this._ovwPanHandler);this._ozsConnect=c.connect(b,"onZoomStart",this,function(){f.hide(this._focusDiv)});this._ozeConnect=c.connect(b,"onZoomEnd",this,function(){f.show(this._focusDiv)});this._omsConnect=c.connect(this._moveableHandle,"onMoveStop",this,this._moveStopHandler);this._syncOverviewMap(a.extent,null,null,null)},_deactivate:function(){c.disconnect(this._soeConnect);
c.disconnect(this._ufoConnect);c.disconnect(this._oecConnect);c.disconnect(this._opaConnect);c.disconnect(this._ozsConnect);c.disconnect(this._ozeConnect);c.disconnect(this._omsConnect);this._moveableHandle&&this._moveableHandle.destroy()},_syncOverviewMap:function(a,b,e,c){this._suspendPanHandling?this._suspendPanHandling=!1:(this._focusExtent=a,this.overviewMap.setExtent(a.expand(this.expandFactor),!0))},_updateFocus:function(a){this._suspendPanHandling||(this._focusExtent=a,this._drawFocusDiv(a))},
_drawFocusDiv:function(a,b){var e=this.overviewMap,c=e.toScreen(new m(a.xmin,a.ymax,e.spatialReference)),d=e.toScreen(new m(a.xmax,a.ymin,e.spatialReference)),e=d.x-c.x,d=d.y-c.y,f=!0;e>this.overviewMap.width&&d>this.overviewMap.height&&(f=!1);g.set(this._focusDiv,{left:c.x+(b?b.x:0)+"px",top:c.y+(b?b.y:0)+"px",width:e+"px",height:d+"px",display:f?"block":"none"})},_moveStopHandler:function(a){var b=this._moveableHandle.node.style;a=this._focusExtent;var c=this.overviewMap,b=c.toMap(new w(parseInt(b.left,
10),parseInt(b.top,10))),d=new m(a.xmin,a.ymax,c.spatialReference);this._focusExtent=a.offset(b.x-d.x,b.y-d.y);this._maximized?this._maximizeHandler():c.centerAt(this._focusExtent.getCenter());this._suspendPanHandling=!0;this.map.setExtent(this._focusExtent)},_ovwExtentChangeHandler:function(){this._drawFocusDiv(this._focusExtent)},_ovwPanHandler:function(a,b){this._drawFocusDiv(this._focusExtent,b)}});p("extend-esri")&&l.setObject("dijit.OverviewMap",k,E);return k});