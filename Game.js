
module.exports = class Game{
    constructor() {
        this.completeWords = ['hang', 'abruptly', 'trap', 'buffalo', 'kayak', 'fool', 'youthful', "HELPER", "WORKER", "MAIL", "PROGRAM", "FOLDER", "UNICORN", "HOLDER", "scrap", "PAPER", "adult", "POST", "HANGMAN", "TOOLMAN", "after", "TEACHER", 'Aberration', 'Retirement', 'Contraband'];
        this.maxGuess = 14;
        this.difficultyOptions = ['easy', 'medium', 'difficult', 'expert'];
        this.attempts = 1;
        this.correctWord;
        this.continue = 'yes';
    }
    makeAMove(sInput){ 
        let wordLength, newWordArray = []; 
        if(this.continue === 'yes') {
            if(!this.initiate) {
                this.initiate = 1;   
                return [`Hangman Word Guessing Game
                         Please choose the difficulty:  
    
                            Easy
                            Medium
                            Difficult
                            Expert
                         `];
            }
    
            if(!this.chooseDifficulty) {
    
                if(this.difficultyOptions.includes(sInput.toLowerCase())) {
                    this.chooseDifficulty = 1;
                    switch(sInput.toLowerCase()) {
                        
                        case 'easy': wordLength = 4;
                        break;
    
                        case 'medium': wordLength = 5;
                        break;
    
                        case 'difficult': wordLength = 7;
                        break;
    
                        default: wordLength = 10;
                        break;
                    }
    
                   this.completeWords.forEach( el => {
    
                        if(el.length === wordLength) {
                            newWordArray.push(el);
                        }
                    })
    
                    this.selectIndex = Math.floor((Math.random() * newWordArray.length));                
                    this.correctWord = newWordArray[this.selectIndex].toLowerCase();                
                    this.guessWord = this.correctWord.split('').map( el => {
                    return '_ ';
                     }).join('');
    
                     return [` Please enter one character at a time
    
    
                     ${this.guessWord}`];
                }
                else {
                    return ['Please enter the correct difficulty level'];
                }
            }       
            
                 
            if(this.attempts >= this.maxGuess) {
                this.initiate = undefined;
                this.attempts = 1;
                this.chooseDifficulty = undefined;
                return [`you lost !
                         correct word was: ${this.correctWord}
                         Try again`];
            }
            else {
                if (sInput.length === 1 && sInput.match(/[a-z]/i)) {
                    this.attempts++;
                    let filledIndexes = [];
                    let correctWord = this.correctWord;            
                    let correctWordArray = correctWord.split('');                
                    this.guessWord = this.guessWord.split(' ');
                    for(let i = 0; i < correctWord.length; i++) {
    
                        if(correctWordArray[i] === sInput.toLowerCase()) { 
                            this.guessWord[i] = `${sInput}`;                     
                        }
                    }
        
                    if(!this.guessWord.includes('_'))
                    {
                        this.chooseDifficulty = undefined;
                        this.initiate = undefined;
                        this.attempts = 1;
                        this.guessWord = this.guessWord.join(' ');
                        return [`${this.guessWord}
                               Congratulations you won !
                               Want to play again ?
                               `];                
                    }
                    else if(!this.guessWord.includes(sInput.toLowerCase())) {
                        this.guessWord = this.guessWord.join(' ');
                        return [`This character is not in the word
                                ${this.guessWord}`];
                    }
                    else {
                        this.guessWord = this.guessWord.join(' ');
                        return [this.guessWord];
                    }
                   
                }
                else {
                    return ['Please enter only single character!'];
                }
            }
        }
        else {
            return ['See you later!'];
        }      
    }
}