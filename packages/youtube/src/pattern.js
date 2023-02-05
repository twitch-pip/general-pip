"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SHORT_URL_PATTERN = exports.LONG_URL_PATTERN = exports.URL_PATTERN = void 0;
exports.URL_PATTERN = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(.+)/;
exports.LONG_URL_PATTERN = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com)\/(?:watch\?v=)(.+)/;
exports.SHORT_URL_PATTERN = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be)\/(.+)/;
