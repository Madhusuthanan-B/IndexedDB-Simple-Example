
const btnTrend = document.getElementById('btnTrend');
const btnSpectrum = document.getElementById('btnSpectrum');
const btnTimeWaveForm = document.getElementById('btnTimeWaveForm');

const sampleDataGenerator = () => {

    const randomRange = () => Math.floor(Math.random() * 50) + 5;
    return {
        getData: () => {
            return new Array(randomRange()).fill((null)).map((x, i) => {
                return { x: i, y: Math.abs(Math.sin(i) * 2) }
            });
        }
    };
};

let DB;

const spectrumRequest = indexedDB.open("cma", 1);

spectrumRequest.onsuccess = (e) => {
    console.log('success called', e);
    DB = e.target.result;
};

spectrumRequest.onerror = (e) => {
    console.log('error called', e);
};

btnTrend.addEventListener('click', () => {
    const nodeId = document.getElementById('nodeId').value;
    const targetObjectStoreName = "trends";

    const trendData = {
        nodeId: nodeId,
        nodeType: 'cmaTrend',
        time: Date.now(),
        events: sampleDataGenerator().getData()
    };
    const tx = DB.transaction(targetObjectStoreName, "readwrite");
    tx.onerror = (e) => {
        console.log('transation error', e);
    };
    const trends = tx.objectStore(targetObjectStoreName);
    trends.put(trendData);
});

btnSpectrum.addEventListener('click', () => {
    const nodeId = document.getElementById('nodeId').value;
    const targetObjectStoreName = "spectrums";

    const spectrumData = {
        nodeId: nodeId,
        nodeType: 'cmaSpectrum',
        time: Date.now(),
        events: sampleDataGenerator().getData(),
        attributes: {
            rpm: 2500,
            fmax: 40,
            relatedTo: 'trend'
        }
    };
    const tx = DB.transaction(targetObjectStoreName, "readwrite");
    tx.onerror = (e) => {
        console.log('transation error', e);
    };
    const spectrums = tx.objectStore(targetObjectStoreName);
    spectrums.put(spectrumData);
});

btnTimeWaveForm.addEventListener('click', () => {
    const nodeId = document.getElementById('nodeId').value;
    const targetObjectStoreName = "time-wave-forms";

    const timeWaveFormData = {
        nodeId: nodeId,
        nodeType: 'cmaTimeWaveForm',
        time: Date.now(),
        events: sampleDataGenerator().getData(),
        attributes: {
            relatedTo: 'spectrum'
        }
    };
    const tx = DB.transaction(targetObjectStoreName, "readwrite");
    tx.onerror = (e) => {
        console.log('transation error', e);
    };
    const timeWaveForms = tx.objectStore(targetObjectStoreName);
    timeWaveForms.put(timeWaveFormData);
});
