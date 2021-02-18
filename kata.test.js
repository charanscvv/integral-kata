const {createUsers, publishPost, viewTimeline, followUsers, viewTimelineOf, viewWall} = require("./kata")



test('Creating Users', () => {
  expect(createUsers(["Alice","Bob","Charlie"])).toBe(true);
});


test('Alice publishes messages to her personal timeline.', () => {
  expect(publishPost('Alice', "I love the weather today.", 1613599025676)).toBe(true);
  expect(viewTimeline('Alice')).toBe("I love the weather today.");
});


test("Alice views Bob's timeline.", () => {
  expect(followUsers("Alice",["Bob"])).toBe(true);
  expect(publishPost('Bob', "Darn! We lost!", 1613599205676)).toBe(true);
  expect(publishPost('Bob', "Good game though.", 1613599265676)).toBe(true);
  expect(viewTimelineOf("Alice", "Bob")).toBe("Good game though. (1 minute ago)\nDarn! We lost! (2 minutes ago)\n");
});

test("Charlie can follow Alice and Bob, and he views an aggregated list of all timelines.", () => {
  expect(followUsers("Charlie",["Alice","Bob"])).toBe(true);
  expect(publishPost("Charlie","I'm in New York today! Anyone wants to have a coffee?",1613599310676)).toBe(true);
  expect(viewWall("Charlie")).toBe("Charlie - I'm in New York today! Anyone wants to have a coffee? (15 seconds ago)\nBob - Good game though. (1 minute ago)\nBob - Darn! We lost! (2 minutes ago)\nAlice - I love the weather today. (5 minutes ago)\n");
});
