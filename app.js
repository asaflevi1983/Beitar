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
    { name: 'אורי דהן', image: 'assets/players/טימוטי_מוזי.png' },
    { name: 'ירין לוי', image: 'assets/players/דור_מיכה.png' },
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
    { name: 'דוד אמסלם', image: 'assets/players/דוד_אמסלם.jpg' },
    { name: 'דוד קלטינס', image: 'assets/players/דוד_קלטינס.jpg' },
    { name: 'דוד רביבו', image: 'assets/players/דוד_רביבו.jpg' },
    { name: 'דודו גורש', image: 'assets/players/דודו_גורש.jpg' },
    { name: 'דור מלול', image: 'assets/players/דור_מלול.jpg' },
    { name: 'דן מורי', image: 'assets/players/דן_מורי.jpg' },
    { name: 'דני פרדה', image: 'assets/players/דני_פרדה.jpg' },
    { name: 'חן עזרא', image: 'assets/players/חן_עזרא.jpg' },
    { name: 'חנן ממן', image: 'assets/players/חנן_ממן.jpg' },
    { name: 'טוטו תמוז', image: 'assets/players/טוטו_תמוז.jpg' },
    { name: 'טל בן-חיים', image: 'assets/players/טל_בן-חיים.jpg' },
    { name: 'יוסי בניון', image: 'assets/players/יוסי_בניון.jpg' },
    { name: 'יעקב בריהון', image: 'assets/players/יעקב_בריהון.jpg' },
    { name: 'ליאור אסולין', image: 'assets/players/ליאור_אסולין.png' },
    { name: 'מאור בוזגלו', image: 'assets/players/מאור_בוזגלו.jpg' },
    { name: 'מאור מליקסון', image: 'assets/players/מאור_מליקסון.jpg' },
    { name: 'נאור סבג', image: 'assets/players/נאור_סבג.jpg' },
    { name: 'ניסים אלמליח', image: 'assets/players/ניסים_אלמליח.jpg' },
    { name: 'עופר טלקר', image: 'assets/players/עופר_טלקר.jpg' },
    { name: 'עידן ורד', image: 'assets/players/עידן_ורד.jpg' },
    { name: 'עידן טל', image: 'assets/players/עידן_טל.jpg' },
    { name: 'צחי אליחן', image: 'assets/players/צחי_אליחן.jpg' },
    { name: 'ראובן עטר', image: 'assets/players/ראובן_עטר.jpg' },
    { name: 'רועי זיקרי', image: 'assets/players/רועי_זיקרי.jpg' },
    { name: 'שון גולדברג', image: 'assets/players/שון_גולדברג.jpg' },
    { name: 'שי הולצמן', image: 'assets/players/שי_הולצמן.jpg' },
    { name: 'שלום אביטן', image: 'assets/players/שלום_אביטן.jpg' },
    { name: 'שלומי אביסידריס', image: 'assets/players/שלומי_אביסידריס.jpg' },
    { name: 'שלומי ארבייטמן', image: 'assets/players/שלומי_ארבייטמן.jpg' },
    { name: 'שמואל מלול', image: 'assets/players/שמואל_מלול.jpg' },
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
    { name: 'יובל אשכנזי', image: 'assets/players/יובל_אשכנזי.jpg' },
    { name: 'יוסי מזרחי', image: 'assets/players/יוסי_מזרחי.jpg' },
    { name: 'כפיר אדרי', image: 'assets/players/כפיר_אדרי.jpg' },
    { name: 'לי און מזרחי', image: 'assets/players/לי_און_מזרחי.jpg' },
    { name: 'לידור כהן', image: 'assets/players/לידור_כהן.jpg' },
    { name: 'לירן רוטמן', image: 'assets/players/לירן_רוטמן.jpg' },
    { name: 'מיכאל אוחנה', image: 'assets/players/מיכאל_אוחנה.jpg' },
    { name: 'משה סלקטר', image: 'assets/players/משה_סלקטר.jpg' },
    { name: 'ניקו אולסק', image: 'assets/players/ניקו_אולסק.jpg' },
    { name: 'ניר סביליה', image: 'assets/players/ניר_סביליה.jpg' },
    { name: 'עוז ראלי', image: 'assets/players/עוז_ראלי.jpg' },
    { name: 'עמית בן שושן', image: 'assets/players/עמית_בן_שושן.png' },
    { name: 'ערן לוי', image: 'assets/players/ערן_לוי.png' },
    { name: 'פליקס חלפון', image: 'assets/players/פליקס_חלפון.jpg' },
    { name: 'קובי מויאל', image: 'assets/players/קובי_מויאל.jpg' },
    { name: 'רועי הרמן', image: 'assets/players/רועי_הרמן.jpg' },
    { name: 'שי חדד', image: 'assets/players/שי_חדד.jpg' },
    { name: 'שי קונסטנטין', image: 'assets/players/שי_קונסטנטין.jpg' },
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
