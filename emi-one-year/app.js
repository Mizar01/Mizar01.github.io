var day;

function getCurrentDate() {
    return new Date().toISOString().split('T')[0];
}

function displayInspiration(props) {

    const textElement = document.getElementById('inspiration-text');
    const imageElement = document.getElementById('inspiration-image');
    const postElement = document.getElementById('inspiration-post');
    const preElement = document.getElementById('inspiration-pre');

    preElement.textContent = `${day[2]}/${day[1]}/${day[0]}`;

    // TypeWriter effect
    if (props.effect === 'typewriter') {
        textElement.innerHTML = '';
        effectTypeWriter(textElement, props.text, () => {
            if (props.author) {
                $(postElement).hide();
                postElement.textContent = `${props.author}`;
                preElement.textContent = `${day[2]}/${day[1]}/${day[0]}`;
                $(postElement).fadeIn(1000);
            }
        });
        
        return;
    }

    // Default (no effects)
    if (props.text) {
        textElement.textContent = props.text;
        textElement.style.display = 'block';
    } else {
        textElement.style.display = 'none';
    }

    // Display image if exists
    if (props.image) {
        imageElement.src = props.image;
        imageElement.style.display = 'block';
    } else {
        imageElement.style.display = 'none';
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
        .then(response => response.text())
        .then(data => {
            code = data;
            testFilePresent = true;
        })
    .catch(error => {
        console.error(`Error fetching ${testFile}:`, error);
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

    eval(code);

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
    let speed = 300 - Math.floor(Math.random() * 250);
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            if (afterTypeFn) {
                afterTypeFn();
            }
        }
    }
    type();
}

init();