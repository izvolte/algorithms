/**
 * Демонстрация упрощённого RSA для шифрования и дешифрования текстового сообщения.
 * В этом примере используются небольшие числа, поэтому его нельзя применять для реальной защиты.
 */

/**
 * Функция быстрого возведения в степень по модулю.
 * Вычисляет (base^exponent) mod modulus.
 */
function modExp(base: bigint, exponent: bigint, modulus: bigint): bigint {
    let result = 1n;
    base = base % modulus;
    while (exponent > 0n) {
        if (exponent % 2n === 1n) {
            result = (result * base) % modulus;
        }
        exponent = exponent / 2n;
        base = (base * base) % modulus;
    }
    return result;
}

/**
 * Генерация ключей для RSA.
 * Выбираем два простых числа p и q, затем вычисляем n = p * q и φ(n) = (p-1)*(q-1).
 * Здесь используются классические небольшие числа: p = 61, q = 53.
 */
const p = 61n;
const q = 53n;
const n = p * q;         // n = 3233
const phi = (p - 1n) * (q - 1n); // φ(n) = 3120

// Выбираем публичный экспонент e (обычно 17) и вычисляем закрытый ключ d,
// удовлетворяющий условию (d * e) mod φ(n) = 1. В нашем примере d = 2753.
const e = 17n;
const d = 2753n;

console.log("Публичный ключ (n, e):", n.toString(), e.toString());
console.log("Закрытый ключ (n, d):", n.toString(), d.toString());

/**
 * Функция для шифрования текстового сообщения.
 * Каждый символ преобразуется в код символа, затем шифруется как число по формуле: ciphertext = (charCode^e) mod n.
 */
function encryptMessage(message: string): bigint[] {
    const encrypted: bigint[] = [];
    for (let i = 0; i < message.length; i++) {
        const charCode = BigInt(message.charCodeAt(i));
        const encryptedChar = modExp(charCode, e, n);
        encrypted.push(encryptedChar);
    }
    return encrypted;
}

/**
 * Функция для дешифрования массива зашифрованных чисел.
 * Каждый зашифрованный символ преобразуется обратно: decryptedChar = (encryptedChar^d) mod n,
 * после чего число преобразуется в символ.
 */
function decryptMessage(encrypted: bigint[]): string {
    let decrypted = "";
    for (const encryptedChar of encrypted) {
        const decryptedCharCode = modExp(encryptedChar, d, n);
        decrypted += String.fromCharCode(Number(decryptedCharCode));
    }
    return decrypted;
}

// Исходное текстовое сообщение
const originalMessage = "HELLO, WORLD!";
console.log("Исходное сообщение:", originalMessage);

// Шифрование сообщения
const encryptedMessage = encryptMessage(originalMessage);
console.log("Зашифрованное сообщение (числовые значения):", encryptedMessage);

// Дешифрование сообщения
const decryptedMessage = decryptMessage(encryptedMessage);
console.log("Расшифрованное сообщение:", decryptedMessage);
