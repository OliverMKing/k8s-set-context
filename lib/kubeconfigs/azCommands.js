"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAzKubeconfigCommandBlocking = exports.runAzCliCommand = void 0;
const fs = __importStar(require("fs"));
const exec_1 = require("@actions/exec");
const child_process_1 = require("child_process");
const AZ_TIMEOUT_SECONDS = 120;
/**
 * Executes an az cli command
 * @param azPath The path to the az tool
 * @param args The arguments to be invoked
 * @param options Optional options for the command execution
 */
function runAzCliCommand(azPath, args, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        yield exec_1.exec(azPath, args, options);
    });
}
exports.runAzCliCommand = runAzCliCommand;
/**
 * Executes an az cli command that will set the kubeconfig
 * @param azPath The path to the az tool
 * @param args The arguments to be be invoked
 * @param kubeconfigPath The path to the kubeconfig that is updated by the command
 * @returns The contents of the kubeconfig
 */
function runAzKubeconfigCommandBlocking(azPath, args, kubeconfigPath) {
    return __awaiter(this, void 0, void 0, function* () {
        const proc = child_process_1.spawn(azPath, args, {
            detached: true,
            stdio: "ignore",
        });
        proc.unref();
        yield sleep(AZ_TIMEOUT_SECONDS);
        return fs.readFileSync(kubeconfigPath).toString();
    });
}
exports.runAzKubeconfigCommandBlocking = runAzKubeconfigCommandBlocking;
const sleep = (seconds) => new Promise((resolve) => setTimeout(resolve, seconds * 1000));
