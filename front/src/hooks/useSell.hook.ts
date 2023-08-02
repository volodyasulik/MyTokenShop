import { useMutation, useQueryClient } from "react-query";
import { myShopService } from "../service/myShopService";
import { QUERY_KEYS } from "../const/keys.const";

export const useSellTokens = () => {
  const queryClient = useQueryClient();

  const buyTokens = async (amount: number) => {
    await myShopService.sellTokens(amount);
  };

  const mutationSellTokens = useMutation(
    (data: { amount: number }) => buyTokens(data.amount),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.TOKEN);
        queryClient.invalidateQueries(QUERY_KEYS.USER);
      },
    }
  );

  return {
    sellTokens: mutationSellTokens.mutate,
  };
};
