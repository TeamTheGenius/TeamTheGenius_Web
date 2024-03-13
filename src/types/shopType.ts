export type shopListType = {
  itemId: number;
  name: string;
  cost: number;
  count: number;
  equipStatus?: string;
};
export type passListType = {
  itemId: number;
  name: string;
  cost: number;
  count: number;
};
export type shopFrameSliceType = {
  frameData: shopListType[] | undefined;
  buyItem: (itemId: number) => void;
  mountFrameHandle: () => void;
};
export type shopFrameType = {
  item: shopListType;
  buyItem: (itemId: number) => void;
  mountFrameHandle: () => void;
};
