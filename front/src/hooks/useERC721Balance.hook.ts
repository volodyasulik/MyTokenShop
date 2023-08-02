import { useQuery } from "react-query";
import { myShopService } from "../service/myShopService";
import { QUERY_KEYS } from "../const/keys.const";

export const useGetERC721Balance = () => {
  const getERC721Balance = async () => {
    try {
      const ERC721Balance = await myShopService.getERC721Balance();
      return ERC721Balance;
    } catch (err) {
      console.error(err);
    }
  };

  const {
    data: ERC721Balance,
  }: {
    data: any | undefined;
  } = useQuery(QUERY_KEYS.ERC721, getERC721Balance);

  return {
    ERC721Balance,
  };
};
