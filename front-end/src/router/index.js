import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "index",
    component: () => import("../views/index.vue"),
  },
  //   {
  //     path: "/movies",
  //     name: "movies",
  //     component: () => import("../components/movies/movies.vue"),
  //   },
  //   {
  //     path: "/learning",
  //     name: "learning",
  //     component: () => import("../components/learning/learning.vue"),
  //   },
  //   {
  //     path: "/life",
  //     name: "life",
  //     component: () => import("../components/life/life.vue"),
  //   },
  //   {
  //     path: "/readingThoughts",
  //     name: "readingThoughts",
  //     component: () =>
  //       import("../components/readingThoughts/readingThoughts.vue"),
  //   },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
