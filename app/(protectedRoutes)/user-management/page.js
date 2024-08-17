/* eslint-disable import/no-unresolved */
"use client";

import { showNotification } from "@/app/managers/NotificationManager";
import { del, post } from "@/app/utilities/apiHelper";
import { defaultApiErrorMessage } from "@/app/utilities/utility";
import CommonBreadCrumb from "@/components/CommonBreadCrumb/CommonBreadCrumb";
import CommonDataTable from "@/components/CommonDataTable/CommonDataTable";
import { Grid, Column, Pagination, Loading, Dropdown } from "@carbon/react";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";

const headers = [
  {
    key: "id",
    header: "User ID",
  },
  {
    key: "name",
    header: "Name",
  },
  {
    key: "email",
    header: "Email",
  },
  {
    key: "role",
    header: "Role",
  },
  {
    key: "status",
    header: "Status",
  },
  {
    key: "createdAt",
    header: "Created At",
  },
  { key: "actions", header: "Actions" },
];

const commands = ["Delete", "Edit"];

const breadCrumbsData = [
  { name: "User Management", hasLink: false, isCurrentPage: true, id: 0 },
];

function UserManagement() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState({
    status: { id: "all", text: "All" },
  });

  const getUsers = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await post("/users", {
        filters: {
          status: filters.status.text,
        },
      });
      console.log("🚀 ~ getUsers ~ response:", response);
      const resData = response;
      if (resData.status === 200) {
        setTableData(resData.usersData || []);
      } else {
        showNotification(
          resData?.message || defaultApiErrorMessage,
          "error",
          "error"
        );
      }
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  async function deleteUser(userId) {
    try {
      const response = await del(`/users/${userId}`);

      if (response.status === 200) {
        showNotification(response.message || "User has been deleted.");
      } else {
        showNotification(response.message || "Failed to delete user.", "error");
      }
    } catch (error) {
      showNotification(error.message || "An error occurred.", "error");
    }
  }

  const statusOptions = [
    { id: "all", text: "All" },
    { id: "active", text: "Active" },
    { id: "inActive", text: "In Active" },
    { id: "pending", text: "Pending" },
    { id: "suspended", text: "Suspended" },
  ];

  if (isLoading) {
    return (
      <Loading
        active={isLoading}
        small
        description="Loading data..."
        withOverlay
      />
    );
  }
  return (
    <Grid className="repo-page">
      <Column lg={16} md={8} sm={4}>
        <CommonBreadCrumb breadCrumbsData={breadCrumbsData} />
      </Column>
      <Column lg={16} md={8} sm={4}>
        <CommonDataTable
          columns={headers}
          filters={filters}
          tableData={tableData.slice(
            firstRowIndex,
            firstRowIndex + currentPageSize
          )}
          actionEvent={(actionType = "other", item = {}) => {
            if (actionType === "Delete") {
              setTableData(tableData.filter((el) => el.id !== item.id));
              deleteUser(item.id);
            }
            if (actionType === "Edit") {
              router.push(
                `/user-management/edit-user-details?userId=${item.id}`
              );
            }
          }}
          actionCommands={commands}
          renderFilters={() => {
            return (
              <Dropdown
                id="status-filter"
                titleText="Filter by status"
                label="Status"
                items={statusOptions}
                selectedItem={filters.status}
                itemToString={(item) => (item ? item.text : "")}
                onChange={({ selectedItem }) => {
                  setFilters((prev) => ({ ...prev, status: selectedItem }));
                  // getUsers({ status: selectedItem.id });
                }}
              />
            );
          }}
        />
        <Pagination
          totalItems={tableData.length}
          backwardText="Previous page"
          forwardText="Next page"
          pageSize={currentPageSize}
          pageSizes={[5, 10, 15, 25]}
          itemsPerPageText="Items per page"
          onChange={({ page, pageSize }) => {
            if (pageSize !== currentPageSize) {
              setCurrentPageSize(pageSize);
            }
            setFirstRowIndex(pageSize * (page - 1));
          }}
        />
      </Column>
    </Grid>
  );
}

export default UserManagement;
