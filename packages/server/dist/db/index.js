"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const supabase_js_1 = require("@supabase/supabase-js");
const utils_1 = require("../utils");
exports.client = (0, supabase_js_1.createClient)((0, utils_1.env)('PROYECT_URL') || '', (0, utils_1.env)('ANON_KEY') || '');
