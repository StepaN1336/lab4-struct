function insertionSort(arr) {
    let comparisons = 0;
    let swaps = 0;

    const startTime = performance.now();

    for (let i = 1, l = arr.length; i < l; i++) {
        const current = arr[i];
        let j = i;
        while (j > 0 && arr[j - 1] > current) {
            comparisons++;
            arr[j] = arr[j - 1];
            j--;
        }
        arr[j] = current;
        swaps++;
    }

    const endTime = performance.now();
    const elapsedTime = endTime - startTime;

    return { arr, comparisons, swaps, elapsedTime };
}

function bubbleSort(arr) {
    let comparisons = 0;
    let swaps = 0;

    const startTime = performance.now();

    let len = arr.length;
    let swapped;

    do {
        swapped = false;
        for (let i = 0; i < len - 1; i++) {
            comparisons++;
            if (arr[i] > arr[i + 1]) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
                swapped = true;
                swaps++;
            }
        }
    } while (swapped);

    const endTime = performance.now();
    const elapsedTime = endTime - startTime;

    return { arr, comparisons, swaps, elapsedTime };
}

function selectionSort(arr) {
    let comparisons = 0;
    let swaps = 0;

    const startTime = performance.now();

    const n = arr.length;
    for (let i = 0; i < n - 1; i++) {
        let min = i;
        for (let j = i + 1; j < n; j++) {
            comparisons++;
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        const t = arr[min];
        arr[min] = arr[i];
        arr[i] = t;
        swaps++;
    }

    const endTime = performance.now();
    const elapsedTime = endTime - startTime;

    return { arr, comparisons, swaps, elapsedTime };
}

function sortShell(arr) {
    let comparisons = 0;
    let swaps = 0;

    const startTime = performance.now();

    let k = 0,
        gap = [parseInt(arr.length / 2)];

    while (gap[k] > 1) {
        k++;
        gap[k] = parseInt(gap[k - 1] / 2);
    }

    for (let i = 0; i <= k; i++) {
        const step = gap[i];
        for (let j = step; j < arr.length; j++) {
            const temp = arr[j];
            let p = j - step;
            while (p >= 0 && temp < arr[p]) {
                comparisons++;
                arr[p + step] = arr[p];
                p = p - step;
            }
            arr[p + step] = temp;
            swaps++;
        }
    }

    const endTime = performance.now();
    const elapsedTime = endTime - startTime;

    return { arr, comparisons, swaps, elapsedTime };
}

function quickSort(arr, L, R) {
    let comparisons = 0;
    let swaps = 0;

    const startTime = performance.now();

    if (L === undefined) L = 0;
    if (R === undefined) R = arr.length - 1;
    let iter = L,
        jter = R,
        middle = parseInt((R + L) / 2),
        x = arr[middle],
        tmp;

    do {
        while (arr[iter] < x) {
            comparisons++;
            iter++;
        }
        while (x < arr[jter]) {
            comparisons++;
            jter--;
        }
        if (iter <= jter) {
            tmp = arr[iter];
            arr[iter] = arr[jter];
            arr[jter] = tmp;
            iter++;
            jter--;
            swaps++;
        }
    } while (iter < jter);

    if (L < jter) {
        const result = quickSort(arr, L, jter);
        comparisons += result.comparisons;
        swaps += result.swaps;
    }
    if (iter < R) {
        const result = quickSort(arr, iter, R);
        comparisons += result.comparisons;
        swaps += result.swaps;
    }

    const endTime = performance.now();
    const elapsedTime = endTime - startTime;

    return { arr, comparisons, swaps, elapsedTime };
}


document.addEventListener("DOMContentLoaded", function () {
    displayData();
});

function sort() {
    const sortingMethod = document.querySelector('input[name="sortingMethod"]:checked');
    
    if (!sortingMethod) {
        alert('Select a sorting method');
        return;
    }
    
    const methodValue = sortingMethod.value;
    let result;
    let data = getInitialData();

    switch (methodValue) {
        case 'insertion':
            console.time('insertion');
            result = insertionSort(data);
            console.timeEnd('insertion');
            break;
        case 'bubble':
            console.time('bubble');
            result = bubbleSort(data);
            console.timeEnd('bubble');
            break;
        case 'selection':
            console.time('selection');
            result = selectionSort(data);
            console.timeEnd('selection');
            break;
        case 'shell':
            console.time('shell');
            result = sortShell(data);
            console.timeEnd('shell');
            break;
        case 'quick':
            console.time('quick');
            result = quickSort(data);
            console.timeEnd('quick');
            break;
    }

    displaySortedData(methodValue, result);
}

function getInitialData(length, min, max) {
    if(!length) length = 100;
    if(!min) min = 1;
    if(!max) max = 100;
    return Array.from({ length }, () => Math.floor(Math.random() * (max - min + 1)) + min);
}

function displayData() {
    const initialDataDiv = document.getElementById('initialData');
    const data = getInitialData();

    initialDataDiv.textContent = data.join(', ');
}

function displaySortedData(method, sortedData) {
    const sortedDataDiv = document.getElementById('sortedData');
    sortedDataDiv.textContent = sortedData.arr.join(', ');

    const info = document.createElement('p');
    info.textContent = `Comparisons: ${sortedData.comparisons}, Swaps: ${sortedData.swaps}, Elapsed Time: ${sortedData.elapsedTime.toFixed(4)}`;
    sortedDataDiv.appendChild(info);

    const sortedDataTable = document.getElementById('sortedDataTable');
    const newRow = sortedDataTable.insertRow(-1);
    const cellMethod = newRow.insertCell(0);
    const cellSortedData = newRow.insertCell(1);
    const cellComparisons = newRow.insertCell(2);
    const cellSwaps = newRow.insertCell(3);
    const cellElapsedTime = newRow.insertCell(4);

    cellMethod.textContent = method;
    cellSortedData.textContent = sortedData.arr.join(', ');
    cellComparisons.textContent = sortedData.comparisons;
    cellSwaps.textContent = sortedData.swaps;
    cellElapsedTime.textContent = sortedData.elapsedTime.toFixed(4);
}
