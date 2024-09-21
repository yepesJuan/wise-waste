"use client";
import React from "react";
import { useTable, Column } from "react-table";

const Table = () => {
  const data = React.useMemo(
    () => [
      { stand: "281",Bin_Volume: "3002", street: "Sanibel", binPercentage: 40},
      { stand: "345",Bin_Volume: "4023", street: "Lagos de campa", binPercentage: 70},
      { stand: "754",Bin_Volume: "2564", street: "Versales garden", binPercentage: 80},
      { stand: "232",Bin_Volume: "3040", street: "Woodmount", binPercentage: 50},
      { stand: "289",Bin_Volume: "3002", street: "Haitus", binPercentage: 40},
      { stand: "078",Bin_Volume: "4023", street: "Walmart Neighborhood Market", binPercentage: 90},
      { stand: "134",Bin_Volume: "2564", street: "Lakeview", binPercentage: 20},
      { stand: "467",Bin_Volume: "3040", street: "Emrald", binPercentage: 30},
      // Add more rows as needed
    ],
    []
  );

  const columns: Column<{
    stand: string;
    Bin_Volume: string;
    street: string;
    binPercentage: number;
  }>[] = React.useMemo(
    () => [
      {
        Header: "Stand",
        accessor: "stand",
      },
      {
        Header: "Bin_Volume",
        accessor: "Bin_Volume",
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
