
import {
    Button, Dialog, DialogContent, DialogTrigger, ParMd, ParSm,

} from "@daohaus/ui";
import { SUMMONER_URL } from "../utils/constants";
import styled from "styled-components";


const DialogContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

const handleNewCuratedTopic = () => {
    window.open(SUMMONER_URL, "_blank");
};

const handleNewPersonalTopic = () => {
    window.open(SUMMONER_URL, "_blank"); // special endpoint for personal topics
};


export const NewTopicDialog = () => {


    return (
        <Dialog>
            <DialogTrigger asChild>
                <a><Button>New Topic</Button></a>
            </DialogTrigger>
            <DialogContent
                title="New Topic"
                rightButton={{
                    onClick: handleNewCuratedTopic, // link to SUMMONER_URL
                    disabled: false,
                    children: "New Currated Topic",
                }}
                leftButton={{
                    onClick: handleNewPersonalTopic, // link to SUMMONER_URL
                    disabled: false,
                    children: "New Personal Topic",
                }}
            >
                <DialogContentWrapper>

                    <ParMd>Start a New Topic</ParMd>
                    <ParSm>You can start a new curated topic, this topic is owned and curated 
                        by the content creators and is ment to be a warehouse of highly curated 
                        content on specific topics</ParSm>
                    <ParSm>Alternativly you can create a person topic, this is a place for your thoughts, 
                        sub topics can be shared with other top level curated topics</ParSm>
                </DialogContentWrapper>
            </DialogContent>
        </Dialog>
    );
};
