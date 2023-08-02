import React from "react";
import ShopInfo from "./shopInfo";
import BuyForm from "./utils/buyForm";
import SellForm from "./utils/sellForm";
import ApproveForm from "./utils/approveForm";
import MintERC721Form from "./utils/mintERC721";

const Test = () => {
  return (
    <>
      <ShopInfo />
      <BuyForm />
      <ApproveForm />
      <SellForm />
      <MintERC721Form />
    </>
  );
};

export default Test;
