document.addEventListener('DOMContentLoaded', function () {
    const input = document.getElementById('cryptoInput');
    const actionButton = document.getElementById('cryptoAction');
    const output = document.getElementById('cryptoOutput');
    const generateIVBtn = document.getElementById('generateIVBtn');
    const generateRSAKeyBtn = document.getElementById('generateRSAKeyBtn');
    const ivInput = document.getElementById('cryptoIV');
    const aesSecretInput = document.getElementById('aesSecret');
    const rsaPublicKeyInput = document.getElementById('rsaPublicKey');
    const rsaPrivateKeyInput = document.getElementById('rsaPrivateKey');
    const aesKeyFields = document.getElementById('aesKeyFields');
    const rsaKeyFields = document.getElementById('rsaKeyFields');

    const modeRadios = document.querySelectorAll('input[name="mode"]');
    const algorithmSelect = document.getElementById('cryptoAlgorithm');

    const symmetricAlgorithms = [
        { value: "AES-128-CBC", label: "AES-128-CBC" },
        { value: "AES-192-CBC", label: "AES-192-CBC" },
        { value: "AES-256-CBC", label: "AES-256-CBC" },
        { value: "AES-256-GCM", label: "AES-256-GCM (WebCrypto)" }
    ];

    const asymmetricAlgorithms = [
        { value: "RSA-OAEP", label: "RSA-OAEP" }
    ];

    // Setup initial algorithm list
    updateAlgorithmOptions('symmetric');

    // Update algorithm options and fields when Mode changes
    modeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const mode = document.querySelector('input[name="mode"]:checked').value;
            updateAlgorithmOptions(mode);

            if (mode === 'symmetric') {
                aesKeyFields.style.display = 'flex';
                rsaKeyFields.style.display = 'none';
            } else {
                aesKeyFields.style.display = 'none';
                rsaKeyFields.style.display = 'flex';
            }

            ivInput.value = '';
        });
    });

    function updateAlgorithmOptions(mode) {
        algorithmSelect.innerHTML = '';
        const options = (mode === 'symmetric') ? symmetricAlgorithms : asymmetricAlgorithms;
        options.forEach(opt => {
            const option = document.createElement('option');
            option.value = opt.value;
            option.textContent = opt.label;
            algorithmSelect.appendChild(option);
        });
    }

    // Fix initial visibility on page load
    (function setInitialModeFields() {
        const initialMode = document.querySelector('input[name="mode"]:checked')?.value || 'symmetric';
        updateAlgorithmOptions(initialMode);

        if (initialMode === 'symmetric') {
            aesKeyFields.style.display = 'flex';
            rsaKeyFields.style.display = 'none';
        } else {
            aesKeyFields.style.display = 'none';
            rsaKeyFields.style.display = 'flex';
        }
    })();

    generateIVBtn?.addEventListener('click', () => {
        const iv = window.crypto.getRandomValues(new Uint8Array(12)); // 96 bits for GCM
        ivInput.value = Array.from(iv).map(b => b.toString(16).padStart(2, '0')).join('');
        output.value = "✅ Random IV generated.";
    });

    generateRSAKeyBtn?.addEventListener('click', async () => {
        try {
            output.value = "⏳ Generating RSA keypair. Please wait this make take 5-10 seconds...";
            await new Promise(resolve => setTimeout(resolve, 100)); // Let browser update output field first

            const rsaKeypair = KEYUTIL.generateKeypair("RSA", 2048);
            const privateKeyPEM = KEYUTIL.getPEM(rsaKeypair.prvKeyObj, "PKCS8PRV");
            const publicKeyPEM = KEYUTIL.getPEM(rsaKeypair.pubKeyObj);

            rsaPublicKeyInput.value = publicKeyPEM;
            rsaPrivateKeyInput.value = privateKeyPEM;

            output.value = "✅ New RSA Public and Private Keys generated.";
        } catch (err) {
            output.value = `❌ Error generating RSA key: ${err.message}`;
        }
    });

    actionButton.addEventListener('click', async (e) => {
        e.preventDefault();

        actionButton.disabled = true;
        const originalText = actionButton.textContent;
        actionButton.textContent = "Running...";

        const mode = document.querySelector('input[name="mode"]:checked')?.value;
        const operation = document.querySelector('input[name="operation"]:checked')?.value;
        const algorithm = document.getElementById('cryptoAlgorithm').value;
        const encoding = document.querySelector('input[name="outputEncoding"]:checked')?.value || 'hex';

        const text = input.value.trim();
        let key = '';

        if (mode === 'symmetric') {
            key = aesSecretInput.value.trim();
        } else if (mode === 'asymmetric') {
            key = (operation === 'encrypt')
                ? rsaPublicKeyInput.value.trim()
                : rsaPrivateKeyInput.value.trim();
        }

        let ivHex = ivInput.value.trim();

        if (!text || !key) {
            output.value = "❌ Please provide both text and key.";
            actionButton.disabled = false;
            actionButton.textContent = originalText;
            return;
        }

        if (algorithm.startsWith('AES')) {
            if (operation === 'encrypt' && !ivHex) {
                const generatedIV = window.crypto.getRandomValues(new Uint8Array(12));
                ivHex = Array.from(generatedIV).map(b => b.toString(16).padStart(2, '0')).join('');
                ivInput.value = ivHex;
                output.value = "✅ Random IV auto-generated.";
            }
            if (operation === 'decrypt' && !ivHex) {
                output.value = "❌ IV is required for decryption.";
                actionButton.disabled = false;
                actionButton.textContent = originalText;
                return;
            }
        }

        try {
            let result = '';

            if (mode === 'symmetric') {
                result = (operation === 'encrypt')
                    ? await symmetricEncrypt(text, key, algorithm, encoding, ivHex)
                    : await symmetricDecrypt(text, key, algorithm, ivHex);
            } else if (mode === 'asymmetric') {
                result = (operation === 'encrypt')
                    ? rsaEncrypt(text, key, encoding)
                    : rsaDecrypt(text, key);
            }

            output.value = result;
        } catch (err) {
            output.value = `❌ Error: ${err.message}`;
        } finally {
            actionButton.disabled = false;
            actionButton.textContent = originalText;
        }
    });

    async function symmetricEncrypt(plainText, password, algorithm, encoding, ivHex) {
        if (algorithm.includes('CBC')) {
            const keySizeBits = parseInt(algorithm.split('-')[1]); // 128/192/256
            return aesCbcEncrypt(plainText, password, encoding, ivHex, keySizeBits);
        } else if (algorithm.includes('GCM')) {
            return aesGcmEncrypt(plainText, password, encoding, ivHex, 32); // AES-256-GCM
        }
        throw new Error('Unsupported symmetric algorithm.');
    }

    async function symmetricDecrypt(cipherInput, password, algorithm, ivHex) {
        if (algorithm.includes('CBC')) {
            const keySizeBits = parseInt(algorithm.split('-')[1]); // 128/192/256
            return aesCbcDecrypt(cipherInput, password, ivHex, keySizeBits);
        } else if (algorithm.includes('GCM')) {
            return aesGcmDecrypt(cipherInput, password, ivHex);
        }
        throw new Error('Unsupported symmetric algorithm.');
    }

    function aesCbcEncrypt(plainText, password, encoding, ivHex, keySizeBits) {
        const iv = CryptoJS.enc.Hex.parse(ivHex);
        const key = CryptoJS.PBKDF2(password, iv, {
            keySize: keySizeBits / 32,
            iterations: 1000
        });

        const options = {
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
            iv: iv
        };

        const encrypted = CryptoJS.AES.encrypt(plainText, key, options);
        const ciphertext = encrypted.ciphertext;
        return (encoding === 'base64') ? CryptoJS.enc.Base64.stringify(ciphertext) : ciphertext.toString(CryptoJS.enc.Hex);
    }

    function aesCbcDecrypt(cipherInput, password, ivHex, keySizeBits) {
        let cipherData;
        try {
            cipherData = /^[0-9a-f]+$/i.test(cipherInput)
                ? CryptoJS.enc.Hex.parse(cipherInput)
                : CryptoJS.enc.Base64.parse(cipherInput);
        } catch {
            throw new Error('Invalid ciphertext format.');
        }

        const iv = CryptoJS.enc.Hex.parse(ivHex);
        const key = CryptoJS.PBKDF2(password, iv, {
            keySize: keySizeBits / 32,
            iterations: 1000
        });

        const options = {
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
            iv: iv
        };

        const decrypted = CryptoJS.AES.decrypt({ ciphertext: cipherData }, key, options);
        const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
        if (!plaintext) {
            throw new Error('Decryption failed. Incorrect password, IV, or corrupted data.');
        }
        return plaintext;
    }

    async function aesGcmEncrypt(plainText, password, encoding, ivHex, keyLengthBytes) {
        const enc = new TextEncoder();
        const iv = hexStringToUint8Array(ivHex);

        const keyMaterial = await window.crypto.subtle.importKey(
            'raw',
            await pbkdf2(password, iv, keyLengthBytes),
            { name: 'AES-GCM' },
            false,
            ['encrypt']
        );

        const encrypted = await window.crypto.subtle.encrypt(
            { name: 'AES-GCM', iv: iv },
            keyMaterial,
            enc.encode(plainText)
        );

        return (encoding === 'base64') ? arrayBufferToBase64(encrypted) : arrayBufferToHex(encrypted);
    }

    async function aesGcmDecrypt(cipherInput, password, ivHex) {
        const raw = isHex(cipherInput)
            ? hexStringToUint8Array(cipherInput)
            : base64ToUint8Array(cipherInput);

        const iv = hexStringToUint8Array(ivHex);

        const keyMaterial = await window.crypto.subtle.importKey(
            'raw',
            await pbkdf2(password, iv, 32),
            { name: 'AES-GCM' },
            false,
            ['decrypt']
        );

        const decrypted = await window.crypto.subtle.decrypt(
            { name: 'AES-GCM', iv: iv },
            keyMaterial,
            raw
        );

        return new TextDecoder().decode(decrypted);
    }

    function rsaEncrypt(plainText, pemKey, encoding) {
        const keyObj = KEYUTIL.getKey(pemKey);
        const pubKeyObj = keyObj.isPrivate ? KEYUTIL.getKey(KEYUTIL.getPEM(keyObj, "PKCS8PUB")) : keyObj;
        const encHex = KJUR.crypto.Cipher.encrypt(plainText, pubKeyObj);
        return encoding === 'base64' ? hextob64(encHex) : encHex;
    }

    function rsaDecrypt(cipherHexOrB64, pemPrivateKey) {
        const prv = KEYUTIL.getKey(pemPrivateKey);
        const cipherHex = isBase64(cipherHexOrB64) ? b64tohex(cipherHexOrB64) : cipherHexOrB64;
        return KJUR.crypto.Cipher.decrypt(cipherHex, prv);
    }

    function isBase64(str) {
        return /^[A-Za-z0-9+/]+={0,2}$/.test(str.replace(/\s+/g, ''));
    }

    function isHex(str) {
        return /^[0-9a-fA-F]+$/.test(str);
    }

    function arrayBufferToHex(buffer) {
        return Array.from(new Uint8Array(buffer))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    function arrayBufferToBase64(buffer) {
        const binary = String.fromCharCode(...new Uint8Array(buffer));
        return btoa(binary);
    }

    function base64ToUint8Array(base64) {
        const binary = atob(base64);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        return bytes;
    }

    function hexStringToUint8Array(hexString) {
        if (hexString.length % 2 !== 0) {
            throw new Error('Invalid hex string');
        }
        const arrayBuffer = new Uint8Array(hexString.length / 2);
        for (let i = 0; i < hexString.length; i += 2) {
            arrayBuffer[i / 2] = parseInt(hexString.substr(i, 2), 16);
        }
        return arrayBuffer;
    }

    async function pbkdf2(password, salt, lengthBytes) {
        const enc = new TextEncoder();
        const keyMaterial = await window.crypto.subtle.importKey(
            'raw',
            enc.encode(password),
            { name: 'PBKDF2' },
            false,
            ['deriveBits', 'deriveKey']
        );
        const keyBits = await window.crypto.subtle.deriveBits(
            {
                name: 'PBKDF2',
                salt: salt,
                iterations: 1000,
                hash: 'SHA-256'
            },
            keyMaterial,
            lengthBytes * 8
        );
        return keyBits;
    }
});
