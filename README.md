# sydopia-site

Sydopia 网站的静态镜像版本，保留原站的页面结构与静态资源。

## 新增：可复用交互组件

已将首页的两组视觉交互提取到 [components/](./components/)：

- [Project Marquee](./components/README.md#createprojectmarqueetarget-options) — 横向循环作品展示、图片 Hover 切换、方向与速度调整。
- [Paper Testimonials](./components/README.md#createpapertestimonialstarget-options) — 彩色纸张评价堆叠、点击换牌、可拖动贴纸。

**演示页：** [Sydopia UI 组件实验室](https://weepwood.github.io/sydopia-site/components/)

**接入方式：** 复制 `components/sydopia-ui.js` 和 `components/sydopia-ui.css` 到任意前端项目，按照 [组件文档](./components/README.md) 调用即可，无需 Webflow、jQuery 或打包工具。另有 TypeScript 类型声明。

原始页面位于仓库根目录，组件实验区不会替换原页面。素材、品牌及设计许可请参照组件文档中的版权说明。
