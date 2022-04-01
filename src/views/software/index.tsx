import React, { useState } from "react";

import { Grid, Button } from "@mui/material";
import {
  DataGrid,
  GridColumns,
  GridCellEditCommitParams,
} from "@mui/x-data-grid";
import { gridSpacing } from "assets/constants";
import MainCard from "ui-components/cards/MainCard";
import {
  SoftwareDataFragment,
  useUpdateSoftwareMutation,
  useCreateSoftwareMutation,
  useRemoveSoftwareMutation,
} from "generated/graphql";
import DeleteIcon from "@mui/icons-material/Delete";
import AddSoftwareForm from "./AddSoftwareForm";

interface Props {
  software: SoftwareDataFragment[];
}

const Software = ({ software }: Props) => {
  const [updateSoftwareMutation] = useUpdateSoftwareMutation();
  const [removeSoftware] = useRemoveSoftwareMutation();
  const [createSoftware] = useCreateSoftwareMutation();
  const [pageSize, setPageSize] = useState<number>(10);

  const handleRows = (): { id: string; name: string }[] => {
    return software.map((item: SoftwareDataFragment) => {
      return { id: item.id, name: item.name };
    });
  };

  const [rows, setRows] = useState<
    {
      id: string;
      name: string;
    }[]
  >(handleRows());

  const handleSubmit = async (value: string) => {
    await createSoftware({
      variables: {
        input: {
          name: value,
        },
      },
    }).then((value) => {
      setRows([
        ...rows,
        {
          id: value.data!.createSoftware.id,
          name: value.data!.createSoftware.name,
        },
      ]);
    });
  };

  // TODO: spread interface to get keys

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
            await removeSoftware({
              variables: {
                input: params.id,
              },
            }).then((removedSoftware) => {
              setRows(
                rows.filter(
                  (item) => item.id !== removedSoftware.data?.removeSoftware.id
                )
              );
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

  const handleEdit = async (e: GridCellEditCommitParams) => {
    if (e.value && e.id) {
      await updateSoftwareMutation({
        variables: {
          input: {
            id: e.id.toString(),
            name: e.value.toString(),
          },
        },
      });
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
            />
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <AddSoftwareForm handleSubmit={handleSubmit} />
        </Grid>
      </Grid>
    </MainCard>
  );
};

export default Software;
