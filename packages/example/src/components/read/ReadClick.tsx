import { Interface } from '@ethersproject/abi'
import { useContractCall } from '@usedapp/core'
import React, { useState } from 'react'
import styled from 'styled-components'
import Data from '../../scaffold/contractScaffold.json'

const fileContent = Data.read

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

const isNotEmpty = (array: string[]) => {
  for (const obj of array) {
    if (obj === '') {
      return false
    }
  }
  return true
}

const useContractQuery = (address: string, method: string, args: string[], argumentsNumber: number) => {
  const [result] = useContractCall(
    argumentsNumber === args.length &&
      isNotEmpty(args) && {
        address: address,
        method: method,
        args: args,
        abi: new Interface(fileContent),
      }
  ) ?? [undefined]

  return result
}

export const ReadClick = ({ name, inputs, constractAddress }: SingleContractObject) => {
  const [click, useClick] = useState(false)

  const show = () => {
    useClick(true)
  }

  const beginArray: string[] = []

  const [args, setArgs] = useState(beginArray)

  const query = useContractQuery(constractAddress, name, args, inputs.length)

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
    <ReadItem>
      <ReadName>{name}</ReadName>
      <ReadBalance>{click ? <p>{query?.toString() ?? 'Error'}</p> : <></>}</ReadBalance>
      <ReadTicker>
        <Row>
          <Button onClick={() => show()}>Terminate</Button>
          {inputs.length === 1 ? (
            <Input onChange={(e) => changeFirstArg(e.target.value)} />
          ) : inputs.length === 2 ? (
            <div>
              <Input onChange={(e) => changeFirstArg(e.target.value)} />
              <Input onChange={(e) => changeSecondArg(e.target.value)} />
            </div>
          ) : inputs.length === 3 ? (
            <div>
              <Input onChange={(e) => changeFirstArg(e.target.value)} />
              <Input onChange={(e) => changeSecondArg(e.target.value)} />
              <Input onChange={(e) => changeThirdArg(e.target.value)} />
            </div>
          ) : (
            <></>
          )}
        </Row>
      </ReadTicker>
    </ReadItem>
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

const ReadItem = styled.li`
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

const ReadName = styled(TextBold)`
  grid-area: name;
`

const ReadTicker = styled(TextBold)`
  grid-area: ticker;
  color: ${Colors.Gray[600]};
`

const ReadBalance = styled(TextBold)`
  grid-area: balance;
  font-size: 20px;
  line-height: 32px;
`

const Button = styled.button`
  position: realative;
  line-height: 1.5;
  color: #212529;
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 4px 8px;
  font-size: 10px;
  border-radius: 6px 0 0 6px;
  color: #fff;
  background-color: #cc9933;
  border-color: #cc9933;
  z-index: 5;
`

const Input = styled.input`
  padding: 4px 8px;
  font-size: 10px;
  font-weight: 400;
  line-height: 1.5;
  margin-left: -1px;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0 6px 6px 0;
`

const Row = styled.div`
  display: flex;
`
