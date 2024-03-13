import { Buildable, Button, ParMd } from "@daohaus/ui";
import { useDHConnect } from "@daohaus/connect";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { hashMessage } from 'viem';


export const SaveAsDraftField = (props: Buildable<object>) => {
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
        const drafts = localStorage.getItem("drafts") || "{}" as string;
        const parsedDrafts = JSON.parse(drafts);
        if (parsedDrafts[createdAt]) {
            console.log("setting values")
            setValue("title", parsedDrafts[createdAt]?.title);
            setValue("link", parsedDrafts[createdAt]?.link);
        }

      }, [createdAt]);



    const saveDraft = () => {
        const drafts = localStorage.getItem("drafts") || "{}" as string;
        const parsedDrafts = JSON.parse(drafts);

        parsedDrafts[createdAt] = {
            title,
            content,
            link,
        };
        const newDrafts = {
            ...parsedDrafts
        };

        localStorage.setItem("drafts", JSON.stringify(newDrafts));
        setErrorText("Draft saved");
    }


    return (<>
        <ParMd style={{ color: "red" }}>{errorText}</ParMd>
        <Button size="sm" variant="link" color="secondary" onClick={saveDraft}>Save As Local Draft</Button>
    </>);
};
