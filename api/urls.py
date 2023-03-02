from django.urls import path
from . import views

urlpatterns = [
    path('', views.apiOverview, name='apiOverview'),
    path('detail-view/<str:pk>/', views.detailView, name='detail-view'),
    path('user-list/', views.userList, name='user-list'),
    path('create-user/', views.createView, name='create-user'),
    path('update-user/<str:pk>/', views.updateView, name='update-user'),
    path('delete-user/<str:pk>/', views.deleteView, name='delete-user'),
]