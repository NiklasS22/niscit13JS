window.addEventListener('load', () => maze.init());

const maze = {

/* 'init' = Hauptfunktion, wird bei Laden der Seite ausgeführt. */
    init() {
        
        const body = document.body;
        const header = this.generateHeader('Maze', 'by Niklas Scherz');
        const main = this.generateMain();
        const footer = this.generateFooter();

        body.appendChild(header);
        body.appendChild(main);
        body.appendChild(footer);

        console.log('Basic Layout generated');

        maze.generateField(7,7)
    },


/* Header, Main und Footer generieren */
    generateHeader(title, subtitle) { 
        const header = document.createElement('header');
        const limiter = this.elementWithClasses('div', 'header limiter');
        const h1 = document.createElement('h1');
        h1.innerText = title;
        const h2 = document.createElement('h2');
        h2.innerText = subtitle;
      


        limiter.appendChild(h1);
        limiter.appendChild(h2);
        header.appendChild(limiter);
        return header;
    },
    generateMain() {
        const main = document.createElement('main');
        const limiter = this.elementWithClasses('div', 'main limiter');

        const cellfieldset = this.generateMazeFieldset();
        const controlfieldset = this.generateControlFieldset();
        
        limiter.appendChild(cellfieldset);
        limiter.appendChild(controlfieldset);
        main.appendChild(limiter);
        return main;

    },
    generateFooter() {
        const footer = document.createElement('footer');
        const limiter = this.elementWithClasses('div', 'footer limiter');

        limiter.innerText = '© 2024 Niklas Scherz';
        footer.appendChild(limiter);

        return footer;
    },


/* Maze Generierung */
    generateMazeFieldset() {
        const fieldset = this.makeFieldset('Maze');
        const field = this.elementWithClasses('div', 'field');
        const sizebar = this.generateSizebar();

        fieldset.appendChild(field);
        fieldset.appendChild(sizebar);

        return fieldset;
    },
    generateField(width, height) {
        const oldfield = document.querySelector('.field');
        if (!oldfield) {
            console.error('No oldfield found');
        }
        const newfield = this.elementWithClasses('div', 'field');

        for(let row = 0; row < height; row++) {
            newfield.appendChild(this.generateRow(width));
            console.log('Row generated');
        }
        oldfield.replaceWith(newfield); 
        /* document.querySelectorAll(".row").forEachElement.call (keine ahnung was hier stehn muss)*/
    },
    generateSizebar() {
        const sizebar = this.elementWithClasses('div', 'sizebar');

        const smallButton = this.elementWithClasses('size-button', 'sizebarButton');
        smallButton.textContent = 'Small';
        const mediumButton = this.elementWithClasses('size-button', 'sizebarButton');
        mediumButton.textContent = 'Medium';
        const largeButton = this.elementWithClasses('size-button', 'sizebarButton');
        largeButton.textContent = 'Large';  

        smallButton.addEventListener('click', () => {
            document.documentElement.style.setProperty('--fieldwidth', '5')
            maze.generateField(5,5)
        });
        mediumButton.addEventListener('click', () => {
            document.documentElement.style.setProperty('--fieldwidth', '10')
            maze.generateField(10,10)
        });
        largeButton.addEventListener('click', () => {
            document.documentElement.style.setProperty('--fieldwidth', '25')
            maze.generateField(25,25)
        }); 
      
        




        sizebar.appendChild(smallButton);
        sizebar.appendChild(mediumButton);
        sizebar.appendChild(largeButton);
        
        return sizebar;
    },
    generateRow(width) {
        const row = this.elementWithClasses('div', 'row');
        for(let column = 0; column < width; column++) {
            row.appendChild(this.generateCell());
        }
        return row;
    },
    generateCell() {
        const squareholder = this.elementWithClasses('div', 'squareholder');
        const squaresizer = this.elementWithClasses('div', 'squaresizer');
        const cell = this.elementWithClasses('div', 'squarecontent cell');

        squareholder.appendChild(squaresizer);
        squaresizer.appendChild(cell);

        return squareholder;
    },


/* Control Generierung */
    generateControlFieldset() {
        const controlfieldset = this.makeFieldset('Controls');
        const paragraph = document.createElement('p');
        const controls = this.generateControls();
        const communications = this.makeFieldset('Communications');

        communications.appendChild(paragraph);
        controlfieldset.appendChild(controls);
        controlfieldset.appendChild(communications);
        return controlfieldset;
    },
    generateControls() { 
        const controls = this.elementWithClasses('div', 'controlfieldset');
        
        var counter = 0;
        for (let i = 0; i < 3; i++) {
            controls.appendChild(this.generateControlRow(counter));
            counter++;
        };
       
        
        
        return controls
    },
    generateControlRow(counter) {
        const row = this.elementWithClasses('div', 'controlrow');
        const upButton = this.generateButton('upButton icon-up-arrow');
        const downButton = this.generateButton('downButton icon-down-arrow');
        const leftButton = this.generateButton('leftButton icon-left-arrow');
        const rightButton = this.generateButton('rightButton icon-right-arrow');
        const player = this.generateButton('upButton icon-person');

        upButton.addEventListener('click', () => { 
            maze.mazeMove(0, -1);
        });

        for (i = 0; i < 3; i++) {
            if (counter == 0 && i == 1) {
                row.appendChild(upButton);
            }
            else if (counter == 1 && i == 0) {
                row.appendChild(leftButton);
            } 
            else if (counter == 1 && i == 1) {
                row.appendChild(player); 
            }
            else if (counter == 1 && i == 2) {
                row.appendChild(rightButton);
            } 
            else if (counter == 2 && i == 1) {
                row.appendChild(downButton);
            }
        }
        return row;
    },
    

 
/* Steuerungslogik */
    mazeMove(dx, dy) {
        alert ('moved by ${dx}, ${dy}');
     },


/* Verschiedene Hilfmethoden */
    generateButton(buttonType) {
        const squareholder = this.elementWithClasses('div', 'squareholder');
        const squaresizer = this.elementWithClasses('div', 'squaresizer');
        const button = this.elementWithClasses('div', `${buttonType} icon squarecontent`);

        squareholder.appendChild(squaresizer);
        squaresizer.appendChild(button);
        return squareholder;
    },
    generateButtonNew(elementType, classNames) {
        
        const element = document.createElement(elementType);
        for (const className of classNames.split(' ')) {
            element.classList.add(className);
        }
        return element;
    },
    elementWithClasses(elementType, classNames) {
        
        const element = document.createElement(elementType);
        for (const className of classNames.split(' ')) {
            element.classList.add(className);
        }
        return element;
    },
    makeFieldset(legendText) {
        const fieldset = document.createElement('fieldset');
        const legend = document.createElement('legend');
        legend.innerText = legendText;
        fieldset.appendChild(legend);
        return fieldset;
    },   


};