import { useState } from 'react';
import {
    Buildable,

    Field,

} from '@daohaus/ui';
import { useFormContext } from 'react-hook-form';

import { MDXEditor, headingsPlugin, UndoRedo, BoldItalicUnderlineToggles, 
    toolbarPlugin, BlockTypeSelect, quotePlugin, listsPlugin, ListsToggle } from '@mdxeditor/editor'
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
    const { setValue } = useFormContext();

    const handleOnChange = (value: string) => {
        setValue(props.id, value);
    }


    return (
        <MarkDownContainer>
            <MDXEditor className="dark-theme dark-editor" markdown="# Hello world" plugins={[listsPlugin(), quotePlugin(), headingsPlugin(), toolbarPlugin({
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