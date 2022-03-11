# bddjango

> 打包drf+simpleui环境下的常用开发工具, 简化开发流程

## 安装  

```
pip install bddjango
```

## 快速开始
- [`QuickStart.md`](QuickStart.md)
- [`docs/QuickStart.md`](docs/QuickStart.md)
- [`about.md`](about.md)

## 功能

### View类

> 短短几行代码就能实现以下所有功能  

- 列表页和详情页通用`BaseListView`
    - 过滤
    - 排序
    - 分页
    - 详情页
    - 权限控制

- 高级检索`AdvancedSearchView`

- 自动生成`wiki`文档


### Admin类

> 主要基于`simple-ui`进行二次开发

- 修复了部分BUG
    - `change_list`页面部分数据显示错误
    - 数据导入导出界面优化
    - `actions`按钮强制运行
    - `django-guardian`按钮不美观问题
- 实现首页美化、打开新标签页、iframe窗口等基本功能



## 备注

- [bddjango的Git首页](https://gitee.com/bode135/bddjango)
