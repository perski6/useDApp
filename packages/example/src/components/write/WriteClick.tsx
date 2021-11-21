import { Interface } from '@ethersproject/abi'
import { Contract } from '@ethersproject/contracts'
import { useContractFunction } from '@usedapp/core'
import React, { useState } from 'react'
import styled from 'styled-components'

export const ERC20_ABI = [
  'constructor(uint256 _totalSupply)',
  'event Approval(address indexed owner, address indexed spender, uint256 value)',
  'event Transfer(address indexed from, address indexed to, uint256 value)',
  'function DOMAIN_SEPARATOR() view returns(bytes32)',
  'function PERMIT_TYPEHASH() view returns(bytes32)',
  'function allowance(address, address) view returns(uint256)',
  'function approve(address spender, uint256 value) returns(bool)',
  'function balanceOf(address) view returns(uint256)',
  'function decimals() view returns(uint8)',
  'function name() view returns(string)',
  'function nonces(address) view returns(uint256)',
  'function permit(address owner, address spender, uint256 value, uint256 deadline, uint8 v, bytes32 r, bytes32 s)',
  'function symbol() view returns(string)',
  'function totalSupply() view returns(uint256)',
  'function transfer(address to, uint256 value) returns(bool)',
  'function transferFrom(address from, address to, uint256 value) returns(bool)',
]

type Input = {
  name: string
  type: string
}

type SingleContractObject = {
  constant: boolean
  inputs: Input[]
  name: string
  outputs: Input[]
  type: string
  constractAddress: string
  stateMutability?: string
}

export const WriteClick = ({ name, inputs, constractAddress }: SingleContractObject) => {
  const [click, useClick] = useState(false)

  const show = () => {
    send(...args)
    console.log(state, args, contract)
    useClick(true)
  }

  const contract = new Contract(constractAddress, new Interface(ERC20_ABI))

  const { state, send } = useContractFunction(contract, name, { transactionName: name })

  const beginArray: string[] = []

  const [args, setArgs] = useState(beginArray)

  const changeFirstArg = (value: string) => {
    const currentArgs = args
    if (currentArgs.length < 1) {
      currentArgs.push('')
    }
    currentArgs[0] = value
    setArgs(currentArgs)
  }

  const changeSecondArg = (value: string) => {
    const currentArgs = args
    if (currentArgs.length < 1) {
      currentArgs.push('')
    } else if (currentArgs.length < 2) {
      currentArgs.push('')
    }
    currentArgs[1] = value
    setArgs(currentArgs)
  }

  const changeThirdArg = (value: string) => {
    const currentArgs = args
    if (currentArgs.length < 1) {
      currentArgs.push('')
    } else if (currentArgs.length < 2) {
      currentArgs.push('')
    } else if (currentArgs.length < 3) {
      currentArgs.push('')
    }
    currentArgs[2] = value
    setArgs(currentArgs)
  }

  return (
    <WriteItem>
      <WriteName>{name}</WriteName>
      <WriteBalance>
        {inputs.length === 1 ? (
        <input onChange={(e) => changeFirstArg(e.target.value)} />
      ) : inputs.length === 2 ? (
        <div>
          <input onChange={(e) => changeFirstArg(e.target.value)} />
          <input onChange={(e) => changeSecondArg(e.target.value)} />
        </div>
      ) : inputs.length === 3 ? (
        <div>
          <input onChange={(e) => changeFirstArg(e.target.value)} />
          <input onChange={(e) => changeSecondArg(e.target.value)} />
          <input onChange={(e) => changeThirdArg(e.target.value)} />
        </div>
      ) : (
        <></>
      )}

      {click ? <div><p>{state.status.toString()}</p></div> : <></>}
      </WriteBalance>
      <WriteTicker>
        <button onClick={() => show() }>Terminate</button>
      </WriteTicker>
    </WriteItem>
  )
}

export const Colors = {
  Black: {
    900: '#23242A',
    200: '#DDE2EB',
  },
  Gray: {
    600: '#757575',
    300: '#E0E0E0',
  },
  White: '#ffffff',
  Yellow: {
    500: '#F2C94C',
    200: '#fff9e6',
    100: '#FFF4D4',
  },
  Red: { 400: '#F87171' },
}

export const Text = styled.p`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
`

const TextBold = styled(Text)`
  font-weight: 700;
`

const WriteItem = styled.li`
  display: grid;
  grid-template-areas:
    'icon name balance'
    'icon ticker balance';
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto auto;
  grid-column-gap: 20px;
  grid-row-gap: 8px;
  align-items: center;
  height: 84px;
  padding: 12px 0;
  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;

  & + & {
    border-top: 1px solid ${Colors.Black[200]};
  }
`

const WriteName = styled(TextBold)`
  grid-area: name;
`

const WriteTicker = styled(TextBold)`
  grid-area: ticker;
  color: ${Colors.Gray[600]};
`

const WriteBalance = styled(TextBold)`
  grid-area: balance;
  font-size: 20px;
  line-height: 32px;
`
