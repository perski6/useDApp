import React from 'react'
import styled from 'styled-components'
import { ReadClick } from './ReadClick'

const fileContent =
  '[{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function","constractAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7"},{"constant":true,"inputs":[],"name":"deprecated","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","constractAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","constractAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7"},{"constant":true,"inputs":[],"name":"upgradedAddress","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","constractAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balances","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","constractAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","constractAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7"},{"constant":true,"inputs":[],"name":"maximumFee","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","constractAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7"},{"constant":true,"inputs":[],"name":"_totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","constractAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7"},{"constant":true,"inputs":[{"name":"_maker","type":"address"}],"name":"getBlackListStatus","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","constractAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowed","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","constractAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7"},{"constant":true,"inputs":[],"name":"paused","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","constractAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7"},{"constant":true,"inputs":[{"name":"who","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","constractAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7"},{"constant":true,"inputs":[],"name":"getOwner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","constractAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7"},{"constant":true,"inputs":[],"name":"owner","outputs":[{"name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function","constractAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function","constractAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7"},{"constant":true,"inputs":[{"name":"_owner","type":"address"},{"name":"_spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","constractAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7"},{"constant":true,"inputs":[],"name":"basisPointsRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","constractAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"isBlackListed","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function","constractAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7"},{"constant":true,"inputs":[],"name":"MAX_UINT","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function","constractAddress":"0xdac17f958d2ee523a2206206994597c13d831ec7"}]'

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
  return JSON.parse(fileContent) as SingleContractObject[]
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
