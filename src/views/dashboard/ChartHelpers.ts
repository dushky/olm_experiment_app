export enum AxisVisibility {
  VISIBLE = "true",
  HIDDEN = "legendonly",
}
export const findVisibilityOfAxis = (
  name: string,
  defaultVisibilityFor: string[],
  showDefaultVisibility: boolean,
  softwareName: string | undefined,
  axis: any
): AxisVisibility => {
  if (showDefaultVisibility)
  {
    if (defaultVisibilityFor.includes(softwareName!)) {
      return AxisVisibility.VISIBLE;
    }
    else {
      return AxisVisibility.HIDDEN;
    }
  }

  return (
    axis?.find((item: any) => item?.name === name)?.visible ??
    AxisVisibility.HIDDEN
  );
};
