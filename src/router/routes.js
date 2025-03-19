const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("src/pages/WordsTypingPage.vue") },
      { path: "words", component: () => import("src/pages/WordsTypingPage.vue") },
      { path: "text", component: () => import("src/pages/TextTypingPage.vue") }
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
