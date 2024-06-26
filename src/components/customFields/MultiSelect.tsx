import { useEffect, useRef, useState } from "react";
import { Buildable, Field } from "@daohaus/ui";
import { useFormContext } from "react-hook-form";
import Select from "react-select";

import styled from "styled-components";

const MultiSelectContainer = styled.div``;

export const MultiSelect = (props: Buildable<Field>) => {
  const { setValue, watch } = useFormContext();
  const [content, createdAt] = watch([props.id, "createdAt"]);

  const options = [
    { value: "document", label: "Document" },
    { value: "event", label: "Event" },
    { value: "publication", label: "Publication" },
    { value: "proposal", label: "Proposal" },
    { value: "RFC", label: "Request For Comment" },
    { value: "special", label: "Special" },
  ];

  const [selectedOption, setSelectedOption] = useState();

  function handleChange(selectedOption: any) {
    const selectedValues = selectedOption.map((option: any) => option.value);
    setValue(props.id, selectedValues);
    setSelectedOption(selectedOption);
  }

  useEffect(() => {
    const drafts = localStorage.getItem("drafts") || ("{}" as string);
    const parsedDrafts = JSON.parse(drafts);

    if (parsedDrafts[createdAt]) {
      if (!parsedDrafts[createdAt].tags) {
        return;
      }

      const tags = parsedDrafts[createdAt]?.tags.map((tag: string) => {
        return {
          value: tag,
          label: tag[0].toUpperCase() + tag.substring(1).toLowerCase(),
        };
      });
      setSelectedOption(tags || []);
      setValue(props.id, tags || []);
    }
  }, [createdAt]);

  return (
    <MultiSelectContainer>
      <Select
        options={options}
        value={selectedOption}
        onChange={handleChange}
        placeholder="Select categories..."
        isMulti
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            background: "hsl(138, 48%, 12%)", // TODO: use theme,
          }),
          menuList: (base) => ({
            ...base,
            background: "hsl(138, 48%, 12%)",
          }),
          option: (styles, { isFocused, isSelected }) => ({
            ...styles,
            background: isFocused
              ? "hsl(226, 70.0%, 55.5%)"
              : isSelected
              ? "hsla(291, 64%, 42%, 1)"
              : undefined,
          }),
          multiValueRemove: (styles) => ({
            ...styles,
            backgroundColor: "hsl(226, 70.0%, 55.5%)",
          }),
        }}
      />
    </MultiSelectContainer>
  );
};
