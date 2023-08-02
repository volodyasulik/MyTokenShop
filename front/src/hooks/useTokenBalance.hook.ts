import { useQuery } from "react-query";
import { myShopService } from "../service/myShopService";
import { QUERY_KEYS } from "../const/keys.const";

export const useGetTokenBalance = () => {
  const getTokenBalance = async () => {
    try {
      const tokenBalance = await myShopService.getTokenBalance();
      return tokenBalance;
    } catch (err) {
      console.error(err);
    }
  };

  const {
    data: tokenBalance,
  }: {
    data: any | undefined;
  } = useQuery(QUERY_KEYS.TOKEN, getTokenBalance);

  return {
    tokenBalance,
  };
};
