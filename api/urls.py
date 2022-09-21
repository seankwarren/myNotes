from django.urls import path
from . import views

urlpatterns = [
    #path('', views.getRoutes, name='routes'),
    path('notes/', views.getNotes, name='notes'),
    # path('notes/create', views.createNote, name='create-note'),
    # path('notes/<str:pk>/update', views.getNote, name='update-note'),
    # path('notes/<str:pk>/delete', views.getNote, name='delete-note'),
    
    path('notes/<str:pk>/', views.getNote, name='note'),
]