import {
  DataTable,
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
import React from "react";

const CommonDataTable = ({
  columns,
  tableData,
  actionEvent = () => {},
  actionCommands = [],
  renderFilters = () => {
    return <div />;
  },
}) => {
  return (
    <DataTable
      isSortable
      headers={columns}
      rows={tableData}
      render={({
        rows,
        headers,
        getHeaderProps,
        getRowProps,
        getTableProps,
        getToolbarProps,
        onInputChange,
      }) => {
        return (
          <TableContainer title="User Management" description="">
            <TableToolbar {...getToolbarProps()}>
              <TableToolbarContent>
                <TableToolbarSearch onChange={onInputChange} />
                {renderFilters()}
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
