from django.http import JsonResponse
from django.shortcuts import render
from aiogram import Bot, Dispatcher, types
import asyncio
import os

# Для Telegram вебхуков
async def process_update(update):
    bot = Bot(token=os.getenv("API_TOKEN"))
    dp = Dispatcher()
    await dp.process_update(update)

def webhook(request):
    if request.method == "POST":
        update = types.Update(**request.json())
        asyncio.run(process_update(update))
        return JsonResponse({"status": "ok"})
    return JsonResponse({"status": "invalid request"})

# Для рендеринга мини-приложения
def index(request):
    return render(request, 'index.html')
