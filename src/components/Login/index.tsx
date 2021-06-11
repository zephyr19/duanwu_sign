import React from "react";
import { Button, Card, Cell, Form, Loading, Popup } from "annar";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { fetchUserInfo, postUserInfo } from "../../api";
import { JumpPage, UserInfo } from "../../interfaces";

const dept = [
  [
    { key: "1", value: "Waccking" },
    { key: "2", value: "Hiphop" },
    { key: "3", value: "Popping" },
  ],
  [
    { key: "1", value: "Ibuki" },
    { key: "2", value: "Hans" },
    { key: "3", value: "Wacoon" },
  ],
];

const Login = ({ jump }: JumpPage) => {
  const queryClient = useQueryClient();
  const { queryKey: userInfo } = fetchUserInfo();
  const { queryKey, queryFn } = fetchUserInfo();
  const { mutate, isLoading } = useMutation(postUserInfo, {
    onSuccess: () => {
      queryClient.invalidateQueries(userInfo);
    },
  });

  const handleFinish = (values: UserInfo) => {
    console.log("post user info: ", values);
    mutate(values);
  };

  useQuery(queryKey, queryFn, {
    onSuccess: (res) => {
      console.log(res.data);
      if (res.data.length > 0) {
        jump();
      }
    },
  });

  return (
    <>
      <Card contentStyle={{ padding: "20px 0 20px" }}>
        <Form onFinish={handleFinish}>
          <Form.Item
            noStyle
            name="name"
            rules={[{ required: true, message: "请输入姓名" }]}
          >
            <Cell.Input
              placeholder="请输入姓名"
              icon="people"
              label="姓名"
              border={false}
            />
          </Form.Item>
          <Form.Item
            noStyle
            name="id"
            rules={[{ required: true, message: "请输入学号" }]}
          >
            <Cell.Input
              icon="discover"
              label="学号"
              placeholder="请输入学号"
              border={false}
            />
          </Form.Item>
          <Form.Item
            noStyle
            name="phone"
            rules={[
              { pattern: /^1[3456789]\d{9}$/, message: "请输入11位手机号码" },
            ]}
          >
            <Cell.Input
              icon="phone"
              label="电话"
              placeholder="请输入手机号码"
              border={false}
            />
          </Form.Item>
          <Form.Item
            noStyle
            name="dept"
            rules={[{ required: true, message: "请选择所在部门" }]}
          >
            <Cell.Picker
              icon="musicfill"
              label="部门"
              placeholder="请选择所在部门"
              align="right"
              arrow
              range={dept}
              rangeKey="value"
              onChange={(v: any) => console.log(v)}
            />
          </Form.Item>
          <Form.Item noStyle style={{ marginTop: 10, padding: "0 20px" }}>
            <Button
              type="primary"
              size="large"
              shape="square"
              look="secondary"
              block
              disabled={isLoading}
              loading={isLoading}
              nativeType="submit"
            >
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Popup open={isLoading} style={{ padding: "80px" }}>
        <Loading type="wave" color="#1890FF" />
      </Popup>
    </>
  );
};

export default Login;
