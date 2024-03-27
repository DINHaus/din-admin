export type BlogPost = {
    daoId: string;
    title: string;
    content: string;
    contentURI: string;
    imageURI: string;
    authorAddress: string;
    author: string; // remove
    contentHash: string;
    parentId: string;
    id: string;
    createdAt: string;
    daoChain?: string;
    tag?: string;
  };