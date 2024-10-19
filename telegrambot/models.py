from django.contrib.auth.models import User
from django.db import models

# Модель профиля пользователя
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar_url = models.URLField(blank=True, null=True)
    completed_courses = models.ManyToManyField('Course', related_name='completed_by', blank=True)
    token_count = models.IntegerField(default=0)
    level = models.IntegerField(default=0)

    def __str__(self):
        return f"User {self.user.username} - Tokens: {self.token_count}"

# Модель курса
class Course(models.Model):
    title = models.CharField(max_length=100)
    theory = models.TextField()
    is_active = models.BooleanField(default=True)  # Флаг активности курса

    def __str__(self):
        return self.title

# Модель вопроса
class Question(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='questions')
    question_text = models.CharField(max_length=255)

    def __str__(self):
        return self.question_text

# Модель ответа
class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    answer_text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    class Meta:
        indexes = [
            models.Index(fields=['question', 'is_correct']),  # Индексы для ускорения поиска правильных ответов
        ]

    def __str__(self):
        return self.answer_text
