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
    initPlayersMemoryMode();
    initRunnerMode();
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
    { name: 'נאנא אנטווי', image: 'assets/players/נאנא_אנטווי.png' },
    { name: 'אפמאמגאסונד גונזאלס', image: 'assets/players/אפמאמגאסונד_גונזאלס.png' },
    { name: 'לוקה גדראני', image: 'assets/players/לוקה_גדראני.png' },
    { name: 'בוריס אינו', image: 'assets/players/בוריס_אינו.png' },
    { name: 'יובל שלו', image: 'assets/players/יובל_שלו.png' },
    { name: 'רועי אלימלך', image: 'assets/players/רועי_אלימלך.png' },
    { name: 'דור חוגי', image: 'assets/players/דור_חוגי.png' },
    { name: 'בריאן קרבאלי', image: 'assets/players/בריאן_קרבאלי.png' },
    { name: 'איילסון טבארש', image: 'assets/players/איילסון_טבארש.png' },
    { name: 'יהונתן עוזר', image: 'assets/players/יהונתן_עוזר.png' },
    { name: 'ירדן כהן', image: 'assets/players/ירדן_כהן.png' },
    { name: 'זיו בן שימול', image: 'assets/players/זיו_בן_שימול.png' },
    { name: 'עומר אצילי', image: 'assets/players/עומר_אצילי.png' },
    { name: 'עדי יונה', image: 'assets/players/עדי_יונה.png' },
    { name: 'ירדן שועה', image: 'assets/players/ירדן_שועה.png' },
    { name: 'מיגל סילבה', image: 'assets/players/מיגל_סילבה.png' },
    { name: 'גיל כהן', image: 'assets/players/גיל_כהן.png' },
    { name: 'גריגורי מורוזוב', image: 'assets/players/גריגורי_מורוזוב.png' },
    { name: 'אורי דהן', image: 'assets/players/אורי_דהן.png' },
    { name: 'ירין לוי', image: 'assets/players/ירין_לוי.png' },
    { name: 'טימוטי מוזי', image: 'assets/players/טימוטי_מוזי.png' },
    { name: 'דור מיכה', image: 'assets/players/דור_מיכה.png' },
    { name: 'אבי נמני', image: 'assets/players/אבי_נמני.jpg' },
    { name: 'אבירם ברוכיאן', image: 'assets/players/אבירם_ברוכיאן.jpg' },
    { name: 'אורן ביטון', image: 'assets/players/אורן_ביטון.jpg' },
    { name: 'איציק זוהר', image: 'assets/players/איציק_זוהר.jpg' },
    { name: 'איתי שכטר', image: 'assets/players/איתי_שכטר.jpg' },
    { name: 'אלי אוחנה', image: 'assets/players/אלי_אוחנה.jpg' },
    { name: 'אלירן דנין', image: 'assets/players/אלירן_דנין.jpg' },
    { name: 'אלעד גבאי', image: 'assets/players/אלעד_גבאי.jpg' },
    { name: 'אריאל הרוש', image: 'assets/players/אריאל_הרוש.jpg' },
    { name: 'בוני גינצבורג', image: 'assets/players/בוני_גינצבורג.jpg' },
    { name: 'בן ביטון', image: 'assets/players/בן_ביטון.jpg' },
    { name: 'ברק יצחקי', image: 'assets/players/ברק_יצחקי.jpg' },
    { name: 'גל אלברמן', image: 'assets/players/גל_אלברמן.jpg' },
    { name: 'דוד קלטינס', image: 'assets/players/דוד_קלטינס.jpg' },
    { name: 'דוד רביבו', image: 'assets/players/דוד_רביבו.jpg' },
    { name: 'דודו גורש', image: 'assets/players/דודו_גורש.jpg' },
    { name: 'דור מלול', image: 'assets/players/דור_מלול.jpg' },
    { name: 'דן מורי', image: 'assets/players/דן_מורי.jpg' },
    { name: 'דני פרדה', image: 'assets/players/דני_פרדה.jpg' },
    { name: 'חן עזרא', image: 'assets/players/חן_עזרא.jpg' },
    { name: 'חנן ממן', image: 'assets/players/חנן_ממן.jpg' },
    { name: 'טוטו תמוז', image: 'assets/players/טוטו_תמוז.jpg' },
    { name: 'יוסי בניון', image: 'assets/players/יוסי_בניון.jpg' },
    { name: 'יעקב בריהון', image: 'assets/players/יעקב_בריהון.jpg' },
    { name: 'ליאור אסולין', image: 'assets/players/ליאור_אסולין.png' },
    { name: 'מאור בוזגלו', image: 'assets/players/מאור_בוזגלו.jpg' },
    { name: 'אבי ריקן', image: 'assets/players/אבי_ריקן.jpg' },
    { name: 'אופיר קריאף', image: 'assets/players/אופיר_קריאף.jpg' },
    { name: 'אורי מגבו', image: 'assets/players/אורי_מגבו.jpg' },
    { name: 'איציק קורנפיין', image: 'assets/players/איציק_קורנפיין.jpg' },
    { name: 'איתמר ניצן', image: 'assets/players/איתמר_ניצן.jpg' },
    { name: 'איתן טיבי', image: 'assets/players/איתן_טיבי.jpg' },
    { name: 'אלון חרזי', image: 'assets/players/אלון_חרזי.jpg' },
    { name: 'אלירן עטר', image: 'assets/players/אלירן_עטר.jpg' },
    { name: 'בוריס קליימן', image: 'assets/players/בוריס_קליימן.jpg' },
    { name: 'דובב גבאי', image: 'assets/players/דובב_גבאי.jpg' },
    { name: 'דוד קרקו', image: 'assets/players/דוד_קרקו.jpg' },
    { name: 'דנילו אספרייה', image: 'assets/players/דנילו_אספרייה.jpg' },
    { name: 'חיים סילבס', image: 'assets/players/חיים_סילבס.jpg' },
    { name: 'יוסי מזרחי', image: 'assets/players/יוסי_מזרחי.jpg' },
    { name: 'כפיר אדרי', image: 'assets/players/כפיר_אדרי.jpg' },
    { name: 'לי און מזרחי', image: 'assets/players/לי_און_מזרחי.jpg' },
    { name: 'לידור כהן', image: 'assets/players/לידור_כהן.jpg' },
    { name: 'לירן רוטמן', image: 'assets/players/לירן_רוטמן.jpg' },
    { name: 'מאור מליקסון', image: 'assets/players/מאור_מליקסון.jpg' },
    { name: 'מיכאל אוחנה', image: 'assets/players/מיכאל_אוחנה.jpg' },
    { name: 'משה סלקטר', image: 'assets/players/משה_סלקטר.jpg' },
    { name: 'נאור סבג', image: 'assets/players/נאור_סבג.jpg' },
    { name: 'ניסים אלמליח', image: 'assets/players/ניסים_אלמליח.jpg' },
    { name: 'ניקו אולסק', image: 'assets/players/ניקו_אולסק.jpg' },
    { name: 'ניר סביליה', image: 'assets/players/ניר_סביליה.jpg' },
    { name: 'עוז ראלי', image: 'assets/players/עוז_ראלי.jpg' },
    { name: 'עופר טלקר', image: 'assets/players/עופר_טלקר.jpg' },
    { name: 'עידן ורד', image: 'assets/players/עידן_ורד.jpg' },
    { name: 'עידן טל', image: 'assets/players/עידן_טל.jpg' },
    { name: 'עמית בן שושן', image: 'assets/players/עמית_בן_שושן.png' },
    { name: 'פליקס חלפון', image: 'assets/players/פליקס_חלפון.jpg' },
    { name: 'צחי אליחן', image: 'assets/players/צחי_אליחן.jpg' },
    { name: 'קובי מויאל', image: 'assets/players/קובי_מויאל.jpg' },
    { name: 'ראובן עטר', image: 'assets/players/ראובן_עטר.jpg' },
    { name: 'רועי הרמן', image: 'assets/players/רועי_הרמן.jpg' },
    { name: 'רועי זיקרי', image: 'assets/players/רועי_זיקרי.jpg' },
    { name: 'שון גולדברג', image: 'assets/players/שון_גולדברג.jpg' },
    { name: 'שי הולצמן', image: 'assets/players/שי_הולצמן.jpg' },
    { name: 'שי חדד', image: 'assets/players/שי_חדד.jpg' },
    { name: 'שי קונסטנטין', image: 'assets/players/שי_קונסטנטין.jpg' },
    { name: 'שלום אביטן', image: 'assets/players/שלום_אביטן.jpg' },
    { name: 'שלומי אביסידריס', image: 'assets/players/שלומי_אביסידריס.jpg' },
    { name: 'שלומי ארבייטמן', image: 'assets/players/שלומי_ארבייטמן.jpg' },
    { name: 'שמואל מלול', image: 'assets/players/שמואל_מלול.jpg' },
    { name: 'שניר משען', image: 'assets/players/שניר_משען.jpg' },
    { name: 'תומר סויסה', image: 'assets/players/תומר_סויסה.jpg' },
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
    document.getElementById('player-era').textContent = '';
    
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

// Players Memory Game Mode
function initPlayersMemoryMode() {
    let cards = [];
    let flippedCards = [];
    let matchedPairs = 0;
    let moves = 0;
    let totalPairs = 0;
    let lockBoard = false;

    const grid = document.getElementById('players-memory-grid');
    const movesEl = document.getElementById('players-memory-moves');
    const pairsEl = document.getElementById('players-memory-pairs');
    const feedbackEl = document.getElementById('players-memory-feedback');
    const sizeSelect = document.getElementById('players-memory-size');
    const resetBtn = document.getElementById('players-memory-reset-btn');

    function createGame() {
        const gridSize = parseInt(sizeSelect.value);
        totalPairs = (gridSize * gridSize) / 2;
        matchedPairs = 0;
        moves = 0;
        flippedCards = [];
        lockBoard = false;
        movesEl.textContent = '0';
        pairsEl.textContent = '0';
        feedbackEl.textContent = '';
        feedbackEl.className = 'memory-feedback';

        // Pick random players
        const shuffledPlayers = [...beitarPlayers].sort(() => Math.random() - 0.5).slice(0, totalPairs);

        // Create pairs: one card with image, one card with name
        cards = [];
        shuffledPlayers.forEach((player, i) => {
            cards.push({ id: i, type: 'image', player: player, pairId: i });
            cards.push({ id: i, type: 'name', player: player, pairId: i });
        });

        // Shuffle cards
        cards.sort(() => Math.random() - 0.5);

        // Build grid
        grid.innerHTML = '';
        grid.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;

        cards.forEach((card, index) => {
            const cardEl = document.createElement('div');
            cardEl.className = 'memory-card players-memory-card';
            cardEl.dataset.index = index;

            const inner = document.createElement('div');
            inner.className = 'memory-card-inner';

            const front = document.createElement('div');
            front.className = 'memory-card-front';
            front.textContent = '⚽';

            const back = document.createElement('div');
            back.className = 'memory-card-back';

            if (card.type === 'image') {
                const img = document.createElement('img');
                img.src = card.player.image;
                img.alt = card.player.name;
                img.className = 'player-memory-img';
                back.appendChild(img);
            } else {
                back.textContent = card.player.name;
                back.classList.add('player-memory-name');
            }

            inner.appendChild(front);
            inner.appendChild(back);
            cardEl.appendChild(inner);

            cardEl.addEventListener('click', () => flipCard(cardEl, index));
            grid.appendChild(cardEl);
        });
    }

    function flipCard(cardEl, index) {
        if (lockBoard) return;
        if (cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) return;

        cardEl.classList.add('flipped');
        flippedCards.push({ el: cardEl, index: index, card: cards[index] });

        if (flippedCards.length === 2) {
            moves++;
            movesEl.textContent = moves;
            lockBoard = true;

            const [first, second] = flippedCards;

            if (first.card.pairId === second.card.pairId) {
                // Match!
                first.el.classList.add('matched');
                second.el.classList.add('matched');
                matchedPairs++;
                pairsEl.textContent = matchedPairs;
                flippedCards = [];
                lockBoard = false;

                if (matchedPairs === totalPairs) {
                    feedbackEl.textContent = `🎊 כל הכבוד! סיימת ב-${moves} מהלכים! 🎊`;
                    feedbackEl.className = 'memory-feedback correct';
                    speakText('כל הכבוד, אני אוהב אותך ביתר');
                }
            } else {
                // No match
                setTimeout(() => {
                    first.el.classList.remove('flipped');
                    second.el.classList.remove('flipped');
                    flippedCards = [];
                    lockBoard = false;
                }, 1000);
            }
        }
    }

    resetBtn.addEventListener('click', createGame);
    sizeSelect.addEventListener('change', createGame);
    createGame();
}

// ═══════════════════════════════════════════════════════════════
// Runner Game Mode - Subway Surfer style endless runner
// ═══════════════════════════════════════════════════════════════
function initRunnerMode() {
    const section = document.getElementById('runner-mode');
    const selectScreen = document.getElementById('runner-select');
    const gameWrapper = document.getElementById('runner-game');
    const gameoverScreen = document.getElementById('runner-gameover');
    const canvas = document.getElementById('runner-canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let gameoverTimeout = null;

    // HUD elements
    const hudScore = document.getElementById('runner-score');
    const hudDist = document.getElementById('runner-distance');
    const hudHigh = document.getElementById('runner-high');

    // Game over elements
    const finalScore = document.getElementById('runner-final-score');
    const finalDist = document.getElementById('runner-final-distance');
    const finalBalls = document.getElementById('runner-final-balls');
    const finalCoins = document.getElementById('runner-final-coins');
    const finalHigh = document.getElementById('runner-final-high');

    // Pick 12 recognizable players
    const runnerPlayers = beitarPlayers.slice(0, 12);

    // Audio context for sound effects
    let audioCtx = null;
    function getAudioCtx() {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        return audioCtx;
    }
    function playTone(freq, duration, type = 'sine', vol = 0.15) {
        try {
            const a = getAudioCtx();
            const osc = a.createOscillator();
            const gain = a.createGain();
            osc.type = type;
            osc.frequency.value = freq;
            gain.gain.setValueAtTime(vol, a.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, a.currentTime + duration);
            osc.connect(gain);
            gain.connect(a.destination);
            osc.start();
            osc.stop(a.currentTime + duration);
        } catch(e) {}
    }
    function sfxCollect() { playTone(880, 0.12, 'sine', 0.12); setTimeout(() => playTone(1320, 0.1, 'sine', 0.10), 60); }
    function sfxCoin() { playTone(1047, 0.08, 'triangle', 0.12); setTimeout(() => playTone(1568, 0.15, 'triangle', 0.12), 80); }
    function sfxCrash() { playTone(120, 0.3, 'sawtooth', 0.2); playTone(80, 0.4, 'square', 0.12); }
    function sfxJump() { playTone(400, 0.08, 'sine', 0.08); setTimeout(() => playTone(600, 0.1, 'sine', 0.07), 50); }

    // Game state
    let animFrame = null;
    let gameRunning = false;
    let selectedPlayerImg = null;
    let selectedPlayerName = '';
    const preloadedImages = new Map();

    // Game variables (reset each run)
    let playerLane, playerY, playerJump, jumpVel, isJumping;
    let speed, baseSpeed, maxSpeed, accelRate;
    let obstacles, collectibles, particles, bgStars;
    let score, distance, ballsCollected, coinsCollected;
    let lastTime, shakeTimer, shakeIntensity;
    let roadLineOffset;
    let highScore;

    // Constants
    const LANE_COUNT = 3;
    const PLAYER_W = 50;
    const PLAYER_H = 70;
    const GRAVITY = 0.6;
    const JUMP_FORCE = -12;
    const OBSTACLE_INTERVAL_MIN = 40;
    const OBSTACLE_INTERVAL_MAX = 90;
    const COLLECTIBLE_INTERVAL_MIN = 25;
    const COLLECTIBLE_INTERVAL_MAX = 55;

    // Perspective constants
    const HORIZON_Y = 0.3;   // horizon at 30% from top
    const ROAD_BOTTOM = 0.95;
    const ROAD_TOP_WIDTH = 0.15;
    const ROAD_BOTTOM_WIDTH = 0.85;

    function getLaneX(lane, z) {
        // z: 0=horizon, 1=bottom
        const cw = canvas.width;
        const roadW = cw * (ROAD_TOP_WIDTH + (ROAD_BOTTOM_WIDTH - ROAD_TOP_WIDTH) * z);
        const roadLeft = (cw - roadW) / 2;
        const laneW = roadW / LANE_COUNT;
        return roadLeft + laneW * lane + laneW / 2;
    }

    function getScale(z) {
        return 0.2 + 0.8 * z;
    }

    function getY(z) {
        const hY = canvas.height * HORIZON_Y;
        const bY = canvas.height * ROAD_BOTTOM;
        return hY + (bY - hY) * z;
    }

    // ── Player Selection Grid ──
    let selectionLocked = false;

    function buildSelectScreen() {
        const grid = document.getElementById('runner-player-grid');
        grid.innerHTML = '';
        runnerPlayers.forEach((p, i) => {
            const card = document.createElement('div');
            card.className = 'runner-player-card';
            const img = document.createElement('img');
            img.src = p.image;
            img.alt = p.name;
            const span = document.createElement('span');
            span.textContent = p.name;
            card.appendChild(img);
            card.appendChild(span);
            card.addEventListener('click', () => {
                if (selectionLocked) return;
                selectionLocked = true;
                loadPlayerImage(p, () => {
                    selectedPlayerName = p.name;
                    startGame();
                });
            });
            grid.appendChild(card);

            // Preload images
            if (!preloadedImages.has(p.image)) {
                const img = new Image();
                img.src = p.image;
                img.onload = () => preloadedImages.set(p.image, img);
                img.onerror = () => preloadedImages.set(p.image, null);
            }
        });
    }

    function loadPlayerImage(player, cb) {
        if (preloadedImages.has(player.image) && preloadedImages.get(player.image)) {
            selectedPlayerImg = preloadedImages.get(player.image);
            cb();
        } else {
            const img = new Image();
            img.onload = () => { selectedPlayerImg = img; preloadedImages.set(player.image, img); cb(); };
            img.onerror = () => { selectedPlayerImg = null; cb(); };
            img.src = player.image;
        }
    }

    // ── Screen transitions ──
    function showScreen(screen) {
        selectScreen.style.display = screen === 'select' ? '' : 'none';
        gameWrapper.style.display = screen === 'game' ? '' : 'none';
        gameoverScreen.style.display = screen === 'gameover' ? '' : 'none';
        if (screen === 'select') selectionLocked = false;
    }

    // ── Canvas sizing ──
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    // ── Fullscreen helpers ──
    function enterFullscreen() {
        const el = gameWrapper;
        if (el.requestFullscreen) el.requestFullscreen();
        else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();
    }
    function exitFullscreen() {
        if (document.fullscreenElement) document.exitFullscreen();
        else if (document.webkitFullscreenElement) document.webkitExitFullscreen();
    }

    const exitBtn = document.getElementById('runner-exit-btn');
    exitBtn.addEventListener('click', () => {
        exitFullscreen();
        if (animFrame) cancelAnimationFrame(animFrame);
        animFrame = null;
        showScreen('select');
    });

    document.addEventListener('fullscreenchange', () => { if (document.fullscreenElement) resizeCanvas(); });
    window.addEventListener('resize', () => { if (gameWrapper.style.display !== 'none') resizeCanvas(); });

    // ── Reset & Start ──
    function startGame() {
        showScreen('game');
        enterFullscreen();
        resizeCanvas();
        highScore = parseInt(localStorage.getItem('beitarRunnerHighScore')) || 0;
        hudHigh.textContent = highScore;

        playerLane = 1;
        playerY = 0;
        playerJump = 0;
        jumpVel = 0;
        isJumping = false;
        baseSpeed = 0.8;
        speed = baseSpeed;
        maxSpeed = 3;
        accelRate = 0.0008;
        obstacles = [];
        collectibles = [];
        particles = [];
        bgStars = [];
        score = 0;
        distance = 0;
        ballsCollected = 0;
        coinsCollected = 0;
        lastTime = performance.now();
        shakeTimer = 0;
        shakeIntensity = 0;
        roadLineOffset = 0;

        // Generate stars
        for (let i = 0; i < 40; i++) {
            bgStars.push({ x: Math.random(), y: Math.random() * HORIZON_Y, s: Math.random() * 2 + 0.5, b: Math.random() });
        }

        nextObstacleIn = randInt(OBSTACLE_INTERVAL_MIN, OBSTACLE_INTERVAL_MAX);
        nextCollectibleIn = randInt(COLLECTIBLE_INTERVAL_MIN, COLLECTIBLE_INTERVAL_MAX);

        gameRunning = true;
        if (animFrame) cancelAnimationFrame(animFrame);
        animFrame = requestAnimationFrame(gameLoop);
    }

    let nextObstacleIn = 60;
    let nextCollectibleIn = 30;

    function randInt(a, b) { return Math.floor(Math.random() * (b - a + 1)) + a; }

    // ── Game Loop ──
    function gameLoop(ts) {
        if (!gameRunning) return;
        // Stop if section not visible
        if (!section.classList.contains('active')) {
            gameRunning = false;
            return;
        }

        const dt = Math.min((ts - lastTime) / 16.67, 3); // normalize to ~60fps, cap
        lastTime = ts;

        update(dt);
        if (!gameRunning) return; // game ended during update (collision)
        render();

        animFrame = requestAnimationFrame(gameLoop);
    }

    // ── Update ──
    function update(dt) {
        // Increase speed
        speed = Math.min(speed + accelRate * dt, maxSpeed);
        distance += speed * dt * 0.5;

        // Jump physics
        if (isJumping) {
            jumpVel += GRAVITY * dt;
            playerJump += jumpVel * dt;
            if (playerJump >= 0) {
                playerJump = 0;
                jumpVel = 0;
                isJumping = false;
            }
        }

        // Spawn obstacles
        nextObstacleIn -= dt;
        if (nextObstacleIn <= 0) {
            const lane = randInt(0, 2);
            const types = ['cone', 'barrier', 'opponent'];
            const type = types[randInt(0, 2)];
            obstacles.push({ lane, z: 0, type, hit: false });
            nextObstacleIn = randInt(OBSTACLE_INTERVAL_MIN, OBSTACLE_INTERVAL_MAX) / (speed / baseSpeed);
        }

        // Spawn collectibles
        nextCollectibleIn -= dt;
        if (nextCollectibleIn <= 0) {
            const lane = randInt(0, 2);
            const type = Math.random() < 0.3 ? 'coin' : 'ball';
            const floating = Math.random() < 0.25; // some float in the air
            collectibles.push({ lane, z: 0, type, collected: false, floating });
            nextCollectibleIn = randInt(COLLECTIBLE_INTERVAL_MIN, COLLECTIBLE_INTERVAL_MAX) / (speed / baseSpeed);
        }

        // Move obstacles & collectibles toward player
        const moveSpeed = speed * 0.012 * dt;

        for (let i = obstacles.length - 1; i >= 0; i--) {
            const o = obstacles[i];
            o.z += moveSpeed;
            if (o.z > 1.1) { obstacles.splice(i, 1); continue; }

            // Collision check (when near player z ~0.85-1.0)
            if (!o.hit && o.z > 0.82 && o.z < 1.0 && o.lane === playerLane) {
                // If jumping, skip ground obstacles
                if (isJumping && playerJump < -30) continue;
                o.hit = true;
                gameOver();
                return;
            }
        }

        for (let i = collectibles.length - 1; i >= 0; i--) {
            const c = collectibles[i];
            c.z += moveSpeed;
            if (c.z > 1.1) { collectibles.splice(i, 1); continue; }

            if (!c.collected && c.z > 0.82 && c.z < 1.0 && c.lane === playerLane) {
                // If floating collectible, only collect when jumping
                if (c.floating && playerJump > -20) continue;
                c.collected = true;
                if (c.type === 'ball') {
                    score += 1;
                    ballsCollected++;
                    sfxCollect();
                } else {
                    score += 5;
                    coinsCollected++;
                    sfxCoin();
                }
                // Spawn particles
                const px = getLaneX(c.lane, 0.9);
                const py = getY(0.9);
                for (let j = 0; j < 8; j++) {
                    particles.push({
                        x: px, y: py,
                        vx: (Math.random() - 0.5) * 6,
                        vy: (Math.random() - 0.5) * 6 - 2,
                        life: 1,
                        color: c.type === 'ball' ? '#fff' : '#ffd700',
                        size: Math.random() * 4 + 2
                    });
                }
            }
        }

        // Update particles
        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.x += p.vx * dt;
            p.y += p.vy * dt;
            p.life -= 0.03 * dt;
            if (p.life <= 0) particles.splice(i, 1);
        }

        // Screen shake
        if (shakeTimer > 0) shakeTimer -= dt;

        // Update HUD
        hudScore.textContent = score;
        hudDist.textContent = Math.floor(distance);

        // Road line animation
        roadLineOffset = (roadLineOffset + speed * dt * 2) % 40;
    }

    // ── Render ──
    function render() {
        const cw = canvas.width;
        const ch = canvas.height;
        const hY = ch * HORIZON_Y;

        // Apply screen shake
        ctx.save();
        if (shakeTimer > 0) {
            const sx = (Math.random() - 0.5) * shakeIntensity;
            const sy = (Math.random() - 0.5) * shakeIntensity;
            ctx.translate(sx, sy);
        }

        // Sky gradient
        const skyGrad = ctx.createLinearGradient(0, 0, 0, hY);
        skyGrad.addColorStop(0, '#050510');
        skyGrad.addColorStop(0.7, '#0a0a2e');
        skyGrad.addColorStop(1, '#1a1a3e');
        ctx.fillStyle = skyGrad;
        ctx.fillRect(0, 0, cw, hY + 10);

        // Stars
        bgStars.forEach(s => {
            const flicker = 0.5 + 0.5 * Math.sin(performance.now() * 0.003 + s.b * 100);
            ctx.fillStyle = `rgba(255,255,200,${0.3 + 0.5 * flicker})`;
            ctx.beginPath();
            ctx.arc(s.x * cw, s.y * ch, s.s, 0, Math.PI * 2);
            ctx.fill();
        });

        // Stadium lights (yellow glow on horizon)
        for (let i = 0; i < 4; i++) {
            const lx = cw * (0.15 + i * 0.23);
            const ly = hY - 20;
            // Pole
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(lx, ly);
            ctx.lineTo(lx, ly - 40);
            ctx.stroke();
            // Glow
            const glow = ctx.createRadialGradient(lx, ly - 45, 2, lx, ly - 45, 60);
            glow.addColorStop(0, 'rgba(255,215,0,0.4)');
            glow.addColorStop(0.5, 'rgba(255,215,0,0.1)');
            glow.addColorStop(1, 'rgba(255,215,0,0)');
            ctx.fillStyle = glow;
            ctx.fillRect(lx - 60, ly - 105, 120, 120);
        }

        // Ground / pitch
        const groundGrad = ctx.createLinearGradient(0, hY, 0, ch);
        groundGrad.addColorStop(0, '#0d3d0d');
        groundGrad.addColorStop(0.3, '#1a4d1a');
        groundGrad.addColorStop(1, '#143d14');
        ctx.fillStyle = groundGrad;
        ctx.fillRect(0, hY, cw, ch - hY);

        // Road surface
        drawRoad(cw, ch, hY);

        // Lane markings
        drawLaneMarkings(cw, ch, hY);

        // Draw objects sorted by z (far to near)
        const allObjects = [
            ...obstacles.map(o => ({ ...o, objType: 'obstacle' })),
            ...collectibles.filter(c => !c.collected).map(c => ({ ...c, objType: 'collectible' }))
        ].sort((a, b) => a.z - b.z);

        allObjects.forEach(obj => {
            if (obj.objType === 'obstacle') drawObstacle(obj);
            else drawCollectible(obj);
        });

        // Draw player
        drawPlayer();

        // Particles
        particles.forEach(p => {
            ctx.globalAlpha = p.life;
            ctx.fillStyle = p.color;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
        ctx.globalAlpha = 1;

        ctx.restore();
    }

    function drawRoad(cw, ch, hY) {
        const bY = ch * ROAD_BOTTOM;
        const topW = cw * ROAD_TOP_WIDTH;
        const botW = cw * ROAD_BOTTOM_WIDTH;
        const topX = (cw - topW) / 2;
        const botX = (cw - botW) / 2;

        ctx.fillStyle = '#222';
        ctx.beginPath();
        ctx.moveTo(topX, hY);
        ctx.lineTo(topX + topW, hY);
        ctx.lineTo(botX + botW, bY);
        ctx.lineTo(botX, bY);
        ctx.closePath();
        ctx.fill();

        // Road edge lines
        ctx.strokeStyle = '#ffd700';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(topX, hY);
        ctx.lineTo(botX, bY);
        ctx.moveTo(topX + topW, hY);
        ctx.lineTo(botX + botW, bY);
        ctx.stroke();
    }

    function drawLaneMarkings(cw, ch, hY) {
        const bY = ch * ROAD_BOTTOM;
        ctx.strokeStyle = 'rgba(255,255,255,0.5)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([10, 15]);

        for (let lane = 1; lane < LANE_COUNT; lane++) {
            ctx.beginPath();
            const frac = lane / LANE_COUNT;
            const topW = cw * ROAD_TOP_WIDTH;
            const botW = cw * ROAD_BOTTOM_WIDTH;
            const topX = (cw - topW) / 2 + topW * frac;
            const botX = (cw - botW) / 2 + botW * frac;
            ctx.moveTo(topX, hY);
            ctx.lineTo(botX, bY);
            ctx.stroke();
        }
        ctx.setLineDash([]);

        // Horizontal perspective dashes moving toward player
        const numDashes = 12;
        for (let i = 0; i < numDashes; i++) {
            let z = ((i * 40 + roadLineOffset) % (numDashes * 40)) / (numDashes * 40);
            if (z < 0 || z > 1) continue;
            const y = getY(z);
            const scale = getScale(z);
            const roadW = cw * (ROAD_TOP_WIDTH + (ROAD_BOTTOM_WIDTH - ROAD_TOP_WIDTH) * z);
            const roadL = (cw - roadW) / 2;
            ctx.strokeStyle = `rgba(255,255,255,${0.15 * scale})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(roadL + 5, y);
            ctx.lineTo(roadL + roadW - 5, y);
            ctx.stroke();
        }
    }

    function drawObstacle(o) {
        const x = getLaneX(o.lane, o.z);
        const y = getY(o.z);
        const s = getScale(o.z);
        const w = 30 * s;
        const h = 30 * s;

        if (o.type === 'cone') {
            // Orange traffic cone
            ctx.fillStyle = '#ff6600';
            ctx.beginPath();
            ctx.moveTo(x, y - h);
            ctx.lineTo(x - w / 2, y);
            ctx.lineTo(x + w / 2, y);
            ctx.closePath();
            ctx.fill();
            ctx.strokeStyle = '#fff';
            ctx.lineWidth = s;
            ctx.beginPath();
            ctx.moveTo(x - w * 0.3, y - h * 0.35);
            ctx.lineTo(x + w * 0.3, y - h * 0.35);
            ctx.stroke();
            // Base
            ctx.fillStyle = '#cc5500';
            ctx.fillRect(x - w * 0.45, y - 3 * s, w * 0.9, 3 * s);
        } else if (o.type === 'barrier') {
            // Red/white barrier
            ctx.fillStyle = '#cc0000';
            ctx.fillRect(x - w * 0.7, y - h * 0.6, w * 1.4, h * 0.6);
            const stripeW = w * 0.35;
            ctx.fillStyle = '#fff';
            for (let i = 0; i < 4; i++) {
                if (i % 2 === 0) {
                    ctx.fillRect(x - w * 0.7 + i * stripeW, y - h * 0.6, stripeW, h * 0.6);
                }
            }
            // Posts
            ctx.fillStyle = '#888';
            ctx.fillRect(x - w * 0.65, y - h * 0.1, 3 * s, h * 0.1);
            ctx.fillRect(x + w * 0.55, y - h * 0.1, 3 * s, h * 0.1);
        } else {
            // Opponent player (red silhouette)
            const headR = 7 * s;
            ctx.fillStyle = '#cc2222';
            // Body
            ctx.fillRect(x - 8 * s, y - h * 0.7, 16 * s, h * 0.5);
            // Head
            ctx.beginPath();
            ctx.arc(x, y - h * 0.7 - headR, headR, 0, Math.PI * 2);
            ctx.fill();
            // Legs
            ctx.fillRect(x - 7 * s, y - h * 0.2, 5 * s, h * 0.2);
            ctx.fillRect(x + 2 * s, y - h * 0.2, 5 * s, h * 0.2);
            // Number on shirt
            ctx.fillStyle = '#fff';
            ctx.font = `bold ${Math.max(8, 10 * s)}px Heebo`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'alphabetic';
            ctx.fillText('X', x, y - h * 0.4);
        }
    }

    function drawCollectible(c) {
        const x = getLaneX(c.lane, c.z);
        let y = getY(c.z);
        const s = getScale(c.z);

        // Floating items hover above ground
        if (c.floating) y -= 40 * s + Math.sin(performance.now() * 0.005) * 5 * s;

        const r = 12 * s;

        if (c.type === 'ball') {
            // Soccer ball
            ctx.fillStyle = '#fff';
            ctx.beginPath();
            ctx.arc(x, y - r, r, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#333';
            ctx.lineWidth = s;
            ctx.stroke();
            // Pentagon pattern
            const pr = r * 0.5;
            ctx.fillStyle = '#333';
            drawPentagon(x, y - r, pr, s);
        } else {
            // Golden coin
            const bounce = Math.sin(performance.now() * 0.006) * 3 * s;
            ctx.fillStyle = '#ffd700';
            ctx.beginPath();
            ctx.ellipse(x, y - r + bounce, r, r * 0.7, 0, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#c5a200';
            ctx.lineWidth = s;
            ctx.stroke();
            // $ symbol
            ctx.fillStyle = '#a08500';
            ctx.font = `bold ${Math.max(8, 12 * s)}px Heebo`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('₪', x, y - r + bounce);
        }
    }

    function drawPentagon(cx, cy, r, s) {
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (Math.PI * 2 / 5) * i - Math.PI / 2;
            const px = cx + Math.cos(angle) * r;
            const py = cy + Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
    }

    function drawPlayer() {
        const z = 0.9;
        const x = getLaneX(playerLane, z);
        const baseY = getY(z);
        const s = getScale(z);
        const w = PLAYER_W * s;
        const h = PLAYER_H * s;
        const y = baseY + playerJump - h;

        if (selectedPlayerImg) {
            // Draw with slight bob animation
            const bob = Math.sin(performance.now() * 0.01 * speed) * 2;
            ctx.save();
            // Shadow
            ctx.fillStyle = 'rgba(0,0,0,0.3)';
            ctx.beginPath();
            ctx.ellipse(x, baseY, w * 0.5, 5, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.drawImage(selectedPlayerImg, x - w / 2, y + bob, w, h);
            ctx.restore();
        } else {
            // Fallback: yellow jersey silhouette
            ctx.fillStyle = '#ffd700';
            ctx.fillRect(x - w / 2, y, w, h * 0.6);
            ctx.fillStyle = '#111';
            ctx.beginPath();
            ctx.arc(x, y - 5, 10 * s, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillRect(x - 5 * s, y + h * 0.6, 4 * s, h * 0.3);
            ctx.fillRect(x + 1 * s, y + h * 0.6, 4 * s, h * 0.3);
        }
    }

    // ── Game Over ──
    function gameOver() {
        gameRunning = false;
        sfxCrash();
        shakeTimer = 12;
        shakeIntensity = 10;

        // Update high score
        highScore = parseInt(localStorage.getItem('beitarRunnerHighScore')) || 0;
        const finalS = score + Math.floor(distance / 10);
        if (finalS > highScore) {
            highScore = finalS;
            try { localStorage.setItem('beitarRunnerHighScore', highScore); } catch(e) {}
        }

        finalScore.textContent = finalS;
        finalDist.textContent = Math.floor(distance);
        finalBalls.textContent = ballsCollected;
        finalCoins.textContent = coinsCollected;
        finalHigh.textContent = highScore;

        // Animate crash shake then show game over
        function crashLoop() {
            shakeTimer--;
            render();
            if (shakeTimer > 0) {
                animFrame = requestAnimationFrame(crashLoop);
            } else {
                // Flash red
                ctx.fillStyle = 'rgba(255,0,0,0.3)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
                if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null; }
                if (gameoverTimeout) clearTimeout(gameoverTimeout);
                gameoverTimeout = setTimeout(() => {
                    if (section.classList.contains('active')) showScreen('gameover');
                }, 400);
            }
        }
        if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null; }
        animFrame = requestAnimationFrame(crashLoop);
    }

    // ── Controls ──
    // Keyboard
    function onKeyDown(e) {
        if (!gameRunning) return;
        if (!section.classList.contains('active')) return;

        if (e.key === 'ArrowLeft' || e.key === 'a') {
            playerLane = Math.max(playerLane - 1, 0);
            e.preventDefault();
        } else if (e.key === 'ArrowRight' || e.key === 'd') {
            playerLane = Math.min(playerLane + 1, 2);
            e.preventDefault();
        } else if ((e.key === 'ArrowUp' || e.key === ' ' || e.key === 'w') && !isJumping) {
            isJumping = true;
            jumpVel = JUMP_FORCE;
            sfxJump();
            e.preventDefault();
        }
    }
    document.addEventListener('keydown', onKeyDown);

    // Touch controls
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    canvas.addEventListener('touchstart', (e) => {
        if (!gameRunning) return;
        const t = e.touches[0];
        touchStartX = t.clientX;
        touchStartY = t.clientY;
        touchStartTime = Date.now();
        e.preventDefault();
    }, { passive: false });

    canvas.addEventListener('touchend', (e) => {
        if (!gameRunning) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - touchStartX;
        const dy = t.clientY - touchStartY;
        const elapsed = Date.now() - touchStartTime;

        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);
        const minSwipe = 30;

        if (absDx < minSwipe && absDy < minSwipe && elapsed < 300) {
            // Tap = jump
            if (!isJumping) {
                isJumping = true;
                jumpVel = JUMP_FORCE;
                sfxJump();
            }
        } else if (absDx > absDy && absDx > minSwipe) {
            // Horizontal swipe (RTL aware)
            if (dx > 0) {
                // Swipe right on screen -> in RTL this is "left" direction
                playerLane = Math.min(playerLane + 1, 2);
            } else {
                playerLane = Math.max(playerLane - 1, 0);
            }
        } else if (dy < -minSwipe) {
            // Swipe up = jump
            if (!isJumping) {
                isJumping = true;
                jumpVel = JUMP_FORCE;
                sfxJump();
            }
        }
        e.preventDefault();
    }, { passive: false });

    // ── Buttons ──
    document.getElementById('runner-retry-btn').addEventListener('click', startGame);
    document.getElementById('runner-change-btn').addEventListener('click', () => {
        showScreen('select');
    });

    // ── Resize ──
    window.addEventListener('resize', () => {
        if (section.classList.contains('active') && gameRunning) {
            resizeCanvas();
        }
    });

    // ── Cleanup on mode switch ──
    const observer = new MutationObserver(() => {
        if (!section.classList.contains('active') && gameRunning) {
            gameRunning = false;
            if (animFrame) { cancelAnimationFrame(animFrame); animFrame = null; }
            if (gameoverTimeout) { clearTimeout(gameoverTimeout); gameoverTimeout = null; }
        }
        // Recover from mid-game mode switch: show select screen on re-entry
        if (section.classList.contains('active') && !gameRunning && gameWrapper.style.display !== 'none') {
            showScreen('select');
        }
    });
    observer.observe(section, { attributes: true, attributeFilter: ['class'] });

    // ── Init ──
    buildSelectScreen();
    showScreen('select');
    highScore = parseInt(localStorage.getItem('beitarRunnerHighScore')) || 0;
    hudHigh.textContent = highScore;
}
