const friends = [
  { name: 'kim1', age: 10 },
  { name: 'kim2', age: 12 },
  { name: 'kim3', age: 13 },
  { name: 'kim4', age: 14 },
  { name: 'kim5', age: 15 },
  { name: 'kim6', age: 16 },
];
const timelines = [
  { desc: 'desc1', likes: 10 },
  { desc: 'desc2', likes: 20 },
  { desc: 'desc3', likes: 30 },
  { desc: 'desc4', likes: 40 },
  { desc: 'desc5', likes: 50 },
  { desc: 'desc6', likes: 60 },
];
function makeDataGenerator(items) {
  let itemIndex = 0;
  return function getNextData() {
    const item = items[itemIndex % items.length];
    itemIndex += 1;
    return { ...item, id: itemIndex };
  }
}

export const getNextFriend = makeDataGenerator(friends);
export const getNextTimeline = makeDataGenerator(timelines);