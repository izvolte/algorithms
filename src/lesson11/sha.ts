/**
 * Вычисляет SHA-256 хеш для заданного сообщения.
 * @param message Входное сообщение в виде строки.
 * @returns Хеш-значение в виде шестнадцатеричной строки.
 */
function sha256(message: string): string {
    // Преобразование строки в массив байтов с помощью TextEncoder
    const encoder = new TextEncoder();
    const messageBytes = encoder.encode(message);

    // Предварительная обработка (padding)
    // 1. Добавляем бит 1 (0x80), затем k нулевых байтов, чтобы итоговая длина стала ≡ 56 (mod 64)
    // 2. В конце дописываем 8 байтов, представляющих длину исходного сообщения в битах (big-endian)
    const messageLength = messageBytes.length;
    const bitLength = messageLength * 8;

    // Добавляем 1 байт (0x80)
    const withOneByte = messageLength + 1;
    // Вычисляем количество нулевых байтов, чтобы (withOneByte + padding + 8) было кратно 64
    const paddingLength = (64 - ((withOneByte + 8) % 64)) % 64;
    const totalLength = withOneByte + paddingLength + 8;

    // Создаём массив для всего сообщения после padding
    const padded = new Uint8Array(totalLength);
    padded.set(messageBytes);
    padded[messageLength] = 0x80; // 0x80 = 10000000

    // Записываем длину сообщения (в битах) в последние 8 байт (big-endian)
    const view = new DataView(padded.buffer);
    view.setUint32(totalLength - 8, Math.floor(bitLength / 0x100000000), false); // старшие 32 бита
    view.setUint32(totalLength - 4, bitLength >>> 0, false); // младшие 32 бита

    // Инициализация начальных хеш-значений (первые 32 бита дробных частей квадратных корней первых 8 простых чисел)
    let h0 = 0x6a09e667;
    let h1 = 0xbb67ae85;
    let h2 = 0x3c6ef372;
    let h3 = 0xa54ff53a;
    let h4 = 0x510e527f;
    let h5 = 0x9b05688c;
    let h6 = 0x1f83d9ab;
    let h7 = 0x5be0cd19;

    // Константы для SHA-256 (первые 32 бита дробных частей кубических корней первых 64 простых чисел)
    const K: number[] = [
        0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5,
        0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
        0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3,
        0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
        0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc,
        0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
        0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7,
        0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
        0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13,
        0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
        0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3,
        0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
        0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5,
        0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
        0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208,
        0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2,
    ];

    // Функция для правого циклического сдвига (работает с 32-битными числами)
    function rightRotate(x: number, n: number): number {
        return (x >>> n) | (x << (32 - n));
    }

    // Функции, используемые в алгоритме SHA-256
    function ch(x: number, y: number, z: number): number {
        return (x & y) ^ (~x & z);
    }

    function maj(x: number, y: number, z: number): number {
        return (x & y) ^ (x & z) ^ (y & z);
    }

    function sigma0(x: number): number {
        return rightRotate(x, 7) ^ rightRotate(x, 18) ^ (x >>> 3);
    }

    function sigma1(x: number): number {
        return rightRotate(x, 17) ^ rightRotate(x, 19) ^ (x >>> 10);
    }

    function Sigma0(x: number): number {
        return rightRotate(x, 2) ^ rightRotate(x, 13) ^ rightRotate(x, 22);
    }

    function Sigma1(x: number): number {
        return rightRotate(x, 6) ^ rightRotate(x, 11) ^ rightRotate(x, 25);
    }

    // Обработка каждого 512-битного (64 байтного) блока
    for (let i = 0; i < totalLength; i += 64) {
        // Разбиваем блок на 16 32-битных слов
        const w = new Array<number>(64);
        for (let j = 0; j < 16; j++) {
            w[j] = view.getUint32(i + j * 4, false); // big-endian
        }
        // Расширяем 16 слов до 64
        for (let j = 16; j < 64; j++) {
            w[j] = (sigma1(w[j - 2]) + w[j - 7] + sigma0(w[j - 15]) + w[j - 16]) >>> 0;
        }

        // Инициализируем рабочие переменные для текущего блока
        let a = h0;
        let b = h1;
        let c = h2;
        let d = h3;
        let e = h4;
        let f = h5;
        let g = h6;
        let h = h7;

        // Основной цикл (64 раунда)
        for (let j = 0; j < 64; j++) {
            const t1 = (h + Sigma1(e) + ch(e, f, g) + K[j] + w[j]) >>> 0;
            const t2 = (Sigma0(a) + maj(a, b, c)) >>> 0;
            h = g;
            g = f;
            f = e;
            e = (d + t1) >>> 0;
            d = c;
            c = b;
            b = a;
            a = (t1 + t2) >>> 0;
        }

        // Обновляем хеш-значения после обработки блока
        h0 = (h0 + a) >>> 0;
        h1 = (h1 + b) >>> 0;
        h2 = (h2 + c) >>> 0;
        h3 = (h3 + d) >>> 0;
        h4 = (h4 + e) >>> 0;
        h5 = (h5 + f) >>> 0;
        h6 = (h6 + g) >>> 0;
        h7 = (h7 + h) >>> 0;
    }

    // Преобразование итоговых 32-битных слов в шестнадцатеричное представление
    function toHex(num: number): string {
        return num.toString(16).padStart(8, "0");
    }

    // Возвращаем объединённый хеш как строку
    return (
        toHex(h0) +
        toHex(h1) +
        toHex(h2) +
        toHex(h3) +
        toHex(h4) +
        toHex(h5) +
        toHex(h6) +
        toHex(h7)
    );
}

// Пример использования
const hash = sha256("Hello, world!");
console.log("SHA-256:", hash);
