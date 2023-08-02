import { Form, Input, Button } from "antd";
import { useApprove } from "../../hooks/index.hooks";

const ApproveForm = () => {
  const { approve } = useApprove();
  const onSubmitHandler = (value: { approve: string }) => {
    const argument = {
      amount: +value.approve,
    };
    approve(argument);
  };

  return (
    <Form
      name="approveForm"
      onFinish={onSubmitHandler}
      style={{ maxWidth: 400, display: "flex" }}
    >
      <Form.Item label="Approve to sell tokens" name="approve">
        <Input />
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <Button type="primary" htmlType="submit">
          approve
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ApproveForm;
