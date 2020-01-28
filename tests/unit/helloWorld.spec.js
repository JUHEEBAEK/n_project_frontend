import Vue from "vue";
import HelloWorld from "@/components/HelloWorld.vue";

test("HelloWorld Component", () => {
  const cmp = new Vue(HelloWorld).$mount();
  console.log(cmp);
  expect(cmp.message).toBe("Vue!");
});
