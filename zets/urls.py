from django.urls import path
from .views import *

app_name = 'main'

urlpatterns = [
    path('', home, name='home'),
    path('sign-up/', register, name='register'),
    path('login/', login_request, name='login'),
    path('logout/', logout_request, name='logout'),
    path('activate/<uidb64>/<token>/', activate_account, name='activate'),
    path('social-signup/', social_register, name='social_register'),
    path('social-login/', social_login, name='social_login')
]
