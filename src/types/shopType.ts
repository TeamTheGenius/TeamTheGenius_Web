export type shopFrameListType = {
  itemId: number;
  name: string;
  cost: number;
  count: number;
  imgSrc?: any;
  details?: string;
  itemCategory?: string;
  equipStatus?: string;
};
export type shopTicketListType = {
  imgSrc: string;
  itemId: number;
  name: string;
  cost: number;
  count: number;
  details?: string;
  itemCategory?: string;
  equipStatus?: string | undefined;
};
export type ticketListType = {
  itemId: number;
  name: string;
  cost: number;
  count: number;
};
export type shopFrameSliceType = {
  buyItem: (itemId: shopFrameListType | undefined) => void;
};
export type shopFrameType = {
  item: shopFrameListType;
  buyItem: (itemId: shopFrameListType | undefined) => void;
};
