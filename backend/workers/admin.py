from django.contrib import admin
from workers.models import ContractWorker

# Register your models here.
@admin.register(ContractWorker)
class ContractWorkerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'current_contract', 'agency', 'position')
    list_display_links = ('first_name', 'last_name')
    search_fields = ('first_name', 'last_name', 'email', 'phone_number', 'current_contract__name', 'agency__name', 'position')
    list_filter = ('agency', 'position')
    ordering = ('last_name', 'first_name')
    readonly_fields = ('id',)

