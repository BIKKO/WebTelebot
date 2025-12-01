from flask import Flask, render_template, request, jsonify
import os
from dotenv import load_dotenv, set_key
import ControlTgBot


app = Flask(__name__)

load_dotenv()

bot_status_bt = 'Start'
bot_status = "Статус: 🔴"

@app.route('/')
def index():
    keybord = ControlTgBot.get_keybord()
    if keybord == '':
        keybord = '<div class="row" data-row="0"></div>'
    return render_template('index.html',
                           bot_status=bot_status,
                           bot_status_bt=bot_status_bt,
                           keybord_but=keybord,
                           )


@app.route('/fun_com', methods=['GET'])
def fun_com():
    data = ControlTgBot.get_fun_com()
    return jsonify(data)


@app.route('/save_token', methods=['POST'])
def save_token():
    data = request.get_json()
    token = data.get('token')
    set_key('.env', 'TOKEN', token)

    load_dotenv()
    return jsonify({'status': 'success'})


@app.route('/bot_status_bt')
def bot_status_bt():
    global bot_status_bt, bot_status
    if bot_status_bt == 'Start':
        bot_status_bt = 'Stop'
        bot_status = "Статус: 🟢"
        ControlTgBot.start()
        set_key('.env', "RUN", 'True')
    else:
        bot_status_bt = 'Start'
        bot_status = "Статус: 🔴"
        ControlTgBot.stop()
        set_key('.env', "RUN", 'False')

    return jsonify({'status': 'success'})


@app.route('/bot_restart_bt')
def bot_restart_bt():
    ControlTgBot.restart()

    return jsonify({'status': 'success'})


@app.route('/save_kbord', methods=['POST'])
def save_kbord():
    data = request.get_json()
    keybord_body = data.get('body')

    ControlTgBot.add_or_replace_keybord(keybord_body)

    return jsonify({'status': 'success'})


@app.route('/save_page_comand', methods=['POST'])
def save_page_comand():
    data = request.get_json()
    func_body = data.get('body')

    ControlTgBot.set_fun_com(str(func_body).replace(',', ',\n').replace('\'', '\"').lower())
    #print(str(func_body).replace('[','').replace(']',''))

    return jsonify({'status': 'success'})


def main(**kwargs):
    if not os.path.exists('bot/TG_Bot.py'):
        os.makedirs('bot', exist_ok=True)
        with open('bot/TG_Bot.py', 'w', encoding='utf-8') as f:
            f.write('''# coding: utf-8
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
    main()''')

    run = os.getenv("RUN") == 'True'
    ControlTgBot.generate_code_with_json()
    if run:
        global bot_status_bt, bot_status
        bot_status_bt = 'Start'
        bot_status = "Статус: 🔴"
        ControlTgBot.start()

    if len(kwargs) > 0:
        app.run(debug=kwargs['debug'])


if __name__ == '__main__':
    main(debug=True)
