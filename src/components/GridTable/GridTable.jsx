import React, { useCallback, useRef, useState } from "react";
import saveAs from "file-saver";
import Paper from "@mui/material/Paper";
import {
  SelectionState,
  EditingState,
  PagingState,
  SortingState,
  GroupingState,
  SummaryState,
  SearchState,
  IntegratedFiltering,
  IntegratedSelection,
  IntegratedPaging,
  IntegratedSorting,
  IntegratedGrouping,
  IntegratedSummary,
} from "@devexpress/dx-react-grid";
import {
  Grid,
  VirtualTable,
  TableHeaderRow,
  TableSelection,
  PagingPanel,
  TableEditRow,
  TableEditColumn,
  GroupingPanel,
  TableGroupRow,
  Toolbar,
  DragDropProvider,
  TableColumnReordering,
  TableColumnResizing,
  TableSummaryRow,
  ExportPanel,
  SearchPanel,
} from "@devexpress/dx-react-grid-material-ui";
import { GridExporter } from "@devexpress/dx-react-grid-export";

import jsonData from "../../data/employeeData.json";

const getRowId = (row) => row.id - 1;

const onSave = (workbook) => {
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(
      new Blob([buffer], { type: "application/octet-stream" }),
      "DataGrid.xlsx"
    );
  });
};

const GridTable = () => {
  const exporterRef = useRef(null);

  const startExport = useCallback(
    (options) => {
      exporterRef.current.exportGrid(options);
    },
    [exporterRef]
  );

  const [columns] = useState([
    { name: "id", title: "id" },
    { name: "firstName", title: "FirstName" },
    { name: "lastName", title: "LastName" },
    { name: "department", title: "Department" },
    { name: "position", title: "Position" },
    { name: "email", title: "Email" },
    { name: "phone", title: "Phone" },
    { name: "hireDate", title: "HireDate" },
    { name: "address", title: "Address" },
  ]);
  const [rows, setRows] = useState(jsonData);
  const [selection, setSelection] = useState([]);
  const [defaultColumnWidths] = useState([
    { columnName: "id", width: 70 },
    { columnName: "firstName", width: 120 },
    { columnName: "lastName", width: 120 },
    { columnName: "department", width: 120 },
    { columnName: "position", width: 150 },
    { columnName: "email", width: 200 },
    { columnName: "phone", width: 120 },
    { columnName: "hireDate", width: 120 },
    { columnName: "address", width: 120 },
  ]);
  const [totalSummaryItems] = useState([{ columnName: "id", type: "count" }]);
    const [sorting, setSorting] = useState([
      { columnName: "id", direction: "asc" },
    ]);
   const [searchValue, setSearchState] = useState("");


  const commitChanges = ({ added, changed, deleted }) => {
    let changedRows;
    if (added) {
      const startingAddedId =
        rows.length > 0 ? rows[rows.length - 1].id + 1 : 0;
      changedRows = [
        ...added.map((row, index) => ({
          id: startingAddedId + index,
          ...row,
        })),
        ...rows,
      ];
    }
    if (changed) {
      changedRows = rows.map((row) =>
        changed[row.id] ? { ...row, ...changed[row.id] } : row
      );
    }
    if (deleted) {
      const deletedSet = new Set(deleted);
      changedRows = rows.filter((row) => !deletedSet.has(row.id));
    }
    setRows(changedRows);
  };

  console.log(selection);
  return (
    <Paper>
      <Grid rows={rows} columns={columns} getRowId={getRowId}>
        <DragDropProvider />
        <PagingState defaultCurrentPage={0} pageSize={10} />
        <EditingState onCommitChanges={commitChanges} />
        <SelectionState
          selection={selection}
          onSelectionChange={setSelection}
        />
        <SortingState sorting={sorting} onSortingChange={setSorting} />
        <GroupingState />
        <SearchState value={searchValue} onValueChange={setSearchState} />
        <SummaryState totalItems={totalSummaryItems} />
        <IntegratedSorting />
        <IntegratedSelection />
        <IntegratedGrouping />
        <IntegratedFiltering />
        <IntegratedPaging />
        <IntegratedSummary />
        <VirtualTable />
        <TableColumnResizing defaultColumnWidths={defaultColumnWidths} />
        <TableColumnReordering
          defaultOrder={[
            "id",
            "firstName",
            "lastName",
            "department",
            "position",
            "email",
            "phone",
            "hireDate",
            "address",
          ]}
        />
        <TableHeaderRow showSortingControls />
        <TableEditRow />
        <TableEditColumn showAddCommand showEditCommand showDeleteCommand />
        <TableSelection showSelectAll />
        <TableGroupRow />
        <Toolbar />
        <GroupingPanel showSortingControls />
        <SearchPanel />
        <PagingPanel />
        <TableSummaryRow />

        <ExportPanel startExport={startExport} />
      </Grid>
      <GridExporter
        ref={exporterRef}
        rows={rows}
        columns={columns}
        sorting={sorting}
        totalSummaryItems={totalSummaryItems}
        selection={selection}
        onSave={onSave}
      />
    </Paper>
  );
};

export default GridTable;
