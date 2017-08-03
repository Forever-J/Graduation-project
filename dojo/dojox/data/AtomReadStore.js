//>>built
define("dojox/data/AtomReadStore",["dojo","dojox","dojo/data/util/filter","dojo/data/util/simpleFetch","dojo/date/stamp"],function(f,l){f.experimental("dojox.data.AtomReadStore");var k=f.declare("dojox.data.AtomReadStore",null,{constructor:function(a){a&&(this.url=a.url,this.rewriteUrl=a.rewriteUrl,this.label=a.label||this.label,this.sendQuery=a.sendQuery||a.sendquery||this.sendQuery,this.unescapeHTML=a.unescapeHTML,"urlPreventCache"in a&&(this.urlPreventCache=a.urlPreventCache?!0:!1));if(!this.url)throw Error("AtomReadStore: a URL must be specified when creating the data store");
},url:"",label:"title",sendQuery:!1,unescapeHTML:!1,urlPreventCache:!1,getValue:function(a,b,d){this._assertIsItem(a);this._assertIsAttribute(b);this._initItem(a);b=b.toLowerCase();a._attribs[b]||a._parsed||(this._parseItem(a),a._parsed=!0);var c=a._attribs[b];c||"summary"!=b||(c=this.getValue(a,"content").text.replace(/\/(<([^>]+)>)\/g/i,""),c={text:c.substring(0,Math.min(400,c.length)),type:"text"},a._attribs[b]=c);!c||!this.unescapeHTML||"content"!=b&&"summary"!=b&&"subtitle"!=b||a["_"+b+"Escaped"]||
(c.text=this._unescapeHTML(c.text),a["_"+b+"Escaped"]=!0);return c?f.isArray(c)?c[0]:c:d},getValues:function(a,b){this._assertIsItem(a);this._assertIsAttribute(b);this._initItem(a);b=b.toLowerCase();a._attribs[b]||this._parseItem(a);var d=a._attribs[b];return d?void 0!==d.length&&"string"!==typeof d?d:[d]:void 0},getAttributes:function(a){this._assertIsItem(a);a._attribs||(this._initItem(a),this._parseItem(a));var b=[],d;for(d in a._attribs)b.push(d);return b},hasAttribute:function(a,b){return void 0!==
this.getValue(a,b)},containsValue:function(a,b,d){a=this.getValues(a,b);for(b=0;b<a.length;b++)if("string"===typeof d){if(a[b].toString&&a[b].toString()===d)return!0}else if(a[b]===d)return!0;return!1},isItem:function(a){return a&&a.element&&a.store&&a.store===this?!0:!1},isItemLoaded:function(a){return this.isItem(a)},loadItem:function(a){},getFeatures:function(){return{"dojo.data.api.Read":!0}},getLabel:function(a){if(""!==this.label&&this.isItem(a)){if((a=this.getValue(a,this.label))&&a.text)return a.text;
if(a)return a.toString()}},getLabelAttributes:function(a){return""!==this.label?[this.label]:null},getFeedValue:function(a,b){var d=this.getFeedValues(a,b);return f.isArray(d)?d[0]:d},getFeedValues:function(a,b){if(!this.doc)return b;this._feedMetaData||(this._feedMetaData={element:this.doc.getElementsByTagName("feed")[0],store:this,_attribs:{}},this._parseItem(this._feedMetaData));return this._feedMetaData._attribs[a]||b},_initItem:function(a){a._attribs||(a._attribs={})},_fetchItems:function(a,
b,d){var c=this._getFetchUrl(a);if(c){var g=this.sendQuery?null:a,e=this,h=function(c){e.doc=c;c=e._getItems(c,g);var d=a.query;d&&(d.id?c=f.filter(c,function(a){return e.getValue(a,"id")==d.id}):d.category&&(c=f.filter(c,function(a){return(a=e.getValues(a,"category"))?f.some(a,"return item.term\x3d\x3d'"+d.category+"'"):!1})));c&&0<c.length?b(c,a):b([],a)};this.doc?h(this.doc):(c=f.xhrGet({url:c,handleAs:"xml",preventCache:this.urlPreventCache}),c.addCallback(h),c.addErrback(function(b){d(b,a)}))}else d(Error("No URL specified."))},
_getFetchUrl:function(a){if(!this.sendQuery)return this.url;var b=a.query;if(!b)return this.url;if(f.isString(b))return this.url+b;a="";for(var d in b){var c=b[d];c&&(a&&(a+="\x26"),a+=d+"\x3d"+c)}if(!a)return this.url;d=this.url;d=0>d.indexOf("?")?d+"?":d+"\x26";return d+a},_getItems:function(a,b){if(this._items)return this._items;var d=[],c=[];if(1>a.childNodes.length)return this._items=d;c=f.filter(a.childNodes,"return item.tagName \x26\x26 item.tagName.toLowerCase() \x3d\x3d 'feed'");if(!c||1!=
c.length)return d;c=f.filter(c[0].childNodes,"return item.tagName \x26\x26 item.tagName.toLowerCase() \x3d\x3d 'entry'");if(b.onBegin)b.onBegin(c.length,this.sendQuery?b:{});for(var g=0;g<c.length;g++){var e=c[g];1==e.nodeType&&d.push(this._getItem(e))}return this._items=d},close:function(a){},_getItem:function(a){return{element:a,store:this}},_parseItem:function(a){function b(a){var b=a.textContent||a.innerHTML||a.innerXML;if(!b&&a.childNodes[0]){var c=a.childNodes[0];!c||3!=c.nodeType&&4!=c.nodeType||
(b=a.childNodes[0].nodeValue)}return b}function d(a){return{text:b(a),type:a.getAttribute("type")}}var c=a._attribs;f.forEach(a.element.childNodes,function(a){var e=a.tagName?a.tagName.toLowerCase():"";switch(e){case "title":c[e]={text:b(a),type:a.getAttribute("type")};break;case "subtitle":case "summary":case "content":c[e]=d(a);break;case "author":var h,g;f.forEach(a.childNodes,function(a){if(a.tagName)switch(a.tagName.toLowerCase()){case "name":h=a;break;case "uri":g=a}});a={};h&&1==h.length&&
(a.name=b(h[0]));g&&1==g.length&&(a.uri=b(g[0]));c[e]=a;break;case "id":c[e]=b(a);break;case "updated":c[e]=f.date.stamp.fromISOString(b(a));break;case "published":c[e]=f.date.stamp.fromISOString(b(a));break;case "category":c[e]||(c[e]=[]);c[e].push({scheme:a.getAttribute("scheme"),term:a.getAttribute("term")});break;case "link":c[e]||(c[e]=[]),a={rel:a.getAttribute("rel"),href:a.getAttribute("href"),type:a.getAttribute("type")},c[e].push(a),"alternate"==a.rel&&(c.alternate=a)}})},_unescapeHTML:function(a){return a=
a.replace(/&#8217;/m,"'").replace(/&#8243;/m,'"').replace(/&#60;/m,"\x3e").replace(/&#62;/m,"\x3c").replace(/&#38;/m,"\x26")},_assertIsItem:function(a){if(!this.isItem(a))throw Error("dojox.data.AtomReadStore: Invalid item argument.");},_assertIsAttribute:function(a){if("string"!==typeof a)throw Error("dojox.data.AtomReadStore: Invalid attribute argument.");}});f.extend(k,f.data.util.simpleFetch);return k});
//# sourceMappingURL=AtomReadStore.js.map