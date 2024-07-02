from django.db import models

class Business(models.Model):
    business_id = models.AutoField(primary_key=True)
    business_name = models.CharField(unique=True)
    password_hash = models.CharField(max_length=64)
    business_email = models.CharField(unique=True, max_length=254)
    created_at = models.DateTimeField(blank=True, null=True)
    modified_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'businesses'


class BusinessUnit(models.Model):
    unit_id = models.AutoField(primary_key=True)
    business = models.ForeignKey('Business', on_delete=models.CASCADE)
    unit_name = models.CharField()
    permit_id = models.CharField(unique=True)
    permit_expiry_date = models.DateField()
    unit_type = models.CharField()
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'business_units'


class Vendor(models.Model):
    vendor_id = models.AutoField(primary_key=True)
    business = models.ForeignKey('Business', on_delete=models.CASCADE)
    vendor_name = models.CharField()
    licence_id = models.CharField(unique=True)
    licence_expiry_date = models.DateField()
    vendor_email = models.CharField(unique=True, max_length=254)
    vendor_phone_number = models.CharField(unique=True, max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'vendors'


class Service(models.Model):
    service_id = models.AutoField(primary_key=True)
    business = models.ForeignKey('Business', on_delete=models.CASCADE)
    unit = models.ForeignKey('BusinessUnit', on_delete=models.CASCADE)
    service_date = models.DateField()
    service_start_time = models.TimeField()
    service_end_time = models.TimeField()
    location_lat = models.FloatField()
    location_lng = models.FloatField()
    revenue = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'services'


class ServiceVendor(models.Model):
    service_vendor_id = models.AutoField(primary_key=True)
    service = models.ForeignKey('Service', on_delete=models.CASCADE)
    vendor = models.ForeignKey('Vendor', on_delete=models.CASCADE)
    assigned_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'service_vendors'


class Log(models.Model):
    log_id = models.AutoField(primary_key=True)
    business = models.ForeignKey('Business', on_delete=models.CASCADE)
    operation = models.CharField(max_length=50)
    entity = models.CharField(max_length=50)
    entity_id = models.IntegerField()
    description = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'logs'