# Sydopia UI · 可移植组件

将 Sydopia 首页中两种交互独立封装为**无框架依赖**的 JavaScript + CSS 组件，原镜像网页保持不变。

- **Project Marquee**：作品卡片横向无缝滚动、图片悬停切换、暂停、方向和速度设置。
- **Paper Testimonials**：纸张堆叠评价、点击换牌、可拖动贴纸、多色主题。

## 在线演示

部署到 GitHub Pages 后访问：`https://weepwood.github.io/sydopia-site/components/`

演示包含调参控件和可复制的调用示例。GitHub Pages 构建会原样发布 `components/`，无需 npm 或打包。

## 复制到其他项目

只需要复制两个文件：

```text
your-project/
├── components/
│   ├── sydopia-ui.css
│   └── sydopia-ui.js
└── index.html
```

在 HTML 文件中引用：

```html
<link rel="stylesheet" href="./components/sydopia-ui.css">

<div id="portfolio"></div>
<div id="testimonials"></div>

<script type="module">
  import { createProjectMarquee, createPaperTestimonials } from './components/sydopia-ui.js';

  const gallery = createProjectMarquee('#portfolio', {
    items: [
      {
        title: 'My Project',
        image: '/images/project-cover.webp',
        hoverImage: '/images/project-hover.webp',
        href: '/work/my-project',
        linkLabel: 'Case Study',
        tags: ['Branding', 'Web']
      },
      {
        title: 'Second Project',
        image: '/images/project-2.webp',
        href: '/work/second'
      }
    ],
    speed: 48,
    gap: 28,
    cardWidth: 440,
    direction: 'left',
    pauseOnHover: true
  });

  const reviews = createPaperTestimonials('#testimonials', {
    items: [
      { quote: 'An excellent experience.', author: 'Alice', role: 'Studio One' },
      { quote: 'Thoughtful attention to detail.', author: 'Bob', role: 'Studio Two' }
    ],
    colors: ['#f5f3a1', '#ffacc4', '#2fa15b', '#9bc4ff'],
    angles: [-1, -4.87, -6.85, 2.25],
    cardHeight: 500,
    stickerText: 'Rave Reviews',
    duration: 500
  });

  // 按需更新
  gallery.update({ speed: 64, gap: 18 });
  reviews.next();

  // 页面卸载或不再需要时
  // gallery.destroy();
  // reviews.destroy();
</script>
```

图片是调用方提供的，不包含在核心 JS/CSS 中。演示页引用仓库 `../_assets/` 的图片和 SVG；将组件移到其他项目时，请替换图片地址。模块路径使用 ES Modules，打开时需要 HTTP(S) 服务器；不要直接使用 `file://`。

## 配置参数

### createProjectMarquee(target, options)

| 属性 | 默认值 | 用途 |
| --- | --- | --- |
| `items` | `[]` | 项目数据，每项含 `title`、`image`、可选 `hoverImage`、`alt`、`href`、`linkLabel`、`tags` |
| `speed` | `48` | 滚动速度，像素/秒，范围 5~250 |
| `direction` | `left` | `left` 或 `right` |
| `gap` | `32` | 卡片间隙，像素 |
| `cardWidth` | `440` | 卡片宽度，像素（移动端自动限制到 78vw） |
| `aspectRatio` | `16 / 9` | 图片比例，正整数比值 |
| `radius` | `5` | 图片圆角，像素 |
| `hoverLift` | `12` | 悬停时向上偏移量，像素 |
| `pauseOnHover` | `true` | 鼠标悬停或键盘焦点在组件内时暂停 |
| `showTags` | `false` | 是否显示分类标签 |
| `reducedMotion` | `system` | `system`、`always`、`never` |

返回对象支持 `update(partialOptions)` 和 `destroy()`。

### createPaperTestimonials(target, options)

| 属性 | 默认值 | 用途 |
| --- | --- | --- |
| `items` | `[]` | 评价列表，每项可含 `quote`、`author`、`role`、`label` |
| `colors` | 黄、粉、绿、蓝 | 卡片颜色数组，循环使用 |
| `angles` | `[-1, -4.87, -6.85, 2.25]` | 各层旋转角度（度），循环使用 |
| `maxWidth` | `1050` | 最大宽度，像素 |
| `cardHeight` | `500` | 卡片高度，像素，超出内容可在卡片内部滚动 |
| `padding` | `36` | 内间距，像素 |
| `fontSize` | `34` | 评价正文最大字号，像素 |
| `duration` | `500` | 切牌动画时长，毫秒 |
| `label` | `TESTIMONIALS` | 评价卡顶部标签 |
| `stickerText` | `Rave Reviews` | 贴纸文案；留空可隐藏 |
| `stickerSrc` | 空 | 可选贴纸图片地址（优先于文字） |
| `stickerColor` | `#ff4141` | CSS 文字贴纸背景颜色 |
| `draggableSticker` | `true` | 是否允许拖动贴纸 |
| `reducedMotion` | `system` | `system`、`always`、`never` |

返回对象支持 `update(partialOptions)`、`next()` 和 `destroy()`。

当切换完成时，在容器内部触发 `sui:change` 事件，`event.detail` 包含 `index` 与 `item`。

```js
document.querySelector('#testimonials').addEventListener('sui:change', (event) => {
  console.log(event.detail.index, event.detail.item);
});
```

## 在框架中使用

组件接受 DOM 节点或 CSS 选择器。React、Vue 和其他框架都可在组件挂载后调用，并在卸载时调用 `destroy()`。

React 例子：

```jsx
import { useEffect, useRef } from 'react';
import { createProjectMarquee } from './components/sydopia-ui.js';
import './components/sydopia-ui.css';

export function Portfolio({ projects }) {
  const node = useRef(null);
  const instance = useRef(null);
  useEffect(() => {
    instance.current = createProjectMarquee(node.current, { items: projects });
    return () => { instance.current?.destroy(); instance.current = null; };
  }, [projects]);
  return <div ref={node} />;
}
```

## 设计与维护约束

- 组件只使用 `.sui-` 类名前缀，不依赖 Webflow、jQuery、原站全局样式。
- 内容用 `textContent` 插入，URL 仅允许 HTTP(S)（链接额外允许 mailto），不将用户文本拼接为 HTML。
- 遵守 `prefers-reduced-motion`；跑马灯在减少动画时可水平滚动；换牌立即生效。
- 跑马灯循环副本不应再次参与键盘 Tab 顺序或屏幕阅读器阅读。
- 评价卡为原生按钮，支持 Enter / 空格触发换牌。
- `update()` 会重新渲染当前组件；`destroy()` 会取消动画、观察器与事件监听。
- 两个组件的布局和媒体资源均独立于原始网站；请勿把原站的全局 CSS 或脚本一起拷入新项目。

## 版权说明

这是基于仓库中 Sydopia 设计与交互实现的组件抽离和改造。原网页内容、图片、插画、贴纸、字体及品牌仍可能受原权利人保护。当前仓库未提供可据此推断所有素材可再授权的明确许可，**请在商业复用或再分发时自行确认原始资产及设计的许可**。通用组件不默认携带这些素材。
