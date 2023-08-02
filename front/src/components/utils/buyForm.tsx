import { Form, Input, Button } from "antd";
import { useBuyTokens } from "../../hooks/index.hooks";

const BuyForm = () => {
  const { buyTokens } = useBuyTokens();
  const onSubmitHandler = (value: { buy: string }) => {
    const argument = {
      amount: +value.buy,
    };
    buyTokens(argument);
  };
  return (
    <Form
      name="buyForm"
      onFinish={onSubmitHandler}
      style={{ maxWidth: 400, display: "flex" }}
    >
      <Form.Item label="Buy Tokens" name="buy">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Buy
        </Button>
      </Form.Item>
    </Form>
  );
};

export default BuyForm;
