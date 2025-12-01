# coding: utf-8
import telebot
from telebot import types
from dotenv import load_dotenv
import argparse

load_dotenv()



class TelegramBot:
    def __init__(self, token):
        self.markup = types.ReplyKeyboardMarkup()
        self.last_com = ''
        # keybord_start
    # reybord_end
        self.bot = telebot.TeleBot(token)
        self.command_handlers = {}

        self._register_handlers()

    def _register_handlers(self):
        """Регистрирует обработчики"""

        @self.bot.message_handler(commands=['start'])
        def start_handler(message):
            self.start(message)

        @self.bot.message_handler(content_types=['text'])
        def text_handler(message):
            text = message.text.lower()
            if text in self.command_handlers:
                self.last_com = text
                self.command_handlers[text](message)
            else:
                self.bot.send_message(message.chat.id, "Неизвестная команда")

        @self.bot.callback_query_handler(func=lambda call: True)
        def callback_handler(call):
            self.callback_handler(call)

    def start(self, message):
        """Обработчик команды /start"""
        self.bot.send_message(message.chat.id, "Бот работает", reply_markup=self.markup)

    def callback_handler(self, call):
        """Обработчик callback кнопок"""
        text = call.data.lower()
        if text in self.command_handlers:
            self.last_com = text
            self.command_handlers[text](call.message)
        else:
            self.bot.send_message(call.message.chat.id, "Неизвестная команда")

    # methods_start

    # Generated methods from JSON
    

    # methods_end

    def run(self):
        """Запускает бота"""
        try:
            user = self.bot.get_me()
            print(f"Бот @{user.username} запущен")
            self.bot.polling(none_stop=True, interval=5)
        except Exception as e:
            print(f"Ошибка запуска бота: {e}")


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--token', type=str, required=True)
    args = parser.parse_args()
    bot = TelegramBot(args.token)
    bot.run()


if __name__ == "__main__":
    main()