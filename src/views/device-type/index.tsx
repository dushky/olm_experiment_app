import React, { useState } from "react";

import { Grid, Button, Snackbar, Alert } from "@mui/material";
import MainCard from "ui-components/cards/MainCard";
import {
  DataGrid,
  GridColumns,
  GridCellEditCommitParams,
  GridToolbarContainer,
  GridToolbarExport,
  gridClasses,
} from "@mui/x-data-grid";
import AddDeviceTypeForm from "./AddDeviceTypeForm";
import { gridSpacing } from "assets/constants";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  DeviceTypeDataFragment,
  useUpdateDeviceTypeMutation,
  useRemoveDeviceTypeMutation,
  useCreateDeviceTypeMutation,
} from "generated/graphql";

interface Props {
  deviceType: DeviceTypeDataFragment[];
}

const DeviceType = ({ deviceType }: Props) => {
  const [updateDeviceTypeMutation] = useUpdateDeviceTypeMutation();
  const [removeDeviceType] = useRemoveDeviceTypeMutation();
  const [createDeviceType] = useCreateDeviceTypeMutation();
  const [pageSize, setPageSize] = useState<number>(10);
  const [open, setOpen] = useState<boolean>(false);

  const handleRows = (): { id: string; name: string }[] => {
    return deviceType.map((item: DeviceTypeDataFragment) => {
      return { id: item.id, name: item.name };
    });
  };

  const [rows, setRows] = useState<
    {
      id: string;
      name: string;
    }[]
  >(handleRows());

  const renderDetailsButton = (params: any) => {
    return (
      <strong>
        <Button
          variant="contained"
          color="error"
          size="small"
          startIcon={<DeleteIcon />}
          style={{ marginLeft: 16 }}
          onClick={async () => {
            await removeDeviceType({
              variables: {
                input: params.id,
              },
            }).then((removedDeviceType) => {
              setRows(
                rows.filter(
                  (item) =>
                    item.id !== removedDeviceType.data?.removeDeviceType.id
                )
              );
              setOpen(true);
            });
          }}
        >
          Delete
        </Button>
      </strong>
    );
  };

  const columns: GridColumns = [
    {
      field: "id",
      flex: 5,
      type: "string",
      valueFormatter: (value) => value.value,
      renderHeader: (params: any) => {
        return <span>ID</span>;
      },
    },
    {
      field: "name",
      flex: 50,
      type: "string",
      editable: true,
      valueFormatter: (value) => value.value,
      renderHeader: (params: any) => {
        return <span>Name</span>;
      },
    },
    {
      field: "actions",
      headerName: "",
      flex: 50,
      sortable: false,
      filterable: false,
      valueFormatter: (value) => "",
      renderCell: (params: any) => renderDetailsButton(params),
    },
  ];

  const exportToolbar = () => {
    return (
      <GridToolbarContainer className={gridClasses.toolbarContainer}>
        <GridToolbarExport />
      </GridToolbarContainer>
    );
  };

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (value: string) => {
    await createDeviceType({
      variables: {
        input: {
          name: value,
        },
      },
    }).then((value) => {
      setRows([
        ...rows,
        {
          id: value.data!.createDeviceType.id,
          name: value.data!.createDeviceType.name,
        },
      ]);
      setOpen(true);
    });
  };

  const handleEdit = async (e: GridCellEditCommitParams) => {
    if (e.value && e.id) {
      await updateDeviceTypeMutation({
        variables: {
          input: {
            id: e.id.toString(),
            name: e.value.toString(),
          },
        },
      }).then(() => setOpen(true));
    }
  };

  return (
    <MainCard>
      <Grid container height="100vh" maxHeight="450px" spacing={gridSpacing}>
        <Grid item xs={12} md={6}>
          <div style={{ height: "100%", width: "100%" }}>
            <DataGrid
              rows={rows}
              loading={rows.length === 0}
              columns={columns}
              pageSize={pageSize}
              rowsPerPageOptions={[5, 10, 20, 50]}
              onPageSizeChange={(item: number) => setPageSize(item)}
              onCellEditCommit={(item: GridCellEditCommitParams) =>
                handleEdit(item)
              }
              components={{
                Toolbar: exportToolbar,
              }}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <AddDeviceTypeForm handleSubmit={handleSubmit} />
        </Grid>
      </Grid>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose as any}
          style={{ marginLeft: "auto" }}
          severity="success"
          sx={{ width: "100%" }}
        >
          Success
        </Alert>
      </Snackbar>
    </MainCard>
  );
};

export default DeviceType;
