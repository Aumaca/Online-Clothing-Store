# Generated by Django 4.1.1 on 2022-10-28 01:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('blog', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='last_seen_products',
            field=models.ManyToManyField(default=None, related_name='last_seen_products', to='blog.product'),
        ),
    ]
