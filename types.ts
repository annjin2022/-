
export interface OrnamentData {
  position: [number, number, number];
  color: string;
  size: number;
  emissive?: boolean;
}

export interface WishResponse {
  message: string;
  ornamentDescription: string;
  giftIdea: string;
}
