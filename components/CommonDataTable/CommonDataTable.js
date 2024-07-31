import {
  DataTable,
  Dropdown,
  OverflowMenu,
  OverflowMenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
} from "@carbon/react";
import React, { useState } from "react";

const CommonDataTable = ({
  columns,
  tableData,
  actionEvent = () => {},
  actionCommands = [],
}) => {
  const [selectedStatus, setSelectedStatus] = useState("all");

  const statusOptions = [
    { id: "all", text: "All" },
    { id: "active", text: "Active" },
    { id: "inActive", text: "In Active" },
    { id: "pending", text: "Pending" },
    { id: "suspended", text: "Suspended" },
  ];

  const filteredRows = tableData.filter((row) => {
    const matchesStatus =
      selectedStatus === "all" ||
      row.status.toLowerCase() ===
        statusOptions
          .find((status) => status.id === selectedStatus)
          .text.toLowerCase();
    return matchesStatus;
  });

  return (
    <DataTable
      isSortable
      headers={columns}
      rows={filteredRows}
      render={({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
        getToolbarProps,
        onInputChange,
      }) => {
        console.log("🚀 ~ CommonDataTable ~ rows:", rows);
        return (
          <TableContainer title="User Management" description="">
            <TableToolbar {...getToolbarProps()}>
              <TableToolbarContent>
                <TableToolbarSearch onChange={onInputChange} />
                <Dropdown
                  id="status-filter"
                  titleText="Filter by status"
                  label="Status"
                  items={statusOptions}
                  itemToString={(item) => (item ? item.text : "")}
                  onChange={({ selectedItem }) =>
                    setSelectedStatus(selectedItem.id)
                  }
                />
              </TableToolbarContent>
            </TableToolbar>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => {
                    return (
                      <TableHeader
                        {...getHeaderProps({ header })}
                        key={header.key}
                      >
                        {header.header}
                      </TableHeader>
                    );
                  })}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((rowData) => {
                  console.log("🚀 ~ {rows.map ~ rowData:", rowData);
                  return (
                    <React.Fragment key={rowData.id}>
                      <TableRow
                        key={rowData.id}
                        {...getRowProps({ row: rowData })}
                      >
                        {rowData.cells.map((cellData) => {
                          if (cellData.info.header !== "actions") {
                            return (
                              <TableCell key={cellData.id}>
                                {cellData.value}
                              </TableCell>
                            );
                          }
                        })}
                        <TableCell>
                          <OverflowMenu>
                            {actionCommands.map((command, index) => {
                              return (
                                <OverflowMenuItem
                                  key={index}
                                  itemText={command}
                                  onClick={() => actionEvent(command, rowData)}
                                />
                              );
                            })}
                          </OverflowMenu>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        );
      }}
    />
  );
};

export default CommonDataTable;
