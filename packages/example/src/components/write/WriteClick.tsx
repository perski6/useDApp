import { Interface } from '@ethersproject/abi'
import { Contract } from '@ethersproject/contracts'
import { useContractCall, useContractFunction } from '@usedapp/core'
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
    sendTransaction()
    useClick(true)
  }

  const { state, send } = useContractFunction(new Contract(constractAddress, new Interface(ERC20_ABI)), name)

  const beginArray: string[] = []

  const [args, setArgs] = useState(beginArray)

  const [firstArg, setFirstArg] = useState('')

  const changeFirstArg = (value: string) => {
    setFirstArg(value)
    let currentArgs = args
    if(currentArgs.length === 0) {
        currentArgs.push(value)
    }
    else {
        currentArgs[0] = firstArg
    }
    setArgs(currentArgs)
  }

  const sendTransaction = () => {
    send(args)
  }

  return (
    <TokenItem>
      <TokenName>{name}</TokenName>
      <TokenBalance>{inputs.length}</TokenBalance>
      <TokenTicker>
        <button onClick={() => show()}>Realize</button>
      </TokenTicker>
        {
        inputs.length === 1 
        ? (<input onChange={e => changeFirstArg(e.target.value)}></input>)
        : (<></>)
        }
      {click ? <p>{state.toString()}</p> : <></>}
    </TokenItem>
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

const TokenItem = styled.li`
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

const TokenIconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: icon;
  width: 48px;
  height: 48px;
  padding: 1px;
  font-size: 36px;
  line-height: 36px;
  border: 1px solid ${Colors.Gray[300]};
  border-radius: 50%;
`

const TokenName = styled(TextBold)`
  grid-area: name;
`

const TokenTicker = styled(TextBold)`
  grid-area: ticker;
  color: ${Colors.Gray[600]};
`

const TokenBalance = styled(TextBold)`
  grid-area: balance;
  font-size: 20px;
  line-height: 32px;
`
