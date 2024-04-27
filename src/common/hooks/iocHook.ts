import { IIoCInterface } from "@force-dev/utils";
import { useRef } from "react";

export const iocHook =
  <T>(ioc: IIoCInterface<T>) =>
  () =>
    useRef(ioc.getInstance()).current;
