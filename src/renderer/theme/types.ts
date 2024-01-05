import { ReactNode } from "react";
import { CustomType } from "./custom";

type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

declare module '@mui/material/styles' {
  interface Theme {
    mode: string;
    custom: CustomType;
  }
  interface ThemeOptions extends DeepPartial<Theme> {}
}

export type ThemeConfigProps = {
  children: ReactNode;
};
