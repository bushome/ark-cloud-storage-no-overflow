"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setClusterId = setClusterId;
exports.getClusterId = getClusterId;
function setClusterId(context, clusterId) {
    if (context.getType() === "ws") {
        const client = context.switchToWs().getClient();
        client.data = { ...client.data, clusterId };
    }
    else {
        context.switchToHttp().getRequest().clusterId = clusterId;
    }
}
function getClusterId(context) {
    if (context.getType() === "ws") {
        return context.switchToWs().getClient().data?.clusterId;
    }
    return context.switchToHttp().getRequest().clusterId;
}
//# sourceMappingURL=cluster-context.js.map