# bddjango

> 打包drf+simpleui环境下的常用开发工具, 简化开发流程

## 安装  

```
pip install bddjango
```

## 快速开始



> 这里开发一个基本的api接口作为示例



- [`QuickStart.md`](QuickStart.md)



## 功能

### View类

> 短短几行代码就能实现以下所有功能  

- 列表页和详情页通用`BaseListView`
    - 过滤
    - 排序
    - 分页
    - 详情页
    
- 高级检索`AdvancedSearchView`




### Admin类

> 主要基于`simple-ui`进行二次开发

- 修复了部分BUG
    - `change_list`页面部分数据显示错误
    - 数据导入导出界面优化
    - `actions`按钮强制运行
    - `django-guardian`按钮不美观问题
- 实现首页美化、打开新标签页、iframe窗口等基本功能



### 自动生成Wiki

> 需注意代码风格

- 用于简化文档撰写流程



## 仓库地址

- [bddjango的Git首页](https://gitee.com/bode135/bddjango)
