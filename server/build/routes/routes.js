"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var AuthController_1 = require("../controllers/AuthController");
var router = (0, express_1.Router)();
// Auth routes
var authPrefix = '/auth';
router.post("".concat(authPrefix, "/register"), AuthController_1.register);
exports.default = router;
