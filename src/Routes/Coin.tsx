import React from "react";
import { useParams } from "react-router";

interface routeParams {
  coinId: string;
}

export default function Coin() {
  const { coinId } = useParams<routeParams>();
  console.log(useParams());
  return <div>Coin:{coinId}</div>;
}
