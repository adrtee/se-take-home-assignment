import {
  botIDLatest,
  bots,
  BotStatus,
  orderCompleted,
  orderIDLatest,
  orderPending,
  OrderType,
} from "./data";

export function addNormalOrder() {
  const order = {
    id: orderIDLatest.id,
    orderType: OrderType.NORMAL,
    processor: null,
  };
  orderPending.push(order);
  orderIDLatest.id += 1;

  // look for bot to process
  processOrders();
}

export function addVIPOrder() {
  const order = {
    id: orderIDLatest.id,
    orderType: OrderType.VIP,
    processor: null,
  };
  // insert between last VIP and first normal
  let insertIndex = 0;
  for (let i = 0; i < orderPending.length; i++) {
    if (orderPending[i].orderType === OrderType.VIP) {
      insertIndex = i + 1;
    } else break;
  }
  orderPending.splice(insertIndex, 0, order);
  orderIDLatest.id += 1;

  // look for bot to process
  processOrders();
}

export function decreaseBot() {
  const bot = bots.pop();
  if (!bot) {
    return;
  }

  // stop processing order: find idle bot to take over, else move it to pending
  if (bot.status === BotStatus.BUSY) {
    const processingOrder = orderPending.find(
      (order) => order.processor === bot.id
    );
    if (processingOrder) {
      processingOrder.processor = null;
    }
  }
}

export function increaseBot() {
  const bot = { id: botIDLatest.id, status: BotStatus.IDLE };
  bots.push(bot);
  botIDLatest.id += 1;

  // look for order to process
  processOrders();
}

export function processOrders() {
  const bot = bots.find((o) => o.status === BotStatus.IDLE);
  const order = orderPending.find((o) => o.processor === null);
  if (bot && order) {
    bot.status = BotStatus.BUSY;
    order.processor = bot.id; // indicate processing

    // cooking done after 10 seconds
    setTimeout(() => {
      const index = orderPending.findIndex((o) => o.id === order.id);

      // if the index is found and the processor is still the original bot, move order from pending to complete
      if (index !== -1 && orderPending[index].processor === bot.id) {
        const [completedOrder] = orderPending.splice(index, 1);
        orderCompleted.push(completedOrder);
      }

      bot.status = BotStatus.IDLE;
      processOrders();
    }, 10000);
  }
}
