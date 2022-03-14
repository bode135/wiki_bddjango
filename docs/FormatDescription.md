# API文档格式说明

- 约定API的一般格式, 便于简化文档、统一API风格.
- 使返回的字段都能用来进行`基本检索`和`高级检索`.



## 请求方式

> 主要为**增删查改类**和**基本查找类**, 前者支持所有增删查改操作, 后者仅支持列表页和详情页查表操作;  
>
> **高级检索类**则用来对数据进行高级检索.



- 请求类型说明

| 类型       | 说明                                                         |
| ---------- | ------------------------------------------------------------ |
| 基本查找类 | 获取列表页和详情页, 其中列表页可用返回的字段进行精确查找     |
| 增删查改类 | 继承了基本查找类, 且支持全部操作(增删查改), 以及批量删除和更新 |
| 高级检索类 | 继承了基本查找类, 且支持POST高级检索                         |
| 其它类     | 单一的GET, POST, 具体使用方法将额外备注                      |



## 请求示例



### 基本查找类

> 主要用来查找数据 , 如`列表页`和`详情页`

```
# --- 查
GET /api/search/BookTable/17985/		                        # 详情页
GET /api/search/BookTable/?p=1&page_size=10&order_type_ls=-id		# 列表页, 按id倒序返回
GET /api/search/BookTable/?title=党史&author_code=20306/		# 列表页, 一般来说, 可用所有返回的字段进行精确查找


# --- 批量查找(根据id_ls)
POST /api/user/Group/
data = {
    "post_type": "bulk_list",        
    "id_ls": [27, 28],
}

```





### 增删改查类



> 继承了基本查找类
>
> 基本使用方法: GET查, POST增, PUT改, DELETE删.  
> 也可以使用`post_type`指定操作类型, 
> 其中`post_type_ls = ["list", "retrieve", "create", "update", "delete", "bulk_delete", "bulk_update", "bulk_list"]`


```
# --- 增
POST /api/search/BookTable/


# --- 改
PUT /api/search/BookTable/17985/


# --- 删
DELETE /api/search/BookTable/17985/


# --- 批量删除/更新
POST /api/user/Group/
data = {
    "post_type": "bulk_update",        # bulk_update或bulk_delete
    "id_ls": [27, 28],

    # 如果是bulk_update, 则需要指定要更新的字段和值
    "field_dc": {
        "more_group__active": 1, 
        "more_group__explain": "asdfdas"
    }
}

```



### 高级检索类



> 使用`Q_add_ls`参数进行高级检索, 最多支持两层检索式嵌套.



```
# 检索`author_code`(学者编码)为`29856`, 且标题`title`中包含关键词`可持续`, 
# 且`文章出版时间`为`(2019-02-10, 2019-04-01]`的文章

{
    "page_size": 3,		# 返回数量
    "distinct_field_ls": ["title"],			# 去重字段
    "order_type_ls": ["title", "id"],		# 排序字段
    "Q_add_ls": [
        {
            "add_logic": "and",
            "Q_ls": [
                {
                    "add_logic": "and",
                    "search_field": "author_code",
                    "search_keywords": "29856",
                    "accuracy": "1"
                },
                {
                    "add_logic": "and",
                    "search_field": "title",
                    "search_keywords": "可持续",
                    "accuracy": "0"
                }
            ]
        },
        {
            "add_logic": "and",
            "Q_ls": [
                {
                    "add_logic": "and",
                    "search_field": "published_date",
                    "search_keywords": "2019-02-10",
                    "accuracy": "gt"
                },
                {
                    "add_logic": "and",
                    "search_field": "published_date",
                    "search_keywords": "2019-04-01",
                    "accuracy": "lte"
                }
            ]
        }
    ]
}
```





## 请求参数说明



- 列表页参数

  > 基本查找类都会携带页面控制参数

  | 类型 | 参数名            | 说明                                                    | 是否必填 |
  | ---- | ----------------- | ------------------------------------------------------- | -------- |
  | int  | p                 | 页码                                                    | 否       |
  | int  | page_size         | 每页数量                                                | 否       |
  | list | order_type_ls     | 排序字段名, 如`-id`为倒序排列, `__None__`则为相关性排序 | 否       |
  | list | distinct_field_ls | 去重字段名, 参考`高级检索类`的请求示例.                 | 否       |

- 详情页

  - 指定主键名, 一般为`id`, 栏目用`code`.

- 批量更新 or 批量删除

| 类型 | 参数名    | 说明                                                         |
| ---- | --------- | ------------------------------------------------------------ |
| str  | post_type | post请求的类型                                               |
| list | id_ls     | id列表                                                       |
| dict | field_dc  | 更新字段的字典, 如`{'active': 1}`, 若为`active`字段为外键则需要加上表名`more_group__active`. |



## 返回参数说明



> 一般的列表信息将存放于`result`中的`data`中



- 携带的基本参数

  | 类型 | 参数名 | 说明                |
  | ---- | ------ | ------------------- |
  | int  | status | 200,201成功;404错误 |
  | int  | msg    | 信息                |
  | dict | result | 返回结果            |

- `result`中的`page_dc`页码信息

  | 类型 | 参数名      | 说明     |
  | ---- | ----------- | -------- |
  | int  | count_items | 总条数   |
  | int  | total_pages | 总页数   |
  | int  | page_size   | 每页条数 |
  | int  | p           | 当前页   |



## 返回示例



```
# 列表页, 注意`status`和`result`可能会有变动, 以实际情况为准.
{
    "status": 200,
    "msg": "ok",
    "result": {
        "page_dc": {
            "count_items": 4507,
            "total_pages": 451,
            "page_size": 10,
            "p": 1
        },
        "data": [
            {
                "id": 17986,
                "title": "唯物论与经验批评论",
                "author_name": "列宁著",
                "publication_date": null
            },
            ...
        ]
	}
}
```



## 备注

- API格式说明文档
- 返回的如果是`SerializerMethodField`类型数据, 一般不能用于作为检索参数