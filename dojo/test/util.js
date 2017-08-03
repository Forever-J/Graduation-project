define(["dojo/dom"], function (dom) {
    return {
        setRed: function (id) {
            dom.byId(id).style.color = "red";
        }
    };
});
