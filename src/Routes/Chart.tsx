import React from "react";
import { useQuery } from "react-query";
import { fetchCoinHistroy } from "../api";
import ApexChart from "react-apexcharts";
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}
interface ChartProps {
  coinId: string;
}

export default function Chart({ coinId }: ChartProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistroy(coinId)
  );
  console.log(data);
  return (
    <div>
      {isLoading ? (
        " Loading Chart ..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: data?.map((item) => {
                const x = new Date(item?.time_open);
                const y = [
                  item.open,
                  item.high,
                  item.low,
                  item.close,
                  item.volume,
                ];
                return { x, y };
              }),
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            xaxis: {
              type: "datetime",
            },
            chart: {
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
            },
          }}
        />
      )}
    </div>
  );
}
