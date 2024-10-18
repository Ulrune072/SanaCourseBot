from django.db import models

# Create your models here.
class UserProfile(models.Model):
    user_id = models.CharField(max_length=50, unique=True)
    avatar_url = models.URLField()
    completed_courses = models.ManyToManyField('Course', related_name='completed_by')
    token_count = models.IntegerField(default=0)
    level = models.IntegerField(default=0)

    def __str__(self):
        return f"User {self.user_id} - Tokens: {self.token_count}"