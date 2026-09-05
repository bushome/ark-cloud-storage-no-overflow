"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AllowUnauthorized = AllowUnauthorized;
const common_1 = require("@nestjs/common");
const constants_1 = require("../constants");
function AllowUnauthorized() {
    return (0, common_1.applyDecorators)((0, common_1.SetMetadata)(constants_1.ALLOW_UNAUTHORIZED, true));
}
//# sourceMappingURL=allow-unauthorized.decorator.js.map