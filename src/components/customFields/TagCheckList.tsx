import { useFormContext } from 'react-hook-form';

import {
    Buildable,
    Field,
    WrappedCheckbox,
} from '@daohaus/ui';


import { CheckboxProps, CheckedState } from '@radix-ui/react-checkbox';
import styled from 'styled-components';
import { RegisterOptions } from 'react-hook-form';

// This set a form value to an array of tag names
export const TagCheckList = (props: Buildable<Field>) => {
    const { id } = props;
    const { setValue } = useFormContext();

    const newRules: RegisterOptions = {
        ...props.rules,
        setValueAs: (val) => val.split(', '),
      };

    const tags: CheckboxProps[] = [
        {
            defaultChecked: false,
            disabled: false,
            id: 'childCheckboxId1',
            name: 'checkbox1',
            required: false,
            title: 'Checkbox 1',

          },
          {
            defaultChecked: false,
            disabled: false,
            id: 'childCheckboxId2',
            name: 'checkbox2',
            required: false,
            title: 'Checkbox 2',
          },
          {
            defaultChecked: false,
            disabled: false,
            id: 'childCheckboxId3',
            name: 'checkbox3',
            required: false,
            title: 'Checkbox 3',
          }

    ];


    return (
        <>

            <WrappedCheckbox
                {...props}
                id={id}
                checkboxes={tags}
                // rules={}
            />


        </>
    );
};