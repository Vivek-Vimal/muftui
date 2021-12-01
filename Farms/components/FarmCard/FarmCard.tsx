import React, { useMemo, useState } from 'react'
import BigNumber from 'bignumber.js'
import styled, { keyframes } from 'styled-components'
import { Flex, Text, Skeleton, HelpIcon, Tag, useWalletModal } from '@pancakeswap-libs/uikit'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { motion } from 'framer-motion'
import { communityFarms } from 'config/constants'
import { Farm } from 'state/types'
import { provider } from 'web3-core'
import useI18n from 'hooks/useI18n'
import { getBalanceNumber } from 'utils/formatBalance'

import ExpandableSectionButton from 'components/ExpandableSectionButton'
import { QuoteToken } from 'config/constants/types'
import DetailsSection from './DetailsSection'
import CardHeading from './CardHeading'
import CardActionsContainer from './CardActionsContainer'
import ApyButton from './ApyButton'

export interface FarmWithStakedValue extends Farm {
  apy?: BigNumber
}

const RainbowLight = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`

const StyledCardAccent = styled.div`
  background: linear-gradient(45deg,
  rgba(255, 0, 0, 1) 0%,
  rgba(255, 154, 0, 1) 10%,
  rgba(208, 222, 33, 1) 20%,
  rgba(79, 220, 74, 1) 30%,
  rgba(63, 218, 216, 1) 40%,
  rgba(47, 201, 226, 1) 50%,
  rgba(28, 127, 238, 1) 60%,
  rgba(95, 21, 242, 1) 70%,
  rgba(186, 12, 248, 1) 80%,
  rgba(251, 7, 217, 1) 90%,
  rgba(255, 0, 0, 1) 100%);
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 16px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const FCard = styled.div`
  align-self: baseline;
  background: ${(props) => props.theme.card.background};
  border-radius: 16px;
  display: flex;
  // flex-direction: column;
  justify-content: space-around;
  padding: 1rem 0.5rem 1rem 0.5rem;
  width: 100%;
  position: relative;
  text-align: center;
  align-items: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;

    &:hover{
      // 
    }
  
  ${({ theme }) => theme.mediaQueries.sm}{
    padding: 24px;
  }
`
const BottomCard = styled(FCard)`
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  padding: 1rem 2rem 1rem 2rem;
  &:hover{ 
    background: #FFF;
  }
`;

// const Divider = styled.div`
//   background-color: ${({ theme }) => theme.colors.borderColor};
//   height: 1px;
//   margin: 28px auto;
//   width: 100%;
// `

const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`
const MultiplierTag = styled(Tag)`
    display: flex;
    align-items: center;
    justify-content: center;
`;

const Desktop = styled.div`
   
    display: none;
    ${({ theme }) => theme.mediaQueries.sm}{
      display: flex;
      justify-content: space-between;
      width: 15rem;
    }
`;

interface FarmCardProps {
  farm: FarmWithStakedValue
  removed: boolean
  cakePrice?: BigNumber
  bnbPrice?: BigNumber
  ethereum?: provider
  account?: string
  multiplier?: string
  onClick?: () => void
  expanded?: boolean
}

const FarmCard: React.FC<FarmCardProps> = ({ farm, removed, cakePrice, bnbPrice,multiplier,onClick, expanded  }) => {
  const TranslateString = useI18n()

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()

  // const isCommunityFarm = communityFarms.includes(farm.tokenSymbol)
  // We assume the token name is coin pair + lp e.g. CAKE-BNB LP, LINK-BNB LP,
  // NAR-CAKE LP. The images should be cake-bnb.svg, link-bnb.svg, nar-cake.svg
  // const farmImage = farm.lpSymbol.split(' ')[0].toLocaleLowerCase()
  const farmImage = farm.isTokenOnly ? farm.tokenSymbol.toLowerCase() : `${farm.tokenSymbol.toLowerCase()}-${farm.quoteTokenSymbol.toLowerCase()}`

  const totalValue: BigNumber = useMemo(() => {
    if (!farm.lpTotalInQuoteToken) {
      return null
    }
    if (farm.quoteTokenSymbol === QuoteToken.BNB) {
      return bnbPrice.times(farm.lpTotalInQuoteToken)
    }
    if (farm.quoteTokenSymbol === QuoteToken.CAKE) {
      return cakePrice.times(farm.lpTotalInQuoteToken)
    }
    return farm.lpTotalInQuoteToken
  }, [bnbPrice, cakePrice, farm.lpTotalInQuoteToken, farm.quoteTokenSymbol])

  const totalValueFormated = totalValue
    ? `$${Number(totalValue).toLocaleString(undefined, { maximumFractionDigits: 0 })}`
    : '-'

  const lpLabel = farm.lpSymbol
  const earnLabel = 'Muft'
  const farmAPY = farm.apy && farm.apy.times(new BigNumber(100)).toNumber().toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  const { quoteTokenAdresses, quoteTokenSymbol, tokenAddresses, risk } = farm
  // const { connect, reset } = useWallet()
  // const { onPresentConnectModal } = useWalletModal(connect, reset)

  return (
    // <motion.div
    // animate={{ rotate: 360 }}
    // transition={{
    //     type: "spring",
    //     damping: 10,
    //     mass: 0.75,
    //     stiffness: 100,
    // }}
    // >
  
    <div>
    <FCard 
      
    >
      {farm.tokenSymbol === 'Muft' && <StyledCardAccent />}
      <CardHeading
        lpLabel={lpLabel}
        multiplier={farm.multiplier}
        risk={risk}
        depositFee={farm.depositFeeBP}
        farmImage={farmImage}
        tokenSymbol={farm.tokenSymbol}
      />
      <Flex flexDirection="column">
        <Text>{TranslateString(318, 'Earn')}</Text>
        <Text bold>{farm.userData && farm.userData.earnings?getBalanceNumber(farm.userData.earnings).toFixed(4):""} MUFT</Text>     {/*  {  earnLabel }   */ }
      </Flex>
      {!removed && (
        <Flex  alignItems='flex-start' flexDirection="column">
          <Text>{TranslateString(352, 'APR')}</Text>
          <Text bold style={{ display: 'flex', alignItems: 'center' }}>
            {farm.apy ? (
              <>
                {farmAPY}%
                <Desktop style={{width:"auto"}}>
                <ApyButton
                  lpLabel={lpLabel}
                  quoteTokenAdresses={quoteTokenAdresses}
                  quoteTokenSymbol={quoteTokenSymbol}
                  tokenAddresses={tokenAddresses}
                  cakePrice={cakePrice}
                  apy={farm.apy}
                />
                </Desktop>
              </>
            ) : (
              <Skeleton height={24} width={80} />
            )}
          </Text>
        </Flex>
      )}
      <Desktop>
      {!removed && (
        <Flex  flexDirection="column">
          <Text>{TranslateString(23, 'Liquidity')}</Text>
          <Text bold>{totalValueFormated}</Text>
        </Flex>
      )}
      <HelpIcon />
      <Flex  flexDirection="column">
          <Text>Multiplier</Text>
          <MultiplierTag >{multiplier}</MultiplierTag>
        </Flex>
      </Desktop>
      {/* <Flex >
        <Text style={{ fontSize: '24px' }}>{TranslateString(10001, 'Deposit Fee')}:</Text>
        <Text bold style={{ fontSize: '24px' }}>{(farm.depositFeeBP / 100)}%</Text>
      </Flex> */}
      {/* <CardActionsContainer farm={farm} ethereum={ethereum} account={account} /> */}
      {/* <Divider /> */}
      <ExpandableSectionButton
        onClick={() => setShowExpandableSection(!showExpandableSection)}
        expanded={showExpandableSection}
      />
      
    </FCard>
    <ExpandingWrapper expanded={showExpandableSection}>
    <BottomCard>
    <DetailsSection
      cakePrice={cakePrice}
      multiplier={farm.multiplier}
      farm={farm}
      ethereum={ethereum}
      account={account}
      depositFee={farm.depositFeeBP}
      removed={removed}
      isTokenOnly={farm.isTokenOnly}
      bscScanAddress={
        farm.isTokenOnly ?
          `https://bscscan.com/token/${farm.tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
          :
          `https://bscscan.com/token/${farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]}`
      }
      totalValueFormated={totalValueFormated}
      lpLabel={lpLabel}
      quoteTokenAdresses={quoteTokenAdresses}
      quoteTokenSymbol={quoteTokenSymbol}
      tokenAddresses={tokenAddresses}
    />
   </BottomCard>
  </ExpandingWrapper>
    </div>




  //   <FCard>
  //   {farm.tokenSymbol === 'DogeMuft' && <StyledCardAccent />}
  //   <CardHeading
  //     lpLabel={lpLabel}
  //     multiplier={farm.multiplier}
  //     risk={risk}
  //     depositFee={farm.depositFeeBP}
  //     farmImage={farmImage}
  //     tokenSymbol={farm.tokenSymbol}
  //   />
  //   {!removed && (
  //     <Flex justifyContent='space-between' alignItems='center'>
  //       <Text>{TranslateString(352, 'APR')}:</Text>
  //       <Text bold style={{ display: 'flex', alignItems: 'center' }}>
  //         {farm.apy ? (
  //           <>
  //             <ApyButton
  //               lpLabel={lpLabel}
  //               quoteTokenAdresses={quoteTokenAdresses}
  //               quoteTokenSymbol={quoteTokenSymbol}
  //               tokenAddresses={tokenAddresses}
  //               cakePrice={cakePrice}
  //               apy={farm.apy}
  //             />
  //             {farmAPY}%
  //           </>
  //         ) : (
  //           <Skeleton height={24} width={80} />
  //         )}
  //       </Text>
  //     </Flex>
  //   )}
  //   <Flex justifyContent='space-between'>
  //     <Text>{TranslateString(318, 'Earn')}:</Text>
  //     <Text bold>{earnLabel}</Text>
  //   </Flex>
  //   <Flex justifyContent='space-between'>
  //     <Text style={{ fontSize: '24px' }}>{TranslateString(10001, 'Deposit Fee')}:</Text>
  //     <Text bold style={{ fontSize: '24px' }}>{(farm.depositFeeBP / 100)}%</Text>
  //   </Flex>
  //   <CardActionsContainer farm={farm} ethereum={ethereum} account={account} />
  //   <Divider />
  //   <ExpandableSectionButton
  //     onClick={() => setShowExpandableSection(!showExpandableSection)}
  //     expanded={showExpandableSection}
  //   />
  //   <ExpandingWrapper expanded={showExpandableSection}>
  //     <DetailsSection
  //       removed={removed}
  //       isTokenOnly={farm.isTokenOnly}
  //       bscScanAddress={
  //         farm.isTokenOnly ?
  //           `https://bscscan.com/token/${farm.tokenAddresses[process.env.REACT_APP_CHAIN_ID]}`
  //           :
  //           `https://bscscan.com/token/${farm.lpAddresses[process.env.REACT_APP_CHAIN_ID]}`
  //       }
  //       totalValueFormated={totalValueFormated}
  //       lpLabel={lpLabel}
  //       quoteTokenAdresses={quoteTokenAdresses}
  //       quoteTokenSymbol={quoteTokenSymbol}
  //       tokenAddresses={tokenAddresses}
  //     />
  //   </ExpandingWrapper>
  // </FCard> 

    // </motion.div>
  )
}

export default FarmCard
