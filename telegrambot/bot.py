import logging
import os
import asyncio
from aiogram import Bot, Dispatcher, types
from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup
from dotenv import load_dotenv
from aiogram.filters import Command

# Загружаем токен бота из .env
load_dotenv()
API_TOKEN = os.getenv("API_TOKEN")

# Настроим логирование
logging.basicConfig(level=logging.INFO)

# Инициализируем бота и диспетчер
bot = Bot(token=API_TOKEN)
dp = Dispatcher()


# Обработчик команды /start
@dp.message(Command("start"))
async def send_welcome(message: types.Message):
    # Приветственное сообщение
    welcome_text = (
        "👋 Привет! Добро пожаловать в наш бот обучения.\n"
        "Здесь вы сможете получить доступ к мини-приложению для обучения.\n"
        "Выберите нужное действие с помощью кнопок ниже:"
    )

    # Создаем инлайн-кнопки
    keyboard = InlineKeyboardMarkup(inline_keyboard=[
        [
            InlineKeyboardButton(text="Открыть мини-приложение",
                                 web_app=types.WebAppInfo(url="https://your-domain.com")),
        ],
        [
            InlineKeyboardButton(text="Получить информацию о курсах", callback_data="info_courses"),
        ],
        [
            InlineKeyboardButton(text="Связаться с администратором", callback_data="contact_admin"),
        ]
    ])

    await message.answer(welcome_text, reply_markup=keyboard)


# Обработчик данных из мини-приложения
@dp.message(lambda message: message.web_app_data)
async def handle_web_app_data(message: types.Message):
    data = message.web_app_data.data
    await message.answer(f"Вы отправили данные из мини-приложения: {data}")


# Обработчик нажатия на инлайн-кнопки
@dp.callback_query()
async def handle_callback(query: types.CallbackQuery):
    if query.data == "info_courses":
        await query.answer("Курсы будут доступны с понедельника!")
    elif query.data == "contact_admin":
        await query.answer("Вы можете написать администратору на @admin_username.")


async def main():
    # Регистрация диспетчера с ботом
    await dp.start_polling(bot)


if __name__ == '__main__':
    asyncio.run(main())
