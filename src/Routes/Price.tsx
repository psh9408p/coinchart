import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinTickers } from "../api";

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
    USD: {
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
  };
}
interface ChartProps {
  coinId: string;
}
export default function Price({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<PriceData>(["priceInfo", coinId], () =>
    fetchCoinTickers(coinId)
  );
  console.log(data);
  return (
    <div>
      {isLoading ? (
        "Loading Price ...."
      ) : (
        <div>
          <OverView>
            <OverviewItem>ath_date</OverviewItem>
            <OverviewItem>{data?.quotes.USD.ath_date}</OverviewItem>
          </OverView>
          <OverView>
            <OverviewItem>market_cap</OverviewItem>
            <OverviewItem>{data?.quotes.USD.market_cap}</OverviewItem>
          </OverView>
          <OverView>
            <OverviewItem>percent_change_1h</OverviewItem>
            <OverviewItem>{data?.quotes.USD.percent_change_1h}</OverviewItem>
          </OverView>
          <OverView>
            <OverviewItem> percent_change_7d</OverviewItem>
            <OverviewItem>{data?.quotes.USD.percent_change_7d}</OverviewItem>
          </OverView>
          <OverView>
            <OverviewItem>percent_change_30d</OverviewItem>
            <OverviewItem>{data?.quotes.USD.percent_change_30d}</OverviewItem>
          </OverView>
          <OverView>
            <OverviewItem>percent_from_price_ath</OverviewItem>
            <OverviewItem>
              {data?.quotes.USD.percent_from_price_ath}
            </OverviewItem>
          </OverView>
        </div>
      )}
    </div>
  );
}

const OverView = styled.div`
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: space-between;
  border-radius: 10px;
  padding: 10px 20px;
  margin-bottom: 8px;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;

  span {
    text-align: center;
  }
`;
