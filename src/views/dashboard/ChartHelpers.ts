export enum AxisVisibility {
  VISIBLE = "true",
  HIDDEN = "legendonly",
}
export const findVisibilityOfAxis = (
  name: string,
  axis: any
): AxisVisibility => {
  return (
    axis?.find((item: any) => item?.name === name)?.visible ??
    AxisVisibility.HIDDEN
  );
};
