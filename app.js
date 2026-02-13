// Hebrew number names (1-30)
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
    20: 'עֶשְׂרִים',
    21: 'עֶשְׂרִים וְאַחַת',
    22: 'עֶשְׂרִים וּשְׁתַיִם',
    23: 'עֶשְׂרִים וְשָׁלוֹשׁ',
    24: 'עֶשְׂרִים וְאַרְבַּע',
    25: 'עֶשְׂרִים וְחָמֵשׁ',
    26: 'עֶשְׂרִים וָשֵׁשׁ',
    27: 'עֶשְׂרִים וָשֶׁבַע',
    28: 'עֶשְׂרִים וּשְׁמוֹנֶה',
    29: 'עֶשְׂרִים וָתֵשַׁע',
    30: 'שְׁלוֹשִׁים'
};

// Hebrew alphabet
const hebrewAlphabet = [
    { char: 'א', name: 'אָלֶף' },
    { char: 'ב', name: 'בֵּית' },
    { char: 'ג', name: 'גִּימֶל' },
    { char: 'ד', name: 'דָּלֶת' },
    { char: 'ה', name: 'הֵא' },
    { char: 'ו', name: 'וָו' },
    { char: 'ז', name: 'זַיִן' },
    { char: 'ח', name: 'חֵית' },
    { char: 'ט', name: 'טֵית' },
    { char: 'י', name: 'יוּד' },
    { char: 'כ', name: 'כַּף' },
    { char: 'ך', name: 'כַּף סוֹפִית' },
    { char: 'ל', name: 'לָמֶד' },
    { char: 'מ', name: 'מֵם' },
    { char: 'ם', name: 'מֵם סוֹפִית' },
    { char: 'נ', name: 'נוּן' },
    { char: 'ן', name: 'נוּן סוֹפִית' },
    { char: 'ס', name: 'סָמֶךְ' },
    { char: 'ע', name: 'עַיִן' },
    { char: 'פ', name: 'פֵּא' },
    { char: 'ף', name: 'פֵּא סוֹפִית' },
    { char: 'צ', name: 'צַדִי' },
    { char: 'ץ', name: 'צַדִי סוֹפִית' },
    { char: 'ק', name: 'קוּף' },
    { char: 'ר', name: 'רֵישׁ' },
    { char: 'ש', name: 'שִׁין' },
    { char: 'ת', name: 'תָּו' }
];

// Speech synthesis settings
const SPEECH_RATE = 0.8;
const SPEECH_PITCH = 1.0;
const SPEECH_LANG = 'he-IL';

// Global state
let currentNumber = 1;
let quizScore = 0;
let quizStreak = 0;
let currentQuizAnswer = null;
let currentLetter = 0;
let memoryCards = [];
let memoryFlipped = [];
let memoryMatched = [];
let memoryMoves = 0;
let memoryPairs = 0;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initModeNavigation();
    initLearnMode();
    initQuizMode();
    initOrderMode();
    initMemoryMode();
    initLettersMode();
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
        currentNumber = currentNumber > 1 ? currentNumber - 1 : 30;
        updateLearnDisplay();
    });
    
    document.getElementById('next-btn').addEventListener('click', () => {
        currentNumber = currentNumber < 30 ? currentNumber + 1 : 1;
        updateLearnDisplay();
    });
    
    document.getElementById('random-btn').addEventListener('click', () => {
        currentNumber = Math.floor(Math.random() * 30) + 1;
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
        speakText('ספור את הכדורים');
    });
}

function generateQuizQuestion() {
    const quizType = document.getElementById('quiz-type').value;
    currentQuizAnswer = Math.floor(Math.random() * 30) + 1;
    
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
    
    if (quizType === 'count-balls') {
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
        const random = Math.floor(Math.random() * 30) + 1;
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
let selectedCards = [];

function initOrderMode() {
    shuffleCards();
    
    document.getElementById('approve-order-btn').addEventListener('click', approveOrder);
    document.getElementById('reject-order-btn').addEventListener('click', rejectOrder);
    document.getElementById('shuffle-btn').addEventListener('click', shuffleCards);
}

function shuffleCards() {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    
    // Create shuffled array of numbers 1-30
    const numbers = Array.from({length: 30}, (_, i) => i + 1);
    numbers.sort(() => Math.random() - 0.5);
    
    numbers.forEach((num, index) => {
        const card = createCard(num, index);
        container.appendChild(card);
    });
    
    // Reset selection state
    selectedCards = [];
    updateOrderDisplay();
    
    // Clear feedback
    document.getElementById('order-feedback').textContent = '';
    document.getElementById('order-feedback').className = 'order-feedback';
}

function createCard(number, index) {
    const card = document.createElement('div');
    card.className = 'number-card';
    card.dataset.number = number;
    card.dataset.index = index;
    
    const cardNumber = document.createElement('div');
    cardNumber.className = 'card-number';
    cardNumber.textContent = number;
    
    card.appendChild(cardNumber);
    
    // Click event listener
    card.addEventListener('click', () => handleCardClick(card));
    
    return card;
}

function handleCardClick(card) {
    const number = parseInt(card.dataset.number);
    
    // Check if card is already selected
    if (card.classList.contains('selected')) {
        // Deselect card
        card.classList.remove('selected');
        card.querySelector('.card-number').textContent = number;
        
        // Remove from selected cards
        const index = selectedCards.indexOf(number);
        if (index > -1) {
            selectedCards.splice(index, 1);
        }
        
        // Update all selected cards to show new order
        updateSelectedCardsDisplay();
    } else {
        // Select card
        card.classList.add('selected');
        selectedCards.push(number);
        
        // Show only the order number on selected card
        card.querySelector('.card-number').textContent = selectedCards.length;
    }
    
    updateOrderDisplay();
}

function updateSelectedCardsDisplay() {
    // Update all selected cards to show their correct order number
    const allCards = document.querySelectorAll('.number-card');
    allCards.forEach(card => {
        if (card.classList.contains('selected')) {
            const number = parseInt(card.dataset.number);
            const orderIndex = selectedCards.indexOf(number) + 1;
            card.querySelector('.card-number').textContent = orderIndex;
        }
    });
}

function updateOrderDisplay() {
    const feedbackEl = document.getElementById('order-feedback');
    if (selectedCards.length === 0) {
        feedbackEl.textContent = 'לחץ על הקלפים לפי הסדר הנכון (1-30)';
        feedbackEl.className = 'order-feedback';
    } else if (selectedCards.length === 30) {
        feedbackEl.textContent = 'סיימת! לחץ על "אשר" לבדוק את התשובה';
        feedbackEl.className = 'order-feedback info';
    } else {
        feedbackEl.textContent = `נבחרו ${selectedCards.length} מתוך 30 קלפים`;
        feedbackEl.className = 'order-feedback info';
    }
}

function approveOrder() {
    if (selectedCards.length !== 30) {
        const feedbackEl = document.getElementById('order-feedback');
        feedbackEl.textContent = 'עליך לבחור את כל 30 הקלפים!';
        feedbackEl.className = 'order-feedback error';
        return;
    }
    
    // Check if order is correct
    let isCorrect = true;
    for (let i = 0; i < selectedCards.length; i++) {
        if (selectedCards[i] !== i + 1) {
            isCorrect = false;
            break;
        }
    }
    
    const feedbackEl = document.getElementById('order-feedback');
    
    if (isCorrect) {
        feedbackEl.textContent = '🎉 מעולה! הסדר נכון! 🎉';
        feedbackEl.className = 'order-feedback success';
        quizScore += 50;
        updateScoreDisplay();
        saveScores();
        speakText('מעולה הסדר נכון');
    } else {
        feedbackEl.textContent = '😕 לא נכון... נסה שוב!';
        feedbackEl.className = 'order-feedback error';
        speakText('לא נכון נסה שוב');
    }
}

function rejectOrder() {
    // Clear all selections
    const cards = document.querySelectorAll('.number-card');
    cards.forEach(card => {
        card.classList.remove('selected');
        const number = parseInt(card.dataset.number);
        card.querySelector('.card-number').textContent = number;
    });
    
    selectedCards = [];
    updateOrderDisplay();
    
    const feedbackEl = document.getElementById('order-feedback');
    feedbackEl.textContent = 'הבחירה נמחקה';
    feedbackEl.className = 'order-feedback';
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

// Memory Game Mode
function initMemoryMode() {
    document.getElementById('memory-size').addEventListener('change', resetMemoryGame);
    document.getElementById('memory-reset-btn').addEventListener('click', resetMemoryGame);
    resetMemoryGame();
}

function resetMemoryGame() {
    const size = parseInt(document.getElementById('memory-size').value);
    const totalCards = size * size;
    const numPairs = totalCards / 2;
    
    // Create pairs of numbers
    const numbers = [];
    for (let i = 1; i <= numPairs; i++) {
        numbers.push(i, i);
    }
    
    // Shuffle cards
    memoryCards = numbers.sort(() => Math.random() - 0.5);
    memoryFlipped = [];
    memoryMatched = [];
    memoryMoves = 0;
    memoryPairs = 0;
    
    updateMemoryDisplay();
    renderMemoryGrid(size);
}

function renderMemoryGrid(size) {
    const grid = document.getElementById('memory-grid');
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    
    memoryCards.forEach((number, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.dataset.number = number;
        
        const cardInner = document.createElement('div');
        cardInner.className = 'memory-card-inner';
        
        const cardFront = document.createElement('div');
        cardFront.className = 'memory-card-front';
        cardFront.textContent = '⚽';
        
        const cardBack = document.createElement('div');
        cardBack.className = 'memory-card-back';
        cardBack.textContent = number;
        
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        
        card.addEventListener('click', () => handleMemoryCardClick(index));
        
        grid.appendChild(card);
    });
}

function handleMemoryCardClick(index) {
    // Don't allow clicking on already matched or currently flipped cards
    if (memoryMatched.includes(index) || memoryFlipped.includes(index)) {
        return;
    }
    
    // Don't allow more than 2 cards flipped at once
    if (memoryFlipped.length >= 2) {
        return;
    }
    
    // Flip the card
    memoryFlipped.push(index);
    const card = document.querySelector(`.memory-card[data-index="${index}"]`);
    card.classList.add('flipped');
    
    // Check for match when 2 cards are flipped
    if (memoryFlipped.length === 2) {
        memoryMoves++;
        updateMemoryDisplay();
        
        const [first, second] = memoryFlipped;
        const firstNumber = memoryCards[first];
        const secondNumber = memoryCards[second];
        
        if (firstNumber === secondNumber) {
            // Match found
            memoryMatched.push(first, second);
            memoryPairs++;
            updateMemoryDisplay();
            memoryFlipped = [];
            
            // Check if game is complete
            if (memoryMatched.length === memoryCards.length) {
                setTimeout(() => {
                    const feedbackEl = document.getElementById('memory-feedback');
                    feedbackEl.textContent = `🎉 מעולה! סיימת ב-${memoryMoves} מהלכים! 🎉`;
                    feedbackEl.className = 'memory-feedback success';
                    quizScore += 100;
                    updateScoreDisplay();
                    saveScores();
                    speakText('מעולה');
                }, 300);
            }
        } else {
            // No match
            setTimeout(() => {
                const firstCard = document.querySelector(`.memory-card[data-index="${first}"]`);
                const secondCard = document.querySelector(`.memory-card[data-index="${second}"]`);
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                memoryFlipped = [];
            }, 1000);
        }
    }
}

function updateMemoryDisplay() {
    document.getElementById('memory-moves').textContent = memoryMoves;
    document.getElementById('memory-pairs').textContent = memoryPairs;
}

// Letters Game Mode
function initLettersMode() {
    updateLettersDisplay();
    
    document.getElementById('letter-prev-btn').addEventListener('click', () => {
        currentLetter = currentLetter > 0 ? currentLetter - 1 : hebrewAlphabet.length - 1;
        updateLettersDisplay();
    });
    
    document.getElementById('letter-next-btn').addEventListener('click', () => {
        currentLetter = currentLetter < hebrewAlphabet.length - 1 ? currentLetter + 1 : 0;
        updateLettersDisplay();
    });
    
    document.getElementById('letter-random-btn').addEventListener('click', () => {
        currentLetter = Math.floor(Math.random() * hebrewAlphabet.length);
        updateLettersDisplay();
    });
    
    document.getElementById('letter-speak-btn').addEventListener('click', () => {
        const letter = hebrewAlphabet[currentLetter];
        speakText(letter.name);
    });
}

function updateLettersDisplay() {
    const letter = hebrewAlphabet[currentLetter];
    document.getElementById('letter-char').textContent = letter.char;
    document.getElementById('letter-name').textContent = letter.name;
}
