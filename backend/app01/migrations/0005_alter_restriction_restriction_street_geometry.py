# Generated by Django 5.0.6 on 2024-07-21 17:44

import django.contrib.gis.db.models.fields
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app01', '0004_restriction'),
    ]

    operations = [
        migrations.AlterField(
            model_name='restriction',
            name='restriction_street_geometry',
            field=django.contrib.gis.db.models.fields.GeometryField(srid=4326),
        ),
    ]