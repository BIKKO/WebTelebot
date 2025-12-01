// Функция для переключения секций
function showSection(sectionId, element) {
    // Скрываем все секции
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Убираем активный класс со всех кнопок
    const buttons = document.querySelectorAll('.menu-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Показываем выбранную секцию
    document.getElementById(sectionId).classList.add('active');

    // Активируем нажатую кнопку
    element.classList.add('active');
}

// Функция для переключения темы
function toggleTheme(theme) {
    const body = document.body;
    const sidebar = document.querySelector('.sidebar');
    const contentSections = document.querySelectorAll('.section-content');
    
    // Удаляем предыдущие классы тем
    body.classList.remove('light-theme', 'dark-theme');
    sidebar.classList.remove('light-theme', 'dark-theme');
    
    // Добавляем выбранную тему
    body.classList.add(theme + '-theme');
    sidebar.classList.add(theme + '-theme');
    
    // Обновляем содержимое секций
    contentSections.forEach(section => {
        section.classList.remove('light-theme', 'dark-theme');
        section.classList.add(theme + '-theme');
    });
    
    // Сохраняем тему в localStorage
    localStorage.setItem('theme', theme);
    
    // Обновляем выбранную тему в настройках
    updateThemeSelect(theme);
}

// Функция для обновления выбора темы в настройках
function updateThemeSelect(theme) {
    const themeSelect = document.querySelector('#theme-select');
    if (themeSelect) {
        themeSelect.value = theme;
    }
}

// Функция для переключения языка
function changeLanguage(lang) {
    // Здесь можно добавить логику смены языка
    console.log('Язык изменен на:', lang);
    localStorage.setItem('language', lang);
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Назначаем обработчики для кнопок меню
    const buttons = document.querySelectorAll('.menu-button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId, this);
        });
    });
    
    // Обработчики для настроек темы
    const themeSelect = document.querySelector('#theme-select');
    if (themeSelect) {
        themeSelect.addEventListener('change', function() {
            toggleTheme(this.value);
        });
    }
    
    // Обработчики для настроек языка
    const langSelect = document.querySelector('#lang-select');
    if (langSelect) {
        langSelect.addEventListener('change', function() {
            changeLanguage(this.value);
        });
    }
    
    // Загружаем сохраненную тему
    const savedTheme = localStorage.getItem('theme') || 'light';
    toggleTheme(savedTheme);
    
    // Загружаем сохраненный язык
    const savedLang = localStorage.getItem('language') || 'ru';
    if (langSelect) {
        langSelect.value = savedLang;
    }
    
    // Показываем первую секцию по умолчанию
    showSection('home', document.querySelector('[data-section="home"]'));
});

// Функция для переключения секций
function showSection(sectionId, element) {
    // Скрываем все секции
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Убираем активный класс со всех кнопок
    const buttons = document.querySelectorAll('.menu-button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    // Показываем выбранную секцию
    document.getElementById(sectionId).classList.add('active');

    // Активируем нажатую кнопку
    element.classList.add('active');
}

// Функция для переключения темы
function toggleTheme(theme) {
    const body = document.body;
    const sidebar = document.querySelector('.sidebar');
    const contentSections = document.querySelectorAll('.section-content');
    
    // Удаляем предыдущие классы тем
    body.classList.remove('light-theme', 'dark-theme');
    sidebar.classList.remove('light-theme', 'dark-theme');
    
    // Добавляем выбранную тему
    body.classList.add(theme + '-theme');
    sidebar.classList.add(theme + '-theme');
    
    // Обновляем содержимое секций
    contentSections.forEach(section => {
        section.classList.remove('light-theme', 'dark-theme');
        section.classList.add(theme + '-theme');
    });
    
    // Сохраняем тему в localStorage
    localStorage.setItem('theme', theme);
    
    // Обновляем выбранную тему в настройках
    updateThemeSelect(theme);
}

// Функция для обновления выбора темы в настройках
function updateThemeSelect(theme) {
    const themeSelect = document.querySelector('#theme-select');
    if (themeSelect) {
        themeSelect.value = theme;
    }
}

// Функция для переключения языка
function changeLanguage(lang) {
    // Здесь можно добавить логику смены языка
    console.log('Язык изменен на:', lang);
    localStorage.setItem('language', lang);
}

// Функция для отправки токена на сервер
function sendTokenToServer() {
    const token = getToken();
    
    // if (!token) {
    //     console.log('Токен не найден');
    //     alert.alert('Токен не найден')
    //     return;
    // }
    
    // Отправляем токен на сервер
    fetch('/save_token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Токен сохранен на сервере:', data);
    })
    .catch(error => {
        console.error('Ошибка при сохранении токена:', error);
    });
}

function bot_status_bt() {
    const token = getToken();
    
    if (!token) {
        console.log('Токен не найден');
        alert('Токен не найден')
        return;
    }
    fetch('/bot_status_bt', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Изменен статус:', data);

        update_status();
    })
    .catch(error => {
        console.error('Ошибка при изменении статуса:', error);
    });
}

function bot_restart_bt(){
    const token = getToken();
    
    if (!token) {
        console.log('Токен не найден');
        alert('Токен не найден')
        return;
    }

    fetch('/bot_restart_bt', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        console.log('Перезапуск успешен:', data);
        update_status();
    })
    .catch(error => {
        console.error('Ошибка при перезапуске:', error);
    });
}

function update_status(){
    window.location = '/';
}

// Обновите функцию saveToken
function saveToken() {
    const tokenInput = document.querySelector('#token-input');
    const tokenStatus = document.querySelector('#token-status');
    const token = tokenInput.value.trim();
    
    if (token) {
        localStorage.setItem('userToken', token);
        tokenStatus.textContent = '✅ Токен успешно сохранен';
        tokenStatus.style.color = '#27ae60';
        
        // Отправляем токен на сервер
        sendTokenToServer();
        
        // Очищаем статус через 3 секунды
        setTimeout(() => {
            tokenStatus.textContent = '';
        }, 3000);
    } else {
        tokenStatus.textContent = '❌ Введите токен';
        tokenStatus.style.color = '#e74c3c';
    }
}

function clearToken() {
    const tokenInput = document.querySelector('#token-input');
    const tokenStatus = document.querySelector('#token-status');
    
    tokenInput.value = '';
    localStorage.setItem('userToken', "");
    tokenStatus.textContent = '🗑️ Токен удален';
    tokenStatus.style.color = '#e74c3c';
    
    // Очищаем статус через 3 секунды
    setTimeout(() => {
        tokenStatus.textContent = '';
    }, 3000);
    sendTokenToServer();
}

function toggleTokenVisibility() {
    const tokenInput = document.querySelector('#token-input');
    const showButton = document.querySelector('#show-token');
    
    if (tokenInput.type === 'password') {
        tokenInput.type = 'text';
        showButton.textContent = '👁️‍🗨️ Скрыть';
    } else {
        tokenInput.type = 'password';
        showButton.textContent = '👁️ Показать';
    }
}

function loadToken() {
    const tokenInput = document.querySelector('#token-input');
    const savedToken = localStorage.getItem('userToken');
    
    if (savedToken) {
        tokenInput.value = savedToken;
    }
}

// Функция для получения сохраненного токена (для использования в других модулях)
function getToken() {
    return localStorage.getItem('userToken');
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    // Назначаем обработчики для кнопок меню
    const buttons = document.querySelectorAll('.menu-button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            showSection(sectionId, this);
        });
    });
    
    // Обработчики для настроек темы
    const themeSelect = document.querySelector('#theme-select');
    if (themeSelect) {
        themeSelect.addEventListener('change', function() {
            toggleTheme(this.value);
        });
    }
    
    // Обработчики для настроек языка
    const langSelect = document.querySelector('#lang-select');
    if (langSelect) {
        langSelect.addEventListener('change', function() {
            changeLanguage(this.value);
        });
    }
    
    // Обработчики для работы с токеном
    const saveTokenBtn = document.querySelector('#save-token');
    const clearTokenBtn = document.querySelector('#clear-token');
    const showTokenBtn = document.querySelector('#show-token');
    
    if (saveTokenBtn) {
        saveTokenBtn.addEventListener('click', saveToken);
    }
    
    if (clearTokenBtn) {
        clearTokenBtn.addEventListener('click', clearToken);
    }
    
    if (showTokenBtn) {
        showTokenBtn.addEventListener('click', toggleTokenVisibility);
    }
    
    // Загружаем сохраненные настройки
    const savedTheme = localStorage.getItem('theme') || 'light';
    toggleTheme(savedTheme);
    
    const savedLang = localStorage.getItem('language') || 'ru';
    if (langSelect) {
        langSelect.value = savedLang;
    }
    
    // Загружаем сохраненный токен
    loadToken();
    
    // Показываем первую секцию по умолчанию
    showSection('home', document.querySelector('[data-section="home"]'));
});

//----------
// Массив для хранения всех блоков
let blocks = [];

// Добавление нового блока
// function addNewBlock() {
//     const titleInput = document.getElementById('blockTitle');
//     const title = titleInput.value.trim();
    
//     if (!title) {
//         alert('Введите название блока');
//         return;
//     }
    
//     // Создаем новый блок
//     const newBlock = {
//         id: Date.now(), // уникальный ID
//         title: title,
//         content: '', // можно добавить содержимое
//         isExpanded: false
//     };
    
//     blocks.push(newBlock);
//     renderBlocks();
    
//     // Очищаем поле ввода
//     titleInput.value = '';
    
//     // Инициализируем логику для нового блока после рендеринга
//     setTimeout(() => {
//         initBlock(newBlock.id);
//     }, 0);
// }

// Удаление блока
function deleteBlock(blockId) {
    if (confirm('Вы уверены, что хотите удалить этот блок?')) {
        blocks = blocks.filter(block => block.id !== blockId);
        renderBlocks();
    }
}

// Переключение раскрытия/скрытия блока
function toggleBlock(blockId) {
    const block = blocks.find(b => b.id == blockId);
    if (block) {
        // Сначала сохраняем текущие данные из DOM
        saveBlockDataToArray(blockId);
        
        // Затем переключаем состояние
        block.isExpanded = !block.isExpanded;
        renderBlocks();
    }
}

// Глобальная функция для инициализации блока
function initBlock(blockId) {
    console.log('Initializing block:', blockId);
    
    const blockElement = document.querySelector(`[data-block-id="${blockId}"]`);
    if (!blockElement) {
        console.error('Block element not found:', blockId);
        return;
    }

    // Находим элементы внутри конкретного блока
    const radioSimple = blockElement.querySelector(`#radio_s_${blockId}`);
    const radioCode = blockElement.querySelector(`#radio_c_${blockId}`);
    const simpleEditor = blockElement.querySelector(`#simple_editor_${blockId}`);
    const codeEditor = blockElement.querySelector(`#code_editor_${blockId}`);

    // Элементы для скрытия/показа
    const checkboxForward = blockElement.querySelector(`#checkbox_fm_${blockId}`);
    const chatForwardGroup = blockElement.querySelector(`#chat_forward_group_${blockId}`);
    
    const checkboxTopic = blockElement.querySelector(`#checkbox_st_${blockId}`);
    const topicGroup = blockElement.querySelector(`#topic_group_${blockId}`);
    
    const checkboxMessage = blockElement.querySelector(`#checkbox_mt_${blockId}`);
    const textMessageGroup = blockElement.querySelector(`#text_message_group_${blockId}`);

    // Проверяем, что все элементы найдены
    if (!radioSimple || !radioCode || !simpleEditor || !codeEditor) {
        console.error('Some elements not found for block:', blockId);
        return;
    }

    // Логика переключения между редакторами
    function toggleEditors() {
        if (radioSimple.checked) {
            simpleEditor.style.display = 'block';
            codeEditor.style.display = 'none';
        } else {
            simpleEditor.style.display = 'none';
            codeEditor.style.display = 'block';
        }
    }

    // Логика показа/скрытия полей ввода
    function toggleInputGroups() {
        // Пересылка сообщения
        if (checkboxForward && chatForwardGroup) {
            chatForwardGroup.style.display = checkboxForward.checked ? 'block' : 'none';
        }

        // Конкретный топик
        if (checkboxTopic && topicGroup) {
            topicGroup.style.display = checkboxTopic.checked ? 'block' : 'none';
        }

        // Отправка текста
        if (checkboxMessage && textMessageGroup) {
            textMessageGroup.style.display = checkboxMessage.checked ? 'block' : 'none';
        }
    }

    // Навешиваем обработчики событий
    radioSimple.addEventListener('change', toggleEditors);
    radioCode.addEventListener('change', toggleEditors);

    if (checkboxForward) checkboxForward.addEventListener('change', toggleInputGroups);
    if (checkboxTopic) checkboxTopic.addEventListener('change', toggleInputGroups);
    if (checkboxMessage) checkboxMessage.addEventListener('change', toggleInputGroups);

    // Инициализация
    toggleEditors();
    toggleInputGroups();
    
    console.log('Block initialized successfully:', blockId);

    const checkboxKeyboard = blockElement.querySelector(`#checkbox_kb_${blockId}`);
    const keyboardGroup = blockElement.querySelector(`#keyboard_group_${blockId}`);
    
    if (checkboxKeyboard && keyboardGroup) {
        checkboxKeyboard.addEventListener('change', function() {
            keyboardGroup.style.display = this.checked ? 'block' : 'none';
            if (this.checked) {
                // Инициализируем мини-клавиатуру при первом показе
                setTimeout(() => {
                    initMiniDragAndDrop(blockId);
                }, 100);
            }
            autoSave();
        });
        
        // Инициализируем состояние
        keyboardGroup.style.display = checkboxKeyboard.checked ? 'block' : 'none';
    }
    
    // Инициализируем перетаскивание если клавиатура активна
    if (blockElement.querySelector(`#checkbox_kb_${blockId}`)?.checked) {
        setTimeout(() => {
            initMiniDragAndDrop(blockId);
        }, 100);
    }
}

// Делегирование событий для динамически создаваемых элементов
document.addEventListener('change', function(event) {
    const target = event.target;
    
    // Обработка переключения редакторов
    if (target.matches('input[type="radio"][name^="editor_"]')) {
        const blockId = target.name.split('_')[1];
        initBlock(blockId);
    }
    
    // Обработка чекбоксов в простом редакторе
    if (target.matches('input[type="checkbox"][name^="forvard_mes_"], input[type="checkbox"][name^="specific_topic_"], input[type="checkbox"][name^="mess_text_"]')) {
        const blockId = target.name.split('_')[2];
        initBlock(blockId);
    }
});

// Отрисовка всех блоков (исправленная версия)
function renderBlocks() {
    const container = document.getElementById('blocksContainer');
    
    if (blocks.length === 0) {
        container.innerHTML = '<p class="no-blocks">Страницы не добавлены</p>';
        return;
    }
    
    container.innerHTML = blocks.map(block => `
        <div class="block-item" data-block-id="${block.id}">
            <div class="block-header" onclick="toggleBlock('${block.id}')">
                <span class="block-title">${escapeHtml(block.title)}</span>
                <div class="block-controls">
                    <button class="delete-btn" onclick="event.stopPropagation(); deleteBlock('${block.id}')">
                        Удалить
                    </button>
                </div>
            </div>
            <div class="block-content ${block.isExpanded ? 'expanded' : ''}">
                
                <div class="settings-container" data-block-id="${block.id}">
                    <!-- Тумблер "Использовать как команду" -->
                    <div class="toggle-item">
                        <label class="toggle-label">
                            <input type="checkbox" name="use_as_command_${block.id}" id="checkbox_com_${block.id}" 
                                   class="toggle-input" ${block.use_as_command ? 'checked' : ''}>
                            <span class="toggle-slider"></span>
                            <span class="toggle-text">Использовать как команду</span>
                        </label>
                    </div>

                    <!-- Выбор редактора -->
                    <div class="editor-selector">
                        <div class="radio-group">
                            <label class="radio-label">
                                <input type="radio" name="editor_${block.id}" id="radio_s_${block.id}" 
                                       class="radio-input" value="simple" ${(block.editor_type === 'simple' || block.editor_type === 'on') ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-text">Простой конструктор</span>
                            </label>
                            
                            <label class="radio-label">
                                <input type="radio" name="editor_${block.id}" id="radio_c_${block.id}" 
                                       class="radio-input" value="code" ${block.editor_type === 'code' ? 'checked' : ''}>
                                <span class="radio-custom"></span>
                                <span class="radio-text">Конструктор кодом</span>
                            </label>
                        </div>
                    </div>

                    <!-- Простой редактор -->
                    <div class="editor-content" id="simple_editor_${block.id}">
                        <div class="settings-group">
                            <div class="toggle-item">
                                <label class="toggle-label">
                                    <input type="checkbox" name="forvard_mes_${block.id}" id="checkbox_fm_${block.id}" 
                                           class="toggle-input" ${block.forward_message ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                    <span class="toggle-text">Пересылать последнее сообщение</span>
                                </label>
                            </div>

                            <div class="input-group" id="chat_forward_group_${block.id}" style="display: none;">
                                <input type="text" name="chat_for_forvard_${block.id}" id="text_cforvard_${block.id}" 
                                       class="text-input" placeholder="Введите ID чата" value="${escapeAttr(block.chat_id || '')}">
                            </div>

                            <div class="toggle-item">
                                <label class="toggle-label">
                                    <input type="checkbox" name="specific_topic_${block.id}" id="checkbox_st_${block.id}" 
                                           class="toggle-input" ${block.specific_topic ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                    <span class="toggle-text">Указать конкретный топик чата</span>
                                </label>
                            </div>

                            <div class="input-group" id="topic_group_${block.id}" style="display: none;">
                                <input type="number" name="specific_topic_num_${block.id}" id="text_st_${block.id}" 
                                       class="text-input" placeholder="Укажите нужный ID" value="${escapeAttr(block.topic_id || '')}">
                            </div>

                            <div class="toggle-item">
                                <label class="toggle-label">
                                    <input type="checkbox" name="mess_text_${block.id}" id="checkbox_mt_${block.id}" 
                                           class="toggle-input" ${block.send_text ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                    <span class="toggle-text">Отправлять текст</span>
                                </label>
                            </div>

                            <div class="input-group" id="text_message_group_${block.id}" style="display: none;">
                                <textarea name="mess_${block.id}" id="tr_mt_${block.id}" class="text-area" 
                                          placeholder="Отправляемый текст" rows="4">${escapeText(block.message_text || '')}</textarea>
                            </div>

                            <div class="toggle-item">
                                <label class="toggle-label">
                                    <input type="checkbox" name="add_keyboard_${block.id}" id="checkbox_kb_${block.id}" 
                                        class="toggle-input" ${block.add_keyboard ? 'checked' : ''}>
                                    <span class="toggle-slider"></span>
                                    <span class="toggle-text">Добавить клавиатуру</span>
                                </label>
                            </div>

                            <div class="input-group" id="keyboard_group_${block.id}" style="display: none;">
                                <div class="mini-keyboard-builder">
                                    <h4 style="margin-bottom: 10px; font-size: 14px;">Мини-конструктор клавиатуры</h4>
                                    
                                    <div class="mini-palette">
                                        <div class="mini-buttons-container" id="mini_buttons_${block.id}">
                                            <div class="mini-button" draggable="true" data-from-palette="true">Да</div>
                                            <div class="mini-button" draggable="true" data-from-palette="true">Нет</div>
                                            <div class="mini-button" draggable="true" data-from-palette="true">ОК</div>
                                        </div>
                                        
                                        <div class="mini-new-button-form">
                                            <input type="text" id="mini_new_button_${block.id}" placeholder="Новая кнопка" 
                                                style="width: 100%; padding: 5px; font-size: 12px; margin-bottom: 5px;">
                                            <button onclick="addMiniButton('${block.id}')" class="small-btn" 
                                                    style="padding: 3px 8px; font-size: 11px;">Добавить</button>
                                        </div>
                                    </div>
                                    
                                    <div class="mini-keyboard-area" id="mini_keyboard_${block.id}">
                                        <!-- Здесь будет восстановлена клавиатура при загрузке -->
                                    </div>
                                    
                                    <div class="mini-controls" style="margin-top: 10px;">
                                        <button onclick="addMiniRow('${block.id}')" class="small-btn" 
                                                style="padding: 3px 8px; font-size: 11px; margin-right: 5px;">+ Ряд</button>
                                        <button onclick="generateMiniKeyboard('${block.id}')" class="small-btn" 
                                                style="padding: 3px 8px; font-size: 11px;">Применить</button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- Редактор кодом -->
                    <div class="editor-content" id="code_editor_${block.id}" style="display: none;">
                        <div class="settings-group">
                            <label class="section-label">Код блока (Python)</label>
                            
                            <div class="code-editor-container">
                                <textarea 
                                    name="code_editor_${block.id}" 
                                    id="text_code_${block.id}" 
                                    class="text-area code-area" 
                                    placeholder="# Введите Python код здесь..."
                                    rows="12"
                                    spellcheck="false"
                                >${escapeCode(block.python_code || '')}</textarea>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `).join('');

    // Инициализируем логику для всех блоков после рендеринга
    setTimeout(() => {
        blocks.forEach(block => {
            initBlock(block.id);
            // Восстанавливаем мини-клавиатуру если есть данные
            if (block.add_keyboard && block.keyboard_data && block.keyboard_data.length > 0) {
                restoreMiniKeyboard(block.id, block.keyboard_data);
            }
        });
    }, 0);
}

// Обновление содержимого блока
function updateBlockContent(blockId, content) {
    const block = blocks.find(b => b.id === blockId);
    if (block) {
        block.content = content;
    }
}

// Функция для экранирования кода (только базовые HTML символы)
function escapeCode(unsafe) {
    if (unsafe === null || unsafe === undefined) return '';
    return String(unsafe)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    // Не экранируем кавычки - они должны сохраняться как есть в коде
}

// Экранирование HTML для безопасности
function escapeHtml(unsafe) {
    if (unsafe === null || unsafe === undefined) return '';
    return String(unsafe)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
        // Убрали замену кавычек, чтобы они сохранялись как есть
}

function escapeText(unsafe) {
    if (unsafe === null || unsafe === undefined) return '';
    return String(unsafe)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

function escapeAttr(unsafe) {
    if (unsafe === null || unsafe === undefined) return '';
    return String(unsafe)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
        // Убрали замену одинарных кавычек: .replace(/'/g, "&#039;");
}

// Добавление блока по нажатию Enter
document.getElementById('blockTitle').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        addNewBlock();
    }
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    renderBlocks();
});
//
// Сохранение в LocalStorage
function saveToLocalStorage() {
    localStorage.setItem('blocksData', JSON.stringify(blocks));
}

// Загрузка из LocalStorage
function loadFromLocalStorage() {
    fetch('/fun_com')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Received JSON:', data);
    // Обработка данных
    processData(data);
  })
  .catch(error => {
    console.error('Error:', error);
  });
}

// Обновленные функции с сохранением
function addNewBlock() {
    const titleInput = document.getElementById('blockTitle');
    const title = titleInput.value.trim();
    
    if (!title) return;
    
    const newBlock = {
        id: Date.now(),
        title: title,
        content: '',
        isExpanded: false,
        createdAt: new Date().toISOString()
    };
    
    blocks.push(newBlock);
    renderBlocks();
    saveToLocalStorage();
    titleInput.value = '';
}

function deleteBlock(blockId) {
    if (confirm('Удалить блок?')) {
        blocks = blocks.filter(block => block.id != blockId);
        renderBlocks();
        saveToLocalStorage();
    }
}

// Загружаем данные при старте
document.addEventListener('DOMContentLoaded', function() {
    loadFromLocalStorage();
});

function autoSave() {
    console.log('Auto-saving blocks...');
    
    // Сначала сохраняем все данные из DOM в массив blocks
    blocks.forEach(block => {
        saveBlockDataToArray(block.id);
    });
    
    // Затем сохраняем в localStorage
    saveToLocalStorage();
    
    console.log('Blocks saved locally:', blocks);
}

// Упростите делегирование событий - убираем дублирование
document.addEventListener('change', function(event) {
    const target = event.target;
    
    if (target.matches('.toggle-input, .radio-input, .text-input, .text-area, .code-area')) {
        // Сразу сохраняем в массив blocks
        const blockId = extractBlockIdFromElement(target);
        if (blockId) {
            saveBlockDataToArray(blockId);
        }
        
        // Затем автосохранение
        setTimeout(autoSave, 100);
    }
});

// Вспомогательная функция для извлечения ID блока из элемента
function extractBlockIdFromElement(element) {
    // Пытаемся найти ID блока разными способами
    const blockElement = element.closest('.block-item');
    if (blockElement) {
        return blockElement.getAttribute('data-block-id');
    }
    
    // Или из ID элемента
    const id = element.id;
    if (id) {
        const match = id.match(/_(\d+)$/);
        if (match) {
            return match[1];
        }
    }
    
    // Или из name
    const name = element.name;
    if (name) {
        const match = name.match(/_(\d+)$/);
        if (match) {
            return match[1];
        }
    }
    
    return null;
}

// Убедитесь что saveToLocalStorage работает правильно
function saveToLocalStorage() {
    try {
        localStorage.setItem('blocksData', JSON.stringify(blocks));
        console.log('Data saved to localStorage');
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }

    blocks.forEach(block => {
        saveBlockDataToArray(block.id);
    });
    
    localStorage.setItem('blocksData', JSON.stringify(blocks));
}

function processData(jsonData) {
    // Ваша логика обработки JSON
    blocks = jsonData.map(item => ({
        id: item.id,
        title: item.title,
        content: item.content || '',
        type: item.type || 'custom',
        
        // Настройки
        use_as_command: item.settings?.use_as_command || false,
        editor_type: item.settings?.editor_type || 'simple',
        forward_message: item.settings?.simple_editor?.forward_message || false,
        chat_id: item.settings?.simple_editor?.chat_id || '',
        specific_topic: item.settings?.simple_editor?.specific_topic || false,
        topic_id: item.settings?.simple_editor?.topic_id || '',
        send_text: item.settings?.simple_editor?.send_text || false,
        message_text: item.settings?.simple_editor?.message_text || '',
        python_code: item.settings?.code_editor?.code || '',
        add_keyboard: item.settings?.add_keyboard || false,
        keyboard_data: item.settings?.keyboard_data || []
    }));

    renderBlocks();

    setTimeout(() => {
        blocks.forEach(block => {
            initBlock(block.id);
            // Восстанавливаем мини-клавиатуру если есть данные
            if (block.add_keyboard && block.keyboard_data && block.keyboard_data.length > 0) {
                restoreMiniKeyboard(block.id, block.keyboard_data);
            }
        });
    }, 0);
}

let rowCounter = 1;
let currentDragElement = null;

// Инициализация перетаскивания
function initMiniDragAndDrop(blockId) {
    const miniButtons = document.querySelectorAll(`#mini_buttons_${blockId} .mini-button, #mini_keyboard_${blockId} .mini-button`);
    const miniRows = document.querySelectorAll(`#mini_keyboard_${blockId} .mini-row`);
    const trashArea = document.getElementById(`trash_area_${blockId}`);
    
    // Удаляем старые обработчики
    miniButtons.forEach(btn => {
        btn.removeEventListener('dragstart', handleMiniDragStart);
        btn.addEventListener('dragstart', handleMiniDragStart);
    });
    
    miniRows.forEach(row => {
        row.removeEventListener('dragover', handleMiniDragOver);
        row.removeEventListener('drop', handleMiniDrop);
        
        row.addEventListener('dragover', handleMiniDragOver);
        row.addEventListener('drop', handleMiniDrop);
    });
    
    // Обработчики для области удаления
    if (trashArea) {
        trashArea.removeEventListener('dragover', handleTrashDragOver);
        trashArea.removeEventListener('drop', handleTrashDrop);
        trashArea.removeEventListener('dragenter', handleTrashDragEnter);
        trashArea.removeEventListener('dragleave', handleTrashDragLeave);
        
        trashArea.addEventListener('dragover', handleTrashDragOver);
        trashArea.addEventListener('drop', handleTrashDrop);
        trashArea.addEventListener('dragenter', handleTrashDragEnter);
        trashArea.addEventListener('dragleave', handleTrashDragLeave);
    }
}

function handleDragStart(e) {
    console.log('Drag started');
    currentDragElement = e.target;
    e.dataTransfer.setData('text/plain', e.target.textContent);
    e.dataTransfer.setData('from-palette', e.target.getAttribute('data-from-palette'));
    e.target.classList.add('dragging');
    
    // Если это кнопка из палитры, устанавливаем эффект копирования
    if (e.target.getAttribute('data-from-palette') === 'true') {
        e.dataTransfer.effectAllowed = 'copy';
    } else {
        e.dataTransfer.effectAllowed = 'move';
    }
    
    console.log('Dragging element:', e.target, 'from palette:', e.target.getAttribute('data-from-palette'));
}

function handleDragEnd(e) {
    console.log('Drag ended');
    if (e.target.classList.contains('button')) {
        e.target.classList.remove('dragging');
        currentDragElement = null;
        
        document.querySelectorAll('.drag-over').forEach(el => {
            el.classList.remove('drag-over');
        });
    }
}

function handleDragOver(e) {
    e.preventDefault();
    console.log('Drag over:', e.target);
    
    // Убираем подсветку со всех элементов
    document.querySelectorAll('.drag-over').forEach(el => {
        el.classList.remove('drag-over');
    });
    
    // Определяем, на что наведен курсор
    const row = e.target.closest('.row');
    const keyboardArea = e.target.closest('#keyboardArea');
    const button = e.target.closest('.button');
    
    // Не подсвечиваем саму перетаскиваемую кнопку
    if (button && button === currentDragElement) {
        return;
    }
    
    // Подсвечиваем ряд или область клавиатуры
    if (row) {
        console.log('Highlighting row');
        row.classList.add('drag-over');
    } else if (keyboardArea && !button) {
        console.log('Highlighting keyboard area');
        keyboardArea.classList.add('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    console.log('Drop event');
    
    const row = e.target.closest('.row');
    const keyboardArea = e.target.closest('#keyboardArea');
    const fromPalette = e.dataTransfer.getData('from-palette') === 'true';
    
    console.log('Drop target:', e.target);
    console.log('Row found:', row);
    console.log('Keyboard area found:', keyboardArea);
    console.log('From palette:', fromPalette);
    console.log('Current drag element:', currentDragElement);
    
    // Убираем подсветку
    document.querySelectorAll('.drag-over').forEach(el => {
        el.classList.remove('drag-over');
    });
    
    if (row) {
        console.log('Dropping on row:', row);
        if (fromPalette && !currentDragElement) {
            // Создаем КОПИЮ кнопки из палитры в этот ряд
            const buttonText = e.dataTransfer.getData('text/plain');
            
            // Проверяем, нет ли уже такой кнопки в этом ряду
            const existingButtons = row.querySelectorAll('.button');
            const isDuplicate = Array.from(existingButtons).some(btn => 
                btn.textContent.trim() === buttonText
            );
            
            if (!isDuplicate) {
                createButtonInRow(buttonText, row);
                console.log('Button created in row:', buttonText);
            } else {
                console.log('Duplicate button skipped:', buttonText);
            }
            
        } else if (currentDragElement && currentDragElement.getAttribute('data-from-palette') === 'false') {
            // Перемещаем существующую кнопку между рядами
            console.log('Moving existing button to row');
            if (!row.contains(currentDragElement)) {
                row.appendChild(currentDragElement);
                currentDragElement.classList.remove('dragging');
                console.log('Button moved to row');
            }
        }
    } else if (keyboardArea && fromPalette && !currentDragElement) {
        // Создаем новый ряд для кнопки из палитры
        console.log('Creating new row for button');
        const buttonText = e.dataTransfer.getData('text/plain');
        const newRow = addRow();
        createButtonInRow(buttonText, newRow);
    } else {
        console.log('No valid drop target found');
    }
    
    currentDragElement = null;
}

function createButtonInRow(text, row) {
    // Проверяем, нет ли уже такой кнопки в ряду
    const existingButtons = row.querySelectorAll('.button');
    const isDuplicate = Array.from(existingButtons).some(btn => 
        btn.textContent.trim() === text
    );
    
    if (isDuplicate) {
        console.log('Кнопка уже существует в этом ряду:', text);
        return null;
    }
    
    const button = document.createElement('div');
    button.className = 'button';
    button.textContent = text;
    button.draggable = true;
    button.setAttribute('data-from-palette', 'false');
    
    // Добавляем обработчики событий
    button.addEventListener('dragstart', handleDragStart);
    button.addEventListener('dragend', handleDragEnd);
    button.addEventListener('dblclick', () => editButton(button));
    
    row.appendChild(button);
    return button;
}

function editButton(button) {
    const newText = prompt('Введите новый текст кнопки:', button.textContent);
    if (newText && newText.trim() !== '') {
        button.textContent = newText.trim();
    }
}

function addRow() {
    const keyboardArea = document.getElementById('keyboardArea');
    const newRow = document.createElement('div');
    newRow.className = 'row';
    newRow.setAttribute('data-row', rowCounter);
    
    // Добавляем обработчики для нового ряда
    newRow.addEventListener('dragover', handleDragOver);
    newRow.addEventListener('drop', handleDrop);
    
    keyboardArea.appendChild(newRow);
    rowCounter++;
    
    console.log('New row added:', newRow);
    return newRow;
}
function addNewButton() {
    const input = document.getElementById('newButtonText');
    const text = input.value.trim();
    
    if (text) {
        const buttonsContainer = document.getElementById('buttonsContainer');
        
        // Проверяем, нет ли уже такой кнопки в палитре
        const existingButtons = buttonsContainer.querySelectorAll('.button');
        const isDuplicate = Array.from(existingButtons).some(btn => 
            btn.textContent.trim() === text
        );
        
        if (isDuplicate) {
            alert('Такая кнопка уже существует в палитре!');
            return;
        }
        
        const button = document.createElement('div');
        button.className = 'button';
        button.textContent = text;
        button.draggable = true;
        button.setAttribute('data-from-palette', 'true'); // Важно!
        
        // Добавляем обработчики событий
        button.addEventListener('dragstart', handleDragStart);
        button.addEventListener('dragend', handleDragEnd);
        
        buttonsContainer.appendChild(button);
        input.value = '';
        
    } else {
        alert('Введите текст кнопки');
    }
}

function generateCode() {
    const rowElements = document.querySelectorAll('.row');
    let pythonCode = ``;
    
    let hasButtons = false;
    
    rowElements.forEach((row, index) => {
        const buttons = row.querySelectorAll('.button');
        if (buttons.length > 0) {
            hasButtons = true;
            const buttonNames = Array.from(buttons).map(btn => {
                const text = btn.textContent.replace(/"/g, '\\"');
                return `types.KeyboardButton("${text}")`;
            });
            pythonCode += `        self.row${index} = [${buttonNames.join(', ')}]\n`;
            pythonCode += `        self.markup.row(*self.row${index})\n\n`;
        }
    });
    fetch('/save_kbord', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            body: pythonCode
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Клавиатура сохранен:', data);
    })
    .catch(error => {
        console.error('Ошибка при сохранении клавиатуры:', error);
    });
}

function copyCode() {
    const code = document.getElementById('pythonCode').textContent;
    navigator.clipboard.writeText(code).then(() => {
        alert('Код скопирован!');
    }).catch(() => {
        const textArea = document.createElement('textarea');
        textArea.value = code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Код скопирован!');
    });
}

function clearAll() {
    if (confirm('Очистить всю клавиатуру?')) {
        const keyboardArea = document.getElementById('keyboardArea');
        keyboardArea.innerHTML = '<div class="row" data-row="0"></div>';
        rowCounter = 1;
    }
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', function() {
    cleanupEventHandlers();
    initMainDragAndDrop();
    initMiniDragAndDrop();
    
    // Обработка Enter в поле ввода
    document.getElementById('newButtonText').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addNewButton();
        }
    });
});

function getBlocksData() {
    const blocksData = [];
    
    blocks.forEach(block => {
        // Сохраняем текущие данные из DOM
        saveBlockDataToArray(block.id);
        
        const blockData = {
            id: block.id,
            title: block.title,
            content: block.content || '',
            type: block.type || 'custom',
            
            settings: {
                use_as_command: block.use_as_command || false,
                editor_type: block.editor_type || 'simple',
                
                simple_editor: {
                    forward_message: block.forward_message || false,
                    chat_id: block.chat_id || '',
                    specific_topic: block.specific_topic || false,
                    topic_id: block.topic_id || '',
                    send_text: block.send_text || false,
                    message_text: block.message_text || ''
                },
                
                code_editor: {
                    code: block.python_code || ''  // Python код сохраняется как есть
                },
                
                add_keyboard: block.add_keyboard || false,
                keyboard_data: block.keyboard_data || []
            }
        };
        
        blocksData.push(blockData);
    });
    
    return blocksData;
}

function save_page_or_comand(){
    // Сначала сохраняем все данные из DOM
    blocks.forEach(block => {
        saveBlockDataToArray(block.id);
    });
    
    const content = getBlocksData();

    fetch('/save_page_comand', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            body: content
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Ошибка сети');
        }
        return response.json();
    })
    .then(data => {
        console.log('Функции сохранены:', data);
        showSaveMessage('✅ Данные успешно сохранены!', 'success');
        
        // Сохраняем также в localStorage для резервной копии
        saveToLocalStorage();
    })
    .catch(error => {
        console.error('Ошибка при сохранении функций:', error);
        showSaveMessage('❌ Ошибка при сохранении данных: ' + error.message, 'error');
    });
}

// Функция для показа сообщений
function showSaveMessage(message, type = 'success') {
    // Создаем элемент сообщения
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.3s ease-out;
        max-width: 300px;
        word-wrap: break-word;
    `;
    
    // Стили в зависимости от типа сообщения
    if (type === 'success') {
        messageDiv.style.background = '#27ae60'; // Зеленый
    } else {
        messageDiv.style.background = '#e74c3c'; // Красный
    }
    
    // Добавляем в тело документа
    document.body.appendChild(messageDiv);
    
    // Автоматически скрываем через 3 секунды
    setTimeout(() => {
        messageDiv.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.parentNode.removeChild(messageDiv);
            }
        }, 300);
    }, 3000);
}

//code editor
// Функции для работы с Python редактором
function formatCode(blockId) {
    const textarea = document.getElementById(`text_code_${blockId}`);
    const code = textarea.value;
    
    // Простое форматирование - добавление отступов
    const formatted = code.replace(/^(    )+/gm, match => {
        return '\t'.repeat(match.length / 4);
    });
    
    textarea.value = formatted;
    highlightPython(blockId);
}

function insertTemplate(blockId) {
    const textarea = document.getElementById(`text_code_${blockId}`);
    const template = `async def handler(message):
    # Ваш код здесь
    await message.answer("Привет! Это тестовое сообщение.")
    
    # Пример обработки текста
    if message.text == "/start":
        await message.answer("Добро пожаловать!")
    elif message.text == "/help":
        await message.answer("Это справочная информация")`;
    
    textarea.value = template;
    highlightPython(blockId);
}

function validatePython(blockId) {
    const textarea = document.getElementById(`text_code_${blockId}`);
    const code = textarea.value;
    
    // Простая проверка синтаксиса
    try {
        // Проверяем базовый синтаксис (это упрощенная проверка)
        if (code.includes('import ')) {
            alert('✅ Код содержит импорты');
        }
        if (code.includes('async def ') || code.includes('def ')) {
            alert('✅ Найдены функции');
        }
        
        // Можно добавить более сложную проверку через внешние библиотеки
        alert('✅ Базовая проверка пройдена');
    } catch (error) {
        alert('❌ Ошибка в коде: ' + error.message);
    }
}

function handlePythonIndent(event, blockId) {
    const textarea = document.getElementById(`text_code_${blockId}`);
    
    if (event.key === 'Tab') {
        event.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        
        // Добавляем отступ
        textarea.value = textarea.value.substring(0, start) + '    ' + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 4;
        
        highlightPython(blockId);
    }
    
    // Автозакрытие кавычек и скобок
    const pairs = {
        '(': ')',
        '[': ']',
        '{': '}',
        "'": "'",
        '"': '"'
    };
    
    if (pairs[event.key]) {
        event.preventDefault();
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const pair = pairs[event.key];
        
        textarea.value = textarea.value.substring(0, start) + event.key + pair + textarea.value.substring(end);
        textarea.selectionStart = textarea.selectionEnd = start + 1;
        
        highlightPython(blockId);
    }
}

function highlightPython(blockId) {
    const textarea = document.getElementById(`text_code_${blockId}`);
    const code = textarea.value;
    
    // Простая подсветка синтаксиса (можно заменить на более продвинутую библиотеку)
    let highlighted = code
        // Ключевые слова Python
        .replace(/\b(async|await|def|class|if|else|elif|for|while|return|import|from|as|try|except|finally|with)\b/g, '<span class="python-keyword">$1</span>')
        // Строки
        .replace(/(['"])(.*?)\1/g, '<span class="python-string">$1$2$1</span>')
        // Комментарии
        .replace(/(#.*$)/gm, '<span class="python-comment">$1</span>')
        // Функции
        .replace(/\b(\w+)\(/g, '<span class="python-function">$1</span>(')
        // Числа
        .replace(/\b(\d+\.?\d*)\b/g, '<span class="python-number">$1</span>');
    
    // Для реальной подсветки лучше использовать библиотеку типа Prism.js или Highlight.js
    // Это упрощенная версия для демонстрации
}

// Функции для мини-клавиатуры
function addMiniButton(blockId) {
    const input = document.getElementById(`mini_new_button_${blockId}`);
    const text = input.value.trim();
    
    if (text) {
        const buttonsContainer = document.getElementById(`mini_buttons_${blockId}`);
        const button = document.createElement('div');
        button.className = 'mini-button';
        button.textContent = text;
        button.draggable = true;
        button.setAttribute('data-from-palette', 'true');
        
        buttonsContainer.appendChild(button);
        input.value = '';
        
        // Инициализируем перетаскивание для новой кнопки
        initMiniDragAndDrop(blockId);
    }
}

// Делегирование событий для удаления по двойному клику
document.addEventListener('dblclick', function(event) {
    if (event.target.classList.contains('mini-button')) {
        event.target.remove();
        
        // Обновляем данные клавиатуры если кнопка была в клавиатуре
        const blockId = extractBlockIdFromElement(event.target);
        if (blockId) {
            const keyboardArea = document.getElementById(`mini_keyboard_${blockId}`);
            if (keyboardArea && keyboardArea.contains(event.target)) {
                generateMiniKeyboard(blockId);
            }
        }
    }
});

function addMiniRow(blockId) {
    const keyboardArea = document.getElementById(`mini_keyboard_${blockId}`);
    const newRow = document.createElement('div');
    newRow.className = 'mini-row';
    newRow.setAttribute('data-row', Date.now());
    keyboardArea.appendChild(newRow);
    
    // Инициализируем перетаскивание для нового ряда
    initMiniDragAndDrop(blockId);
    return newRow;
}

// Делегирование событий для удаления рядов по двойному клику
document.addEventListener('dblclick', function(event) {
    if (event.target.classList.contains('mini-row')) {
        const row = event.target;
        const blockId = extractBlockIdFromElement(row);
        
        // Удаляем ряд только если он пустой
        if (row.querySelectorAll('.mini-button').length === 0) {
            row.remove();
            
            // Обновляем данные клавиатуры
            if (blockId) {
                generateMiniKeyboard(blockId);
            }
        } else {
            alert('Нельзя удалить ряд с кнопками. Сначала удалите все кнопки из ряда.');
        }
    }
});

function generateMiniKeyboard(blockId) {
    const rowElements = document.querySelectorAll(`#mini_keyboard_${blockId} .mini-row`);
    let keyboardData = [];
    
    rowElements.forEach((row, index) => {
        const buttons = row.querySelectorAll('.mini-button');
        if (buttons.length > 0) {
            const rowData = Array.from(buttons).map(btn => btn.textContent);
            keyboardData.push(rowData);
        }
    });
    
    // Сохраняем данные клавиатуры в блок
    const block = blocks.find(b => b.id == blockId);
    if (block) {
        block.keyboard_data = keyboardData;
        autoSave();
    }
    
    return keyboardData;
}

// Инициализация перетаскивания для мини-клавиатуры
function initMiniDragAndDrop(blockId) {
    const miniButtons = document.querySelectorAll(`#mini_buttons_${blockId} .mini-button`);
    const miniRows = document.querySelectorAll(`#mini_keyboard_${blockId} .mini-row`);
    
    // Удаляем старые обработчики
    miniButtons.forEach(btn => {
        btn.removeEventListener('dragstart', handleMiniDragStart);
        btn.addEventListener('dragstart', handleMiniDragStart);
    });
    
    miniRows.forEach(row => {
        row.removeEventListener('dragover', handleMiniDragOver);
        row.removeEventListener('drop', handleMiniDrop);
        
        row.addEventListener('dragover', handleMiniDragOver);
        row.addEventListener('drop', handleMiniDrop);
    });
}

function handleMiniDragStart(e) {
    console.log('Drag start');
    currentDragElement = e.target;
    e.dataTransfer.setData('text/plain', e.target.textContent);
    e.dataTransfer.setData('from-palette', e.target.getAttribute('data-from-palette'));
    e.target.style.opacity = '1'; // Делаем полупрозрачным при перетаскивании
    
    // Показываем область удаления
    const blockId = extractBlockIdFromElement(e.target);
    if (blockId) {
        const trashArea = document.getElementById(`trash_area_${blockId}`);
        if (trashArea) {
            trashArea.style.display = 'block';
        }
    }
}

function handleMiniDragOver(e) {
    e.preventDefault();
    if (e.target.classList.contains('mini-row')) {
        e.target.classList.add('drag-over');
    }
}

function handleMiniDrop(e) {
    e.preventDefault();
    
    const row = e.target.closest('.mini-row');
    const fromPalette = e.dataTransfer.getData('from-palette') === 'true';
    
    if (row) {
        if (fromPalette) {
            const buttonText = e.dataTransfer.getData('text/plain');
            const button = document.createElement('div');
            button.className = 'mini-button';
            button.textContent = buttonText;
            button.draggable = true;
            button.setAttribute('data-from-palette', 'false');
            row.appendChild(button);
        }
        
        // Убираем подсветку
        document.querySelectorAll('.mini-row.drag-over').forEach(el => {
            el.classList.remove('drag-over');
        });
        
        // Сохраняем изменения
        const blockId = extractBlockIdFromElement(row);
        if (blockId) {
            generateMiniKeyboard(blockId);
        }
    }
}

function saveBlockDataToArray(blockId) {
    const block = blocks.find(b => b.id == blockId);
    if (!block) return;
    
    // Сохраняем все данные из формы
    block.use_as_command = document.getElementById(`checkbox_com_${blockId}`)?.checked || false;
    
    // Правильно получаем значение радио-кнопки
    const selectedEditor = document.querySelector(`input[name="editor_${blockId}"]:checked`);
    block.editor_type = selectedEditor ? selectedEditor.value : 'simple';
    
    block.forward_message = document.getElementById(`checkbox_fm_${blockId}`)?.checked || false;
    block.chat_id = document.getElementById(`text_cforvard_${blockId}`)?.value || '';
    block.specific_topic = document.getElementById(`checkbox_st_${blockId}`)?.checked || false;
    block.topic_id = document.getElementById(`text_st_${blockId}`)?.value || '';
    block.send_text = document.getElementById(`checkbox_mt_${blockId}`)?.checked || false;
    block.message_text = document.getElementById(`tr_mt_${blockId}`)?.value || '';
    
    // Сохраняем Python код как есть, без дополнительного экранирования
    const pythonCodeElement = document.getElementById(`text_code_${blockId}`);
    if (pythonCodeElement) {
        block.python_code = pythonCodeElement.value || '';
    }
    
    block.add_keyboard = document.getElementById(`checkbox_kb_${blockId}`)?.checked || false;
    
    // Сохраняем данные мини-клавиатуры
    const keyboardData = getMiniKeyboardData(blockId);
    block.keyboard_data = keyboardData;
}

// Восстановление мини-клавиатуры из данных
function restoreMiniKeyboard(blockId, keyboardData) {
    const keyboardArea = document.getElementById(`mini_keyboard_${blockId}`);
    if (!keyboardArea) return;
    
    // Очищаем существующую клавиатуру
    keyboardArea.innerHTML = '';
    
    // Восстанавливаем ряды и кнопки
    keyboardData.forEach((rowData, rowIndex) => {
        const row = document.createElement('div');
        row.className = 'mini-row';
        row.setAttribute('data-row', rowIndex);
        
        rowData.forEach(buttonText => {
            const button = document.createElement('div');
            button.className = 'mini-button';
            button.textContent = buttonText;
            button.draggable = true;
            button.setAttribute('data-from-palette', 'false');
            row.appendChild(button);
        });
        
        keyboardArea.appendChild(row);
    });
    
    // Инициализируем перетаскивание
    initMiniDragAndDrop(blockId);
}

function getMiniKeyboardData(blockId) {
    const rowElements = document.querySelectorAll(`#mini_keyboard_${blockId} .mini-row`);
    let keyboardData = [];
    
    rowElements.forEach((row) => {
        const buttons = row.querySelectorAll('.mini-button');
        if (buttons.length > 0) {
            const rowData = Array.from(buttons).map(btn => btn.textContent);
            keyboardData.push(rowData);
        }
    });
    
    return keyboardData;
}

function handleTrashDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
}

function handleTrashDragEnter(e) {
    e.preventDefault();
    const trashArea = e.target.closest('.trash-area');
    if (trashArea) {
        trashArea.style.background = '#ffcccc';
        trashArea.style.borderColor = '#c0392b';
    }
}

function handleTrashDragLeave(e) {
    const trashArea = e.target.closest('.trash-area');
    if (trashArea) {
        trashArea.style.background = '#ffeaea';
        trashArea.style.borderColor = '#e74c3c';
    }
}

function handleTrashDrop(e) {
    e.preventDefault();
    
    const trashArea = e.target.closest('.trash-area');
    if (trashArea) {
        // Восстанавливаем стиль области удаления
        trashArea.style.background = '#ffeaea';
        trashArea.style.borderColor = '#e74c3c';
        
        // Удаляем кнопку
        if (currentDragElement) {
            currentDragElement.remove();
            currentDragElement = null;
            
            // Сохраняем изменения
            const blockId = extractBlockIdFromElement(trashArea);
            if (blockId) {
                generateMiniKeyboard(blockId);
            }
        }
    }
}

function handleMiniDragEnd(e) {
    console.log('Drag end');
    
    // ВОССТАНАВЛИВАЕМ opacity ВСЕХ кнопок, а не только currentDragElement
    document.querySelectorAll('.mini-button').forEach(button => {
        button.style.opacity = '1'; // Возвращаем полную непрозрачность
    });
    
    // Убираем подсветку со всех рядов
    document.querySelectorAll('.mini-row').forEach(el => {
        el.style.backgroundColor = '';
        el.style.borderColor = '';
    });
    
    // Скрываем область удаления
    const blockId = extractBlockIdFromElement(e.target);
    if (blockId) {
        const trashArea = document.getElementById(`trash_area_${blockId}`);
        if (trashArea) {
            trashArea.style.display = 'none';
            trashArea.style.background = '#ffeaea';
            trashArea.style.borderColor = '#e74c3c';
        }
    }
    
    currentDragElement = null;
}

// Добавьте эту функцию для инициализации основной клавиатуры
function initMainDragAndDrop() {
    // Удаляем старые обработчики чтобы избежать дублирования
    const buttons = document.querySelectorAll('#buttonsContainer .button');
    const rows = document.querySelectorAll('#keyboardArea .row');
    
    buttons.forEach(btn => {
        btn.removeEventListener('dragstart', handleDragStart);
        btn.removeEventListener('dragend', handleDragEnd);
        btn.addEventListener('dragstart', handleDragStart);
        btn.addEventListener('dragend', handleDragEnd);
    });
    
    rows.forEach(row => {
        row.removeEventListener('dragover', handleDragOver);
        row.removeEventListener('drop', handleDrop);
        row.addEventListener('dragover', handleDragOver);
        row.addEventListener('drop', handleDrop);
    });
    
    const keyboardArea = document.getElementById('keyboardArea');
    if (keyboardArea) {
        keyboardArea.removeEventListener('dragover', handleDragOver);
        keyboardArea.removeEventListener('drop', handleDrop);
        keyboardArea.addEventListener('dragover', handleDragOver);
        keyboardArea.addEventListener('drop', handleDrop);
    }
}

function cleanupEventHandlers() {
    // Очищаем обработчики со всех кнопок
    const allButtons = document.querySelectorAll('.button');
    allButtons.forEach(btn => {
        btn.removeEventListener('dragstart', handleDragStart);
        btn.removeEventListener('dragend', handleDragEnd);
    });
    
    // Очищаем обработчики с рядов
    const allRows = document.querySelectorAll('.row');
    allRows.forEach(row => {
        row.removeEventListener('dragover', handleDragOver);
        row.removeEventListener('drop', handleDrop);
    });
    
    // Очищаем обработчики с области клавиатуры
    const keyboardArea = document.getElementById('keyboardArea');
    if (keyboardArea) {
        keyboardArea.removeEventListener('dragover', handleDragOver);
        keyboardArea.removeEventListener('drop', handleDrop);
    }
}