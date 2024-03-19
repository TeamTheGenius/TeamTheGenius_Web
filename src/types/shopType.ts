export type shopFrameListType = {
  itemId: number;
  name: string;
  cost: number;
  count: number;
  imgSrc?: any;
  itemCategory?: string;
  equipStatus?: string;
};
export type shopPassListDataType = {
  imgSrc: string;
  itemId: number;
  name: string;
  cost: number;
  count: number;
  itemCategory?: string;
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
  buyItem: (itemId: shopFrameListType | undefined) => void;
  mountFrameHandle: (itemId: number | undefined) => void;
};
export type shopFrameType = {
  item: shopFrameListType;
  buyItem: (itemId: shopFrameListType | undefined) => void;
  mountFrameHandle: (itemId: number | undefined) => void;
};
