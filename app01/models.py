
# Create your models here.

from django.db import models
# python manage.py makemigrations
# python manage.py migrate
# back_end_env\Scripts\activate

# Create your models here.
# class Account(models.Model):
#     first_name = models.CharField(max_length=16)
#     last_name = models.CharField(max_length=16)
#     truck_name = models.CharField(max_length=16)
#     password = models.CharField(max_length=64)
#     food_type = models.CharField(max_length=32)
#     license = models.IntegerField(verbose_name="license number")
#
#     def __str__(self):
#         return self.truck_name
#
# class BusinessUnit(models.Model):
#     unit_id = models.CharField(max_length=10)
#     name = models.CharField(max_length=100)
#
# class Vendor(models.Model):
#     vendor_id = models.CharField(max_length=10)
#     name = models.CharField(max_length=100)
#
# class BusinessData(models.Model):
#     date = models.DateField()
#     time = models.TimeField()
#     unit = models.ForeignKey(BusinessUnit, on_delete=models.CASCADE)
#     vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE)
#     address = models.CharField(max_length=200)
#     revenue = models.DecimalField(max_digits=10, decimal_places=2)