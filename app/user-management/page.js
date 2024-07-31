/* eslint-disable import/no-unresolved */
"use client";

import CommonBreadCrumb from "@/components/CommonBreadCrumb/CommonBreadCrumb";
import CommonDataTable from "@/components/CommonDataTable/CommonDataTable";
import { Grid, Column, Pagination } from "@carbon/react";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { UsersDataContext } from "../context/UsersDataContext";

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
  { name: "User Management", hasLink: false, isCurrentPage: true },
];

function UserManagement() {
  const { users } = useContext(UsersDataContext);
  const router = useRouter();
  const [firstRowIndex, setFirstRowIndex] = useState(0);
  const [currentPageSize, setCurrentPageSize] = useState(10);
  const [tableData, updateTableData] = useState(users);

  return (
    <Grid className="repo-page">
      <Column lg={16} md={8} sm={4}>
        <CommonBreadCrumb breadCrumbsData={breadCrumbsData} />
      </Column>
      <Column lg={16} md={8} sm={4}>
        <CommonDataTable
          columns={headers}
          tableData={tableData.slice(
            firstRowIndex,
            firstRowIndex + currentPageSize
          )}
          actionEvent={(actionType = "other", item = {}) => {
            if (actionType === "Delete") {
              updateTableData(tableData.filter((el) => el.id !== item.id));
            }
            if (actionType === "Edit") {
              router.push(
                `/user-management/edit-user-details?userId=${item.id}`
              );
            }
          }}
          actionCommands={commands}
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
