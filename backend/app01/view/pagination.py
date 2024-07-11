from rest_framework.pagination import PageNumberPagination

class Pagination(PageNumberPagination):
    page_query_param = 'page' # which page you want

    page_size_query_param = 'size' # how many rows of data you want in a page

    page_size = 5
    max_page_size = 100

