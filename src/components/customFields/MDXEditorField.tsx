import { useEffect, useRef, useState } from 'react';
import {
    Buildable,

    Field,

} from '@daohaus/ui';
import { useFormContext } from 'react-hook-form';

import { MDXEditor, headingsPlugin, UndoRedo, BoldItalicUnderlineToggles, 
    toolbarPlugin, BlockTypeSelect, quotePlugin, listsPlugin, ListsToggle, MDXEditorMethods } from '@mdxeditor/editor'
import '@mdxeditor/editor/style.css'
import styled from 'styled-components';

const MarkDownContainer = styled.div`
  padding: 10px;
  margin-bottom: 5rem;
  border-radius: 5px;
  background-color: hsl(228, 43.3%, 17.5%); // TODO: use theme
  font-family: inherit;
  height: 50vh;
`;

export const MDXEditorField = (props: Buildable<Field>) => {
    const { setValue, watch } = useFormContext();
    const [content, createdAt] = watch([props.id, "createdAt"]);
    const ref = useRef<MDXEditorMethods>(null)

    const handleOnChange = (value: string) => {
        setValue(props.id, value);
    }

    useEffect(() => {
        const drafts = localStorage.getItem("drafts") || "{}" as string;
        const parsedDrafts = JSON.parse(drafts);

        if (parsedDrafts[createdAt]) {
            ref.current?.setMarkdown(parsedDrafts[createdAt]?.content || "")
            setValue(props.id, parsedDrafts[createdAt]?.content);

        }

      }, [createdAt, ref]);

    return (
        <MarkDownContainer>
            <MDXEditor ref={ref} className="dark-theme dark-editor" markdown={""} plugins={[listsPlugin(), quotePlugin(), headingsPlugin(), toolbarPlugin({
                toolbarContents: () => (
                    <>
                        {' '}
                        <UndoRedo />
                        <BoldItalicUnderlineToggles />
                        <ListsToggle />
                        {' '}
                        <BlockTypeSelect />
                    </>
                )
            })]} onChange={handleOnChange} />
        </MarkDownContainer>
    );
};