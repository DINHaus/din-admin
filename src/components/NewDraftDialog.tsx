
import {
    Button, Dialog, DialogContent, DialogTrigger, ParMd, ParSm,

} from "@daohaus/ui";
import { SUMMONER_URL } from "../utils/constants";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCurrentDao } from "@daohaus/moloch-v3-hooks";



const DialogContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;




export const NewDraftDialog = () => {
    const navigate = useNavigate();
    const { daoChain, daoId } = useCurrentDao();

    const handleNewLocalDraft = () => {
        navigate(`/molochv3/${daoChain}/${daoId}/edit/${Math.floor(Date.now() / 1000)}`);
    };


    return (
        <Dialog>
            <DialogTrigger asChild>
                <a><Button size="sm" variant="link" color="primary">Create Content</Button></a>
            </DialogTrigger>
            <DialogContent
                title="New Draft or Submit Draft"
                rightButton={{
                    onClick: handleNewLocalDraft, // link to SUMMONER_URL
                    disabled: false,
                    children: "New Local Draft",
                }}
            >
                <DialogContentWrapper>
                    <ParSm>You can start a new local draft, work on it and when ready publish on chain</ParSm>
                </DialogContentWrapper>
            </DialogContent>
        </Dialog>
    );
};
