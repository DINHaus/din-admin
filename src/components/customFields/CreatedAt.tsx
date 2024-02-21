import { Buildable,  ParMd } from "@daohaus/ui";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";



export const CreatedAtField = (props: Buildable<object>) => {
  const { setValue } = useFormContext();

  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {


    setErrorText(null);
    setValue(
      props.id,
      (Math.floor((Number(new Date()) / 1000))).toString()
    );
  }, []);

  if (!errorText) {
    return null;
  }

  return <ParMd style={{ color: "red" }}>{errorText}</ParMd>;
};
