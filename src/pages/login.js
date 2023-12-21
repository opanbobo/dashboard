import { Form, Input, Button, notification } from "components";
import LoginLayout from "components/layouts/loginLayout";
import { feature, routes } from "constant/routes";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";

const Login = () => {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const logoType = useMemo(() => {
    const origin =
      typeof window !== "undefined" && window.location.origin
        ? window.location.origin
        : "";

    return origin === "https://ojk.media-insight.id";
  }, []);

  const handleLogin = async () => {
    try {
      let res = await fetch("https://api.digivla.id/api/v1/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      res = await res.json();

      if (res.token) {
        localStorage.setItem("userToken", JSON.stringify(res));
        router.push(
          feature.find((e) => e.label == res.menu_v3[0])?.link ||
            routes.find((e) => e.label == res.menu_v3[0])?.link
        );
        notification.success({
          message: `Hello, ${res.usr_comp_name}`,
          description: "Welcome to Conventional Media Dashboard",
        });
      } else {
        // Error handling
        notification.error({
          description: "username or password not valid!!",
        });
      }
    } catch (err) {
      throw err;
    }
  };

  return (
    <Form>
      <Form.Item
        labelCol={{
          span: 24,
        }}
        label="Username"
      >
        <Input
          defaultValue={username}
          suffixIcon="UserOutlined"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Item>
      <Form.Item
        labelCol={{
          span: 24,
        }}
        label="Password"
      >
        <Input
          type="password"
          value="tt"
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item style={itemStyles}>
        <Button type="primary" block onClick={() => handleLogin()}>
          Sign In
        </Button>
      </Form.Item>
      <Form.Item style={itemStyles}>
        {!logoType && <small>copyright &copy; conventional media </small>}
      </Form.Item>
    </Form>
  );
};

const itemStyles = {
  marginTop: 24,
  textAlign: "center",
};

Login.layout = LoginLayout;

export default Login;
