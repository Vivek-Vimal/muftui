import React from 'react'
import styled from 'styled-components'
import { Tag, Flex, Heading, Image, Text } from '@pancakeswap-libs/uikit'
import { CommunityTag, CoreTag, NoFeeTag, RiskTag } from 'components/Tags'

export interface ExpandableSectionProps {
  lpLabel?: string
  multiplier?: string
  risk?: number
  depositFee?: number
  farmImage?: string
  tokenSymbol?: string
}

const Wrapper = styled(Flex)`
  svg {
    margin-right: 0.25rem;
  }
`
const T = styled(Text)`
  font-size: 1rem;
  ${({ theme }) => theme.mediaQueries.sm}{
    font-size: 1.3rem;
  }
`;

const Img = styled(Image)`
  margin-right: 0;
  ${({ theme }) => theme.mediaQueries.sm}{
    margin-right: 1rem; 
  }
`;
// const MultiplierTag = styled(Tag)`
//   margin-left: 4px;
// `

const CardHeading: React.FC<ExpandableSectionProps> = ({
  lpLabel,
  multiplier,
  risk,
  farmImage,
  tokenSymbol,
  depositFee,
}) => {
  return (
    <Wrapper alignItems="center" >
      <Img src={`/images/farms/${farmImage}.png`} alt={tokenSymbol} width={124} height={64} />
      <T mb="4px" bold>{lpLabel}</T>
      {/* <Flex  flexDirection="column" alignItems="flex-end">
        <T mb="4px" bold>{lpLabel}</T>
        <Flex justifyContent="center">
          {depositFee === 0 ? <NoFeeTag /> : null}
          {isCommunityFarm ? <CommunityTag /> : <CoreTag />}
          <RiskTag risk={risk} />
          <MultiplierTag variant="secondary">{multiplier}</MultiplierTag>
        </Flex>
      </Flex> */}
    </Wrapper>
  )
}

export default CardHeading
