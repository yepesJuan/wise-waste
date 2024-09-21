"use client";
import React from "react";
import { useTable, Column } from "react-table";

const Table = () => {
  const data = React.useMemo(
    () => [
      { stand: "281", street: "sanibel", binPercentage: 70 },
      { stand: "345", street: "lagos de campa", binPercentage: 55 },
      { stand: "754", street: "haitus", binPercentage: 40 },
      { stand: "232", street: "woodmount", binPercentage: 5 },
      // Add more rows as needed
    ],
    []
  );

  const columns: Column<{
    stand: string;
    street: string;
    binPercentage: number;
  }>[] = React.useMemo(
    () => [
      {
        Header: "Stand",
        accessor: "stand",
      },
      {
        Header: "Street",
        accessor: "street",
      },
      {
        Header: "Bin %",
        accessor: "binPercentage",
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        Cell: ({ value }: any) => (
          <span style={{ color: getColor(value), fontWeight: "bolder" }}>
            {value}%
          </span>
        ),
      },
    ],
    []
  );

  const getColor = (percentage: number) => {
    if (percentage >= 70) return "red"; // High percentage
    if (percentage >= 55) return "orange"; // Medium-high percentage
    if (percentage >= 40) return "#FFD700"; // Medium-low percentage
    return "green"; // Low percentage
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  return (
    <table
      {...getTableProps()}
      style={{ width: "100%", borderCollapse: "collapse", background: "white" }}
    >
      <thead>
        {headerGroups.map((headerGroup, i) => (
          <tr {...headerGroup.getHeaderGroupProps()} key={`headerGroup-${i}`}>
            {headerGroup.headers.map((column, j) => (
              <th
                {...column.getHeaderProps()}
                key={`column-${i}-${j}`}
                style={{ borderBottom: "solid 3px black", padding: "10px" }}
              >
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
                <td
                  {...cell.getCellProps()}
                  key={`cell-${i}-${j}`}
                  style={{ border: "solid 1px gray", padding: "10px" }}
                >
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
