import { Input } from "@force-dev/react-front";
import { camelize } from "@force-dev/utils";
import React, { memo } from "react";

export const Page = memo(() => (
  <div>
    <div>123</div>
    <Input placeholder={camelize("placeholder")} />
  </div>
));
