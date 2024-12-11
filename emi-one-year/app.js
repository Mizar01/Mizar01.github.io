var day;

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

function displayInspiration(props) {

    createInspirationsContainer();

    const inspBody = document.getElementById('inspiration-body');
    const postElement = document.getElementById('inspiration-post');
    const preElement = document.getElementById('inspiration-pre');

    preElement.textContent = `${day[2]}/${day[1]}/${day[0]}`;

    if (props.bgEffect === 'snowflakes') {
        createSnowFlakes();
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

    // TODO: prevedere l'introduzione di un parametro per andare indietro e avanti nei giorni e non 
    // solo data corrente. Se si va più avanti di oggi si deve visualizzare un messaggio di errore o 
    // eseguire un codice diverso

    day = getCurrentDate().split("-");
    const year = day[0];
    const md = day[1] + "-" + day[2];

    let code;

    let dayFile = `${year}/${md}.js`; 
    let testFile = `${year}/test.js`;
    let testFilePresent = false;

    await fetch(`${testFile}?r=` + Math.random())
        .then(response => {
            if (!response.ok) {
                throw new Error('File not found');
            }
            return response.text()
        })
        .then(data => {
            code = data;
            testFilePresent = true;
        })
        .catch(error => {
            console.log(`Error fetching ${testFile}:`, error);
            console.log("Using the current day file");
        });

    if (!testFilePresent) {
        await fetch(`${dayFile}?r=` + Math.random())
            .then(response => response.text())
            .then(data => {
                code = data;
            })
            .catch(error => {
                console.error(`Error fetching ${dayFile}:`, error);
            });
    }

    if (code) eval(code);

    // Check for history query parameter
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('history')) {
        displayHistory();
    }
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

init();