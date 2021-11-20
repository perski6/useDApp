import React from 'react'
import { ReadFunctions } from '../components/read/ReadFunctions'
import { Container, ContentBlock, MainContent, Section, SectionRow } from '../components/base/base'
import { Title } from '../typography/Title'
import styled from 'styled-components'

export const ContractReadFunctions = () => {
  return (
    <MainContent>
      <Container>
        <Section>
          <SectionRow>
            <Title>Contract Read Functions</Title>
          </SectionRow>
          <ReadContentBlock>
            <ReadFunctions />
          </ReadContentBlock>
        </Section>
      </Container>
    </MainContent>
  )
}

const ReadContentBlock = styled(ContentBlock)`
  padding: 16px 32px;
`
