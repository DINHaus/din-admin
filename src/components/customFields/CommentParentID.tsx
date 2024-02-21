import { Buildable,  ParMd } from "@daohaus/ui";
import { useDHConnect } from "@daohaus/connect";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { hashMessage } from 'viem';
import { useParams } from "react-router-dom";


export const CommentParentIdField = (props: Buildable<object>) => {
  const { setValue } = useFormContext();
  const { hash } = useParams();
  const { address } = useDHConnect();


  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {

    if (!hash) {
      return;
    }

    setErrorText(null);
    setValue(
      props.id,
      hash
    );
  }, [hash]);

  if (!errorText) {
    return null;
  }

  return <ParMd style={{ color: "red" }}>{errorText}</ParMd>;
};
