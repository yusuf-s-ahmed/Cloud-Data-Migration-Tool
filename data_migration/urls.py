"""
URL configuration for data_migration project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from api.views import getData, migrate_data

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('api.urls')),
    path('getdata/', getData, name='get_data'),  # Add this line for the getData endpoint
    path('migrate/', migrate_data, name='migrate_data'),  # Ensure the migrate_data route is also defined
]
