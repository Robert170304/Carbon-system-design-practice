"use client";

import {
  Button,
  Column,
  Form,
  FormGroup,
  Grid,
  Stack,
  TextInput,
} from "@carbon/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { showNotification } from "../../managers/NotificationManager";
import Link from "next/link";
import { post } from "../../utilities/apiHelper";

function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login();
  };

  async function login() {
    try {
      const response = await post("/login-user", {
        user: {
          email: formData.email,
          password: formData.password,
        },
      });
      const resData = response?.data || response;
      console.log("User created:", resData, response);
      if (resData.status === 200) {
        localStorage.setItem(
          "userData",
          JSON.stringify({ token: resData.token, ...resData.user })
        );
        showNotification(
          resData.message || "User has been updated successfully."
        );
        router.push("/user-management");
      } else {
        showNotification(resData.message || "Failed to update user.", "error");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      showNotification("An error occurred.", "error");
    }
  }

  const handleChange = (e, fieldName) => {
    console.log("🚀 ~ handleChange ~ fieldName:", fieldName, e.target.value);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    console.log("🚀 ~ handleChange ~ formData:", formData);
  };

  return (
    <div>
      <Form onSubmit={handleSubmit} aria-label="sample form">
        <Stack gap={7}>
          <FormGroup legendText="Personal Information">
            <Grid className="repo-page">
              <Column lg={8} md={8} sm={4} className="repo-page__r1">
                {" "}
                <TextInput
                  id="email"
                  name="email"
                  labelText="Email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleChange(e, "email")}
                />
              </Column>
              <Column lg={8} md={8} sm={4} className="repo-page__r1">
                <TextInput
                  name="password"
                  placeholder="Enter your password"
                  labelText="Password"
                  type="password"
                  invalidText="Your password must be at least 6 characters as well as contain at least one uppercase, one lowercase, and one number."
                  required
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                  onChange={(e) => handleChange(e, "password")}
                />
              </Column>
            </Grid>
          </FormGroup>
          <Button type="submit">Login</Button>
        </Stack>
      </Form>
      <div>
        <span>Dont have an account?</span>
        <Link href="/register" passHref>
          Register
        </Link>
      </div>
    </div>
  );
}

export default Login;
