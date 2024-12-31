const urlParams = new URLSearchParams(window.location.search);

// Lock screen orientation to portrait
if (screen.orientation && screen.orientation.lock) {
    screen.orientation.lock('portrait')
        .catch(error => {
            console.log('Orientation lock failed:', error);
        });
}

function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

function createInspirationsContainer() {

    document.getElementById("main-container").innerHTML = `
        <div id="inspiration-container">
            <div id="inspiration-pre"></div>
            <div id="inspiration-body"></div>
            <div id="inspiration-post"></div>
        </div>
    `;

}

function getDayString() {
    return urlParams.get('d') || getCurrentDate();
}

function displayInspiration(props) {

    createInspirationsContainer();

    const inspBody = document.getElementById('inspiration-body');
    const postElement = document.getElementById('inspiration-post');
    const preElement = document.getElementById('inspiration-pre');

    const day = getDayString().split('-');

    preElement.textContent = `${day[2]}/${day[1]}/${day[0]}`;

    if (props.bgEffect === 'snowflakes') {
        snowflakes();
    } else if (props.bgEffectCommand) {
        eval(props.bgEffectCommand);
    }

    // TypeWriter effect
    if (props.effect === 'typewriter') {
        inspBody.innerHTML = '';
        effectTypeWriter(inspBody, props.text, () => {
            if (props.author) {
                $(postElement).hide();
                postElement.textContent = `${props.author}`;
                preElement.textContent = `${day[2]}/${day[1]}/${day[0]}`;
                $(postElement).fadeIn(1000);
            }
            if (props.afterEffect === 'confetti') {
                effectConfetti();
            }
        });
        
        return;
    }

    // Default (no effects)
    if (props.text) {
        inspBody.innerHTML = props.text;
        inspBody.style.display = 'block';
    } else {
        inspBody.style.display = 'none';
    }

    // Display author
    if (props.author) {
        postElement.textContent = `${props.author}`;
    }

}

async function init() {

    const useDb = false;    

    // Check for history query parameter
    // HISTORY SCREEN
    if (urlParams.has('history')) {
        showHistoryDates();
        return;
    }

    // MAIN SCREEN
    createHistoryButton(); 

    // TODO: prevedere l'introduzione di un parametro per andare indietro e avanti nei giorni e non 
    // solo data corrente. Se si va più avanti di oggi si deve visualizzare un messaggio di errore o 
    // eseguire un codice diverso


    const dayString = getDayString();
    const day = dayString.split("-");
    const year = day[0];
    const md = day[1] + "-" + day[2];

    let code;
    let dbData;

    let dayFile = `${year}/${md}.js`; 
    let testFile = `2025/test.js`;

    // Order of precedence: test.js > test from db > day.js > day from db > fallback.js


    code = await getCode(testFile);
    if (code == null && useDb) dbData = await fetchFromDb('test');
    if (dbData) {
        runDbPhaserCode(dbData);
        return;    
    }
    console.log('dayString', dayString);
    if (code == null && dayString > getCurrentDate()) {
        code = await getCode('futureDateDenied.js');
    }
    if (code == null) code = await getCode(dayFile);
    if (code == null && useDb) dbData = await fetchFromDb(dayString);
    
    if (dbData) {
        runDbPhaserCode(dbData);
        return;    
    }

    if (code == null) code = await getCode('fallback.js');
    if (code) eval(code);

}

async function fetchFromDb(dayString) {

    let dbData;

    await fetch('/api/day/' + dayString)
        .then(response => response.json())
        .then(data => {
            dbData = data;
        })
        .catch(error => {
            console.log('Error fetching data:', error?.message);
            console.log('Using another strategy to get the code...');
            return null;
        });

    return dbData;
}

function runDbPhaserCode(data) {

    console.log(data);

    if (data.code) {

        eval(data.code);

    } else {

        window[data.preset_effect](data.testo);
    
    }

}

function createHistoryButton() {

    const { width, height } = getBodySize();
    const historyButton = document.createElement("button");
    historyButton.id = "history-button";
    historyButton.textContent = "History";
    historyButton.style.position = "absolute";
    historyButton.style.top = `${height - 120}px`;
    historyButton.style.left = `${width - 90}px`;
    historyButton.addEventListener("click", () => {
        window.location.href = `?history`;
    });

    document.body.appendChild(historyButton);

}

function createBackButton() {

    const { width, height } = getBodySize();
    const backButton = document.createElement("button");
    backButton.id = "back-button";
    backButton.textContent = "back";
    backButton.style.position = "absolute";
    backButton.style.top = `${height - 120}px`;
    backButton.style.left = `${width - 90}px`;
    backButton.addEventListener("click", () => {
        window.location.href = `?`;
    });
    document.body.appendChild(backButton);

}


async function getCode(filename) {

    let code;
    let present = false;
    await fetch(`${filename}?r=` + Math.random())
    .then(response => {
        if (!response.ok) {
            throw new Error('File not found');
        }
        return response.text()
    })
    .then(data => {
        code = data;
        present = true;
    })
    .catch(error => {
        console.log(`Error fetching ${filename}:`, error?.message);
        console.log("Using another strategy to get the code...");
    });

    return present ? code : null;

}

// Service Worker registration for PWA
// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/service-worker.js')
//             .then(registration => {
//                 console.log('Service Worker registered');
//             })
//             .catch(error => {
//                 console.log('Service Worker registration failed:', error);
//             });
//     });
// }

function effectTypeWriter(element, text, afterTypeFn) {
    let speed = 300;
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed - Math.floor(Math.random() * speed * 0.75));
        } else {
            if (afterTypeFn) {
                afterTypeFn();
            }
        }
    }
    type();
}

function showHistoryDates() {

    // remove main container
    document.getElementById("main-container").remove();

    createBackButton();
    
    const minDate = "2024-12-10";
    const maxDate = getCurrentDate();

    // Create a list of buttons with all dates from minDate to maxDate
    let historyContainer = document.createElement("div");
    historyContainer.id = "history-container";

    let date = new Date(minDate);
    while (date <= new Date(maxDate)) {
        let dIso = date.toISOString().split('T')[0];
        if (dIso.split("-")[2] == "01" || dIso == minDate) {
            let hr = document.createElement("hr");
            let divLabel = document.createElement("div");
            divLabel.className = "date-label";
            divLabel.textContent = dIso.substring(0, 7);
            historyContainer.appendChild(hr);
            historyContainer.appendChild(divLabel);
        }
        let button = document.createElement("button");
        button.textContent = dIso.split("-")[2];
        button.onclick = function() {
            window.location.href = `?d=${dIso}`;
        }
        historyContainer.appendChild(button);
        date.setDate(date.getDate() + 1);
    }

    document.body.appendChild(historyContainer);

}