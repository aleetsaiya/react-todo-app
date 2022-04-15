import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    color: string;
    secondColor: string;
    checkedColor: string;
    borderColor: string;
    itemBkColor: string;
    bkColor: string;
    bkImg: string;
    weatherIcon: string;
  }
}
