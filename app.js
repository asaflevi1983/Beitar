// Hebrew number names (1-20)
const hebrewNumbers = {
    1: 'אחת',
    2: 'שתיים',
    3: 'שלוש',
    4: 'אַרְבַּע',
    5: 'חָמֵשׁ',
    6: 'שֵׁשׁ',
    7: 'שֶׁבַע',
    8: 'שְׁמוֹנֶה',
    9: 'תֵּשַׁע',
    10: 'עֶשֶׂר',
    11: 'אַחַת עֶשְׂרֵה',
    12: 'שְׁתֵּים עֶשְׂרֵה',
    13: 'שְׁלוֹש עֶשְׂרֵה',
    14: 'אַרְבַּע עֶשְׂרֵה',
    15: 'חֲמֵשׁ עֶשְׂרֵה',
    16: 'שֵׁשׁ עֶשְׂרֵה',
    17: 'שְׁבַע עֶשְׂרֵה',
    18: 'שְׁמוֹנֶה עֶשְׂרֵה',
    19: 'תְּשַׁע עֶשְׂרֵה',
    20: 'עֶשְׂרִים'
};

// Speech synthesis settings
const SPEECH_RATE = 0.8;
const SPEECH_PITCH = 1.0;
const SPEECH_LANG = 'he-IL';

// Global state
let currentNumber = 1;
let quizScore = 0;
let quizStreak = 0;
let currentQuizAnswer = null;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initModeNavigation();
    initLearnMode();
    initQuizMode();
    initOrderMode();
    loadScores();
});

// Mode Navigation
function initModeNavigation() {
    const modeButtons = document.querySelectorAll('.mode-btn');
    const modeSections = document.querySelectorAll('.mode-section');
    
    modeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const mode = btn.dataset.mode;
            
            // Update buttons
            modeButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Update sections
            modeSections.forEach(section => {
                section.classList.remove('active');
            });
            document.getElementById(`${mode}-mode`).classList.add('active');
        });
    });
}

// Learn Mode
function initLearnMode() {
    updateLearnDisplay();
    
    document.getElementById('prev-btn').addEventListener('click', () => {
        currentNumber = currentNumber > 1 ? currentNumber - 1 : 20;
        updateLearnDisplay();
    });
    
    document.getElementById('next-btn').addEventListener('click', () => {
        currentNumber = currentNumber < 20 ? currentNumber + 1 : 1;
        updateLearnDisplay();
    });
    
    document.getElementById('random-btn').addEventListener('click', () => {
        currentNumber = Math.floor(Math.random() * 20) + 1;
        updateLearnDisplay();
    });
    
    document.getElementById('speak-btn').addEventListener('click', () => {
        speakText(hebrewNumbers[currentNumber]);
    });
}

function updateLearnDisplay() {
    document.getElementById('learn-number').textContent = currentNumber;
    document.getElementById('learn-word').textContent = hebrewNumbers[currentNumber];
    
    // Update soccer balls
    const ballsContainer = document.getElementById('soccer-balls');
    ballsContainer.innerHTML = '';
    for (let i = 0; i < currentNumber; i++) {
        const ball = document.createElement('span');
        ball.className = 'soccer-ball';
        ball.textContent = '⚽';
        ball.style.animationDelay = `${i * 0.1}s`;
        ballsContainer.appendChild(ball);
    }
}

// Quiz Mode
function initQuizMode() {
    document.getElementById('quiz-type').addEventListener('change', generateQuizQuestion);
    generateQuizQuestion();
    
    document.getElementById('quiz-speak-btn').addEventListener('click', () => {
        const quizType = document.getElementById('quiz-type').value;
        if (quizType === 'word-to-number') {
            speakText(hebrewNumbers[currentQuizAnswer]);
        } else if (quizType === 'number-to-word') {
            speakText(currentQuizAnswer.toString());
        } else if (quizType === 'count-balls') {
            speakText('ספור את הכדורים');
        }
    });
}

function generateQuizQuestion() {
    const quizType = document.getElementById('quiz-type').value;
    currentQuizAnswer = Math.floor(Math.random() * 20) + 1;
    
    const promptEl = document.getElementById('quiz-prompt');
    const ballsEl = document.getElementById('quiz-balls');
    const optionsEl = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    
    // Clear previous state
    ballsEl.innerHTML = '';
    optionsEl.innerHTML = '';
    feedbackEl.textContent = '';
    feedbackEl.className = 'quiz-feedback';
    
    let options = [];
    
    if (quizType === 'word-to-number') {
        promptEl.textContent = hebrewNumbers[currentQuizAnswer];
        options = generateOptions(currentQuizAnswer, false);
    } else if (quizType === 'number-to-word') {
        promptEl.textContent = currentQuizAnswer;
        options = generateOptions(currentQuizAnswer, true);
    } else if (quizType === 'count-balls') {
        promptEl.textContent = 'כמה כדורים יש?';
        for (let i = 0; i < currentQuizAnswer; i++) {
            const ball = document.createElement('span');
            ball.className = 'soccer-ball';
            ball.textContent = '⚽';
            ball.style.animationDelay = `${i * 0.05}s`;
            ballsEl.appendChild(ball);
        }
        options = generateOptions(currentQuizAnswer, false);
    }
    
    // Create option buttons
    options.forEach(option => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = option.text;
        btn.addEventListener('click', () => handleQuizAnswer(option.value, btn));
        optionsEl.appendChild(btn);
    });
}

function generateOptions(correctAnswer, useWords) {
    const options = [{ value: correctAnswer, text: useWords ? hebrewNumbers[correctAnswer] : correctAnswer }];
    
    // Generate 3 random wrong answers
    const used = new Set([correctAnswer]);
    while (options.length < 4) {
        const random = Math.floor(Math.random() * 20) + 1;
        if (!used.has(random)) {
            used.add(random);
            options.push({ value: random, text: useWords ? hebrewNumbers[random] : random });
        }
    }
    
    // Shuffle options
    return options.sort(() => Math.random() - 0.5);
}

function handleQuizAnswer(selectedAnswer, btn) {
    const optionsEl = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    const allOptions = optionsEl.querySelectorAll('.quiz-option');
    
    // Disable all options
    allOptions.forEach(opt => {
        opt.classList.add('disabled');
        if (opt === btn) {
            opt.classList.add(selectedAnswer === currentQuizAnswer ? 'correct' : 'wrong');
        } else {
            // Check if this option is the correct answer (handles both number and Hebrew word)
            const optValue = parseInt(opt.textContent);
            const isCorrect = (!isNaN(optValue) && optValue === currentQuizAnswer) || 
                            opt.textContent === hebrewNumbers[currentQuizAnswer];
            if (isCorrect) {
                opt.classList.add('correct');
            }
        }
    });
    
    if (selectedAnswer === currentQuizAnswer) {
        quizScore += 10;
        quizStreak++;
        feedbackEl.textContent = `נכון! 🎉 (+10 נקודות)`;
        feedbackEl.className = 'quiz-feedback correct';
        speakText('נכון מצוין');
    } else {
        quizStreak = 0;
        feedbackEl.textContent = `לא נכון. התשובה הנכונה: ${hebrewNumbers[currentQuizAnswer]} (${currentQuizAnswer})`;
        feedbackEl.className = 'quiz-feedback wrong';
        speakText('לא נכון');
    }
    
    updateScoreDisplay();
    saveScores();
    
    // Generate new question after delay
    setTimeout(() => {
        generateQuizQuestion();
    }, 2000);
}

function updateScoreDisplay() {
    document.getElementById('score').textContent = quizScore;
    document.getElementById('streak').textContent = quizStreak;
}

// Order Mode
function initOrderMode() {
    shuffleCards();
    
    document.getElementById('check-order-btn').addEventListener('click', checkOrder);
    document.getElementById('shuffle-btn').addEventListener('click', shuffleCards);
}

function shuffleCards() {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    
    // Create shuffled array of numbers 1-20
    const numbers = Array.from({length: 20}, (_, i) => i + 1);
    numbers.sort(() => Math.random() - 0.5);
    
    numbers.forEach((num, index) => {
        const card = createCard(num, index);
        container.appendChild(card);
    });
    
    // Clear feedback
    document.getElementById('order-feedback').textContent = '';
    document.getElementById('order-feedback').className = 'order-feedback';
}

function createCard(number, index) {
    const card = document.createElement('div');
    card.className = 'number-card';
    card.draggable = true;
    card.dataset.number = number;
    card.dataset.index = index;
    
    const cardNumber = document.createElement('div');
    cardNumber.className = 'card-number';
    cardNumber.textContent = number;
    
    const cardWord = document.createElement('div');
    cardWord.className = 'card-word';
    cardWord.textContent = hebrewNumbers[number];
    
    card.appendChild(cardNumber);
    card.appendChild(cardWord);
    
    // Drag event listeners
    card.addEventListener('dragstart', handleDragStart);
    card.addEventListener('dragend', handleDragEnd);
    card.addEventListener('dragover', handleDragOver);
    card.addEventListener('drop', handleDrop);
    card.addEventListener('dragleave', handleDragLeave);
    
    return card;
}

let draggedCard = null;

function handleDragStart(e) {
    draggedCard = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    
    // Remove drag-over class from all cards
    document.querySelectorAll('.number-card').forEach(card => {
        card.classList.remove('drag-over');
    });
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    
    e.dataTransfer.dropEffect = 'move';
    
    if (this !== draggedCard) {
        this.classList.add('drag-over');
    }
    
    return false;
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    if (draggedCard !== this) {
        const container = document.getElementById('cards-container');
        const allCards = Array.from(container.children);
        const draggedIndex = allCards.indexOf(draggedCard);
        const targetIndex = allCards.indexOf(this);
        
        if (draggedIndex < targetIndex) {
            container.insertBefore(draggedCard, this.nextSibling);
        } else {
            container.insertBefore(draggedCard, this);
        }
    }
    
    this.classList.remove('drag-over');
    return false;
}

function checkOrder() {
    const container = document.getElementById('cards-container');
    const cards = Array.from(container.children);
    const feedbackEl = document.getElementById('order-feedback');
    
    let isCorrect = true;
    for (let i = 0; i < cards.length; i++) {
        if (parseInt(cards[i].dataset.number) !== i + 1) {
            isCorrect = false;
            break;
        }
    }
    
    if (isCorrect) {
        feedbackEl.textContent = '🎉 מעולה! הסדר נכון! 🎉';
        feedbackEl.className = 'order-feedback success';
        quizScore += 50;
        updateScoreDisplay();
        saveScores();
        speakText('מעולה הסדר נכון');
    } else {
        feedbackEl.textContent = '😕 לא בדיוק... נסה שוב!';
        feedbackEl.className = 'order-feedback error';
        speakText('נסה שוב');
    }
}

// Speech Synthesis
function speakText(text) {
    if ('speechSynthesis' in window) {
        // Cancel any ongoing speech
        window.speechSynthesis.cancel();
        
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = SPEECH_LANG;
        utterance.rate = SPEECH_RATE;
        utterance.pitch = SPEECH_PITCH;
        
        // Try to use Hebrew voice if available
        const voices = window.speechSynthesis.getVoices();
        const hebrewVoice = voices.find(voice => voice.lang.startsWith('he'));
        if (hebrewVoice) {
            utterance.voice = hebrewVoice;
        }
        
        window.speechSynthesis.speak(utterance);
    }
}

// Load voices when they become available
if ('speechSynthesis' in window) {
    speechSynthesis.addEventListener('voiceschanged', () => {
        speechSynthesis.getVoices();
    });
}

// LocalStorage for scores
function saveScores() {
    localStorage.setItem('beitarQuizScore', quizScore);
    localStorage.setItem('beitarQuizStreak', quizStreak);
}

function loadScores() {
    const savedScore = localStorage.getItem('beitarQuizScore');
    const savedStreak = localStorage.getItem('beitarQuizStreak');
    
    if (savedScore !== null) {
        quizScore = parseInt(savedScore);
    }
    if (savedStreak !== null) {
        quizStreak = parseInt(savedStreak);
    }
    
    updateScoreDisplay();
}
