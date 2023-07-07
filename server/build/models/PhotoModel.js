"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var UserModel_1 = __importDefault(require("./UserModel"));
var PhotoSchema = new mongoose_1.default.Schema({
    user: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: UserModel_1.default,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: [true, 'Please provide a title!'],
    },
    description: {
        type: String,
        required: false,
    },
    publishedAt: {
        type: Date,
        default: Date.now,
    },
    camera: {
        type: String,
        required: false,
    },
    tags: {
        type: [
            {
                type: String,
                required: true,
            },
        ],
        required: false,
    },
});
exports.default = mongoose_1.default.model('Photo', PhotoSchema);
