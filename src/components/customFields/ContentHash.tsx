import { Buildable,  ParMd } from "@daohaus/ui";
import { useDHConnect } from "@daohaus/connect";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { hashMessage } from 'viem';


export const ContentHashField = (props: Buildable<object>) => {
  const { watch, setValue } = useFormContext();
  const { address } = useDHConnect();


  const [title, content, link, createdAt] = watch([
    "title",
    "content",
    "link",
    "createdAt"
  ]);

  const [errorText, setErrorText] = useState<string | null>(null);

  useEffect(() => {

    if (!content) {
      return;
    }

    console.log("vaules", JSON.stringify({ title, content, link, address, createdAt }));

    setErrorText(null);
    setValue(
      props.id,
      hashMessage(JSON.stringify({ title, content, link, address, createdAt }))
    );
  }, [title, content, link, address, createdAt]);

  if (!errorText) {
    return null;
  }

  return <ParMd style={{ color: "red" }}>{errorText}</ParMd>;
};
