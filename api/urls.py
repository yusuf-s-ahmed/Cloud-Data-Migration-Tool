from django.urls import path
from . import views  # Import your views module

urlpatterns = [ # The main index page
    path('migrate/', views.migrate_data, name='migrate_data'),  # Endpoint for migrate_data
]
