"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAppRootDir = getAppRootDir;
exports.resolveAppPath = resolveAppPath;
const path_1 = require("path");
function getAppRootDir() {
    if (require.main) {
        return (0, path_1.dirname)((0, path_1.dirname)(require.main.filename));
    }
    return (0, path_1.dirname)(process.execPath);
}
function resolveAppPath(maybeRelativePath) {
    return (0, path_1.isAbsolute)(maybeRelativePath)
        ? maybeRelativePath
        : (0, path_1.join)(getAppRootDir(), maybeRelativePath);
}
//# sourceMappingURL=app-root.js.map