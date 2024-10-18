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


class Course(models.Model):
    title = models.CharField(max_length=100)
    theory = models.TextField()

    def  __str__(self):
        return self.title

class Question(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='questions')
    question_text = models.CharField(max_length=255)

    def __str__(self):
        return self.question_text

class Answer(models.Model):
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    answer_text = models.CharField(max_length=255)
    is_correct = models.BooleanField(default=False)

    def __str__(self):
        self.answer_text