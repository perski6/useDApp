import { program } from 'commander'
import Web3 from 'web3'
import axios from 'axios'
import fs from 'fs'

const web3 = new Web3(new Web3.providers.HttpProvider('localhost'))

type ContractRequest = {
    status: string,
    message: string,
    result: string,
}
type Input = {
    name: string,
    type: string,
}

type SingleContractObject = {
    constant: boolean,
    inputs: Input[],
    name: string,
    outputs: Input[],
    type: string,
    stateMutability?: string,
}

program.version('0.0.1')

function leaveOnlyFunctions(jsonObject: SingleContractObject[]) {
    const resultWrite: SingleContractObject[] = []
    const resultRead: SingleContractObject[] = []
    for (const obj of jsonObject) {
        if (obj.type === 'function') {
            if (obj.stateMutability === 'view') {
                resultWrite.push(obj)
            }
            else {
                resultRead.push(obj)
            }
        }
    }
    return {
        resultRead,
        resultWrite,
    }
}

async function createInterface(contractAddress: string) {
    const response = await axios.get(`https://api.etherscan.io/api?module=contract&action=getabi&address=${contractAddress}`)

    const data: ContractRequest = response.data

    const contractABI = JSON.parse(data.result);;
    if (contractABI) {
        const filteredContractAbi = leaveOnlyFunctions(contractABI)
     
        fs.writeFile(`../example/src/scaffold/contractREAD.json`, JSON.stringify(filteredContractAbi.resultRead), 'utf8', (err) => {
            if (err) throw err;
            console.log(`Fdupa`);
        })
       
        fs.writeFile(`../example/src/scaffold/contractWRITE.json`, JSON.stringify(filteredContractAbi.resultWrite), 'utf8', (err) => {
            if (err) throw err;
            console.log(`diupan`);
        })
    } else {
        console.log('Error')
    }
}

program
    .command('createInterface')
    .arguments('<contractAddress>, []')
    .description('Create contract clickable interface')
    .action((contractAddress) => {
        createInterface(contractAddress)
    })

program.parse(process.argv)
