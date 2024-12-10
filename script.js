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

        this.maze = localMaze;
        this.newMaze(10,10);
        maze.generateControls()
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
            newfield.appendChild(this.generateRow(width, row));
            console.log('Row generated');
        }
        oldfield.replaceWith(newfield); 

        document.querySelectorAll('.row > div').forEach((element) => element.style.width = 'calc(100% / '+ width +')');
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
            this.newMaze(7,7)
        });
        mediumButton.addEventListener('click', () => {
            this.newMaze(10,10)
        });
        largeButton.addEventListener('click', () => {
            this.newMaze(25,25)
        }); 
      
        sizebar.appendChild(smallButton);
        sizebar.appendChild(mediumButton);
        sizebar.appendChild(largeButton);
        
        return sizebar;
    },

    generateRow(width, rowindex) {
        const row = this.elementWithClasses('div', 'row');

        for(let column = 0; column < width; column++) {
            row.appendChild(this.generateCell(rowindex, column));
        }

        return row;
    },
    


    generateControlFieldset() {
        const controlfieldset = this.makeFieldset('Controls');
        const paragraph = document.createElement('p');
        const controls = this.elementWithClasses('div', 'controlfieldset');
        const communications = this.makeFieldset('Communications');

        communications.appendChild(paragraph);
        controlfieldset.appendChild(controls);
        controlfieldset.appendChild(communications);
        return controlfieldset;
    },
    generateControls() { 
        const oldcontrols = document.querySelector('.controlfieldset');
        if (!oldcontrols) {
            console.error('No oldcontrols found');
        }
        const newcontrols = this.elementWithClasses('div', 'controlfieldset');
        
        var counter = 0;
        for (let i = 0; i < 3; i++) {
            newcontrols.appendChild(this.generateControlRow(counter));
            console.log('Control Row generated');
            counter++;
        };
       
        oldcontrols.replaceWith(newcontrols);
    },
    generateControlRow(counter) {
        const row = this.elementWithClasses('div', 'controlrow');
        const upButton = this.generateButton('upButton');
        const downButton = this.generateButton('downButton');
        const leftButton = this.generateButton('leftButton');
        const rightButton = this.generateButton('rightButton');
        const player = this.generateButton('player');
       
        
        upButton.addEventListener('click', () => { this.mazeMove(0, -1);});
        downButton.addEventListener('click', () => { this.mazeMove(0, 1);});
        leftButton.addEventListener('click', () => { this.mazeMove(-1, 0);});
        rightButton.addEventListener('click', () => { this.mazeMove(1, 0);});
        player.addEventListener('click', () => { this.solve(0,0);});

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
            else {
                row.appendChild(this.generateSpacer());
            }
        }
        return row;
    },
    generateButton(buttonType) {
        const squareholder = this.elementWithClasses('div', 'controlsquareholder');
        const squaresizer = this.elementWithClasses('div', 'squaresizer');
        const button = this.elementWithClasses('div', `controlbuttons icon squarecontent`);

        const svgTemplate = document.getElementById(buttonType); 
        if (svgTemplate) {
        const svg = svgTemplate.cloneNode(true); // Klone die SVG
        svg.classList.remove('hidden'); // Entferne die `hidden`-Klasse, falls vorhanden
        button.appendChild(svg); // Füge die SVG zum Button hinzu
    }

        squareholder.appendChild(squaresizer);
        squaresizer.appendChild(button);
        return squareholder;
    },
    generatePopupButton(text) {
        const squareholder = this.elementWithClasses('div', 'controlsquareholder');
        const squaresizer = this.elementWithClasses('div', 'squaresizer');
        const button = this.elementWithClasses('div', `squarecontent controlbuttons`);

        const svgTemplate = document.getElementById('replay'); 
        if (svgTemplate) {
        const svg = svgTemplate.cloneNode(true); // Klone die SVG
        svg.classList.remove('hidden'); // Entferne die `hidden`-Klasse, falls vorhanden
        button.appendChild(svg); // Füge die SVG zum Button hinzu
    }

        squareholder.appendChild(squaresizer);
        squaresizer.appendChild(button);
        return squareholder;
    },

/* Verschiedene Hilfmethoden */
    generateCell(rowindex, columnindex) {
        const squareholder = this.elementWithClasses('div', 'squareholder');
        const squaresizer = this.elementWithClasses('div', 'squaresizer');
        const cell = this.elementWithClasses('div', 'squarecontent cell');

        cell.dataset.x = columnindex;
        cell.dataset.y = rowindex;

        squareholder.appendChild(squaresizer);
        squaresizer.appendChild(cell);

        return squareholder;
    },

    generateSpacer() {
        const squareholder = this.elementWithClasses('div', 'controlsquareholder');
        const squaresizer = this.elementWithClasses('div', 'squaresizer');
        const spacer = this.elementWithClasses('div', 'squarecontent spacer');

        squareholder.appendChild(squaresizer);
        squaresizer.appendChild(spacer);

        return squareholder;
    },

  
    elementWithClasses(elementType, classNames) {
        const element = document.createElement(elementType);

        for (let className of classNames.split(' ')) {
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

    async newMaze(width, height) { 
        this.generateField(width, height);
        maze.width = width;
        maze.height = height;
        
        const {playerX, playerY} = await this.maze.generate(width, height);
        this.positionPlayer(playerX, playerY);
    },

    positionPlayer(playerX, playerY) {
        /* entfernen des alten Spielers */
        const oldPlayer = document.querySelector('.path.lol');
        if (oldPlayer) {
            oldPlayer.classList.remove('lol'); 

            const oldSvg = oldPlayer.querySelector('svg');
            if (oldSvg) {
                oldSvg.remove(); 
            }
        }

        /* Positionierung */
        this.playerX = playerX;
        this.playerY = playerY;
        const playercell = document.querySelector(`[data-x="${playerX}"][data-y="${playerY}"]`);

        if (playercell) {
            playercell.classList.remove('cell');
            playercell.classList.add('path'); 
            playercell.classList.add('lol'); // lol ist nur dazu da um das alte Spielerfeld zu identifizieren.

            const svgTemplate = document.getElementById('player'); 
            if (svgTemplate) {
                const svg = svgTemplate.cloneNode(true);
                svg.classList.remove('hidden'); 
                playercell.appendChild(svg); 
            }
        }

      
    },

    async mazeMove(dx, dy) {
        const newX = this.playerX + dx;
        const newY = this.playerY + dy;

        const {cell} = await this.maze.move(dx, dy);

        switch (cell) {
            default: alert('Invalid move');

            case 0: this.positionPlayer(newX, newY); break;
            case 1: this.positionPlayer(newX, newY); this.showPopup('Congratulations, You Won!'); break;
            case 2: this.markAsWall(newX, newY); break;
        }
    },
    markAsWall(dx, dy) {
        const wallCell = document.querySelector(`[data-x='${dx}'][data-y='${dy}']`);
        wallCell.classList.remove('cell');
        wallCell.classList.add('wall');
    },


    showPopup(message) {
        const popup = this.elementWithClasses('div', 'popup');
        const div = document.createElement('div');
        const messageDiv = this.elementWithClasses('div', 'popupmessage');
        const button = this.generatePopupButton('Replay');
    
        messageDiv.innerText = message;
        div.appendChild(messageDiv);
        div.appendChild(button);
        popup.appendChild(div);
        document.body.appendChild(popup);
    
        button.addEventListener('click', () => this.replay());
    },

    replay() {
        this.newMaze(7, 7);
        this.hidePopup();
    },
    hidePopup() {
        const popup = document.querySelector('.popup');
        popup.remove();
    },


    directions: [{dx:1, dy:0}, {dx:-1, dy:0}, {dx:0, dy:-1}, {dx:0, dy:1}],
    async solve(fromdx, fromdy) {
        const oldX = this.playerX;
        const oldY = this.playerY;

        for (const direction of this.directions) {
            if (direction.dx == -fromdx && direction.dy == -fromdy) {
                continue;
            }

            const newX = oldX + direction.dx;
            const newY = oldY + direction.dy;
            const {cell} = await this.maze.move(direction.dx, direction.dy);

            switch (cell) {

                case 0: this.positionPlayer(newX, newY);
                        const solved = await this.solve(direction.dx, direction.dy);
                        if (solved) {
                            return Promise.resolve(true);
                        }
                        await this.maze.move(-direction.dx, -direction.dy);
                        this.positionPlayer(oldX, oldY);
                        break;

                case 1: this.positionPlayer(newX, newY);
                        this.showPopup('Congratulations, You won!');
                        return Promise.resolve(true);

                case 2: this.markAsWall(newX, newY);
                break;
            }
        };
        return Promise.resolve(false);
    },

};

const localMaze = {
    playerX: 1,
    playerY: 1,
    // 0:ways
    // 1:target
    // 2:wall
    maze: [
        [2, 2, 2, 2, 2, 2, 2],
        [2, 0, 0, 0, 2, 0, 2],
        [2, 0, 2, 0, 2, 1, 2],
        [2, 0, 2, 0, 2, 0, 2],
        [2, 0, 2, 2, 2, 0, 2],
        [2, 0, 0, 0, 0, 0, 2],
        [2, 2, 2, 2, 2, 2, 2],
    ],

    async generate(width, height) {
        this.playerX = 1;
        this.playerY = 1;
        return new Promise (resolve => {
            window.setTimeout(() => 
                resolve({playerX: this.playerX, playerY: this.playerY}), 200);
        });
    },

    async move(dx, dy) {
        if (dx < -1 || dx > 1 || dy < -1 || dy > +1) 
             alert('Invalid move');
        
        const newX = this.playerX + dx;
        const newY = this.playerY + dy;
        const cell = this.maze[newY][newX];

        if (cell == 0 || cell == 1) {
            this.playerX = newX;
            this.playerY = newY;
        }
        return new Promise (resolve => {
            window.setTimeout(() => 
            resolve({cell, playerX: this.playerX, playerY: this.playerY}), 200);
        });
    },
    
}