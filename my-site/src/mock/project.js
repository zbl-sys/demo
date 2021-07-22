import Mock from "mockjs";

Mock.mock('/api/project', "get", {
  code: 0,
  msg: "",
  "data|5-15": [
    {
      id: "@uuid",
      name: "@ctitle(1, 10)",
      "url": "https://github.com/zbl-sys/demo",
      "github": "https://github.com/zbl-sys/demo",
      "description|1-3": ["@cparagraph(1, 5)"],
      thumb: "@image(300x200, @color, #fff, 'zbl-xiaochen')",
    },
  ],
});
