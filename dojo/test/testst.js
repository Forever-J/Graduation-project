define(["dojo/_base/declare","dijit/_WidgetBase", "dijit/_TemplatedMixin",  "dojo/text!./0401.html","dojo/dom"], function (declare, _WidgetBase, _TemplatedMixin,temstring,dom) {
    return declare([_WidgetBase, _TemplatedMixin], {
        templateString:
           temstring,
        onClick: function (evt) {
            var t = dom.byId("Text1");
            alert(t.value);
        }
    });
});
