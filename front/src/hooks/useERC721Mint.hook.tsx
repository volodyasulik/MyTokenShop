import { useMutation, useQueryClient } from "react-query";
import { myShopService } from "../service/myShopService";
import { QUERY_KEYS } from "../const/keys.const";

export const useMintERC721Tokens = () => {
  const queryClient = useQueryClient();

  const MintERC721Tokens = async (tokenId: number, amount: number) => {
    await myShopService.mintERC721Token(tokenId, amount);
  };

  const mutationMintERC721Tokens = useMutation(
    (data: { tokenId: number; amount: number }) =>
      MintERC721Tokens(data.tokenId, data.amount),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QUERY_KEYS.TOKEN);
        queryClient.invalidateQueries(QUERY_KEYS.USER);
        queryClient.invalidateQueries(QUERY_KEYS.ERC721);
      },
    }
  );

  return {
    MintERC721Tokens: mutationMintERC721Tokens.mutate,
  };
};
