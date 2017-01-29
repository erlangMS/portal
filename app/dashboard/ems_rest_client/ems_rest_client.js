"use strict";
var EmsRestClient = (function () {
    function EmsRestClient() {
        this.resource_url = null;
    }
    EmsRestClient.prototype.from = function (url) {
        var client = new EmsRestClient();
        client.resource_url = url;
        return client;
    };
    return EmsRestClient;
}());
exports.EmsRestClient = EmsRestClient;
//# sourceMappingURL=ems_rest_client.js.map