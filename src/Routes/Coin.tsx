import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router";
import styled from "styled-components";

interface routeParams {
  coinId: string;
}
interface RouteState {
  name: string;
}
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    ath_date: string;
    ath_price: number;
    market_cap: number;
    market_cap_change_24h: number;
    percent_change_1h: number;
    percent_change_1y: number;
    percent_change_6h: number;
    percent_change_7d: number;
    percent_change_12h: number;
    percent_change_15m: number;
    percent_change_24h: number;
    percent_change_30d: number;
    percent_change_30m: number;
    percent_from_price_ath: number;
    price: number;
    volume_24h: number;
    volume_24h_change_24h: number;
  };
}

export default function Coin() {
  const { coinId } = useParams<routeParams>();
  const { state } = useLocation<RouteState>();
  const [loading, setLoading] = useState(true);

  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  useEffect(() => {
    (async () => {
      const infoData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      ).json();
      console.log(infoData);

      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      console.log(priceData);

      setInfo(infoData);
      setPriceInfo(priceData);
      setLoading(false);
    })();
  }, [coinId]);
  return (
    <>
      <CoinName>{state?.name || "Loading..."}</CoinName>
      {loading ? <Loading>Loading...</Loading> : null}
      <CoinContainer>
        <OverView>
          <OverviewItem>
            <span>Rank</span>
            <span>{info?.rank}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Symbol</span>
            <span>{info?.symbol}</span>
          </OverviewItem>
          <OverviewItem>
            <span>OPEN SOURCE</span>
            <span>{info?.open_source ? "Yes" : "No"}</span>
          </OverviewItem>
        </OverView>
        <Description>{info?.description}</Description>
        <OverView>
          <OverviewItem>
            <span>Total Suply:</span>
            <span>{priceInfo?.total_supply}</span>
          </OverviewItem>
          <OverviewItem>
            <span>Max Supply:</span>
            <span>{priceInfo?.max_supply}</span>
          </OverviewItem>
        </OverView>
      </CoinContainer>
    </>
  );
}

const Loading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  margin-top: 30px;
`;

const CoinName = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  color: ${(props) => props.theme.accentColor};
  margin-top: 30px;
`;

const CoinContainer = styled.div`
  padding: 20px;
`;

const OverView = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: space-between;
  border-radius: 10px;
  padding: 10px 20px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
  span {
    text-align: center;
  }
`;

const Description = styled.p`
  margin: 20px 0px;
`;
