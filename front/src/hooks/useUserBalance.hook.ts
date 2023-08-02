import { useQuery } from "react-query";
import { myShopService } from "../service/myShopService";
import { QUERY_KEYS } from "../const/keys.const";

export const useGetUserBalance = () => {
  const getUSerBalance = async () => {
    try {
      const getUserBalance = await myShopService.getUserBalance();
      return getUserBalance;
    } catch (err) {
      console.error(err);
    }
  };

  const {
    data: getUserBalance,
  }: {
    data: any | undefined;
  } = useQuery(QUERY_KEYS.USER, getUSerBalance);

  return {
    getUserBalance,
  };
};
