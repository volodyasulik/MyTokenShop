import { useMutation, useQueryClient } from "react-query";
import { myShopService } from "../service/myShopService";
import { QUERY_KEYS } from "../const/keys.const";

export const useBuyTokens = () => {
  const queryClient = useQueryClient();

  const buyTokens = async (amount: number) => {
    console.log(amount);
    await myShopService.buyTokens(amount);
  };

  const mutationBuyTokens = useMutation(
    (data: { amount: number }) => buyTokens(data.amount),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.TOKEN);
        queryClient.invalidateQueries(QUERY_KEYS.USER);
      },
    }
  );

  return {
    buyTokens: mutationBuyTokens.mutate,
  };
};
