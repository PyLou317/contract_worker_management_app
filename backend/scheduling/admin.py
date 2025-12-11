from django.contrib import admin
from scheduling.models import Schedule, Shift, Area, Manager

admin.site.register(Schedule)
admin.site.register(Shift)
admin.site.register(Area)

class ManagerAdmin(admin.ModelAdmin):
    fields = ('id', 'name', 'area','organization', 'email') 
    readonly_fields = ('id',) 
    
admin.site.register(Manager)