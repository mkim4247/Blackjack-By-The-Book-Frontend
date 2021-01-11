/* CONVENIENCE METHOD FOR COUNTING CARDS, TAKES IN AN ARRAY */
export const getCountFromHand = (cards) => {
  let count = 0;
  cards.forEach((card) => {
    switch (card.value) {
      case "KING":
        count--;
        break;
      case "QUEEN":
        count--;
        break;
      case "JACK":
        count--;
        break;
      case "ACE":
        count--;
        break;
      case "10":
        count--;
        break;
      case "6":
        count++;
        break;
      case "5":
        count++;
        break;
      case "4":
        count++;
        break;
      case "3":
        count++;
        break;
      case "2":
        count++;
        break;
      default:
        break;
    }
  });
  return count;
};

/* CONVENIENCE METHOD FOR ASSIGNING HAND VALUE */
export const assignHandValue = (cards) => {
  let aceCount = 0;
  let handValue = 0;
  let soft = false;

  cards.forEach((card) => {
    switch (card.value) {
      case "KING":
        handValue += 10;
        break;
      case "QUEEN":
        handValue += 10;
        break;
      case "JACK":
        handValue += 10;
        break;
      case "ACE":
        handValue += 11;
        aceCount++;
        soft = true;
        break;
      default:
        handValue += parseInt(card.value);
        break;
    }
  });

  while (handValue > 21 && aceCount > 0) {
    handValue -= 10;
    aceCount--;
  }

  if (aceCount === 0) {
    soft = false;
  }

  return { score: handValue, soft };
};
