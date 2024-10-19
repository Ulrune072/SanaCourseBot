web: gunicorn mybotproject.wsgi --log-file -
worker: python telegrambot/bot.py
release: npm install && npm run build && python manage.py collectstatic --noinput
