/* eslint-disable import/no-unresolved */
"use client";

import { UsersDataContext } from "@/app/context/UsersDataContext";
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
import React, { useContext, useEffect, useState } from "react";

const USER_ROLES = [
  { value: "admin", label: "Admin" },
  { value: "user", label: "User" },
  { value: "moderator", label: "Moderator" },
];
const USER_STATUSES = [
  { value: "active", label: "Active" },
  { value: "inActive", label: "In Active" },
  { value: "suspended", label: "Suspended" },
  { value: "pending", label: "Pending" },
];

const breadCrumbsData = [
  {
    name: "User Management",
    hasLink: true,
    link: "/user-management",
    isCurrentPage: false,
  },
  { name: "Edit User Details", hasLink: false, isCurrentPage: true },
];

export default function EditUser() {
  const { users = [], setUsers } = useContext(UsersDataContext);
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [userData, setUserData] = useState({});
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  console.log("🚀 ~ EditUser ~ userData:", userData);
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    status: "",
  });

  useEffect(() => {
    const findUser = users.find((el) => el.id === Number(userId)) || {};
    console.log("🚀 ~ useEffect ~ findUser:", findUser);
    setUserData(findUser);
    setFormData({
      name: findUser.name || "",
      role: findUser.role || "",
      status: findUser.status || "",
    });
  }, [userId, users]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setUsers((prevUsers) => {
      console.log("🚀 ~ setUsers ~ prevUsers:", prevUsers);
      return prevUsers.map((user) => {
        if (user.id === Number(userId)) {
          return {
            ...user,
            role: formData.role,
            name: formData.name,
            status: formData.status,
          };
        }
        return user;
      });
    });

    router.back();
    console.log("🚀 ~ handleSubmit ~ users:", users);
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
  );
}
