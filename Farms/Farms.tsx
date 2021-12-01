import React, { useEffect, useCallback, useState } from 'react'
import { Route, useRouteMatch } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import BigNumber from 'bignumber.js'
import { useWallet } from '@binance-chain/bsc-use-wallet'
import { provider } from 'web3-core'
import styled from 'styled-components'
import { Image, Heading } from '@pancakeswap-libs/uikit'
import { BLOCKS_PER_YEAR, CAKE_PER_BLOCK, CAKE_POOL_PID } from 'config'
import FlexLayout from 'components/layout/Flex'
import Page from 'components/layout/Page'
import { useFarms, usePriceBnbBusd, usePriceCakeBusd } from 'state/hooks'
import useRefresh from 'hooks/useRefresh'
import { fetchFarmUserDataAsync } from 'state/actions'
import { QuoteToken,  Address } from 'config/constants/types'
import useI18n from 'hooks/useI18n'
import FarmCard, { FarmWithStakedValue } from './components/FarmCard/FarmCard'
import FarmTabButtons from './components/FarmTabButtons'
import Divider from './components/Divider'
import DetailsSection from './components/FarmCard/DetailsSection'

export interface FarmsProps{
  tokenMode?: boolean
}

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
  ${({ theme }) => theme.mediaQueries.sm}{
    padding: 24px;
  }
`
const Head = styled.div``;

const FarmHead = styled.div`
  background:	${({ theme }) => theme.colors.card};
  padding: 1rem 2rem 1.5rem 2rem ;
  border-radius: 1rem;
  margin-bottom: 2rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;

const PoolHead = styled.div`
  background:	${({ theme }) => theme.colors.card};
  padding: 1rem 2rem 1.5rem 2rem ;
  border-radius: 1rem;
  margin-bottom: 2rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
`;

const Tit = styled.h1`
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 2rem;
${({ theme }) => theme.mediaQueries.sm}{
  font-size: 2.5rem;
}
`;

const Desc = styled(Heading)`
  color: ;
`
const ExpandingWrapper = styled.div<{ expanded: boolean }>`
  height: ${(props) => (props.expanded ? '100%' : '0px')};
  overflow: hidden;
`

const Farms: React.FC<FarmsProps> = (farmsProps) => {
  const { path } = useRouteMatch()
  const TranslateString = useI18n()
  const farmsLP = useFarms()
  const cakePrice = usePriceCakeBusd()
  const bnbPrice = usePriceBnbBusd()
  const { account, ethereum }: { account: string; ethereum: provider } = useWallet()
  const {tokenMode} = farmsProps;

  const dispatch = useDispatch()
  const { fastRefresh } = useRefresh()
  useEffect(() => {
    if (account) {
      dispatch(fetchFarmUserDataAsync(account))
    }
  }, [account, dispatch, fastRefresh])

  const [stakedOnly, setStakedOnly] = useState(false)

  const activeFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier !== '0X')
  const inactiveFarms = farmsLP.filter((farm) => !!farm.isTokenOnly === !!tokenMode && farm.multiplier === '0X')

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const [showExpandableSection, setShowExpandableSection] = useState(false)

  // /!\ This function will be removed soon
  // This function compute the APY for each farm and will be replaced when we have a reliable API
  // to retrieve assets prices against USD
  // const [showExpandableSection, setShowExpandableSection] = useState(false)
  const farmsList = useCallback(
    (farmsToDisplay, removed: boolean,) => {
      // const cakePriceVsBNB = new BigNumber(farmsLP.find((farm) => farm.pid === CAKE_POOL_PID)?.tokenPriceVsQuote || 0)
      const farmsToDisplayWithAPY: FarmWithStakedValue[] = farmsToDisplay.map((farm) => {
        // if (!farm.tokenAmount || !farm.lpTotalInQuoteToken || !farm.lpTotalInQuoteToken) {
        //   return farm
        // }
        const cakeRewardPerBlock = new BigNumber(farm.MuftPerBlock || 1).times(new BigNumber(farm.poolWeight)) .div(new BigNumber(10).pow(18))
        const cakeRewardPerYear = cakeRewardPerBlock.times(BLOCKS_PER_YEAR)

        let apy = cakePrice.times(cakeRewardPerYear);

        let totalValue = new BigNumber(farm.lpTotalInQuoteToken || 0);

        if (farm.quoteTokenSymbol === QuoteToken.BNB) {
          totalValue = totalValue.times(bnbPrice);
        }

        if(totalValue.comparedTo(0) > 0){
          apy = apy.div(totalValue);
        }

        return { ...farm, apy }
      })
      
      return farmsToDisplayWithAPY.map((farm) => (
     
        <FarmCard
          key={farm.pid}
          farm={farm}
          removed={removed}
          bnbPrice={bnbPrice}
          cakePrice={cakePrice}
          ethereum={ethereum}
          account={account}
          multiplier={farm.multiplier}
          onClick={() => setShowExpandableSection(!showExpandableSection)}
          expanded={showExpandableSection}
        />
      ))
    },
    [bnbPrice, account, cakePrice, ethereum,showExpandableSection],
  )

  return (
      <section>
      
      <Page style={{marginTop:"2rem"}}>
      <Head>
      {
          tokenMode ?
        <PoolHead>
          <Tit>
            Stake tokens to earn Muft
          </Tit>
          <Desc as="h2" size="xl"  mb="0.5rem" style={{ fontSize:"1.5rem" }}>
          Deposit Fees will be used to buyback Muft
          </Desc>
        </PoolHead>
            :
        <FarmHead>
          <Tit>
            FARMS: Stake LP tokens to earn Muft
          </Tit>
          <Desc as="h2" size="xl"  mb="0.5rem" style={{ fontSize:"1.5rem" }}>
            Deposit Fees will be used to buyback Muft
          </Desc>
          <Desc as="h2" style={{ fontSize:"1.5rem" }}>
            On DogeMuft, the 25% tax is applied at the entrance/exit. Think long term investment.
          </Desc>
        </FarmHead>
        }
       
      </Head>
      <FarmTabButtons stakedOnly={stakedOnly} setStakedOnly={setStakedOnly}/>
      <div>
        <Divider />
        <FlexLayout>
          <Route exact path={`${path}`}>
            {stakedOnly ? farmsList(stakedOnlyFarms, false) : farmsList(activeFarms, false)}
          </Route>
          <Route exact path={`${path}`}>   { /* /history  */ }
            {farmsList(inactiveFarms, true)}
          </Route>
        </FlexLayout>
      </div>
      {/* <Image src="/images/Muft/8.png" alt="illustration" width={1352} height={587} responsive /> */}
    </Page>
    </section>
  )
}

export default Farms
