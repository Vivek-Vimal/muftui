import React from 'react'
import useI18n from 'hooks/useI18n'
import BigNumber from 'bignumber.js'
import { provider } from 'web3-core'
import styled from 'styled-components'
import { CommunityTag, CoreTag, NoFeeTag, RiskTag } from 'components/Tags'
import { Farm } from 'state/types'
import { Text, Flex, Link, LinkExternal, HelpIcon, Tag, Skeleton } from '@pancakeswap-libs/uikit'
import getLiquidityUrlPathParts from 'utils/getLiquidityUrlPathParts'
import { Address } from 'config/constants/types'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}


export interface ExpandableSectionProps{
  isTokenOnly?: boolean
  bscScanAddress?: string
  removed?: boolean
  totalValueFormated?: string
  lpLabel?: string
  quoteTokenAdresses?: Address
  quoteTokenSymbol?: string
  tokenAddresses: Address
  depositFee?: number
  farm: FarmWithStakedValue
  ethereum?: provider
  account?: string
  multiplier?: string
  cakePrice?: BigNumber
}

const Wrapper = styled.div`
  ${({ theme }) => theme.mediaQueries.sm}{
  flex-direction: row;
  }
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: column-reverse;
  
  height: auto;
  
`

const StyledLinkExternal = styled(LinkExternal)`
  text-decoration: none;
  font-weight: normal;
  color: ${({ theme }) => theme.colors.text};
  display: flex;
  align-items: center;

  svg {
    padding-left: 4px;
    height: 18px;
    width: auto;
    fill: ${({ theme }) => theme.colors.primary};
  }
`
const Box = styled.div`
  width: 75%;
`;

const NoFee = styled.div`

   display: flex;
   flex-direction: column;
   align-items: flex-start;
   justify-content: space-between;
`;

const Mobile = styled.div`
    display: flex;
  
      width: 100%;
      flex-direction: column;
   
    ${({ theme }) => theme.mediaQueries.sm}{
      display: none;
    }
`;

const MultiplierTag = styled(Tag)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Margin = styled.div`
${({ theme }) => theme.mediaQueries.sm}{
  margin-top: 0rem;
}
    margin-top: 0.5rem;   
`;

const DetailsSection: React.FC<ExpandableSectionProps> = ({
  isTokenOnly,
  bscScanAddress,
  removed,
  totalValueFormated,
  lpLabel,
  quoteTokenAdresses,
  quoteTokenSymbol,
  tokenAddresses,
  depositFee,
  farm,
  ethereum,
  account,
  multiplier,
  cakePrice,
}) => {
  const TranslateString = useI18n()
  const liquidityUrlPathParts = getLiquidityUrlPathParts({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses })

  const farmAPY = farm.apy && farm.apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <Wrapper>
      <NoFee>

        {/* <Text>{TranslateString(316, 'Stake')}:</Text> */}
        <Margin>
        <StyledLinkExternal href={
          isTokenOnly ?
            `https://exchange.goosedefi.com/#/swap/${tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
            :
          `https://exchange.goosedefi.com/#/add/${liquidityUrlPathParts}`
        }>
          {lpLabel}
        </StyledLinkExternal>
        </Margin>
     
      {/* {!removed && (
        <Flex justifyContent="space-between">
          <Text>{TranslateString(23, 'Total Liquidity')}:</Text>
          <Text>{totalValueFormated}</Text>
        </Flex>
      )} */}
      <Margin>
        <Link external href={bscScanAddress} bold={false}>
          {TranslateString(356, 'View on BscScan')}
        </Link>
        </Margin>

      <Margin>  
      {depositFee === 0 ? <NoFeeTag /> : null}
      </Margin>

      <Mobile>
      {!removed && (
        <Flex style={{marginTop:"0.5rem"}} justifyContent="space-between">
          <Text>{TranslateString(352, 'APR')}</Text>
          <Text bold style={{ display: 'flex' , alignItems:"center"}}>
            {farm.apy ? (
              <>
                {farmAPY}%
               
                <ApyButton
                  lpLabel={lpLabel}
                  quoteTokenAdresses={quoteTokenAdresses}
                  quoteTokenSymbol={quoteTokenSymbol}
                  tokenAddresses={tokenAddresses}
                  cakePrice={cakePrice}
                  apy={farm.apy}
                />
               
              </>
            ) : (
              <Skeleton height={24} width={80} />
            )}
          </Text>
        </Flex>
      )}
      {!removed && (
        <Flex  justifyContent="space-between">
          <Text>{TranslateString(23, 'Liquidity')}</Text>
          <Text bold>{totalValueFormated}</Text>
        </Flex>
      )}
    
      <Flex style={{marginTop:"0.5rem"}} justifyContent="space-between" >
          <Text>Multiplier</Text>
          <MultiplierTag >{multiplier}</MultiplierTag>
        </Flex>
      </Mobile>
      </NoFee>
      <Box>
        <CardActionsContainer farm={farm} ethereum={ethereum} account={account} /> 
      </Box>
    </Wrapper>
  )
}

export default DetailsSection
