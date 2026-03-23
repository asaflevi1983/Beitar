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

// Final letters (sofit) pairs - mapping from final to regular form
const sofitLetters = [
    { final: 'ך', regular: 'כ', name: 'כַּף' },
    { final: 'ם', regular: 'מ', name: 'מֵם' },
    { final: 'ן', regular: 'נ', name: 'נוּן' },
    { final: 'ף', regular: 'פ', name: 'פֵּא' },
    { final: 'ץ', regular: 'צ', name: 'צַדִי' }
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
let lettersMemoryCards = [];
let lettersMemoryFlipped = [];
let lettersMemoryMatched = [];
let lettersMemoryMoves = 0;
let lettersMemoryPairs = 0;

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
    initModeNavigation();
    initLearnMode();
    initQuizMode();
    initMemoryMode();
    initLettersMode();
    initLettersMemoryMode();
    initPlayersMode();
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
        const quizType = document.getElementById('quiz-type').value;
        const promptEl = document.getElementById('quiz-prompt');
        speakText(promptEl.textContent);
    });
}

function generateQuizQuestion() {
    const quizType = document.getElementById('quiz-type').value;
    
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
        // Limit count-balls to max 10 for easier counting
        const maxNumber = 10;
        currentQuizAnswer = Math.floor(Math.random() * maxNumber) + 1;
        
        promptEl.textContent = 'כמה כדורים יש?';
        for (let i = 0; i < currentQuizAnswer; i++) {
            const ball = document.createElement('span');
            ball.className = 'soccer-ball';
            ball.textContent = '⚽';
            ball.style.animationDelay = `${i * 0.05}s`;
            ballsEl.appendChild(ball);
        }
        options = generateOptions(currentQuizAnswer, false, quizType);
    } else if (quizType === 'match-sofit') {
        // Pick a random final letter
        const randomIndex = Math.floor(Math.random() * sofitLetters.length);
        const sofitPair = sofitLetters[randomIndex];
        currentQuizAnswer = sofitPair.regular;
        
        promptEl.textContent = 'מה האות הרגילה של האות הסופית?';
        
        // Display the final letter
        const letterDisplay = document.createElement('div');
        letterDisplay.className = 'letter-large';
        letterDisplay.textContent = sofitPair.final;
        letterDisplay.style.fontSize = '120px';
        letterDisplay.style.margin = '20px auto';
        ballsEl.appendChild(letterDisplay);
        
        // Generate options: all 5 regular letters from sofit pairs
        options = sofitLetters.map(pair => ({
            value: pair.regular,
            text: pair.regular
        }));
        // Shuffle options
        options = options.sort(() => Math.random() - 0.5);
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

function generateOptions(correctAnswer, useWords, quizType) {
    const options = [{ value: correctAnswer, text: useWords ? hebrewNumbers[correctAnswer] : correctAnswer }];
    
    // Generate 3 random wrong answers
    // Limit to max 10 for count-balls mode, otherwise use 30
    const maxNumber = quizType === 'count-balls' ? 10 : 30;
    const used = new Set([correctAnswer]);
    while (options.length < 4) {
        const random = Math.floor(Math.random() * maxNumber) + 1;
        if (!used.has(random)) {
            used.add(random);
            options.push({ value: random, text: useWords ? hebrewNumbers[random] : random });
        }
    }
    
    // Shuffle options
    return options.sort(() => Math.random() - 0.5);
}

function handleQuizAnswer(selectedAnswer, btn) {
    const quizType = document.getElementById('quiz-type').value;
    const optionsEl = document.getElementById('quiz-options');
    const feedbackEl = document.getElementById('quiz-feedback');
    const allOptions = optionsEl.querySelectorAll('.quiz-option');
    
    // Disable all options
    allOptions.forEach(opt => {
        opt.classList.add('disabled');
        if (opt === btn) {
            opt.classList.add(selectedAnswer === currentQuizAnswer ? 'correct' : 'wrong');
        } else {
            // Check if this option is the correct answer
            let isCorrect = false;
            if (quizType === 'match-sofit') {
                isCorrect = opt.textContent === currentQuizAnswer;
            } else {
                // handles both number and Hebrew word for count-balls mode
                const optValue = parseInt(opt.textContent);
                isCorrect = (!isNaN(optValue) && optValue === currentQuizAnswer) || 
                           opt.textContent === hebrewNumbers[currentQuizAnswer];
            }
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
        speakText('אני אוהב אותך ביתר , ביתר אלופה , ביתר מקום ראשון');
    } else {
        quizStreak = 0;
        if (quizType === 'match-sofit') {
            feedbackEl.textContent = `לא נכון. התשובה הנכונה: ${currentQuizAnswer}`;
        } else {
            feedbackEl.textContent = `לא נכון. התשובה הנכונה: ${hebrewNumbers[currentQuizAnswer]} (${currentQuizAnswer})`;
        }
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
                    speakText('אני אוהב אותך ביתר , ביתר אלופה , ביתר מקום ראשון');
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

// Letters Memory Game Mode
function initLettersMemoryMode() {
    document.getElementById('letters-memory-size').addEventListener('change', resetLettersMemoryGame);
    document.getElementById('letters-memory-reset-btn').addEventListener('click', resetLettersMemoryGame);
    resetLettersMemoryGame();
}

function resetLettersMemoryGame() {
    const size = parseInt(document.getElementById('letters-memory-size').value);
    const totalCards = size * size;
    const numPairs = totalCards / 2;
    
    // Create pairs of letters (using first numPairs letters from alphabet)
    const letters = [];
    for (let i = 0; i < numPairs; i++) {
        const letter = hebrewAlphabet[i];
        letters.push(letter, letter);
    }
    
    // Shuffle cards
    lettersMemoryCards = letters.sort(() => Math.random() - 0.5);
    lettersMemoryFlipped = [];
    lettersMemoryMatched = [];
    lettersMemoryMoves = 0;
    lettersMemoryPairs = 0;
    
    updateLettersMemoryDisplay();
    renderLettersMemoryGrid(size);
}

function renderLettersMemoryGrid(size) {
    const grid = document.getElementById('letters-memory-grid');
    grid.innerHTML = '';
    grid.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
    
    lettersMemoryCards.forEach((letter, index) => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.index = index;
        card.dataset.letter = letter.char;
        
        const cardInner = document.createElement('div');
        cardInner.className = 'memory-card-inner';
        
        const cardFront = document.createElement('div');
        cardFront.className = 'memory-card-front';
        cardFront.textContent = '⚽';
        
        const cardBack = document.createElement('div');
        cardBack.className = 'memory-card-back';
        cardBack.textContent = letter.char;
        
        cardInner.appendChild(cardFront);
        cardInner.appendChild(cardBack);
        card.appendChild(cardInner);
        
        card.addEventListener('click', () => handleLettersMemoryCardClick(index));
        
        grid.appendChild(card);
    });
}

function handleLettersMemoryCardClick(index) {
    // Don't allow clicking on already matched or currently flipped cards
    if (lettersMemoryMatched.includes(index) || lettersMemoryFlipped.includes(index)) {
        return;
    }
    
    // Don't allow more than 2 cards flipped at once
    if (lettersMemoryFlipped.length >= 2) {
        return;
    }
    
    // Flip the card
    lettersMemoryFlipped.push(index);
    const card = document.querySelector(`#letters-memory-grid .memory-card[data-index="${index}"]`);
    card.classList.add('flipped');
    
    // Speak the letter when flipped
    const letter = lettersMemoryCards[index];
    speakText(letter.name);
    
    // Check for match when 2 cards are flipped
    if (lettersMemoryFlipped.length === 2) {
        lettersMemoryMoves++;
        updateLettersMemoryDisplay();
        
        const [first, second] = lettersMemoryFlipped;
        const firstLetter = lettersMemoryCards[first];
        const secondLetter = lettersMemoryCards[second];
        
        if (firstLetter.char === secondLetter.char) {
            // Match found
            lettersMemoryMatched.push(first, second);
            lettersMemoryPairs++;
            updateLettersMemoryDisplay();
            lettersMemoryFlipped = [];
            
            // Check if game is complete
            if (lettersMemoryMatched.length === lettersMemoryCards.length) {
                setTimeout(() => {
                    const feedbackEl = document.getElementById('letters-memory-feedback');
                    feedbackEl.textContent = `🎉 מעולה! סיימת ב-${lettersMemoryMoves} מהלכים! 🎉`;
                    feedbackEl.className = 'memory-feedback success';
                    quizScore += 100;
                    updateScoreDisplay();
                    saveScores();
                    speakText('אני אוהב אותך ביתר , ביתר אלופה , ביתר מקום ראשון');
                }, 300);
            }
        } else {
            // No match
            setTimeout(() => {
                const firstCard = document.querySelector(`#letters-memory-grid .memory-card[data-index="${first}"]`);
                const secondCard = document.querySelector(`#letters-memory-grid .memory-card[data-index="${second}"]`);
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                lettersMemoryFlipped = [];
            }, 1000);
        }
    }
}

function updateLettersMemoryDisplay() {
    document.getElementById('letters-memory-moves').textContent = lettersMemoryMoves;
    document.getElementById('letters-memory-pairs').textContent = lettersMemoryPairs;
}

// Players Game Mode
const beitarPlayers = [
    { name: 'אבי נמני', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Avi_Nimni_new.jpg/330px-Avi_Nimni_new.jpg' },
    { name: 'אבירם ברוכיאן', image: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/%D7%90%D7%91%D7%99%D7%A8%D7%9D_%D7%91%D7%A8%D7%95%D7%9B%D7%99%D7%90%D7%9F_2014.jpg' },
    { name: 'אורן ביטון', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/%D7%90%D7%95%D7%A8%D7%9F_%D7%91%D7%99%D7%98%D7%95%D7%9F_2025.jpg/330px-%D7%90%D7%95%D7%A8%D7%9F_%D7%91%D7%99%D7%98%D7%95%D7%9F_2025.jpg' },
    { name: 'איציק זוהר', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Itzik_Zohar.jpg/330px-Itzik_Zohar.jpg' },
    { name: 'איתי שכטר', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28019%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28019%29.jpg' },
    { name: 'אלי אוחנה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Eli_Ohana%2C_August_2017_%284972%29_%28crop%29.jpg/330px-Eli_Ohana%2C_August_2017_%284972%29_%28crop%29.jpg' },
    { name: 'אלירן דנין', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/MHFC-Eliran-Danin.jpg' },
    { name: 'אלעד גבאי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Elad_Gabai.JPG/330px-Elad_Gabai.JPG' },
    { name: 'אריאל הרוש', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/%D7%90%D7%A8%D7%99%D7%90%D7%9C_%D7%94%D7%A8%D7%95%D7%A9.jpg/330px-%D7%90%D7%A8%D7%99%D7%90%D7%9C_%D7%94%D7%A8%D7%95%D7%A9.jpg' },
    { name: 'בוני גינצבורג', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/%D7%91%D7%95%D7%A0%D7%99_%D7%92%D7%99%D7%A0%D7%96%D7%91%D7%95%D7%A8%D7%92.jpeg' },
    { name: 'בן ביטון', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Ben_Bitton.JPG/330px-Ben_Bitton.JPG' },
    { name: 'ברק יצחקי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Barak_Yitzhaki.JPG/330px-Barak_Yitzhaki.JPG' },
    { name: 'גל אלברמן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Gal_Albermann.jpg/330px-Gal_Albermann.jpg' },
    { name: 'דוד אמסלם', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/David_Amsalem.jpg/330px-David_Amsalem.jpg' },
    { name: 'דוד קלטינס', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28015%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28015%29.jpg' },
    { name: 'דוד רביבו', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/David_Revivo_with_the_LA.JPG' },
    { name: 'דודו גורש', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Dudu_Goresh_%282%29.JPG/330px-Dudu_Goresh_%282%29.JPG' },
    { name: 'דור חוגי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Dor_Hugi%2C_Pojedynek_g%C5%82%C3%B3wkowy%2C_mecz_Zag%C5%82%C4%99bie_Sosnowiec_Wis%C5%82a_Krak%C3%B3w%2C_20_pa%C5%BAdziernika_2022_%28cropped%29.jpg/330px-Dor_Hugi%2C_Pojedynek_g%C5%82%C3%B3wkowy%2C_mecz_Zag%C5%82%C4%99bie_Sosnowiec_Wis%C5%82a_Krak%C3%B3w%2C_20_pa%C5%BAdziernika_2022_%28cropped%29.jpg' },
    { name: 'דור מיכה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/%D7%93%D7%95%D7%A8_%D7%9E%D7%99%D7%9B%D7%94_%D7%91%D7%90%D7%99%D7%9E%D7%95%D7%9F_%D7%91%D7%9E%D7%93%D7%99_%D7%91%D7%99%D7%AA%22%D7%A8_%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D.jpg/330px-%D7%93%D7%95%D7%A8_%D7%9E%D7%99%D7%9B%D7%94_%D7%91%D7%90%D7%99%D7%9E%D7%95%D7%9F_%D7%91%D7%9E%D7%93%D7%99_%D7%91%D7%99%D7%AA%22%D7%A8_%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D.jpg' },
    { name: 'דור מלול', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/%D7%93%D7%95%D7%A8_%D7%9E%D7%9C%D7%95%D7%9C.JPG/330px-%D7%93%D7%95%D7%A8_%D7%9E%D7%9C%D7%95%D7%9C.JPG' },
    { name: 'דן מורי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28016%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28016%29.jpg' },
    { name: 'דני פרדה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28024%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28024%29.jpg' },
    { name: 'חן עזרא', image: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/MHFC-Chen-Ezra.jpg' },
    { name: 'חנן ממן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Hanan_Maman_-_27_January_2016.JPG/330px-Hanan_Maman_-_27_January_2016.JPG' },
    { name: 'טוטו תמוז', image: 'https://upload.wikimedia.org/wikipedia/he/thumb/8/82/Toto-tamuz001.jpg/330px-Toto-tamuz001.jpg' },
    { name: 'טל בן-חיים', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tal_Ben_Haim_2015_09_16.jpg/330px-Tal_Ben_Haim_2015_09_16.jpg' },
    { name: 'יוסי בניון', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Benayoun2.jpg/330px-Benayoun2.jpg' },
    { name: 'יעקב בריהון', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28049%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28049%29.jpg' },
    { name: 'ירדן שועה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/%D7%99%D7%A8%D7%93%D7%9F_%D7%A9%D7%95%D7%A2%D7%94_%D7%91%D7%9E%D7%93%D7%99_%D7%91%D7%99%D7%AA%D7%A8_%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D_%D7%9C%D7%A4%D7%A0%D7%99_%D7%94%D7%9E%D7%A9%D7%97%D7%A7_%D7%A0%D7%92%D7%93_%D7%94%D7%A4%D7%95%D7%A2%D7%9C_%D7%AA%22%D7%90.jpg/330px-%D7%99%D7%A8%D7%93%D7%9F_%D7%A9%D7%95%D7%A2%D7%94_%D7%91%D7%9E%D7%93%D7%99_%D7%91%D7%99%D7%AA%D7%A8_%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D_%D7%9C%D7%A4%D7%A0%D7%99_%D7%94%D7%9E%D7%A9%D7%97%D7%A7_%D7%A0%D7%92%D7%93_%D7%94%D7%A4%D7%95%D7%A2%D7%9C_%D7%AA%22%D7%90.jpg' },
    { name: 'ליאור אסולין', image: 'https://upload.wikimedia.org/wikipedia/he/thumb/2/2d/%D7%9C%D7%99%D7%90%D7%95%D7%A8_%D7%90%D7%A1%D7%95%D7%9C%D7%99%D7%9F.png/330px-%D7%9C%D7%99%D7%90%D7%95%D7%A8_%D7%90%D7%A1%D7%95%D7%9C%D7%99%D7%9F.png' },
    { name: 'מאור בוזגלו', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Maor_Buzaglo_March_28-30%2C_2022_48_%28cropped%29.jpg/330px-Maor_Buzaglo_March_28-30%2C_2022_48_%28cropped%29.jpg' },
    { name: 'מאור מליקסון', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Maor_Melikson2.jpg/330px-Maor_Melikson2.jpg' },
    { name: 'נאור סבג', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28104%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28104%29.jpg' },
    { name: 'ניסים אלמליח', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Nissim_al2.jpg/330px-Nissim_al2.jpg' },
    { name: 'עומר אצילי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28018%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28018%29.jpg' },
    { name: 'עופר טלקר', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Ofer_Talker.jpg/330px-Ofer_Talker.jpg' },
    { name: 'עידן ורד', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Idan_Vered_December_2016.jpg/330px-Idan_Vered_December_2016.jpg' },
    { name: 'עידן טל', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Idan_Tal.jpg/330px-Idan_Tal.jpg' },
    { name: 'עמיר תורג\'מן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/AmirTurgeman.jpg/330px-AmirTurgeman.jpg' },
    { name: 'צחי אליחן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Tzahi_Elihen.JPG/330px-Tzahi_Elihen.JPG' },
    { name: 'ראובן עטר', image: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/MHFC-Reuven-Atar.jpg' },
    { name: 'רועי זיקרי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28036%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28036%29.jpg' },
    { name: 'שון גולדברג', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Sean_Goldberg_-_%D7%A9%D7%95%D7%9F_%D7%92%D7%95%D7%9C%D7%93%D7%91%D7%A8%D7%92_%28cropped%29.jpg/330px-Sean_Goldberg_-_%D7%A9%D7%95%D7%9F_%D7%92%D7%95%D7%9C%D7%93%D7%91%D7%A8%D7%92_%28cropped%29.jpg' },
    { name: 'שי הולצמן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Holzman1.jpg/330px-Holzman1.jpg' },
    { name: 'שלום אביטן', image: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Shalom_Avitan_1.jpg' },
    { name: 'שלומי אביסידריס', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28044%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28044%29.jpg' },
    { name: 'שלומי ארבייטמן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Shlomi_Arbeitman_BS.JPG/330px-Shlomi_Arbeitman_BS.JPG' },
    { name: 'שמואל מלול', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Shmulik_Malul.JPG/330px-Shmulik_Malul.JPG' },
    { name: 'אבי ריקן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Rikan_%28crop%29.JPG/330px-Rikan_%28crop%29.JPG' },
    { name: 'אופיר קריאף', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Ofir_Kriaf.JPG/330px-Ofir_Kriaf.JPG' },
    { name: 'אורי מגבו', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28052%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28052%29.jpg' },
    { name: 'איציק קורנפיין', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Itzik_Kornfein%2C_August_2017_%284972%29_%28cropped%29.jpg/330px-Itzik_Kornfein%2C_August_2017_%284972%29_%28cropped%29.jpg' },
    { name: 'איתמר ניצן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/%D7%90%D7%99%D7%AA%D7%9E%D7%A8_%D7%A0%D7%99%D7%A6%D7%9F_%D7%91%D7%9E%D7%93%D7%99_%D7%9E%D7%9B%D7%91%D7%99_%D7%A0%D7%AA%D7%A0%D7%99%D7%94_2022.jpg/330px-%D7%90%D7%99%D7%AA%D7%9E%D7%A8_%D7%A0%D7%99%D7%A6%D7%9F_%D7%91%D7%9E%D7%93%D7%99_%D7%9E%D7%9B%D7%91%D7%99_%D7%A0%D7%AA%D7%A0%D7%99%D7%94_2022.jpg' },
    { name: 'איתן טיבי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/DK-Maccabi_%281%29.jpg/330px-DK-Maccabi_%281%29.jpg' },
    { name: 'אלון חרזי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Alon_Harazi.jpg/330px-Alon_Harazi.jpg' },
    { name: 'אלירן עטר', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/%D7%A2%D7%98%D7%A8_%D7%A2%D7%9D_%D7%90%D7%95%D7%94%D7%93%D7%99%D7%9D.jpg/330px-%D7%A2%D7%98%D7%A8_%D7%A2%D7%9D_%D7%90%D7%95%D7%94%D7%93%D7%99%D7%9D.jpg' },
    { name: 'בוריס אינו', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Boris_Enow_and_Eden_Kartsev.jpg/330px-Boris_Enow_and_Eden_Kartsev.jpg' },
    { name: 'בוריס קליימן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28014%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28014%29.jpg' },
    { name: 'גריגורי מורוזוב', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Grigori_Morozov_2020.jpg/330px-Grigori_Morozov_2020.jpg' },
    { name: 'דובב גבאי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28031%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28031%29.jpg' },
    { name: 'דוד קרקו', image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/David_Karako.jpg' },
    { name: 'דנילו אספרייה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Asprilla_in_2024.jpg/330px-Asprilla_in_2024.jpg' },
    { name: 'חיים סילבס', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Haim_Silvas.JPG/330px-Haim_Silvas.JPG' },
    { name: 'יובל אשכנזי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/%D7%99%D7%95%D7%91%D7%9C_%D7%90%D7%A9%D7%9B%D7%A0%D7%96%D7%99_-_Yuval_Ashkenazi_%28cropped%29.jpg/330px-%D7%99%D7%95%D7%91%D7%9C_%D7%90%D7%A9%D7%9B%D7%A0%D7%96%D7%99_-_Yuval_Ashkenazi_%28cropped%29.jpg' },
    { name: 'יוסי מזרחי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Yossi_Mizrahi_9_Februar%2C_2016.jpg/330px-Yossi_Mizrahi_9_Februar%2C_2016.jpg' },
    { name: 'ירדן כהן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/%D7%99%D7%A8%D7%93%D7%9F_%D7%9B%D7%94%D7%9F_%D7%91%D7%9E%D7%93%D7%99_%D7%91%D7%99%D7%AA%22%D7%A8_%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D_%D7%9C%D7%A4%D7%A0%D7%99_%D7%94%D7%9E%D7%A9%D7%97%D7%A7_%D7%A0%D7%92%D7%93_%D7%9E%D7%9B%D7%91%D7%99_%D7%A0%D7%AA%D7%A0%D7%99%D7%94_2026.png/330px-%D7%99%D7%A8%D7%93%D7%9F_%D7%9B%D7%94%D7%9F_%D7%91%D7%9E%D7%93%D7%99_%D7%91%D7%99%D7%AA%22%D7%A8_%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D_%D7%9C%D7%A4%D7%A0%D7%99_%D7%94%D7%9E%D7%A9%D7%97%D7%A7_%D7%A0%D7%92%D7%93_%D7%9E%D7%9B%D7%91%D7%99_%D7%A0%D7%AA%D7%A0%D7%99%D7%94_2026.png' },
    { name: 'כפיר אדרי', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Kfir_Edri.JPG' },
    { name: 'לוקה גדראני', image: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Luka_Gadrani%2C_Esteghlal_FC_vs_Shahin_Bushehr_FC%2C_14_December_2019.jpg' },
    { name: 'לי און מזרחי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/%D7%9C%D7%99_%D7%90%D7%95%D7%9F_%D7%9E%D7%96%D7%A8%D7%97%D7%99_%D7%91%D7%9E%D7%97%D7%A0%D7%94_%D7%94%D7%90%D7%99%D7%9E%D7%95%D7%A0%D7%99%D7%9D_%D7%91%D7%90%D7%99%D7%9C%D7%AA.jpg/330px-%D7%9C%D7%99_%D7%90%D7%95%D7%9F_%D7%9E%D7%96%D7%A8%D7%97%D7%99_%D7%91%D7%9E%D7%97%D7%A0%D7%94_%D7%94%D7%90%D7%99%D7%9E%D7%95%D7%A0%D7%99%D7%9D_%D7%91%D7%90%D7%99%D7%9C%D7%AA.jpg' },
    { name: 'לידור כהן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28034%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28034%29.jpg' },
    { name: 'לירן רוטמן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Liran_Rotman_%28cropped%29.jpg/330px-Liran_Rotman_%28cropped%29.jpg' },
    { name: 'מיגל סילבה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Miguel_Macedo_Silva.jpg/330px-Miguel_Macedo_Silva.jpg' },
    { name: 'מיכאל אוחנה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/%D7%9E%D7%99%D7%9B%D7%90%D7%9C_%D7%90%D7%95%D7%97%D7%A0%D7%94.jpg/330px-%D7%9E%D7%99%D7%9B%D7%90%D7%9C_%D7%90%D7%95%D7%97%D7%A0%D7%94.jpg' },
    { name: 'משה סלקטר', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/MHFC-Moshe-Selecter.jpg' },
    { name: 'ניקו אולסק', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/%D7%A0%D7%99%D7%A7%D7%95_%D7%90%D7%95%D7%9C%D7%A1%D7%A7_Nico_Olsak.jpg/330px-%D7%A0%D7%99%D7%A7%D7%95_%D7%90%D7%95%D7%9C%D7%A1%D7%A7_Nico_Olsak.jpg' },
    { name: 'ניר סביליה', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/MHFC-Nir-Sevillia.jpg' },
    { name: 'עוז ראלי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Oz_Raly.jpg/330px-Oz_Raly.jpg' },
    { name: 'עמית בן שושן', image: 'https://upload.wikimedia.org/wikipedia/commons/9/93/%D7%A2%D7%9E%D7%99%D7%AA_%D7%91%D7%9F_%D7%A9%D7%95%D7%A9%D7%9F_%D7%A7%D7%A4%D7%98%D7%9F_%D7%91%D7%99%D7%AA%22%D7%A8_%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D.png' },
    { name: 'ערן לוי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/%D7%A2%D7%A8%D7%9F_%D7%9C%D7%95%D7%99_2012.png/330px-%D7%A2%D7%A8%D7%9F_%D7%9C%D7%95%D7%99_2012.png' },
    { name: 'פליקס חלפון', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/%D7%A4%D7%9C%D7%99%D7%A7%D7%A1_%D7%97%D7%9C%D7%A4%D7%95%D7%9F_%D7%9E%D7%AA%D7%95%D7%9A_%D7%A1%D7%9C%D7%99%D7%97%D7%94_%D7%A2%D7%9C_%D7%94%D7%A9%D7%90%D7%9C%D7%94_%D7%AA%D7%95%D7%9B%D7%A0%D7%99%D7%AA_%D7%A9%D7%9C_%D7%9B%D7%90%D7%9F_11.jpg/330px-%D7%A4%D7%9C%D7%99%D7%A7%D7%A1_%D7%97%D7%9C%D7%A4%D7%95%D7%9F_%D7%9E%D7%AA%D7%95%D7%9A_%D7%A1%D7%9C%D7%99%D7%97%D7%94_%D7%A2%D7%9C_%D7%94%D7%A9%D7%90%D7%9C%D7%94_%D7%AA%D7%95%D7%9B%D7%A0%D7%99%D7%AA_%D7%A9%D7%9C_%D7%9B%D7%90%D7%9F_11.jpg' },
    { name: 'קובי מויאל', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28027%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28027%29.jpg' },
    { name: 'רועי הרמן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Roi_Herman.jpg/330px-Roi_Herman.jpg' },
    { name: 'שי חדד', image: 'https://upload.wikimedia.org/wikipedia/commons/7/77/%D7%A9%D7%99_%D7%97%D7%93%D7%93.jpg' },
    { name: 'שי קונסטנטין', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/%D7%A9%D7%99_%D7%A7%D7%95%D7%A0%D7%A1%D7%98%D7%A0%D7%98%D7%99%D7%9F_2021.jpg/330px-%D7%A9%D7%99_%D7%A7%D7%95%D7%A0%D7%A1%D7%98%D7%A0%D7%98%D7%99%D7%9F_2021.jpg' },
    { name: 'שניר משען', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28043%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28043%29.jpg' },
    { name: 'תומר סויסה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Tomer_Swisa.jpg/330px-Tomer_Swisa.jpg' },
];

let currentPlayer = null;

function initPlayersMode() {
    generatePlayerQuestion();
}

function generatePlayerQuestion() {
    const feedbackEl = document.getElementById('players-feedback');
    const optionsEl = document.getElementById('players-options');
    feedbackEl.textContent = '';
    feedbackEl.className = 'quiz-feedback';
    optionsEl.innerHTML = '';
    
    // Pick a random player
    const playerIndex = Math.floor(Math.random() * beitarPlayers.length);
    currentPlayer = beitarPlayers[playerIndex];
    
    // Set image and era
    document.getElementById('player-image').src = currentPlayer.image;
    document.getElementById('player-era').textContent = 'שחקן';
    
    // Generate 4 options (1 correct + 3 wrong)
    const wrongPlayers = beitarPlayers.filter(p => p.name !== currentPlayer.name);
    const shuffledWrong = wrongPlayers.sort(() => Math.random() - 0.5).slice(0, 3);
    const options = [currentPlayer, ...shuffledWrong].sort(() => Math.random() - 0.5);
    
    options.forEach(player => {
        const btn = document.createElement('button');
        btn.className = 'quiz-option';
        btn.textContent = player.name;
        btn.addEventListener('click', () => handlePlayerAnswer(player.name, btn));
        optionsEl.appendChild(btn);
    });
    
    // Update score display
    document.getElementById('players-score').textContent = quizScore;
    document.getElementById('players-streak').textContent = quizStreak;
}

function handlePlayerAnswer(selectedName, btn) {
    const optionsEl = document.getElementById('players-options');
    const feedbackEl = document.getElementById('players-feedback');
    const allOptions = optionsEl.querySelectorAll('.quiz-option');
    const isCorrect = selectedName === currentPlayer.name;
    
    // Disable all options and highlight
    allOptions.forEach(opt => {
        opt.classList.add('disabled');
        if (opt.textContent === currentPlayer.name) {
            opt.classList.add('correct');
        }
        if (opt === btn && !isCorrect) {
            opt.classList.add('wrong');
        }
    });
    
    if (isCorrect) {
        quizScore += 10;
        quizStreak++;
        feedbackEl.textContent = '🎊 !כל הכבוד 🎊';
        feedbackEl.className = 'quiz-feedback correct';
        speakText('אני אוהב אותך ביתר');
    } else {
        quizStreak = 0;
        feedbackEl.textContent = `לא נכון. זה ${currentPlayer.name}`;
        feedbackEl.className = 'quiz-feedback wrong';
        speakText('לא נכון');
    }
    
    updateScoreDisplay();
    document.getElementById('players-score').textContent = quizScore;
    document.getElementById('players-streak').textContent = quizStreak;
    saveScores();
    
    setTimeout(() => {
        generatePlayerQuestion();
    }, 2000);
}
