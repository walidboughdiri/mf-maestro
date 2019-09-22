import { ClientFunction, Selector } from "testcafe";
fixture`Getting Started`.page`http://localhost:3000`;

const loadApp2 = ClientFunction(() =>
  window.MfMaestro.emit(
    "users:change",
    "http://localhost:3000/assets/manifest2.json",
    "micro-app-2"
  )
);
const loadApp1 = ClientFunction(() =>
  window.MfMaestro.emit(
    "users:change",
    "http://localhost:3000/assets/manifest.json",
    "micro-app-1"
  )
);

test("test components load", async t => {
  await t
    .expect(
      Selector("[data-app-ref='micro-app-1@home1'] [data-id='title']").innerText
    )
    .eql("This is a micro-frontend demo in VanillaJS (microApp1@home1)");
  await t
    .expect(
      Selector("[data-app-ref='micro-app-3@mac3'] [data-id='title']").innerText
    )
    .eql("This is a micro-frontend demo in VanillaJS (microApp3@mac3)");
});

test("test routing", async t => {
  await t.click(Selector("[data-id='about']"));

  await t
    .expect(
      Selector(
        "[data-id='about-page'] [data-id='users-index'] [data-id='no-app']"
      ).exists
    )
    .ok();
});

test("test loading app changing props", async t => {
  await t.click(Selector("[data-id='about']"));
  await loadApp1();
  await t
    .expect(
      Selector("[data-id='about-page'] [data-app-ref='micro-app-1@usersIndex']")
        .exists
    )
    .ok();
  await loadApp2();
  await t
    .expect(
      Selector("[data-id='about-page'] [data-app-ref='micro-app-2@usersIndex']")
        .exists
    )
    .ok();
});

test("mutate event and once/on event", async t => {
  await t.click(Selector("[data-app-ref='micro-app-1@home1'] [data-id='b3']"));
  const consoleNode = Selector(
    "[data-app-ref='micro-app-3@mac3'] [data-id='console']"
  );
  await t.expect(consoleNode.innerText).eql("ma3:onceEvent received");

  await t.expect(consoleNode.getAttribute("once-event")).eql("1");
  await t.expect(consoleNode.getAttribute("events-count")).eql("1");
  await t.click(Selector("[data-app-ref='micro-app-1@home1'] [data-id='b3']"));
  await t.expect(consoleNode.getAttribute("once-event")).eql("1");
  await t.expect(consoleNode.getAttribute("events-count")).eql("2");
});
test("test blocked navigation", async t => {
  await t.click(Selector("[data-id='about']"));
  await loadApp2();
  await t
    .expect(
      Selector("[data-app-ref='micro-app-2@usersIndex'] [data-id='console']")
        .innerText
    )
    .eql('path params : {"id":"12","name":"charlie"}');
  const button = Selector(
    "[data-app-ref='micro-app-2@usersIndex'] [data-id='b1']"
  );
  await t.click(button);
  await t.expect(button.innerText).eql("locked nav > click to unlock");
  await t.click(button);
  await t
    .expect(ClientFunction(() => window.location.href)())
    .eql("http://localhost:3000/?from=about");
});
