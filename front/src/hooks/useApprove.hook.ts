import { useMutation } from "react-query";
import { myShopService } from "../service/myShopService";

export const useApprove = () => {
  const approve = async (amount: number) => {
    await myShopService.aprove(amount);
  };

  const mutationApprove = useMutation((data: { amount: number }) =>
    approve(data.amount)
  );

  return {
    approve: mutationApprove.mutate,
  };
};
