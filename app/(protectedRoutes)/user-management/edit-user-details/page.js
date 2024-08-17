/* eslint-disable import/no-unresolved */
"use client";

import { showNotification } from "@/app/managers/NotificationManager";
import { get, post } from "@/app/utilities/apiHelper";
import { USER_ROLES, USER_STATUSES } from "@/app/utilities/utility";
import CommonBreadCrumb from "@/components/CommonBreadCrumb/CommonBreadCrumb";
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
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";

const breadCrumbsData = [
  {
    name: "User Management",
    hasLink: true,
    link: "/user-management",
    isCurrentPage: false,
    id: 0,
  },
  { name: "Edit User Details", hasLink: false, isCurrentPage: true, id: 1 },
];

export default function EditUser() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [userData, setUserData] = useState({});
  console.log("🚀 ~ EditUser ~ userData:", userData);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    status: "",
  });

  const getUserData = async () => {
    try {
      const response = await get(`/users/${Number(userId)}`);

      if (response.status === 200) {
        setFormData({
          name: response.user.name || "",
          role: response.user.role || "",
          status: response.user.status || "",
        });
        setUserData(response.user);
      } else {
        showNotification(
          response.message || "Failed to created user.",
          "error"
        );
      }
    } catch (error) {
      showNotification(error.message || "An error occurred.", "error");
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    async function runFuncToGetUser() {
      await getUserData();
    }
    runFuncToGetUser();
  }, [userId]);

  async function updateUserDetails() {
    try {
      const response = await post(`/update-user-detail`, {
        user: {
          role: formData.role,
          name: formData.name,
          status: formData.status,
          id: userId,
        },
      });

      if (response.status === 200) {
        router.push("/user-management");
        showNotification(
          response.message || "User has been updated successfully."
        );
      } else {
        showNotification(response.message || "Failed to update user.", "error");
      }
    } catch (error) {
      showNotification(error.message || "An error occurred.", "error");
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateUserDetails();
  };

  const handleChange = (e, fieldName) => {
    if (fieldName === "password") {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
      if (!passwordRegex.test(e.target.value)) {
        setIsPasswordValid(true);
        return;
      }
      setIsPasswordValid(false);
    }
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Grid className="edit_user_details_grid">
        <Column lg={16} md={8} sm={4}>
          <CommonBreadCrumb breadCrumbsData={breadCrumbsData} />
        </Column>
        <Column lg={16} md={8} sm={4} className="page_name_column">
          <div>
            <h3>Edit User Details</h3>
          </div>
        </Column>
        <Column lg={16} md={8} sm={4}>
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
                  </Column>
                  <Column lg={8} md={8} sm={4} className="repo-page__r1">
                    <Select
                      id="status"
                      name="status"
                      labelText="Status"
                      value={formData.status}
                      onChange={handleChange}
                      required
                    >
                      {USER_STATUSES.map((status) => {
                        return (
                          <SelectItem
                            key={status.label}
                            text={status.label}
                            value={status.label}
                          />
                        );
                      })}
                    </Select>
                    <TextInput
                      invalid={isPasswordValid}
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
        </Column>
      </Grid>
    </Suspense>
  );
}
