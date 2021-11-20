import React from 'react'
import { WriteFunctions } from '../components/write/WriteFunctions'
import styled from 'styled-components'
import { AccountButton } from '../components/account/AccountButton'
import { Container, ContentBlock, MainContent, Section, SectionRow } from '../components/base/base'
import { Title } from '../typography/Title'

export const ContractWriteFunctions = () => {
  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Title>Contract Write Functions</Title>
            <AccountButton />
          </SectionRow>
          <WriteContentBlock>
            <WriteFunctions />
          </WriteContentBlock>
        </Section>
      </Container>
    </MainContent>
  )
}

const WriteContentBlock = styled(ContentBlock)`
  padding: 16px 32px;
`
