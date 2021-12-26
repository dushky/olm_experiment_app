import React, { useState } from 'react'

import { Grid, Button, Snackbar, Alert, Select, MenuItem, ListItemIcon, ListItemText, Checkbox } from '@mui/material'


import MainCard from 'ui-components/cards/MainCard'
import { gridSpacing } from 'assets/constants'

import { DataGrid, GridColumns,GridCellEditCommitParams, GridToolbarContainer, GridToolbarExport, gridClasses, GridValueFormatterParams } from "@mui/x-data-grid"
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from "@mui/icons-material/Edit"

import { 
    DeviceDataFragment, 
    useCreateDeviceMutation, 
    useUpdateDeviceMutation, 
    SoftwareDataFragment, 
    useRemoveDeviceMutation, 
    DeviceTypeDataFragment,
    CreateDevice 
} from 'generated/graphql'
import AddDeviceForm from './AddDeviceForm'
import CellDropdown from './CellDropdown'
import { useNavigate } from 'react-router'




interface Props {
    device: DeviceDataFragment[],
    software: SoftwareDataFragment[],
    deviceTypes: DeviceTypeDataFragment[]
}

const Device = ({device, software, deviceTypes}: Props) => {
    const [pageSize, setPageSize] = useState<number>(10)
    const [open, setOpen] = useState<boolean>(false)
    const [createMutation] = useCreateDeviceMutation()
    const [updateMutation] = useUpdateDeviceMutation()
    const [removeMutation] = useRemoveDeviceMutation()
    const navigation = useNavigate()

    const handleClose = (event: any, reason: any) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
    }

    const handleRows = () : DeviceDataFragment[]=> {
        return device.map((item: DeviceDataFragment) => {
            return {
                id: item.id, 
                name: item.name, 
                port: item.port, 
                deviceType: item.deviceType.name as any,
                software: item.software.map((soft) => soft.name) as any,
            }
        })
    }

    const handleSoftware = () => {
        return software.map((item) => {
            return {
                id: item.id,
                name: item.name
            }
        })
    }
    
    const [rows, setRows] = useState<DeviceDataFragment[]>(handleRows())


    const handleSubmit = async (value: CreateDevice) => {
        await createMutation({
            variables: {
                input: {
                    name: value.name,
                    device_type_id: value.device_type_id,
                    port: value.port,
                    software: value.software
                }
            }
        }).then((value) => {
            delete value.data?.createDevice.__typename
            const item = value.data!.createDevice
            setRows([...rows, {
                id: item.id,
                name: item.name,
                port: item.port,
                deviceType: item.deviceType.name as any,
                software: item.software.map((soft) => soft.name) as any
            }])

            setOpen(true)
        })
    }


    const renderDetailsButton = (params: any) => {
        return (
            <div style={{width: '100%', textAlign: 'center'}}>
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    style={{marginRight: 10}}
                    startIcon={<EditIcon/>}
                    onClick={ () => {
                        navigation("/app/devices/" + params.row.id)
                    }}
                >
                    Edit
                </Button>
                <Button
                    variant="contained"
                    color="error"
                    size="small"
                    startIcon={<DeleteIcon/>}
                    onClick={ async () => {
                        await removeMutation({
                            variables: {
                                id: params.id
                            }
                        }).then((removedDevice) => {
                            setRows(rows.filter((item) => item.id != removedDevice.data?.removeDevice.id))
                            setOpen(true)
                        })
                    }}
                >
                    Delete
                </Button>
            </div>
        )
    }

    const columns : GridColumns = [
        {
            field: "id",
            flex: 1,
            type: "string",
            valueFormatter: (value) => value.value,
            renderHeader: (params: any) => {
                return <span>ID</span>
            }
        },
        {
            field: "name",
            flex: 1,
            type: "string",
            editable: true,
            valueFormatter: (value) => value.value,
            renderHeader: (params: any) => {
                return <span>Name</span>
            }
        },
        {
            field: "port",
            flex: 1,
            type: "string",
            editable: true,
            valueFormatter: (value) => value.value,
            renderHeader: (params: any) => {
                return <span>Port</span>
            }
        },
        {
            field: "deviceType",
            flex: 1,
            type: "string",
            editable: true,
            valueFormatter: (value) => value.value,
            renderHeader: (params: any) => {
                return <span>Device Type</span>
            }
        },
        {
            field: "software",
            flex: 1,
            editable: false,
            valueFormatter: (value) => value.value,
            renderHeader: (params: any) => {
                return <span>Software</span>
            }
        },
        {
            field: "actions",
            headerName: "",
            flex: 3,
            sortable: false,
            filterable: false,
            valueFormatter: (value) => "",
            renderCell: (params: any) => renderDetailsButton(params)
        }
    ]

    const handleEdit = async (e: GridCellEditCommitParams, softwareIds: []) => {
        if (e.value && e.id) {
            await updateMutation({
                variables: {
                    input: {
                        id: "",
                        name: "",
                        port: "",
                        device_type_id: "",
                        software: softwareIds
                    }
                }
            }).then(() => setOpen(true)).catch((e) => {
                console.log(e)
            })
        }
    }

    const handleDropDownEdit = async (params: any, softwareIds: string[]) => {
        await updateMutation({
            variables: {
                input: {
                    id: params.id,
                    name: params.name,
                    port: params.port,
                    device_type_id: params.device_type_id,
                    software: softwareIds
                }
            }
        })
    }


    return (
        <MainCard>
            <Grid container height="100vh" maxHeight="450px" spacing={gridSpacing}>
                <Grid item xs={12} md={6}>
                    <div style={{ height: '100%', width: '100%' }}>
                        <DataGrid
                            rows={rows}
                            loading={rows.length === 0}
                            columns={columns}
                            pageSize={pageSize}
                            rowsPerPageOptions={[5, 10, 20, 50]}
                            onPageSizeChange={(item: number) => setPageSize(item)}
                            onCellEditCommit={(item: GridCellEditCommitParams) => handleEdit(item, [])}
                        />
                    </div>
                </Grid>
                <Grid item xs={12} md={6}>
                    <AddDeviceForm handleSubmit={handleSubmit} software={software} deviceTypes={deviceTypes}/>
                </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={3000} anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} onClose={handleClose}>
                <Alert onClose={handleClose as any} style={{marginLeft: 'auto'}} severity="success" sx={{ width: '100%' }}>
                    Success
                </Alert>
            </Snackbar>
        </MainCard>
    )
}

export default Device
