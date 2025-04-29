import * as readline from "readline";

import { bots, orderPending, orderCompleted } from "./data";

import {
  addNormalOrder,
  addVIPOrder,
  decreaseBot,
  increaseBot,
} from "./functions";

const cliInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function display() {
  console.clear();

  console.log("--- McDonald's Order Controller ---");
  console.log("\nPENDING:");
  if (orderPending.length === 0) console.log("  None");
  else {
    orderPending.forEach((order) => {
      console.log(
        `  Order #${order.id} - ${order.orderType}${
          order.processor !== null
            ? `, processing by Bot ${order.processor}`
            : ""
        }`
      );
    });
  }

  console.log("\nCOMPLETE:");
  if (orderCompleted.length === 0) console.log("  None");
  else {
    orderCompleted.forEach((order) => {
      console.log(
        `  Order #${order.id} - ${order.orderType}, processed by Bot ${order.processor}`
      );
    });
  }

  console.log("\nBOTS:");
  if (bots.length === 0) console.log("  None");
  else {
    bots.forEach((bot) => {
      console.log(`  Bot #${bot.id} - ${bot.status}`);
    });
  }

  console.log("\n-------------------------------------------");
  console.log("Commands: normal | vip | +bot | -bot");
  console.log("Please key in the command:");
}

cliInterface.on("line", (input) => {
  switch (input.trim()) {
    case "normal":
      addNormalOrder();
      break;
    case "vip":
      addVIPOrder();
      break;
    case "+bot":
      increaseBot();
      break;
    case "-bot":
      decreaseBot();
      break;
    default:
      break;
  }
});

setInterval(display, 500);
