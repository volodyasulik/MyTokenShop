import { Form, Input, Button } from "antd";
import { useSellTokens } from "../../hooks/index.hooks";

const SellForm = () => {
  const { sellTokens } = useSellTokens();
  const onSubmitHandler = (value: { sell: string }) => {
    const argument = {
      amount: +value.sell,
    };
    sellTokens(argument);
  };

  return (
    <Form
      name="SellForm"
      onFinish={onSubmitHandler}
      style={{ maxWidth: 400, display: "flex" }}
    >
      <Form.Item label="Sell Tokens" name="sell">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          Sell
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SellForm;
