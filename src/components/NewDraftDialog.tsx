
import {
    Button, Dialog, DialogContent, DialogTrigger, ParMd, ParSm,

} from "@daohaus/ui";
import { SUMMONER_URL } from "../utils/constants";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCurrentDao, useDaoMember } from "@daohaus/moloch-v3-hooks";
import { useDHConnect } from "@daohaus/connect";



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
    const { address } = useDHConnect();

    if (!daoId || !daoChain) {
        return null;
    }

    const { member } = useDaoMember({
        daoChain: daoChain,
        daoId: daoId,
        memberAddress: address,
    });

    const handleNewLocalDraft = () => {
        navigate(`/molochv3/${daoChain}/${daoId}/edit/${Math.floor(Date.now() / 1000)}`);
    };

    if(member && Number(member?.shares) == 0) {
        return null;
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <a><Button size="sm" variant="link" color="primary">| Create Content</Button></a>
            </DialogTrigger>
            <DialogContent
                title="New Draft"
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
