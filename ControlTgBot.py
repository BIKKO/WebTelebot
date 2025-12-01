from dotenv import load_dotenv, set_key
import json
import sys
import os
import signal
import subprocess
import re

load_dotenv()


def generate_methods_from_json():
    """Генерирует код методов бота из JSON конфигурации"""
    try:
        with open('bot/fun_com.json', 'r', encoding='utf-8') as file:
            data = json.load(file)

        print(f"📋 Загружено {len(data)} функций из JSON")

        # Читаем базовый шаблон бота
        with open('bot/TG_Bot.py', 'r', encoding='utf-8') as file:
            template = file.read()

        # Генерируем код методов
        methods_code = generate_methods_code(data)
        print(f"📝 Сгенерировано {len(methods_code)} символов кода методов")

        # Вставляем методы в шаблон
        final_code = insert_methods_into_template(template, methods_code, data)

        # Записываем результат
        with open('bot/TG_Bot.py', 'w', encoding='utf-8') as file:
            file.write(final_code)

        print("✅ Код бота успешно сгенерирован")
        return True

    except Exception as e:
        print(f"❌ Ошибка генерации кода: {e}")
        return False


def generate_methods_code(data: list) -> str:
    """Генерирует код методов на основе JSON"""
    methods_code = "\n    # Generated methods from JSON\n"

    for page in data:
        name = page['title']
        # Исключаем start, он уже есть в шаблоне
        if name.lower() != "start":
            method_code = create_method_code(page)
            methods_code += method_code + "\n"

    return methods_code


def create_method_code(page: dict) -> str:
    """Создает код одного метода (кроме start)"""
    name = page['title']
    method_name = name.replace(" ", "_")
    settings = page['settings']

    code = f'    def {method_name}(self, message):\n'
    code += f'        """Обработчик для {name}"""\n'

    # Получаем данные в зависимости от типа редактора
    if settings['editor_type'] == 'simple':
        simple_data = settings['simple_editor']
        chat_id = simple_data.get("chat_id", "")
        topic_id = simple_data.get("topic_id", "")
        message_text = simple_data.get("message_text", "")

        # Экранируем переносы строк
        if message_text:
            message_text = message_text.replace('\n', '\\n')

        # Логика отправки сообщения
        if chat_id:
            code += f'        chat_id = {chat_id}\n'
            if topic_id:
                code += f'        topic_id = {topic_id}\n'
                code += '        self.bot.forward_message(chat_id, message.from_user.id, message.message_id, message_thread_id=topic_id)\n'
            else:
                code += '        self.bot.forward_message(chat_id, message.from_user.id, message.message_id)\n'
        elif message_text:
            code += f'        self.bot.send_message(message.chat.id, "{message_text}")\n'
        else:
            code += '        self.bot.send_message(message.chat.id, "Команда выполнена")\n'

    elif settings['editor_type'] == 'code':
        python_code = settings['code_editor'].get("code", "")
        if python_code:
            code += f'        # Пользовательский код\n'
            code += f'        try:\n'
            # Добавляем отступ для кода
            lines = python_code.split('\n')
            for line in lines:
                code += f'            {line}\n'
            code += f'        except Exception as e:\n'
            code += f'            self.bot.send_message(message.chat.id, f"Ошибка: {{e}}")\n'
        else:
            code += '        self.bot.send_message(message.chat.id, "Код не настроен")\n'

    # Добавляем клавиатуру если нужно
    if settings.get("add_keyboard", False):
        keyboard_data = settings.get("keyboard_data", [])
        code += create_keyboard_code(keyboard_data)

    return code


def create_keyboard_code(keyboard: list) -> str:
    """Создает код для клавиатуры"""
    if not keyboard:
        return ""

    code = '\n        # Клавиатура\n'

    # Находим максимальную ширину строки
    max_width = 0
    for row in keyboard:
        if isinstance(row, list):
            max_width = max(max_width, len(row))

    code += f'        kb = types.InlineKeyboardMarkup(row_width={max_width})\n'

    # Собираем все кнопки
    buttons = []
    for item in keyboard:
        if isinstance(item, list):
            buttons.extend(item)
        else:
            buttons.append(item)

    # Добавляем кнопки
    for button in buttons:
        code += f'        kb.add(types.InlineKeyboardButton(text="{button}", callback_data="{button}"))\n'

    code += '        self.bot.send_message(message.chat.id, "Выберите опцию:", reply_markup=kb)\n'
    return code


def update_start_method_in_template(template: str, start_page: dict) -> str:
    """Обновляет метод start в основном шаблоне"""
    settings = start_page['settings']

    # Создаем новый код для метода start
    new_start_code = 'def start(self, message):\n'
    new_start_code += '        """Обработчик команды /start"""\n'

    if settings['editor_type'] == 'simple':
        simple_data = settings['simple_editor']
        message_text = simple_data.get("message_text", "")

        # Экранируем переносы строк
        if message_text:
            message_text = message_text.replace('\n', '\\n')
            new_start_code += f'        self.bot.send_message(message.chat.id, "{message_text}",reply_markup=self.markup)\n'
        else:
            new_start_code += '        self.bot.send_message(message.chat.id, "Бот запущен!", reply_markup=self.markup)\n'

    elif settings['editor_type'] == 'code':
        python_code = settings['code_editor'].get("code", "")
        if python_code:
            new_start_code += f'        # Пользовательский код\n'
            new_start_code += f'        try:\n'
            lines = python_code.split('\n')
            for line in lines:
                new_start_code += f'            {line}\n'
            new_start_code += f'        except Exception as e:\n'
            new_start_code += f'            self.bot.send_message(message.chat.id, f"Ошибка: {{e}}",reply_markup=self.markup)\n'
        else:
            new_start_code += '        self.bot.send_message(message.chat.id, "Бот запущен!",reply_markup=self.markup)\n'

    # Добавляем клавиатуру если нужно
    if settings.get("add_keyboard", False):
        keyboard_data = settings.get("keyboard_data", [])
        new_start_code += create_keyboard_code(keyboard_data)

    # Находим существующий метод start в шаблоне
    start_pos = template.find('def start(self, message):')
    if start_pos == -1:
        print("⚠️ Метод start не найден в шаблоне")
        return template

    # Находим конец метода start
    end_pos = template.find('\n    def ', start_pos + 1)
    if end_pos == -1:
        end_pos = template.find('\n    # ', start_pos + 1)
    if end_pos == -1:
        end_pos = len(template)

    # Заменяем метод
    return template[:start_pos] + new_start_code + template[end_pos:]


def generate_handlers_dict(data: list) -> str:
    """Генерирует словарь обработчиков команд"""
    handlers = ['    "start": self.start']  # Всегда добавляем start

    for page in data:
        name = page['title']
        method_name = name.replace(" ", "_")

        # Исключаем start из общего списка, так как он уже добавлен
        if name.lower() != "start":
            handlers.append(f'    "{name}": self.{method_name}')

    return 'command_handlers = {\n' + ',\n'.join(handlers) + '\n}'


def update_handlers_dict(template: str, new_handlers: str) -> str:
    """Обновляет словарь обработчиков в шаблоне"""
    # Ищем словарь command_handlers
    start_pos = template.find('command_handlers = {')
    if start_pos == -1:
        print("⚠️ Словарь command_handlers не найден в шаблоне")
        return template

    end_pos = template.find('\n}', start_pos) + 2

    # Заменяем весь словарь
    return template[:start_pos] + new_handlers + template[end_pos:]


def insert_methods_into_template(template: str, methods_code: str, data: list) -> str:
    """Вставляет сгенерированные методы в шаблон бота"""

    # Сначала обновляем метод start в основном шаблоне, если он есть в данных
    start_page = None
    for page in data:
        if page['title'].lower() == "start":
            start_page = page
            break

    if start_page:
        template = update_start_method_in_template(template, start_page)

    # Обновляем command_handlers
    handlers_dict = generate_handlers_dict(data)
    template = update_handlers_dict(template, handlers_dict)

    # Вставляем остальные методы в блок # methods_start - # methods_end
    start_marker = '# methods_start'
    end_marker = '# methods_end'

    start_pos = template.find(start_marker)
    end_pos = template.find(end_marker)

    if start_pos != -1 and end_pos != -1:
        start_pos += len(start_marker)
        # Полностью заменяем содержимое блока
        new_template = template[:start_pos] + '\n' + methods_code + '    ' + template[end_pos:]
        return new_template

    return template


def get_fun_com():
    """Получает конфигурацию функций"""
    try:
        with open('bot/fun_com.json', 'r', encoding='utf-8') as file:
            return json.load(file)
    except Exception as e:
        print(f"Ошибка чтения конфигурации: {e}")
        return []


def set_fun_com(json_data):
    """Устанавливает новую конфигурацию"""
    try:
        # Если пришли данные как строка
        if isinstance(json_data, str):
            # Экранируем переводы строк внутри строковых значений
            json_data = escape_newlines_in_json(json_data)

        # Парсим JSON
        if isinstance(json_data, str):
            data = json.loads(json_data)
        else:
            data = json_data

        # Сохраняем
        with open('bot/fun_com.json', 'w', encoding='utf-8') as file:
            json.dump(data, file, ensure_ascii=False, indent=2)

        print("✅ Конфигурация сохранена")

        # Генерируем код
        success = generate_methods_from_json()
        if success:
            print("✅ Код бота обновлен")
        return success

    except json.JSONDecodeError as e:
        print(f"❌ Ошибка парсинга JSON: {e}")
        return False
    except Exception as e:
        print(f"❌ Ошибка сохранения конфигурации: {e}")
        return False


def escape_newlines_in_json(json_str):
    """Экранирует переводы строк внутри строковых значений JSON"""
    result = []
    in_string = False
    escaped = False

    i = 0
    while i < len(json_str):
        char = json_str[i]

        if char == '"' and not escaped:
            in_string = not in_string
            result.append(char)
        elif char == '\\':
            escaped = not escaped
            result.append(char)
        elif char == '\n' and in_string:
            # Экранируем перевод строки внутри строки
            result.append('\\n')
            escaped = False
        elif char == '\r' and in_string:
            # Игнорируем \r внутри строк
            escaped = False
        else:
            result.append(char)
            escaped = False

        i += 1

    return ''.join(result)


def get_keybord():
    """Получает текущую клавиатуру (для обратной совместимости)"""
    try:
        with open('bot/TG_Bot.py', 'r', encoding='utf-8') as file:
            content = file.read()

        start = content.find('# keybord_start')
        end = content.find('# reybord_end')

        if start != -1 and end != -1:
            start += len('# keybord_start')
            keyboard_content = content[start:end].strip()

            rows = {}

            # Разбиваем по строкам
            for line in keyboard_content.split('\n'):
                # Ищем номер ряда
                row_match = re.search(r'self.row(\d+)', line)
                if not row_match:
                    continue

                row_num = row_match.group(1)
                # Ищем кнопки в этой строке
                buttons = re.findall(r'KeyboardButton\("([^"]+)"\)', line)
                if buttons:
                    if row_num not in rows:
                        rows[row_num] = []
                    rows[row_num].extend(buttons)

            # Если нет рядов, создаем один
            if not rows:
                buttons = re.findall(r'KeyboardButton\("([^"]+)"\)', keyboard_content)
                if buttons:
                    rows['0'] = buttons

            # Генерируем HTML
            result = []
            for row_num in sorted(rows.keys(), key=int):
                buttons_html = ''.join(
                    f'<div class="button" draggable="true" data-from-palette="false">{btn}</div>'
                    for btn in rows[row_num]
                )
                result.append(f'<div class="row" data-row="{row_num}">{buttons_html}</div>')

            return '\n'.join(result)

        return ""
    except Exception as e:
        print(f"Ошибка получения клавиатуры: {e}")
        return ""


def get_keyboard():
    """Алиас для get_keybord с правильным названием"""
    return get_keybord()


def add_or_replace_keybord(body: str):
    """Добавляет или заменяет клавиатуру"""
    try:
        with open('bot/TG_Bot.py', 'r', encoding='utf-8') as file:
            content = file.read()

        start = content.find('# keybord_start')
        end = content.find('# reybord_end')

        if start != -1 and end != -1:
            start += len('# keybord_start')
            new_content = content[:start] + '\n' + body + '\n    ' + content[end:]
            with open('bot/TG_Bot.py', 'w', encoding='utf-8') as file:
                file.write(new_content)
            print("Клавиатура обновлена")
            return True
        else:
            print("Маркеры клавиатуры не найдены")
            return False
    except Exception as e:
        print(f"Ошибка обновления клавиатуры: {e}")
        return False


def start_bot():
    """Запускает бота"""
    token = os.getenv('TOKEN')
    if not token:
        print("Ошибка: TOKEN не найден")
        return False

    try:
        process = subprocess.Popen([
            sys.executable,
            'bot/TG_Bot.py',
            '--token', token
        ])

        # Сохраняем PID
        set_key('.env', 'PID', str(process.pid))
        print(f'Бот запущен с PID: {process.pid}')
        return True

    except Exception as e:
        print(f'Ошибка запуска: {e}')
        return False


def stop_bot():
    """Останавливает бота"""
    load_dotenv(override=True)
    try:
        pid = os.getenv("PID")
        if pid:
            print(f'Попытка остановить процесс с PID: {pid}')

            # Для Windows используем taskkill
            if os.name == 'nt':  # Windows
                try:
                    # Пытаемся завершить процесс "мягко"
                    subprocess.run(['taskkill', '/PID', str(pid), '/F', '/T'],
                                   capture_output=True, timeout=5)
                    print('Процесс завершен через taskkill')
                except subprocess.TimeoutExpired:
                    print('Таймаут при завершении процесса')
                except Exception as e:
                    print(f'Ошибка taskkill: {e}')

                    # Пробуем альтернативный способ
                    try:
                        os.kill(int(pid), signal.CTRL_C_EVENT)
                    except AttributeError:
                        # Для Python < 3.8
                        os.kill(int(pid), signal.SIGTERM)

            else:  # Linux/Mac
                try:
                    os.kill(int(pid), signal.SIGTERM)
                    print('Сигнал SIGTERM отправлен')
                except ProcessLookupError:
                    print('Процесс не найден')

            # Даем время процессу завершиться
            import time
            time.sleep(2)

            # Проверяем, жив ли процесс
            try:
                os.kill(int(pid), 0)  # Проверка существования процесса
                print('Процесс все еще жив, пытаемся завершить принудительно...')
                if os.name == 'nt':
                    subprocess.run(['taskkill', '/PID', str(pid), '/F', '/T'],
                                   capture_output=True)
                else:
                    os.kill(int(pid), signal.SIGKILL)
            except (ProcessLookupError, OSError):
                print('Процесс успешно завершен')

            print('Бот остановлен')
            return True

        else:
            print('Бот не запущен (PID не найден)')
            return False

    except ProcessLookupError:
        print('Процесс не найден')
        return False

    except Exception as e:
        print(f'Ошибка остановки: {e}')
        return False


def restart_bot():
    """Перезапускает бота"""
    print('=' * 10 + ' Перезапуск бота ' + '=' * 10)
    if stop_bot():
        start_bot()


# Функции для обратной совместимости
def generate_code_with_json():
    return generate_methods_from_json()


def start():
    return start_bot()


def stop():
    return stop_bot()


def restart():
    return restart_bot()