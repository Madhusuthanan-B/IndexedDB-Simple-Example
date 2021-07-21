function createDB() {

    const spectrumRequest = indexedDB.open("cma", 1);

    spectrumRequest.onupgradeneeded = (e) => {
        console.log('onupgradeneeded called', e);
        const db = e.target.result;
        db.createObjectStore('spectrums', { keyPath: 'nodeId' });
        db.createObjectStore('time-wave-forms', { keyPath: 'nodeId' });
        db.createObjectStore('trends', { keyPath: 'nodeId' });
    };

    spectrumRequest.onsuccess = (e) => {
        console.log('success called', e);
    };

    spectrumRequest.onerror = (e) => {
        console.log('error called', e);
    };
};


const btnCreateDB = document.getElementById('btnCreateDB');

btnCreateDB.addEventListener('click', (e) => {
    createDB();
});