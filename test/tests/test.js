import { ClientFunction, Selector } from "testcafe";
fixture`Getting Started`.page`http://localhost:3000`;

const loadApp2 = ClientFunction(() =>
  window.MfMaestro.emit(
    "users:change",
    "http://localhost:3000/assets/manifest.json",
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
    .eql("microApp1@home1");
  await t
    .expect(
      Selector("[data-app-ref='micro-app-3@mac3'] [data-id='title']").innerText
    )
    .eql("microApp3@mac3");
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

test("mutate event and once event", async t => {
  await t.click(Selector("[data-app-ref='micro-app-1@home1'] [data-id='b3']"));
  await t
    .expect(
      Selector("[data-app-ref='micro-app-3@mac3'] [data-id='console']")
        .innerText
    )
    .eql("ma3:onceEvent received");
});
