import { useDHConnect } from "@daohaus/connect";

import { FormBuilder } from "@daohaus/form-builder";
// import { useLocation } from "react-router-dom";

import { SingleColumnLayout } from "@daohaus/ui";
import { APP_FORM } from "../legos/forms";
import { AppFieldLookup } from "../legos/legoConfig";
import { useParams } from "react-router-dom";

export const SubmitForm = () => {
  const { daoChain, daoId, relatedRecord } = useParams();

  const { publicClient, address } = useDHConnect();
  

  return (
    <SingleColumnLayout>

      <FormBuilder form={APP_FORM.NEW_POST} customFields={AppFieldLookup} />

      
    </SingleColumnLayout>
  );
};
