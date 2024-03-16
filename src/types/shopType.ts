export type shopFrameListType = {
  itemId: number;
  name: string;
  cost: number;
  count: number;
  imgSrc?: any;
  equipStatus?: string;
};
export type shopPassListData = {
  imgSrc: string;
  itemId: number;
  name: string;
  cost: number;
  count: number;
  equipStatus?: string | undefined;
};
export type passListType = {
  itemId: number;
  name: string;
  cost: number;
  count: number;
};
export type shopFrameSliceType = {
  frameDataState: shopFrameListType[] | undefined;
  frameData: shopFrameListType[] | undefined;
  buyItem: (itemId: number | undefined) => void;
  mountFrameHandle: (itemId: number | undefined) => void;
};
export type shopFrameType = {
  item: shopFrameListType;
  buyItem: (itemId: number | undefined) => void;
  mountFrameHandle: (itemId: number | undefined) => void;
};
