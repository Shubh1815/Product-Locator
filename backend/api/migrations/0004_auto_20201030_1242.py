# Generated by Django 3.1.2 on 2020-10-30 07:12

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20201027_1333'),
    ]

    operations = [
        migrations.AlterField(
            model_name='transaction',
            name='location_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='products', to='api.arena'),
        ),
    ]
