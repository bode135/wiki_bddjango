# QuickStart

## 安装
```
pip install bddjango
```

## 建立模型

> 建立一个作者基本信息表作为案例


```python
# models.py
from django.db import models


class AuthorInfo(models.Model):
    author = models.TextField(blank=True, null=True, verbose_name='作者姓名')
    province = models.TextField(blank=True, null=True, verbose_name='省')
    current_title = models.TextField(blank=True, null=True, verbose_name='职称')
    num_of_thesis = models.IntegerField(blank=True, null=True, default=0, verbose_name='成果量')

    class Meta:
        verbose_name_plural = verbose_name = "作者信息表"
        ordering = ('-num_of_thesis', 'id')

```



## 数据管理



> 在`admin.py`中建立一个数据管理类, 然后创建或者右上角导入几个示例数据即可



```python
# admin.py
from bddjango.adminclass import BaseAdmin
from django.contrib import admin
from . import models


@admin.register(models.AuthorInfo)
class AuthorInfo(BaseAdmin):
    pass

```

- 数据导入导出按钮

    ![image-20220311173500702](https://tuchuang-bode135.oss-cn-beijing.aliyuncs.com/img/image-20220311173500702.png)



## View编写



```python
# views.py
from bddjango import BaseListView
from bddjango import CompleteModelView
from bddjango.MultipleConditionSearch import AdvancedSearchView


class AuthorInfo(BaseListView):
    queryset = models.AuthorInfo
    filter_fields = ['__all__']
    auto_generate_serializer_class = True

```





## 路由设置



```python
# urls.py
from django.urls import re_path

urlpatterns = [
    re_path(r'^AuthorInfo($|/$|/(?P<pk>\w+)/$)', cache_page(CACHE_TIME)(views.AuthorInfo.as_view())),
]
```

