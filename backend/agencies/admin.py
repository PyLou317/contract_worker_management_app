from django.contrib import admin
from agencies.models import StaffingAgency


@admin.register(StaffingAgency)
class StaffingAgencyAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "organization")
    list_display_links = ("name",)
    search_fields = ("name", "organization__name")
    list_filter = ("organization",)
    ordering = ("name",)
    readonly_fields = ("id",)