import { Grid, TextField, Button, InputLabel } from "@mui/material";
import { ConfigItem } from "generated/graphql";
import CellDropdown from "views/device/CellDropdown";
import { Update } from "assets/constants";

const buildTextAreaField = (params: ConfigItem, formik: any, index: number) => {
  return (
    <Grid item xs={12} md={12} key={index}>
      <TextField
        fullWidth
        id={params.name!}
        name={params.name!}
        label={params.title}
        placeholder={params.placeholder!}
        margin="dense"
        value={formik.values[params.name!] ?? ""}
        onChange={formik.handleChange}
        helperText={params.title}
        required={true}
        multiline
        rows={16}
      />
    </Grid>
  );
};

const buildTextField = (params: ConfigItem, formik: any, index: number) => {
  return (
    <Grid item xs={4} md={4} key={index}>
      <TextField
        fullWidth
        id={params.name!}
        name={params.name!}
        label={params.title}
        placeholder={params.placeholder!}
        margin="dense"
        value={formik.values[params.name!] ?? ""}
        onChange={formik.handleChange}
        helperText={params.title}
        required={true}
      />
    </Grid>
  );
};

const buildSelectField = (params: ConfigItem, formik: any, index: number) => {
  let modifiedOptions: Update[] = [];
  params?.options?.map((option) => {
    return (modifiedOptions = [
      ...modifiedOptions,
      {
        id: option?.value + "" ?? "",
        name: option?.name + "" ?? "",
      },
    ]);
  });
  return (
    <Grid item xs={4} md={4} key={index}>
      <CellDropdown
        options={modifiedOptions}
        multiple={false}
        label={params.title!}
        change={formik.handleChange}
        selectedValue={{ id: formik.values[params.name!] ?? "", name: "" }}
        selectName={params.name!}
        id={params.name!}
      />
    </Grid>
  );
};

const buildCheckboxField = () => {
  return <div></div>;
};

const buildFileField = (params: any, formik: any) => {
  return (
    <Grid item xs={4} md={4}>
      <InputLabel htmlFor="import-button">{params.title}</InputLabel>
      <Button variant="contained" component="label">
        Upload File
        <input
          id={params.name!}
          name={params.name!}
          type="file"
          accept=".slx"
          value={formik.values[params.name!]}
          onChange={formik.handleChange}
          hidden
        />
      </Button>
    </Grid>
  );
};

export const buildForm = (param: ConfigItem, formik: any, index: number) => {
  switch (param.type) {
    case "textarea":
      return buildTextAreaField(param, formik, index);
    case "text":
      return buildTextField(param, formik, index);
    case "file":
      return buildFileField(param, formik);
    case "select":
      return buildSelectField(param, formik, index);
    case "checkbox":
      return buildCheckboxField();
    default:
      return "";
  }
};
