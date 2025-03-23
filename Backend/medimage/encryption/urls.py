from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('encrypt/', views.encrypt_image, name='encrypt_image'),
    path('encrypt-latent-vector/', views.encrypt_latent_vector, name='encrypt_latent_vector'), 
    path('decrypt-latent-vector/', views.decrypt_latent_vector, name='decrypt_latent_vector'),  
    path('reconstruct-image/', views.reconstruct_image, name='reconstruct_image'),
    ]
