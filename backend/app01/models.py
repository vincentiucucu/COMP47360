from django.contrib.gis.db import models
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager

# manager for custom user model Business
class BusinessManager(BaseUserManager):
    
    def create_user(self, business_email, business_name, password=None):
        if not business_email:
            raise ValueError("An email must be provided.")
        if not business_name:
            raise ValueError("A business name must be provided.")
        
        business = self.model(
            business_email = self.normalize_email(business_email),
            business_name = business_name
        )
        business.set_password(password)
        business.save()

        return business


    def create_superuser(self, business_email, business_name, password=None):
        business = self.create_user(
            business_email = self.normalize_email(business_email),
            business_name = business_name,
            password=password
        )

        business.is_superuser = True
        business.is_admin = True
        business.is_staff = True
        business.save()

        return business

# custom user model replacing base User model
class Business(AbstractBaseUser):
    business_id = models.AutoField(primary_key=True)
    business_name = models.CharField(unique=True,max_length=32)
    password = models.CharField(max_length=128)
    business_email = models.CharField(unique=True, max_length=254)
    created_at = models.DateTimeField(blank=True, null=True, auto_now_add=True)
    modified_at = models.DateTimeField(blank=True, null=True)
    last_login = models.DateTimeField(auto_now=True) 
    is_admin = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = "business_email"
    REQUIRED_FIELDS = ["business_name"]
    objects = BusinessManager()

    class Meta:
        db_table = 'businesses'


class BusinessUnit(models.Model):
    unit_id = models.AutoField(primary_key=True)
    business = models.ForeignKey('Business', on_delete=models.CASCADE)
    unit_name = models.CharField(max_length=32)
    permit_id = models.CharField(unique=True,max_length=16)
    permit_expiry_date = models.DateField()
    unit_type = models.CharField(max_length=16)
    created_at = models.DateTimeField(blank=True, null=True,auto_now_add=True)

    class Meta:
        db_table = 'business_units'


class Vendor(models.Model):
    vendor_id = models.AutoField(primary_key=True)
    business = models.ForeignKey('Business', on_delete=models.CASCADE)
    vendor_name = models.CharField(max_length=32)
    licence_id = models.CharField(unique=True,max_length=32)
    licence_expiry_date = models.DateField()
    vendor_email = models.CharField(unique=True, max_length=254)
    vendor_phone_number = models.CharField(unique=True, max_length=50, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True,auto_now_add=True)

    class Meta:
        db_table = 'vendors'


class Service(models.Model):
    service_id = models.AutoField(primary_key=True)
    business = models.ForeignKey('Business', on_delete=models.CASCADE)
    unit = models.ForeignKey('BusinessUnit', on_delete=models.CASCADE)
    service_date = models.DateField()
    service_start_time = models.TimeField()
    service_end_time = models.TimeField()
    location_coords = models.PointField()
    location_address = models.CharField(max_length=128)
    revenue = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    created_at = models.DateTimeField(blank=True, null=True,auto_now_add=True)

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


class ZonedStreet(models.Model):
    zoned_street_id = models.AutoField(primary_key=True)
    street_address = models.CharField()
    street_geometry = models.MultiLineStringField()
    street_centroid = models.PointField()
    zone_id = models.IntegerField()
    zone_name = models.CharField()
    zone_geometry = models.MultiPolygonField()

    class Meta:
        db_table = 'zoned_streets'


class Restriction(models.Model):
    restriction_id = models.CharField(primary_key=True) # mapped to UNIQID in source data
    restriction_street = models.CharField()
    restriction_fstreet = models.CharField()
    restriction_tstreet = models.CharField()
    restriction_street_geometry = models.MultiLineStringField()
    restriction_weekday = models.CharField()
    restriction_ftime = models.TimeField()
    restriction_ttime = models.TimeField()

    class Meta:
        db_table = 'restrictions'


class BusynessScore(models.Model):
    score = models.FloatField()
    zone = models.IntegerField()
    hour = models.DateTimeField()
    centroid = models.PointField()
    zone_busyness_id = models.AutoField(primary_key=True)

    class Meta:
        db_table = 'busyness_score'

class StreetBusynessScore(models.Model):
    zoned_street_centroid = models.PointField()
    hour = models.DateTimeField()
    sum_score_div_distance_squared = models.FloatField()
    zone_id = models.IntegerField()
    id = models.AutoField(primary_key=True)

    class Meta:
        db_table = 'street_busyness_score_precalc'


class Event(models.Model):
    event_name = models.CharField(blank=True, null=True)
    start = models.DateTimeField()
    end = models.DateTimeField()
    location = models.PointField(srid=4326)
    event_id = models.IntegerField(primary_key=True)

    class Meta:
        db_table = 'events'