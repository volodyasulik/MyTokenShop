import { MYSHOP_ADDRESS } from "../const/address.const";
import {
  useGetTokenBalance,
  useGetUserBalance,
  useGetERC721Balance,
} from "../hooks/index.hooks";

const ShopInfo = () => {
  const { tokenBalance } = useGetTokenBalance();
  const { getUserBalance } = useGetUserBalance();
  const { ERC721Balance } = useGetERC721Balance();

  return tokenBalance && getUserBalance && ERC721Balance ? (
    <div>
      <div>Shop address: {MYSHOP_ADDRESS}</div>
      <div>Token ERC20 exist: {tokenBalance.toString()}</div>
      <div>User balance: {getUserBalance.toString()}</div>
      <div>ERC721 balance: {ERC721Balance.toString()}</div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default ShopInfo;
