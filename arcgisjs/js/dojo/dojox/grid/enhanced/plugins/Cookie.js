//>>built
define("dojox/grid/enhanced/plugins/Cookie","dojo/_base/declare dojo/_base/array dojo/_base/lang dojo/_base/sniff dojo/_base/html dojo/_base/json dojo/_base/window dojo/_base/unload dojo/cookie ../_Plugin ../../_RowSelector ../../EnhancedGrid ../../cells/_base".split(" "),function(h,e,c,m,r,k,s,t,l,u,v,n){var p=c.getObject("dojox.grid.cells"),q=function(a){var b=[];c.isArray(a)||(a=[a]);e.forEach(a,function(a){c.isArray(a)&&(a={cells:a});a=a.rows||a.cells;c.isArray(a)&&(c.isArray(a[0])||(a=[a]),e.forEach(a,
function(a){c.isArray(a)&&e.forEach(a,function(a){b.push(a)})}))});return b},w=function(a,b){if(c.isArray(a)){var d=b._setStructureAttr;b._setStructureAttr=function(g){if(!b._colWidthLoaded){b._colWidthLoaded=!0;for(var f=q(g),c=f.length-1;0<=c;--c)"number"==typeof a[c]?f[c].width=a[c]+"px":"hidden"==a[c]&&(f[c].hidden=!0)}d.call(b,g);b._setStructureAttr=d}}},x=function(a){return e.map(e.filter(a.layout.cells,function(a){return!(a.isRowSelector||a instanceof p.RowIndex)}),function(a){return a.hidden?
"hidden":r[m("webkit")?"marginBox":"contentBox"](a.getHeaderNode()).w})},y=function(a,b){if(a&&e.every(a,function(a){return c.isArray(a)&&e.every(a,function(a){return c.isArray(a)&&0<a.length})})){var d=b._setStructureAttr,g=function(a){return null!==a&&c.isObject(a)&&("cells"in a||"rows"in a||"type"in a&&!("name"in a||"field"in a||"get"in a))};b._setStructureAttr=function(f){if(!b._colOrderLoaded){b._colOrderLoaded=!0;b._setStructureAttr=d;f=c.clone(f);c.isArray(f)&&!e.some(f,g)?f=[{cells:f}]:g(f)&&
(f=[f]);var h=q(f);e.forEach(c.isArray(f)?f:[f],function(b,d){var g=b;c.isArray(b)?b.splice(0,b.length):(delete b.rows,g=b.cells=[]);e.forEach(a[d],function(a){e.forEach(a,function(a){var b,d;for(b=0;b<h.length&&!(d=h[b],k.toJson({name:d.name,field:d.field})==k.toJson(a));++b);b<h.length&&g.push(d)})})})}d.call(b,f)}}},z=function(a){return e.map(e.filter(a.views.views,function(a){return!(a instanceof v)}),function(a){return e.map(a.structure.cells,function(a){return e.map(e.filter(a,function(a){return!(a.isRowSelector||
a instanceof p.RowIndex)}),function(a){return{name:a.name,field:a.field}})})})},A=function(a,b){try{a&&c.isObject(a)&&b.setSortIndex(a.idx,a.asc)}catch(d){}},B=function(a){return{idx:a.getSortIndex(),asc:a.getSortAsc()}};m("ie")||t.addOnWindowUnload(function(){e.forEach(dijit.findWidgets(s.body()),function(a){a instanceof n&&!a._destroyed&&a.destroyRecursive()})});h=h("dojox.grid.enhanced.plugins.Cookie",u,{name:"cookie",_cookieEnabled:!0,constructor:function(a,b){this.grid=a;b=b&&c.isObject(b)?b:
{};this.cookieProps=b.cookieProps;this._cookieHandlers=[];this._mixinGrid();this.addCookieHandler({name:"columnWidth",onLoad:w,onSave:x});this.addCookieHandler({name:"columnOrder",onLoad:y,onSave:z});this.addCookieHandler({name:"sortOrder",onLoad:A,onSave:B});e.forEach(this._cookieHandlers,function(a){!1===b[a.name]&&(a.enable=!1)},this)},destroy:function(){this._saveCookie();this._cookieHandlers=null;this.inherited(arguments)},_mixinGrid:function(){var a=this.grid;a.addCookieHandler=c.hitch(this,
"addCookieHandler");a.removeCookie=c.hitch(this,"removeCookie");a.setCookieEnabled=c.hitch(this,"setCookieEnabled");a.getCookieEnabled=c.hitch(this,"getCookieEnabled")},_saveCookie:function(){if(this.getCookieEnabled()){for(var a={},b=this._cookieHandlers,d=this.cookieProps,g=window.location+"/"+this.grid.id,d=b.length-1;0<=d;--d)b[d].enabled&&(a[b[d].name]=b[d].onSave(this.grid));d=c.isObject(this.cookieProps)?this.cookieProps:{};l(g,k.toJson(a),d)}else this.removeCookie()},onPreInit:function(){var a=
this.grid,b=this._cookieHandlers,d=l(window.location+"/"+a.id);if(d)for(var d=k.fromJson(d),c=0;c<b.length;++c)if(b[c].name in d&&b[c].enabled)b[c].onLoad(d[b[c].name],a);this._cookie=d||{};this._cookieStartedup=!0},addCookieHandler:function(a){if(a.name){var b=function(){};a.onLoad=a.onLoad||b;a.onSave=a.onSave||b;"enabled"in a||(a.enabled=!0);for(b=this._cookieHandlers.length-1;0<=b;--b)this._cookieHandlers[b].name==a.name&&this._cookieHandlers.splice(b,1);this._cookieHandlers.push(a);if(this._cookieStartedup&&
a.name in this._cookie)a.onLoad(this._cookie[a.name],this.grid)}},removeCookie:function(){l(window.location+"/"+this.grid.id,null,{expires:-1})},setCookieEnabled:function(a,b){if("string"==typeof a)for(var d=this._cookieHandlers,c=d.length-1;0<=c;--c)d[c].name===a&&(d[c].enabled=!!b);else(this._cookieEnabled=!!a)||this.removeCookie()},getCookieEnabled:function(a){if(c.isString(a)){for(var b=this._cookieHandlers,d=b.length-1;0<=d;--d)if(b[d].name==a)return b[d].enabled;return!1}return this._cookieEnabled}});
n.registerPlugin(h,{preInit:!0});return h});