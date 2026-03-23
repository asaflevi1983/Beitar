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
    { name: 'אהרן אמינוף', image: 'https://upload.wikimedia.org/wikipedia/commons/1/10/AHARON_AMINOFF.jpg' },
    { name: 'אלי אוחנה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Eli_Ohana%2C_August_2017_%284972%29_%28crop%29.jpg/330px-Eli_Ohana%2C_August_2017_%284972%29_%28crop%29.jpg' },
    { name: 'אנתוני אנאן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Anthony_Annan_2011-08-03.jpg/330px-Anthony_Annan_2011-08-03.jpg' },
    { name: 'ארון אולנארה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Amkar-Loco_%288%29.jpg/330px-Amkar-Loco_%288%29.jpg' },
    { name: 'בוריס אינו', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Boris_Enow_and_Eden_Kartsev.jpg/330px-Boris_Enow_and_Eden_Kartsev.jpg' },
    { name: 'גל אלברמן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Gal_Albermann.jpg/330px-Gal_Albermann.jpg' },
    { name: 'דוד אמסלם', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1c/David_Amsalem.jpg/330px-David_Amsalem.jpg' },
    { name: 'דויד אגנסו', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/David_Aganzo_AFE.jpg/330px-David_Aganzo_AFE.jpg' },
    { name: 'דן איינבינדר', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28025%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28025%29.jpg' },
    { name: 'ז\'והאן אודל', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Johan_audel.jpg/330px-Johan_audel.jpg' },
    { name: 'חיים אזולאי', image: 'https://upload.wikimedia.org/wikipedia/he/7/76/%D7%97%D7%99%D7%99%D7%9D_%D7%90%D7%96%D7%95%D7%9C%D7%90%D7%99.jpg' },
    { name: 'יוסי אבוקסיס', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Zenit-Bney_%283%29.jpg/330px-Zenit-Bney_%283%29.jpg' },
    { name: 'יוסי אברהמי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/%D7%A8%D7%90%D7%A9_%D7%9E%D7%95%D7%A2%D7%A6%D7%AA_%D7%92%D7%91%D7%A2%D7%AA_%D7%96%D7%90%D7%91_%D7%99%D7%95%D7%A1%D7%99_%D7%90%D7%91%D7%A8%D7%94%D7%9E%D7%99_%28cropped%29.jpg/330px-%D7%A8%D7%90%D7%A9_%D7%9E%D7%95%D7%A2%D7%A6%D7%AA_%D7%92%D7%91%D7%A2%D7%AA_%D7%96%D7%90%D7%91_%D7%99%D7%95%D7%A1%D7%99_%D7%90%D7%91%D7%A8%D7%94%D7%9E%D7%99_%28cropped%29.jpg' },
    { name: 'יוסי אמינוף', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/1_044_%D7%99%D7%95%D7%A1%D7%99_%D7%90%D7%9E%D7%99%D7%A0%D7%95%D7%A3.jpg/330px-1_044_%D7%99%D7%95%D7%A1%D7%99_%D7%90%D7%9E%D7%99%D7%A0%D7%95%D7%A3.jpg' },
    { name: 'כפיר אדרי', image: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Kfir_Edri.JPG' },
    { name: 'כריסטיאן אלברס', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Universidad_Cat%C3%B3lica_-_Huachipato%2C_2018-05-05_-_Cristi%C3%A1n_%C3%81lvarez_-_01.jpg/330px-Universidad_Cat%C3%B3lica_-_Huachipato%2C_2018-05-05_-_Cristi%C3%A1n_%C3%81lvarez_-_01.jpg' },
    { name: 'ליאור אסולין', image: 'https://upload.wikimedia.org/wikipedia/he/thumb/2/2d/%D7%9C%D7%99%D7%90%D7%95%D7%A8_%D7%90%D7%A1%D7%95%D7%9C%D7%99%D7%9F.png/330px-%D7%9C%D7%99%D7%90%D7%95%D7%A8_%D7%90%D7%A1%D7%95%D7%9C%D7%99%D7%9F.png' },
    { name: 'ליביו אנטל', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Antal_in_may_2010.jpg/330px-Antal_in_may_2010.jpg' },
    { name: 'מיכאל אוחנה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/%D7%9E%D7%99%D7%9B%D7%90%D7%9C_%D7%90%D7%95%D7%97%D7%A0%D7%94.jpg/330px-%D7%9E%D7%99%D7%9B%D7%90%D7%9C_%D7%90%D7%95%D7%97%D7%A0%D7%94.jpg' },
    { name: 'ניסים אלמליח', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Nissim_al2.jpg/330px-Nissim_al2.jpg' },
    { name: 'ניקו אולסק', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/%D7%A0%D7%99%D7%A7%D7%95_%D7%90%D7%95%D7%9C%D7%A1%D7%A7_Nico_Olsak.jpg/330px-%D7%A0%D7%99%D7%A7%D7%95_%D7%90%D7%95%D7%9C%D7%A1%D7%A7_Nico_Olsak.jpg' },
    { name: 'סבסטיאן אבראו', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Sebastian_Abreu_2011.jpg/330px-Sebastian_Abreu_2011.jpg' },
    { name: 'פול אדגר', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Akouokou_asse_ol_2425.png/330px-Akouokou_asse_ol_2425.png' },
    { name: 'צחי אליחן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Tzahi_Elihen.JPG/330px-Tzahi_Elihen.JPG' },
    { name: 'שלום אביטן', image: 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Shalom_Avitan_1.jpg' },
    { name: 'שלומי אביסידריס', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28044%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28044%29.jpg' },
    { name: 'שלומי אזולאי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Shlomi_Azulay.jpg/330px-Shlomi_Azulay.jpg' },
    { name: 'שלומי אזולאי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Shlomi_Yosef_Azulay2.jpg/330px-Shlomi_Yosef_Azulay2.jpg' },
    { name: 'שמעון אבו חצירא', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Shimon_Abuhatzira.jpg/330px-Shimon_Abuhatzira.jpg' },
    { name: 'אבירם ברוכיאן', image: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/%D7%90%D7%91%D7%99%D7%A8%D7%9D_%D7%91%D7%A8%D7%95%D7%9B%D7%99%D7%90%D7%9F_2014.jpg' },
    { name: 'אדי גוטליב', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/85/Edi_Gotlieb.jpg/330px-Edi_Gotlieb.jpg' },
    { name: 'אורן ביטון', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/%D7%90%D7%95%D7%A8%D7%9F_%D7%91%D7%99%D7%98%D7%95%D7%9F_2025.jpg/330px-%D7%90%D7%95%D7%A8%D7%9F_%D7%91%D7%99%D7%98%D7%95%D7%9F_2025.jpg' },
    { name: 'איברהים באנגורה', image: 'https://upload.wikimedia.org/wikipedia/commons/6/63/Teteh_Bangura.JPG' },
    { name: 'אלעד גבאי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Elad_Gabai.JPG/330px-Elad_Gabai.JPG' },
    { name: 'אריק בנדו', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Ariel_Benado.png/330px-Ariel_Benado.png' },
    { name: 'בן ביטון', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Ben_Bitton.JPG/330px-Ben_Bitton.JPG' },
    { name: 'דובב גבאי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28031%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28031%29.jpg' },
    { name: 'דייוויד בויסן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/David_Boysen_2016_Zen-Brondb_%2811%29.jpg/330px-David_Boysen_2016_Zen-Brondb_%2811%29.jpg' },
    { name: 'דניאל אסקלינג', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Joakim_Askling.JPG/330px-Joakim_Askling.JPG' },
    { name: 'דנילו אספרייה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Asprilla_in_2024.jpg/330px-Asprilla_in_2024.jpg' },
    { name: 'דרק בואטנג', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/DerekBoateng1.jpg/330px-DerekBoateng1.jpg' },
    { name: 'חגי גולדנברג', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/Hagay_Goldenberg.jpg/330px-Hagay_Goldenberg.jpg' },
    { name: 'טל בן-חיים', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Tal_Ben_Haim_2015_09_16.jpg/330px-Tal_Ben_Haim_2015_09_16.jpg' },
    { name: 'טל בנין', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/Israel_v_Argentina_-_Ramat_Gan%2C_1990_-_Tal_Banin_%28edited%29.jpg/330px-Israel_v_Argentina_-_Ramat_Gan%2C_1990_-_Tal_Banin_%28edited%29.jpg' },
    { name: 'יובל אשכנזי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/%D7%99%D7%95%D7%91%D7%9C_%D7%90%D7%A9%D7%9B%D7%A0%D7%96%D7%99_-_Yuval_Ashkenazi_%28cropped%29.jpg/330px-%D7%99%D7%95%D7%91%D7%9C_%D7%90%D7%A9%D7%9B%D7%A0%D7%96%D7%99_-_Yuval_Ashkenazi_%28cropped%29.jpg' },
    { name: 'יוסי בניון', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Benayoun2.jpg/330px-Benayoun2.jpg' },
    { name: 'יעקב אסייג', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Yaakov_asayag.JPG/330px-Yaakov_asayag.JPG' },
    { name: 'יעקב בריהון', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28049%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28049%29.jpg' },
    { name: 'לוקה גדראני', image: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Luka_Gadrani%2C_Esteghlal_FC_vs_Shahin_Bushehr_FC%2C_14_December_2019.jpg' },
    { name: 'ליוואי גארסיה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/USMNT_vs._Trinidad_and_Tobago_%2848124938623%29_%28cropped%29.jpg/330px-USMNT_vs._Trinidad_and_Tobago_%2848124938623%29_%28cropped%29.jpg' },
    { name: 'מאור בוזגלו', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Maor_Buzaglo_March_28-30%2C_2022_48_%28cropped%29.jpg/330px-Maor_Buzaglo_March_28-30%2C_2022_48_%28cropped%29.jpg' },
    { name: 'משה בן לולו', image: 'https://upload.wikimedia.org/wikipedia/commons/3/35/Moshe_Ben-Lulu.jpg' },
    { name: 'ססאר ארסו', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/C%C3%A9sar_Arzo_Amposta%2C_2017-09-09.jpg/330px-C%C3%A9sar_Arzo_Amposta%2C_2017-09-09.jpg' },
    { name: 'עומר אצילי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28018%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28018%29.jpg' },
    { name: 'עמית בן שושן', image: 'https://upload.wikimedia.org/wikipedia/commons/9/93/%D7%A2%D7%9E%D7%99%D7%AA_%D7%91%D7%9F_%D7%A9%D7%95%D7%A9%D7%9F_%D7%A7%D7%A4%D7%98%D7%9F_%D7%91%D7%99%D7%AA%22%D7%A8_%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D.png' },
    { name: 'עמרי אפק', image: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/MHFC-Omri-Afek.gif' },
    { name: 'פבלו ברנדאן', image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/Pablo_Brand%C3%A1n.jpg' },
    { name: 'ריצ\'מונד בואצ\'י', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/20150331_Mali_vs_Ghana_167.jpg/330px-20150331_Mali_vs_Ghana_167.jpg' },
    { name: 'שון גולדברג', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Sean_Goldberg_-_%D7%A9%D7%95%D7%9F_%D7%92%D7%95%D7%9C%D7%93%D7%91%D7%A8%D7%92_%28cropped%29.jpg/330px-Sean_Goldberg_-_%D7%A9%D7%95%D7%9F_%D7%92%D7%95%D7%9C%D7%93%D7%91%D7%A8%D7%92_%28cropped%29.jpg' },
    { name: 'שלומי ארבייטמן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Shlomi_Arbeitman_BS.JPG/330px-Shlomi_Arbeitman_BS.JPG' },
    { name: 'אדוארדו גררו', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/%D0%9C%D0%B0%D1%82%D1%87_%C2%AB%D0%94%D0%B8%D0%BD%D0%B0%D0%BC%D0%BE%C2%BB_%E2%80%93_%C2%AB%D0%92%D0%BE%D1%80%D1%81%D0%BA%D0%BB%D0%B0%C2%BB_3-1._18_%D0%B2%D0%B5%D1%80%D0%B5%D1%81%D0%BD%D1%8F_2024_%D1%80%D0%BE%D0%BA%D1%83_%E2%80%94_1559457.jpg/330px-%D0%9C%D0%B0%D1%82%D1%87_%C2%AB%D0%94%D0%B8%D0%BD%D0%B0%D0%BC%D0%BE%C2%BB_%E2%80%93_%C2%AB%D0%92%D0%BE%D1%80%D1%81%D0%BA%D0%BB%D0%B0%C2%BB_3-1._18_%D0%B2%D0%B5%D1%80%D0%B5%D1%81%D0%BD%D1%8F_2024_%D1%80%D0%BE%D0%BA%D1%83_%E2%80%94_1559457.jpg' },
    { name: 'אדווין גיאסי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Edwin_Gyasi_2012_2.jpg/330px-Edwin_Gyasi_2012_2.jpg' },
    { name: 'אוראל דגני', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Dgani_Haifa.JPG/330px-Dgani_Haifa.JPG' },
    { name: 'אלי דסה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Eli_Dasa_2022_%28cropped%29.jpg/330px-Eli_Dasa_2022_%28cropped%29.jpg' },
    { name: 'אלירן דנין', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/MHFC-Eliran-Danin.jpg' },
    { name: 'אסי דומב', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Adomb1.jpg/330px-Adomb1.jpg' },
    { name: 'אריאל הרוש', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/%D7%90%D7%A8%D7%99%D7%90%D7%9C_%D7%94%D7%A8%D7%95%D7%A9.jpg/330px-%D7%90%D7%A8%D7%99%D7%90%D7%9C_%D7%94%D7%A8%D7%95%D7%A9.jpg' },
    { name: 'ארסניו ולפורט', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28038%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28038%29.jpg' },
    { name: 'בוני גינצבורג', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/%D7%91%D7%95%D7%A0%D7%99_%D7%92%D7%99%D7%A0%D7%96%D7%91%D7%95%D7%A8%D7%92.jpeg' },
    { name: 'ג\'וניור ויסה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Junior_Viza.jpg/330px-Junior_Viza.jpg' },
    { name: 'גאטאן וארן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Ga%C3%ABtan_Varenne.png/330px-Ga%C3%ABtan_Varenne.png' },
    { name: 'דודו גורש', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Dudu_Goresh_%282%29.JPG/330px-Dudu_Goresh_%282%29.JPG' },
    { name: 'דיוגו ורדשקה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Diogo_Verdasca.jpg/330px-Diogo_Verdasca.jpg' },
    { name: 'דני הוצ\'קו', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Deni_Ho%C4%8Dko%2C_Czech_Rp.-Montenegro_EURO_2020_QR_10-06-2019.jpg/330px-Deni_Ho%C4%8Dko%2C_Czech_Rp.-Montenegro_EURO_2020_QR_10-06-2019.jpg' },
    { name: 'ז\'ורז\'יניו', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Georginho.JPG/330px-Georginho.JPG' },
    { name: 'מרסל הייסטר', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Marcel_Heister.jpg/330px-Marcel_Heister.jpg' },
    { name: 'עידן ורד', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Idan_Vered_December_2016.jpg/330px-Idan_Vered_December_2016.jpg' },
    { name: 'פאבלו דה לוקאס', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Pablo_de_Lucas.JPG/330px-Pablo_de_Lucas.JPG' },
    { name: 'פלמן גלבוב', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/Plamen_galabov.jpg/330px-Plamen_galabov.jpg' },
    { name: 'ראול גלר', image: 'https://upload.wikimedia.org/wikipedia/he/thumb/c/c8/Gellerito.jpg/330px-Gellerito.jpg' },
    { name: 'רועי הרמן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/Roi_Herman.jpg/330px-Roi_Herman.jpg' },
    { name: 'שי הולצמן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Holzman1.jpg/330px-Holzman1.jpg' },
    { name: 'שייע גלזר', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/%D7%A9%D7%99%D7%99%D7%A2_%D7%92%D7%9C%D7%96%D7%A8.jpg/330px-%D7%A9%D7%99%D7%99%D7%A2_%D7%92%D7%9C%D7%96%D7%A8.jpg' },
    { name: 'שמעון גרשון', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/ShimonGershon.jpg/330px-ShimonGershon.jpg' },
    { name: 'אבישי כהן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28041%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28041%29.jpg' },
    { name: 'איציק זוהר', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/Itzik_Zohar.jpg/330px-Itzik_Zohar.jpg' },
    { name: 'איציק כהן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Itzik_Cohen_%281990%29.JPG/330px-Itzik_Cohen_%281990%29.JPG' },
    { name: 'איתמר ישראלי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Itamar_Israeli.JPG/330px-Itamar_Israeli.JPG' },
    { name: 'איתן טיבי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/DK-Maccabi_%281%29.jpg/330px-DK-Maccabi_%281%29.jpg' },
    { name: 'אלון חרזי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Alon_Harazi.jpg/330px-Alon_Harazi.jpg' },
    { name: 'אלי יאני', image: 'https://upload.wikimedia.org/wikipedia/he/thumb/a/a7/%D7%90%D7%9C%D7%99_%D7%99%D7%90%D7%A0%D7%99_1991_%D7%A6%D7%99%D7%9C%D7%95%D7%9D-%D7%9E%D7%95%D7%98%D7%99_%D7%A7%D7%99%D7%A7%D7%99%D7%95%D7%9F.jpg/330px-%D7%90%D7%9C%D7%99_%D7%99%D7%90%D7%A0%D7%99_1991_%D7%A6%D7%99%D7%9C%D7%95%D7%9D-%D7%9E%D7%95%D7%98%D7%99_%D7%A7%D7%99%D7%A7%D7%99%D7%95%D7%9F.jpg' },
    { name: 'אנדרס טונייס', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Andrestu%C3%B1ez.jpg/330px-Andrestu%C3%B1ez.jpg' },
    { name: 'ברק יצחקי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Barak_Yitzhaki.JPG/330px-Barak_Yitzhaki.JPG' },
    { name: 'דור חוגי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Dor_Hugi%2C_Pojedynek_g%C5%82%C3%B3wkowy%2C_mecz_Zag%C5%82%C4%99bie_Sosnowiec_Wis%C5%82a_Krak%C3%B3w%2C_20_pa%C5%BAdziernika_2022_%28cropped%29.jpg/330px-Dor_Hugi%2C_Pojedynek_g%C5%82%C3%B3wkowy%2C_mecz_Zag%C5%82%C4%99bie_Sosnowiec_Wis%C5%82a_Krak%C3%B3w%2C_20_pa%C5%BAdziernika_2022_%28cropped%29.jpg' },
    { name: 'ז\'אן טלסניקוב', image: 'https://upload.wikimedia.org/wikipedia/commons/2/21/%D7%96%27%D7%90%D7%9F_%D7%98%D7%9C%D7%A1%D7%A0%D7%99%D7%A7%D7%95%D7%91.png' },
    { name: 'זאב חיימוביץ\'', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Ze%27ev_Haimovich_2.jpg/330px-Ze%27ev_Haimovich_2.jpg' },
    { name: 'יואב זיו', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Yoav_Ziv_2015_%28cropped%29.JPG/330px-Yoav_Ziv_2015_%28cropped%29.JPG' },
    { name: 'ירדן כהן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/%D7%99%D7%A8%D7%93%D7%9F_%D7%9B%D7%94%D7%9F_%D7%91%D7%9E%D7%93%D7%99_%D7%91%D7%99%D7%AA%22%D7%A8_%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D_%D7%9C%D7%A4%D7%A0%D7%99_%D7%94%D7%9E%D7%A9%D7%97%D7%A7_%D7%A0%D7%92%D7%93_%D7%9E%D7%9B%D7%91%D7%99_%D7%A0%D7%AA%D7%A0%D7%99%D7%94_2026.png/330px-%D7%99%D7%A8%D7%93%D7%9F_%D7%9B%D7%94%D7%9F_%D7%91%D7%9E%D7%93%D7%99_%D7%91%D7%99%D7%AA%22%D7%A8_%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D_%D7%9C%D7%A4%D7%A0%D7%99_%D7%94%D7%9E%D7%A9%D7%97%D7%A7_%D7%A0%D7%92%D7%93_%D7%9E%D7%9B%D7%91%D7%99_%D7%A0%D7%AA%D7%A0%D7%99%D7%94_2026.png' },
    { name: 'מיכאל זנדברג', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Michael_Zandberg.jpg/330px-Michael_Zandberg.jpg' },
    { name: 'מרקו יאנקוביץ\'', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Marko_Jankovi%C4%87.jpg/330px-Marko_Jankovi%C4%87.jpg' },
    { name: 'ניב זריהן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/%D7%A0%D7%99%D7%91_%D7%96%D7%A8%D7%99%D7%94%D7%9F_%D7%91%D7%9E%D7%93%D7%99_%D7%94%D7%A4%D7%95%D7%A2%D7%9C_%D7%91%22%D7%A9.jpg/330px-%D7%A0%D7%99%D7%91_%D7%96%D7%A8%D7%99%D7%94%D7%9F_%D7%91%D7%9E%D7%93%D7%99_%D7%94%D7%A4%D7%95%D7%A2%D7%9C_%D7%91%22%D7%A9.jpg' },
    { name: 'נס זמיר', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Ness_Zamir.JPG/330px-Ness_Zamir.JPG' },
    { name: 'עופר טלקר', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Ofer_Talker.jpg/330px-Ofer_Talker.jpg' },
    { name: 'עידן טל', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Idan_Tal.jpg/330px-Idan_Tal.jpg' },
    { name: 'פטריק טוומאסי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/%D7%A4%D7%98%D7%A8%D7%99%D7%A7_%D7%98%D7%95%D7%9E%D7%90%D7%A1%D7%99_-_Patrick_Twumasi.jpg/330px-%D7%A4%D7%98%D7%A8%D7%99%D7%A7_%D7%98%D7%95%D7%9E%D7%90%D7%A1%D7%99_-_Patrick_Twumasi.jpg' },
    { name: 'פליקס חלפון', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/%D7%A4%D7%9C%D7%99%D7%A7%D7%A1_%D7%97%D7%9C%D7%A4%D7%95%D7%9F_%D7%9E%D7%AA%D7%95%D7%9A_%D7%A1%D7%9C%D7%99%D7%97%D7%94_%D7%A2%D7%9C_%D7%94%D7%A9%D7%90%D7%9C%D7%94_%D7%AA%D7%95%D7%9B%D7%A0%D7%99%D7%AA_%D7%A9%D7%9C_%D7%9B%D7%90%D7%9F_11.jpg/330px-%D7%A4%D7%9C%D7%99%D7%A7%D7%A1_%D7%97%D7%9C%D7%A4%D7%95%D7%9F_%D7%9E%D7%AA%D7%95%D7%9A_%D7%A1%D7%9C%D7%99%D7%97%D7%94_%D7%A2%D7%9C_%D7%94%D7%A9%D7%90%D7%9C%D7%94_%D7%AA%D7%95%D7%9B%D7%A0%D7%99%D7%AA_%D7%A9%D7%9C_%D7%9B%D7%90%D7%9F_11.jpg' },
    { name: 'רועי זיקרי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28036%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28036%29.jpg' },
    { name: 'שי חדד', image: 'https://upload.wikimedia.org/wikipedia/commons/7/77/%D7%A9%D7%99_%D7%97%D7%93%D7%93.jpg' },
    { name: 'ששון זמיר', image: 'https://upload.wikimedia.org/wikipedia/commons/b/be/%D7%A9%D7%A9%D7%95%D7%9F_%D7%96%D7%9E%D7%99%D7%A8-_%D7%9B%D7%93%D7%95%D7%A8%D7%92%D7%9C%D7%9F_%D7%9C%D7%A9%D7%A2%D7%91%D7%A8_%D7%91%D7%91%D7%99%D7%AA%22%D7%A8_%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D_1968.jpg' },
    { name: 'אברהם לב', image: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Avraham_Lev.jpg' },
    { name: 'אהוד כחילה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Ehud_Kachila_%289713%29.JPG/330px-Ehud_Kachila_%289713%29.JPG' },
    { name: 'אורי מגבו', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28052%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28052%29.jpg' },
    { name: 'איגור מיטרסקי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/%C4%B0gor_Mitreski_2012.jpg/330px-%C4%B0gor_Mitreski_2012.jpg' },
    { name: 'איליי מדמון', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ee/%D7%90%D7%99%D7%9C%D7%99%D7%99_%D7%9E%D7%93%D7%9E%D7%95%D7%9F-1.jpg/330px-%D7%90%D7%99%D7%9C%D7%99%D7%99_%D7%9E%D7%93%D7%9E%D7%95%D7%9F-1.jpg' },
    { name: 'אלון מזרחי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Alon_Mizrahi.jpg/330px-Alon_Mizrahi.jpg' },
    { name: 'גריגורי מורוזוב', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/Grigori_Morozov_2020.jpg/330px-Grigori_Morozov_2020.jpg' },
    { name: 'דב מילמן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Dov_Milman%2C_1969._D711-044.jpg/330px-Dov_Milman%2C_1969._D711-044.jpg' },
    { name: 'דור מלול', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/%D7%93%D7%95%D7%A8_%D7%9E%D7%9C%D7%95%D7%9C.JPG/330px-%D7%93%D7%95%D7%A8_%D7%9E%D7%9C%D7%95%D7%9C.JPG' },
    { name: 'דושאן מאטוביץ\'', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Du%C5%A1an_Matovi%C4%87_%282%29.JPG/330px-Du%C5%A1an_Matovi%C4%87_%282%29.JPG' },
    { name: 'דמיטרו מיכאילנקו', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Dmytro_Mykhaylenko_2016.jpg/330px-Dmytro_Mykhaylenko_2016.jpg' },
    { name: 'דן מורי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d9/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28016%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28016%29.jpg' },
    { name: 'ז\'רום לרואה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/J%C3%A9r%C3%B4me_Leroy.jpg/330px-J%C3%A9r%C3%B4me_Leroy.jpg' },
    { name: 'חוסואה מחיאס', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Josua_Mej%C3%ADas_2017.jpg/330px-Josua_Mej%C3%ADas_2017.jpg' },
    { name: 'חיים לוין', image: 'https://upload.wikimedia.org/wikipedia/he/thumb/1/1a/Haim_Levin.png/330px-Haim_Levin.png' },
    { name: 'חיים מגרלשוילי', image: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/%D7%97%D7%99%D7%99%D7%9D_%D7%9E%D7%92%D7%A8%D7%9C%D7%A9%D7%95%D7%95%D7%99%D7%9C%D7%99.png' },
    { name: 'טל כחילה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28017%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28017%29.jpg' },
    { name: 'יוסי מזרחי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/79/Yossi_Mizrahi_9_Februar%2C_2016.jpg/330px-Yossi_Mizrahi_9_Februar%2C_2016.jpg' },
    { name: 'לי און מזרחי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/%D7%9C%D7%99_%D7%90%D7%95%D7%9F_%D7%9E%D7%96%D7%A8%D7%97%D7%99_%D7%91%D7%9E%D7%97%D7%A0%D7%94_%D7%94%D7%90%D7%99%D7%9E%D7%95%D7%A0%D7%99%D7%9D_%D7%91%D7%90%D7%99%D7%9C%D7%AA.jpg/330px-%D7%9C%D7%99_%D7%90%D7%95%D7%9F_%D7%9E%D7%96%D7%A8%D7%97%D7%99_%D7%91%D7%9E%D7%97%D7%A0%D7%94_%D7%94%D7%90%D7%99%D7%9E%D7%95%D7%A0%D7%99%D7%9D_%D7%91%D7%90%D7%99%D7%9C%D7%AA.jpg' },
    { name: 'לידור כהן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28034%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28034%29.jpg' },
    { name: 'מאור מליקסון', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Maor_Melikson2.jpg/330px-Maor_Melikson2.jpg' },
    { name: 'מילובאן מירושביץ\'', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Milovan_Mirosevic_by_Djuradj_Vujcic.jpg/330px-Milovan_Mirosevic_by_Djuradj_Vujcic.jpg' },
    { name: 'משה מישאלוף', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/70/Moshe_Mishaluf.jpg/330px-Moshe_Mishaluf.jpg' },
    { name: 'עלי מוחמד', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/%D7%A2%D7%9C%D7%99_%D7%9E%D7%95%D7%97%D7%9E%D7%93_-_Ali_Mohamed_Muhammed_Al_Faz.jpg/330px-%D7%A2%D7%9C%D7%99_%D7%9E%D7%95%D7%97%D7%9E%D7%93_-_Ali_Mohamed_Muhammed_Al_Faz.jpg' },
    { name: 'ערן לוי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/%D7%A2%D7%A8%D7%9F_%D7%9C%D7%95%D7%99_2012.png/330px-%D7%A2%D7%A8%D7%9F_%D7%9C%D7%95%D7%99_2012.png' },
    { name: 'קובי מויאל', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28027%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28027%29.jpg' },
    { name: 'שאול מזרחי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/%D7%A9%D7%90%D7%95%D7%9C_%D7%9E%D7%96%D7%A8%D7%97%D7%99_%D7%9B%D7%93%D7%95%D7%A8%D7%92%D7%9C%D7%9F.jpg/330px-%D7%A9%D7%90%D7%95%D7%9C_%D7%9E%D7%96%D7%A8%D7%97%D7%99_%D7%9B%D7%93%D7%95%D7%A8%D7%92%D7%9C%D7%9F.jpg' },
    { name: 'שמואל מלול', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Shmulik_Malul.JPG/330px-Shmulik_Malul.JPG' },
    { name: 'שמוליק לוי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/%D7%A9%D7%9E%D7%95%D7%9C%D7%99%D7%A7_%D7%9C%D7%95%D7%99.jpg/330px-%D7%A9%D7%9E%D7%95%D7%9C%D7%99%D7%A7_%D7%9C%D7%95%D7%99.jpg' },
    { name: 'אבי נמני', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Avi_Nimni_new.jpg/330px-Avi_Nimni_new.jpg' },
    { name: 'אברהם סאבו', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/%D7%90%D7%91%D7%A8%D7%94%D7%9D_%D7%A1%D7%90%D7%91%D7%95.jpg/330px-%D7%90%D7%91%D7%A8%D7%94%D7%9D_%D7%A1%D7%90%D7%91%D7%95.jpg' },
    { name: 'אישטוון פישונט', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Pisont_Istv%C3%A1n_2011.jpg/330px-Pisont_Istv%C3%A1n_2011.jpg' },
    { name: 'איתמר ניצן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/%D7%90%D7%99%D7%AA%D7%9E%D7%A8_%D7%A0%D7%99%D7%A6%D7%9F_%D7%91%D7%9E%D7%93%D7%99_%D7%9E%D7%9B%D7%91%D7%99_%D7%A0%D7%AA%D7%A0%D7%99%D7%94_2022.jpg/330px-%D7%90%D7%99%D7%AA%D7%9E%D7%A8_%D7%A0%D7%99%D7%A6%D7%9F_%D7%91%D7%9E%D7%93%D7%99_%D7%9E%D7%9B%D7%91%D7%99_%D7%A0%D7%AA%D7%A0%D7%99%D7%94_2022.jpg' },
    { name: 'אלירן עטר', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/%D7%A2%D7%98%D7%A8_%D7%A2%D7%9D_%D7%90%D7%95%D7%94%D7%93%D7%99%D7%9D.jpg/330px-%D7%A2%D7%98%D7%A8_%D7%A2%D7%9D_%D7%90%D7%95%D7%94%D7%93%D7%99%D7%9D.jpg' },
    { name: 'אמיר עגייב', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e8/Amir_Agayev_Hapoel_2018.jpg/330px-Amir_Agayev_Hapoel_2018.jpg' },
    { name: 'אנדריי פילאבסקי', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/MHFC-Andrei-Piliavski.jpg' },
    { name: 'אריאל מנדי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/Entra%C3%AEnement_RC_Lens_-_13_septembre_2018_17_%28cropped%29.jpg/330px-Entra%C3%AEnement_RC_Lens_-_13_septembre_2018_17_%28cropped%29.jpg' },
    { name: 'אריק סאבו', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Erik_Sabo.jpg/330px-Erik_Sabo.jpg' },
    { name: 'דני נוימן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Danny_Noyman.jpg/330px-Danny_Noyman.jpg' },
    { name: 'זאור סדאייב', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Zaur_Sadaev_2014.jpg/330px-Zaur_Sadaev_2014.jpg' },
    { name: 'חיים סילבס', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/34/Haim_Silvas.JPG/330px-Haim_Silvas.JPG' },
    { name: 'חן עזרא', image: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/MHFC-Chen-Ezra.jpg' },
    { name: 'חן עזריאל', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1f/%D7%97%D7%9F_%D7%A2%D7%96%D7%A8%D7%99%D7%90%D7%9C.jpg/330px-%D7%97%D7%9F_%D7%A2%D7%96%D7%A8%D7%99%D7%90%D7%9C.jpg' },
    { name: 'חנן ממן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Hanan_Maman_-_27_January_2016.JPG/330px-Hanan_Maman_-_27_January_2016.JPG' },
    { name: 'יון ניקולאסקו', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/GAE_-_SC_Heerenveen_-_Ion_Nicolaescu.jpg/330px-GAE_-_SC_Heerenveen_-_Ion_Nicolaescu.jpg' },
    { name: 'כריסטיאן פביאני', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Cristian_Fabbiani_LDUP_2016.JPG/330px-Cristian_Fabbiani_LDUP_2016.JPG' },
    { name: 'מיגל סילבה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Miguel_Macedo_Silva.jpg/330px-Miguel_Macedo_Silva.jpg' },
    { name: 'מיקי סירושטיין', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Miki_Siroshtein_SAM_3042.jpg/330px-Miki_Siroshtein_SAM_3042.jpg' },
    { name: 'משה סלקטר', image: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/MHFC-Moshe-Selecter.jpg' },
    { name: 'נאור סבג', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28104%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28104%29.jpg' },
    { name: 'ניר סביליה', image: 'https://upload.wikimedia.org/wikipedia/commons/d/d9/MHFC-Nir-Sevillia.jpg' },
    { name: 'ראובן עטר', image: 'https://upload.wikimedia.org/wikipedia/commons/b/bd/MHFC-Reuven-Atar.jpg' },
    { name: 'שניר משען', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28043%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28043%29.jpg' },
    { name: 'תומר סויסה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Tomer_Swisa.jpg/330px-Tomer_Swisa.jpg' },
    { name: 'אבי פרץ', image: 'https://upload.wikimedia.org/wikipedia/commons/2/22/MHFC-Avi-Peretz.jpg' },
    { name: 'אופיר קריאף', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Ofir_Kriaf.JPG/330px-Ofir_Kriaf.JPG' },
    { name: 'איציק קורנפיין', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/Itzik_Kornfein%2C_August_2017_%284972%29_%28cropped%29.jpg/330px-Itzik_Kornfein%2C_August_2017_%284972%29_%28cropped%29.jpg' },
    { name: 'אנדז\'יי קוביקה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/Kubica1.jpg/330px-Kubica1.jpg' },
    { name: 'אנז\'-פרדי פלומה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Ange-Freddy_Plumain.jpg/330px-Ange-Freddy_Plumain.jpg' },
    { name: 'אנטואן קונט', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/48/U-19_EC-Qualifikation_Austria_vs._France_2013-06-10_%28106%29.jpg/330px-U-19_EC-Qualifikation_Austria_vs._France_2013-06-10_%28106%29.jpg' },
    { name: 'בוריס קליימן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/ff/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28014%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28014%29.jpg' },
    { name: 'ג\'ובאני רוסו', image: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/MHFC-Giovanni-Ruso_%28cropped%29.jpg' },
    { name: 'גדי קינדה', image: 'https://upload.wikimedia.org/wikipedia/he/thumb/4/4b/%D7%92%D7%93%D7%99_%D7%A7%D7%99%D7%A0%D7%93%D7%94.png/330px-%D7%92%D7%93%D7%99_%D7%A7%D7%99%D7%A0%D7%93%D7%94.png' },
    { name: 'גידי קאניוק', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/Gidi_Kanyuk.jpg/330px-Gidi_Kanyuk.jpg' },
    { name: 'דוד קלטינס', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/54/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28015%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28015%29.jpg' },
    { name: 'דוד קרקו', image: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/David_Karako.jpg' },
    { name: 'דוד רביבו', image: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/David_Revivo_with_the_LA.JPG' },
    { name: 'דני פרדה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28024%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28024%29.jpg' },
    { name: 'דריו פרננדס', image: 'https://upload.wikimedia.org/wikipedia/commons/4/4c/%D7%93%D7%A8%D7%99%D7%95_%D7%A4%D7%A8%D7%A0%D7%A0%D7%93%D7%A1.png' },
    { name: 'ז\'ארקו קוראץ\'', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Zarko_Korac_-_27_January_2016.JPG/330px-Zarko_Korac_-_27_January_2016.JPG' },
    { name: 'חיים קורפו', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Chaim_Corfu_%2800310183%29.jpg/330px-Chaim_Corfu_%2800310183%29.jpg' },
    { name: 'חסוס רואדה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/45/Jesus_Rueda.jpg/330px-Jesus_Rueda.jpg' },
    { name: 'יוסי קרמר', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/%D7%99%D7%95%D7%A1%D7%99_%D7%A7%D7%A8%D7%9E%D7%A8.png/330px-%D7%99%D7%95%D7%A1%D7%99_%D7%A7%D7%A8%D7%9E%D7%A8.png' },
    { name: 'לירוי צעירי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/%D7%9C%D7%99%D7%A8%D7%95%D7%99_%D7%A6%D7%A2%D7%99%D7%A8%D7%99_%D7%9E%D7%9B%D7%9C%D7%9F_%D7%91%D7%9C%D7%92%D7%99%D7%94_2013.jpg/330px-%D7%9C%D7%99%D7%A8%D7%95%D7%99_%D7%A6%D7%A2%D7%99%D7%A8%D7%99_%D7%9E%D7%9B%D7%9C%D7%9F_%D7%91%D7%9C%D7%92%D7%99%D7%94_2013.jpg' },
    { name: 'לירן רוטמן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Liran_Rotman_%28cropped%29.jpg/330px-Liran_Rotman_%28cropped%29.jpg' },
    { name: 'מרקוס רומולו', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/R%C3%B4mulo_Marques.jpg/330px-R%C3%B4mulo_Marques.jpg' },
    { name: 'ניסו קפילוטו', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/55_Nisso_Kapiloto.jpg/330px-55_Nisso_Kapiloto.jpg' },
    { name: 'ניקיטה רוקאביציה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Nikita_Rukavytsya_%282%29.JPG/330px-Nikita_Rukavytsya_%282%29.JPG' },
    { name: 'סמואל רזניק', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/%D7%A1%D7%9E%D7%95%D7%90%D7%9C_%D7%A8%D7%96%D7%A0%D7%99%D7%A7_1968.jpg/330px-%D7%A1%D7%9E%D7%95%D7%90%D7%9C_%D7%A8%D7%96%D7%A0%D7%99%D7%A7_1968.jpg' },
    { name: 'סרגיי קולוטובקין', image: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Sergei_Kolotovkin_2007.jpg' },
    { name: 'סרגיי קונובלוב', image: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Serhiy_Konovalov.jpg' },
    { name: 'עוז ראלי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Oz_Raly.jpg/330px-Oz_Raly.jpg' },
    { name: 'פרד פריידיי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Fred_Friday_2016.jpg/330px-Fred_Friday_2016.jpg' },
    { name: 'ציון צמח', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Zion_Tzemah.JPG/330px-Zion_Tzemah.JPG' },
    { name: 'קלאודמיר פריירה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Claudemir_Ferreira_da_Silva.JPG/330px-Claudemir_Ferreira_da_Silva.JPG' },
    { name: 'קרלוס קוויאר', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Carlos_Cuellar.jpg/330px-Carlos_Cuellar.jpg' },
    { name: 'רונן רוקמן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/%D7%93%D7%99%D7%95%D7%A7%D7%9F_%D7%A8%D7%95%D7%A0%D7%9F_%D7%A8%D7%95%D7%A7%D7%9E%D7%9F.jpg/330px-%D7%93%D7%99%D7%95%D7%A7%D7%9F_%D7%A8%D7%95%D7%A0%D7%9F_%D7%A8%D7%95%D7%A7%D7%9E%D7%9F.jpg' },
    { name: 'שי קונסטנטין', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/%D7%A9%D7%99_%D7%A7%D7%95%D7%A0%D7%A1%D7%98%D7%A0%D7%98%D7%99%D7%9F_2021.jpg/330px-%D7%A9%D7%99_%D7%A7%D7%95%D7%A0%D7%A1%D7%98%D7%A0%D7%98%D7%99%D7%9F_2021.jpg' },
    { name: 'שמואל קוזוקין', image: 'https://upload.wikimedia.org/wikipedia/commons/9/97/%D7%A9%D7%9E%D7%95%D7%90%D7%9C_%D7%A7%D7%95%D7%96%D7%95%D7%A7%D7%99%D7%9F.png' },
    { name: 'אבי ריקן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Rikan_%28crop%29.JPG/330px-Rikan_%28crop%29.JPG' },
    { name: 'אישטוון שאלוי', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Sall%C3%B3i_Istv%C3%A1n.jpg/330px-Sall%C3%B3i_Istv%C3%A1n.jpg' },
    { name: 'איתי שכטר', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fc/Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28019%29.jpg/330px-Beitar_Jerusalem_FC_vs._MTK_Budapest_FC_2016-06-18_%28019%29.jpg' },
    { name: 'דינו שקוורץ', image: 'https://upload.wikimedia.org/wikipedia/commons/6/61/20130905DINO_SKVORC.jpg' },
    { name: 'ז\'וזה ראמליו', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Joja_Romalio.jpg/330px-Joja_Romalio.jpg' },
    { name: 'טוטו תמוז', image: 'https://upload.wikimedia.org/wikipedia/he/thumb/8/82/Toto-tamuz001.jpg/330px-Toto-tamuz001.jpg' },
    { name: 'ירדן שועה', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/%D7%99%D7%A8%D7%93%D7%9F_%D7%A9%D7%95%D7%A2%D7%94_%D7%91%D7%9E%D7%93%D7%99_%D7%91%D7%99%D7%AA%D7%A8_%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D_%D7%9C%D7%A4%D7%A0%D7%99_%D7%94%D7%9E%D7%A9%D7%97%D7%A7_%D7%A0%D7%92%D7%93_%D7%94%D7%A4%D7%95%D7%A2%D7%9C_%D7%AA%22%D7%90.jpg/330px-%D7%99%D7%A8%D7%93%D7%9F_%D7%A9%D7%95%D7%A2%D7%94_%D7%91%D7%9E%D7%93%D7%99_%D7%91%D7%99%D7%AA%D7%A8_%D7%99%D7%A8%D7%95%D7%A9%D7%9C%D7%99%D7%9D_%D7%9C%D7%A4%D7%A0%D7%99_%D7%94%D7%9E%D7%A9%D7%97%D7%A7_%D7%A0%D7%92%D7%93_%D7%94%D7%A4%D7%95%D7%A2%D7%9C_%D7%AA%22%D7%90.jpg' },
    { name: 'נחום תא-שמע', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/%D7%A0%D7%97%D7%95%D7%9D.jpg/330px-%D7%A0%D7%97%D7%95%D7%9D.jpg' },
    { name: 'עופר שטרית', image: 'https://upload.wikimedia.org/wikipedia/he/thumb/1/1f/Ofer-shitrit.jpg/330px-Ofer-shitrit.jpg' },
    { name: 'עמיר תורג\'מן', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/AmirTurgeman.jpg/330px-AmirTurgeman.jpg' },
    { name: 'ציון שלום', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/%D7%A6%D7%99%D7%95%D7%9F_%D7%A9%D7%9C%D7%95%D7%9D.jpg/330px-%D7%A6%D7%99%D7%95%D7%9F_%D7%A9%D7%9C%D7%95%D7%9D.jpg' },
    { name: 'שמואל שיימן', image: 'https://upload.wikimedia.org/wikipedia/commons/3/37/MHFC-Shmuel-Shaimann.jpg' },
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
