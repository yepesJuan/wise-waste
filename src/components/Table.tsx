// src/components/Table.tsx
"use client";

import React from "react";
import { useTable, Column } from "react-table";

interface TableData {
  stand: string;
  Bin_Volume: string;
  street: string;
  binPercentage: number;
}

// interface TableProps {
//   data: TableData[];
// }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Table = ({ data }: any) => {
  const columns: Column<TableData>[] = React.useMemo(
    () => [
      {
        Header: "Stand",
        accessor: "stand",
      },
      { Header: "Bin Volume",
        accessor: "Bin_Volume" 
      },
      { Header: "Street",
         accessor: "street" 
        },
      {
        Header: "Bin %",
        accessor: "binPercentage",
        Cell: ({ value }: { value: number }) => (
          <span style={{ color: getColor(value), fontWeight: "bolder" }}>
            {value}%
          </span>
        ),
      },
    ],
    []
  );

  const getColor = (percentage: number) => {
    if (percentage >= 70) return "red";
    if (percentage >= 55) return "orange";
    if (percentage >= 40.1) return "#FFD700";
    return "green";
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table {...getTableProps()} style={{ width: "100%", borderCollapse: "collapse", background: "white" }}>
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={`headerGroup-${i}`}>
            {headerGroup.headers.map((column, j) => (
              <th {...column.getHeaderProps()} key={`column-${i}-${j}`} style={{ borderBottom: "solid 3px black", padding: "10px" }}>
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()} key={`row-${i}`}>
              {row.cells.map((cell, j) => (
                <td {...cell.getCellProps()} key={`cell-${i}-${j}`} style={{ border: "solid 1px gray", padding: "10px" }}>
                  {cell.render("Cell")}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;