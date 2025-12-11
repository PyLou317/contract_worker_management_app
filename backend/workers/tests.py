from django.test import TestCase
from .models import *
from .serializers import *

# Create your tests here.
class WorkerModelTest(TestCase):
    def setUp(self):
        self.worker = ContractWorker.objects.create(
            first_name="Lucas",
            last_name="Pat",
            email="lpat@test.com",
            phone_number="1234567890",
            current_contract=WarehouseBusiness.objects.create(name="Test Warehouse Business"),
            agency=StaffingAgency.objects.create(name="Test Agency"),
            position="Warehouse Associate"
        )

    def test_partial_update_serializer(self):
        partial_data = {
            "skills": [
                {
                    "skill": "Test Skill",
                    "level": 1,
                    "certification_date": "2023-01-01",
                    "expiration_date": "2023-12-31"
                }
            ]
        }
        serializer = ContractWorkerSerializer(self.worker, data=partial_data, partial=True)
        self.assertTrue(serializer.is_valid())
        serializer.save()


    