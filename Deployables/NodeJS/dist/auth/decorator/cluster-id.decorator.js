"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClusterId = void 0;
const common_1 = require("@nestjs/common");
const cluster_context_1 = require("../util/cluster-context");
exports.ClusterId = (0, common_1.createParamDecorator)((_data, context) => (0, cluster_context_1.getClusterId)(context));
//# sourceMappingURL=cluster-id.decorator.js.map