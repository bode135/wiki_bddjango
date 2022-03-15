# models.py
from django.db import models


class AuthorInfo(models.Model):
    author = models.TextField(blank=True, null=True, verbose_name='姓名', db_column='姓名')
    author_code = models.TextField(blank=True, null=True, verbose_name='作者新代码', db_column='作者新代码', unique=True)

    institution = models.TextField(blank=True, null=True, verbose_name='标准一级机构', db_column='标准一级机构')

    province = models.TextField(blank=True, null=True, verbose_name='省', db_column='省')
    city = models.TextField(blank=True, null=True, verbose_name='市', db_column='市')
    current_title = models.TextField(blank=True, null=True, verbose_name='职称', db_column='职称')
    num_of_thesis = models.IntegerField(blank=True, null=True, default=0, verbose_name='成果量', db_column='成果量')

    class Meta:
        verbose_name_plural = verbose_name = "学者信息表"
        ordering = ('-num_of_thesis', 'author_code')



# admin.py
from bddjango.adminclass import BaseAdmin
from . import models
from django.contrib import admin


@admin.register(models.AuthorInfo)
class AuthorInfo(BaseAdmin, BulkDeleteMixin):
    pass




# views.py
from bddjango import BaseListView
from bddjango import CompleteModelView
from bddjango.MultipleConditionSearch import AdvancedSearchView


class AuthorInfo(BaseListView):
    queryset = models.AuthorInfo
    filter_fields = ['__all__']
    auto_generate_serializer_class = True

# urls.py
from django.urls import re_path

urlpatterns = [
    re_path(r'^AuthorInfo($|/$|/(?P<pk>\w+)/$)', cache_page(CACHE_TIME)(views.AuthorInfo.as_view())),
]


# 32298
print('11231321')


{
    "目的": "检索[province]为[湖南 or 湖北], 且[num_of_thesis]大于等于[10]的作者, 并按[num_of_thesis]倒序排序",
    "page_size": 10,
    "p": 1,
    "order_type_ls": ["-num_of_thesis"],
    "Q_add_ls": [
        {
            "add_logic": "and",
            "Q_ls": [
                {
                    "add_logic": "and",
                    "search_field": "province",
                    "search_keywords": "湖南",
                    "accuracy": "1"
                },
                {
                    "add_logic": "or",
                    "search_field": "province",
                    "search_keywords": "湖北",
                    "accuracy": "1"
                }
            ]
        },
        {
            "add_logic": "and",
            "Q_ls": [
                {
                    "add_logic": "and",
                    "search_field": "num_of_thesis",
                    "search_keywords": "10",
                    "accuracy": "gte"
                }
            ]
        }
    ]
}

