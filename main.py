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