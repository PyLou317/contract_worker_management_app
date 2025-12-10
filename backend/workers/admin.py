from django.contrib import admin
from workers.models import ContractWorker, Skill, WorkerSkill

# Register your models here.
class WorkerSkillInline(admin.TabularInline):
    model = WorkerSkill
    extra = 1
    
    
@admin.register(ContractWorker)
class ContractWorkerAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'current_contract', 'agency', 'email', 'position')
    list_display_links = ('first_name', 'last_name')
    search_fields = ('first_name', 'last_name', 'email', 'phone_number', 'current_contract__name', 'agency__name', 'position')
    list_filter = ('agency', 'position')
    ordering = ('last_name', 'first_name')
    readonly_fields = ('id',)
    inlines = [WorkerSkillInline]

    
@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('skill_name', 'abreviation', 'base_color',)
    list_display_links = ('skill_name',)
    search_fields = ('skill_name', 'abreviation')
    

@admin.register(WorkerSkill)
class WorkerSkillAdmin(admin.ModelAdmin):
    list_display = ('worker', 'level', 'skill', 'certification_date', 'expiration_date', 'is_active')
    list_display_links = ('worker', 'skill')
    search_fields = ('worker__first_name', 'worker__last_name', 'skill__skill_name')
    list_filter = ('is_active', 'level')
    ordering = ('worker', 'skill')
    readonly_fields = ('id',)

