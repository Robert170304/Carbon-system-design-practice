"use client";

import { showNotification } from "@/app/managers/NotificationManager";
import { post } from "@/app/utilities/apiHelper";
import { USER_ROLES } from "@/app/utilities/utility";
import {
  Button,
  Column,
  Form,
  FormGroup,
  Grid,
  Select,
  SelectItem,
  Stack,
  TextInput,
} from "@carbon/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "Admin",
    name: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser();
  };

  async function registerUser() {
    try {
      const response = await post("/register-user", {
        user: {
          ...formData,
        },
      });

      if (response.status === 200) {
        router.push("/user-management");
        showNotification(
          response.message || "User has been created successfully."
        );
      } else {
        showNotification(
          response.message || "Failed to created user.",
          "error"
        );
      }
    } catch (error) {
      showNotification(error.message || "An error occurred.", "error");
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
                  id="name"
                  name="name"
                  labelText="Name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <TextInput
                  id="email"
                  name="email"
                  labelText="Email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleChange(e, "email")}
                  required
                />
              </Column>
              <Column lg={8} md={8} sm={4} className="repo-page__r1">
                <Select
                  id="role"
                  name="role"
                  labelText="Role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  {USER_ROLES.map((role) => {
                    return (
                      <SelectItem
                        key={role.label}
                        text={role.label}
                        value={role.label}
                      />
                    );
                  })}
                </Select>
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
          <Button type="submit">Submit</Button>
        </Stack>
      </Form>
    </div>
  );
}

export default Register;
