"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const web3_1 = __importDefault(require("web3"));
const axios_1 = __importDefault(require("axios"));
const fs_1 = __importDefault(require("fs"));
const web3 = new web3_1.default(new web3_1.default.providers.HttpProvider('localhost'));
commander_1.program.version('0.0.1');
function leaveOnlyFunctions(jsonObject) {
    const resultWrite = [];
    const resultRead = [];
    for (const obj of jsonObject) {
        if (obj.type === 'function') {
            if (obj.stateMutability === 'view') {
                resultWrite.push(obj);
            }
            else {
                resultRead.push(obj);
            }
        }
    }
    return {
        resultRead,
        resultWrite,
    };
}
function createInterface(contractAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield axios_1.default.get(`https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}`);
        const data = response.data;
        const contractABI = JSON.parse(data.result);
        ;
        if (contractABI) {
            const filteredContractAbi = leaveOnlyFunctions(contractABI);
            fs_1.default.writeFile(`../example/src/scaffold/contractREAD.json`, JSON.stringify(filteredContractAbi.resultRead), 'utf8', (err) => {
                if (err)
                    throw err;
                console.log(`Fdupa`);
            });
            fs_1.default.writeFile(`../example/src/scaffold/contractWRITE.json`, JSON.stringify(filteredContractAbi.resultWrite), 'utf8', (err) => {
                if (err)
                    throw err;
                console.log(`diupan`);
            });
        }
        else {
            console.log('Error');
        }
    });
}
commander_1.program
    .command('createInterface')
    .arguments('<contractAddress>, []')
    .description('Create contract clickable interface')
    .action((contractAddress) => {
    createInterface(contractAddress);
});
commander_1.program.parse(process.argv);
