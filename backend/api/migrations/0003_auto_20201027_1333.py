# Generated by Django 3.1.2 on 2020-10-27 08:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_auto_20201026_1411'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='transaction',
            unique_together={('location_id', 'row', 'col')},
        ),
    ]