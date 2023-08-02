import { Form, Input, Button } from "antd";
import { useMintERC721Tokens } from "../../hooks/index.hooks";

const MintERC721Form = () => {
  const { MintERC721Tokens } = useMintERC721Tokens();
  const onSubmitHandler = (value: { tokenId: string; amount: string }) => {
    const argument = {
      tokenId: +value.tokenId,
      amount: +value.amount,
    };
    MintERC721Tokens(argument);
  };
  return (
    <Form
      name="buyForm"
      onFinish={onSubmitHandler}
      style={{ maxWidth: 400, display: "flex" }}
    >
      <Form.Item label="Token Id" name="tokenId">
        <Input />
      </Form.Item>
      <Form.Item label="Amount" name="amount">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Mint ERC721 Token
        </Button>
      </Form.Item>
    </Form>
  );
};

export default MintERC721Form;
