import React, { useEffect, useState } from 'react';

import { useCurrentDao, useDaoData } from '@daohaus/moloch-v3-hooks';
import { useShamanNFT } from '../hooks/useShamanNFT';
import { Card, ParSm, SingleColumnLayout } from '@daohaus/ui';
import { ListDaosQueryResDaos, MolochV3Dao, listDaos, listRecords } from '@daohaus/moloch-v3-data';
import { GRAPH_API_KEYS, ValidNetwork } from '@daohaus/keychain-utils';
import { useDinDAOs } from '../hooks/useDinDaos';
import { useRecords } from '../hooks/useRecords';
import { DEFAULT_NETWORK_ID, NFT_DAO_REFERRER } from '../utils/constants';
import { handleErrorMessage } from '@daohaus/utils';
import { ArticleListItem } from './ArticleListItem';


export const RandomSubTopic = ({daoChain}: {daoChain: ValidNetwork}) => {
    const [rec1, setRec1] = useState<any>();
    const [daos, setDaos] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let shouldUpdate = true;
        const getDaos = async (daoChain: ValidNetwork) => {
          setLoading(true);
          try {
            const query = await listDaos({
              networkId: daoChain,
              filter: {
                referrer: NFT_DAO_REFERRER,
              },
              graphApiKeys: {
                "0x1": process.env["NX_GRAPH_API_KEY_MAINNET"],
                "0x64": process.env["NX_GRAPH_API_KEY_MAINNET"],
              },
            });
            if (query.items && shouldUpdate) {
              setDaos(query.items);
              setLoading(false);
            }
          } catch (error) {
            const errMsg = handleErrorMessage({
              error,
              fallback: "Error loading DAOs",
            });
            console.error(errMsg);
          } finally {
            setLoading(false);
          }
        };
        // if (!daoChain) return;
        getDaos(daoChain || DEFAULT_NETWORK_ID);
        return () => {
          shouldUpdate = false;
        };
      }, [daoChain]);

    useEffect(() => {
        if (!daos) return;
        console.log("dao length", daos.length)
        if (daos.length < 1) return;
        const random1 = Math.floor(Math.random() * (daos?.length || 0));

        const getRecords1 = async () => {
            const res = await listRecords({
                networkId: daoChain,
                graphApiKeys: GRAPH_API_KEYS,
                filter: { dao: daos[random1].id, table: "DIN"},


              });
            setRec1(res.items[ Math.floor(Math.random() * (res.items?.length || 0))]);
            setLoading(false);
        }

        getRecords1();

    },[daos])

    if (!rec1 || loading ) {
        return <div>Loading...</div>;
    }

    return (
        <SingleColumnLayout>
            <ParSm>Random Sub Topic Article Highlight</ParSm>
            <ArticleListItem parsedContent={rec1.parsedContent} />

        </SingleColumnLayout>
    )
}

