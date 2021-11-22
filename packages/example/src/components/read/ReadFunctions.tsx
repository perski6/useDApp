import React from 'react'
import styled from 'styled-components'
import { ReadClick } from './ReadClick'
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

const readJsonReadFile = () => {
  return fileContent as SingleContractObject[]
}

export const ReadFunctions = () => {
  const readFileContent = readJsonReadFile()
  return (
    <div>
      <p>Contract address: {readFileContent[0].constractAddress}</p>
      <List>
        {readFileContent.map((functionItem) => {
          return <ReadClick key={functionItem.name} {...functionItem} />
        })}
      </List>
    </div>
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

export const TextInline = styled.span`
  font-size: 14px;
  line-height: 20px;
  font-weight: 400;
`

const List = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`
