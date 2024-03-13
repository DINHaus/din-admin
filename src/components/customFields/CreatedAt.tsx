import { Buildable,  ParMd } from "@daohaus/ui";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";



export const CreatedAtField = (props: Buildable<object>) => {
  const { setValue } = useFormContext();
  const { createdAt: createdAtParam } = useParams();



  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {
    if (createdAtParam) {
      setErrorText(null);
      console.log("createdAtParam >>", createdAtParam);
      console.log("props.id,", props.id);
      setValue(
        props.id,
        createdAtParam
      );
    } else {
      setErrorText(null);
      setValue(
        props.id,
        (Math.floor((Number(new Date()) / 1000))).toString()
      );
    }


  }, [createdAtParam]);

  if (!errorText) {
    return null;
  }

  return <ParMd style={{ color: "red" }}>{errorText}</ParMd>;
};
