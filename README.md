# 学习足迹

一个专为 iPad Safari 优化的中文学习记录网页。无需注册，所有学习记录都保存在当前 iPad 的浏览器中。

## 用 iPad 在线试用

本项目已经包含 GitHub Pages 自动部署配置。部署完成后，只需在 iPad Safari 中打开网站地址，不需要电脑、终端或本地服务器。

### 项目维护者需要做的操作

以下操作都可以在 iPad Safari 中完成：

1. 将本次更改合并到 GitHub 仓库。
2. 在仓库页面打开 **Settings（设置）→ Pages**。
3. 在 **Build and deployment** 下，将 **Source** 设为 **GitHub Actions**。如果已经是该选项，则不用修改。
4. 打开仓库的 **Actions** 页面，等待名为 **Deploy study tracker to GitHub Pages** 的任务显示绿色对勾。
5. 回到 **Settings → Pages**，点击 **Visit site**。这里显示的才是你的真实网站地址。

如果在 iPad 上看不到 **Settings**，请确认登录的账号拥有该仓库的管理员权限；也可以在 Safari 地址栏左侧的页面菜单中选择“请求桌面网站”。

> 不要尝试打开 `/workspace/ai-learning`、`localhost` 或 `127.0.0.1`：它们是开发环境内部路径或地址，不是 iPad 可访问的网站。

### 费用与公开范围

- 公共 GitHub 仓库通常可以免费使用 GitHub Pages；私有仓库的 Pages 可用性取决于账号套餐。
- 使用公共仓库发布时，本网页的 HTML、CSS 和 JavaScript 源代码会公开。
- 你填写的科目、内容和时长**不会上传到 GitHub**，只会保存在当前 iPad Safari 的 `localStorage` 中。
- 清除 Safari 网站数据、使用无痕浏览、更换设备或更换网站地址，都可能导致原有记录无法继续读取。

## 日常使用

1. 用 Safari 打开 **Settings → Pages** 中提供的网站地址。
2. 填写学习科目、学习内容和分钟数，点击“添加学习记录”。
3. 刷新网页，记录仍会保留；点击记录上的“删除”可以移除记录。
4. 如需更方便地进入，可点击 Safari 的“分享”按钮，再选择“添加到主屏幕”。

## 功能

- 记录学习科目、学习内容和学习时长
- 自动统计累计学习时长
- 删除不再需要的记录
- 使用浏览器 `localStorage` 本地保存，刷新后仍保留
- 通过 GitHub Actions 自动发布到 GitHub Pages

## 开发检查（仅供维护者）

项目不依赖第三方运行时库。自动化测试可使用 `npm test` 运行。
