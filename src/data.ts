export enum OrderType {
  NORMAL = "NORMAL",
  VIP = "VIP",
}

export enum BotStatus {
  IDLE = "IDLE",
  BUSY = "BUSY",
}

export interface Order {
  id: number;
  orderType: OrderType;
  processor: number | null;
}

export interface Bot {
  id: number;
  status: BotStatus;
}

export var bots: Bot[] = [];
export var botIDLatest = { id: 0 };
export var orderIDLatest = { id: 0 };
export var orderPending: Order[] = [];
export var orderCompleted: Order[] = [];
