function getValueByKeyIncludingId(obj) {
  for (let key in obj) {
    if (key.toLowerCase().includes("id")) {
      return obj[key];
    }
  }
  return null; // If no key including "id" is found
}

// Example usage:
const data = {
  _id: "65e15cb07628745bacc07367",
  name: "test",
  author: "teradasda",
  currentAvailability: false,
  createdAt: "2024-03-01T04:42:24.264Z",
  updatedAt: "2024-03-11T19:17:41.209Z",
};

const idValue = getValueByKeyIncludingId(data);
console.log(idValue); // Output: "65e15cb07628745bacc07367"
