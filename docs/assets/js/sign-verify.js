const algorithmSelect = document.getElementById('signAlgorithmSelect');
const operationRadios = document.getElementsByName('signVerifyMode');
const publicKeyInput = document.getElementById('publicKeyInput');
const privateKeyInput = document.getElementById('privateKeyInput');
const hmacSecretInput = document.getElementById('hmacSecretInput');
const symmetricKeyField = document.getElementById('symmetricKeyField');
const asymmetricKeyFields = document.getElementById('asymmetricKeyFields');
const messageInput = document.getElementById('signMessageInput');
const signatureOutput = document.getElementById('signatureOutput');
const actionButton = document.getElementById('signVerifyActionBtn');
const statusMessage = document.getElementById('signStatusMessage');

// Switch fields when algorithm changes
algorithmSelect.addEventListener('change', updateKeyFieldVisibility);
updateKeyFieldVisibility();

function updateKeyFieldVisibility() {
  const algorithm = algorithmSelect.value;
  const isSymmetric = algorithm.startsWith('HMAC');
  symmetricKeyField.style.display = isSymmetric ? 'block' : 'none';
  asymmetricKeyFields.style.display = isSymmetric ? 'none' : 'block';
}

// Action button
actionButton.addEventListener('click', async () => {
  clearOutputs();
  const operation = getSelectedOperation();
  const algorithm = algorithmSelect.value;
  const rawMessage = messageInput.value.trim();
  const message = normalizeMessage(rawMessage);

  if (!message) {
    statusMessage.textContent = "❌ Message is required.";
    return;
  }

  try {
    if (operation === 'sign') {
      const signature = await signMessage(algorithm, message);
      signatureOutput.value = signature;
      statusMessage.textContent = "✅ Message signed successfully.";
    } else if (operation === 'verify') {
      const isValid = await verifySignature(algorithm, message);
      statusMessage.textContent = isValid ? "✅ Signature is valid." : "❌ Signature is invalid.";
    }
  } catch (err) {
    console.error(err);
    statusMessage.textContent = `❌ Error: ${err.message}`;
  }
});

function clearOutputs() {
  statusMessage.textContent = "";
  if (getSelectedOperation() === 'sign') {
    signatureOutput.value = '';
  }
}

function getSelectedOperation() {
  return Array.from(operationRadios).find(r => r.checked)?.value;
}

function normalizeMessage(msg) {
  return msg.replace(/\r\n/g, '\n').trim();
}

async function signMessage(algorithm, message) {
  if (algorithm.startsWith('HMAC')) {
    const secret = hmacSecretInput.value.trim();
    if (!secret) throw new Error('Secret key is required.');
    return hmacSign(secret, message, algorithm);
  } else if (algorithm === 'Ed25519') {
    const privateKeyPEM = privateKeyInput.value.trim();
    if (!privateKeyPEM) throw new Error('Private key is required.');
    return await ed25519Sign(privateKeyPEM, message);
  } else {
    const privateKeyPEM = privateKeyInput.value.trim();
    if (!privateKeyPEM) throw new Error('Private key is required.');
    return asymmetricSign(privateKeyPEM, message, algorithm);
  }
}

async function verifySignature(algorithm, message) {
  if (algorithm.startsWith('HMAC')) {
    const secret = hmacSecretInput.value.trim();
    const signature = signatureOutput.value.trim();
    if (!secret || !signature) throw new Error('Secret key and signature are required.');
    const expectedSig = hmacSign(secret, message, algorithm);
    return timingSafeEqual(signature, expectedSig);
  } else if (algorithm === 'Ed25519') {
    const publicKeyPEM = publicKeyInput.value.trim();
    const signature = signatureOutput.value.trim();
    if (!publicKeyPEM || !signature) throw new Error('Public key and signature are required.');
    return await ed25519Verify(publicKeyPEM, message, signature);
  } else {
    const publicKeyPEM = publicKeyInput.value.trim();
    const signature = signatureOutput.value.trim();
    if (!publicKeyPEM || !signature) throw new Error('Public key and signature are required.');
    return asymmetricVerify(publicKeyPEM, message, signature, algorithm);
  }
}

function hmacSign(secret, message, algorithm) {
  const key = CryptoJS.enc.Utf8.parse(secret);
  const msg = CryptoJS.enc.Utf8.parse(message);
  const hmac = (algorithm === 'HMAC-SHA512')
    ? CryptoJS.HmacSHA512(msg, key)
    : CryptoJS.HmacSHA256(msg, key);
  return CryptoJS.enc.Base64.stringify(hmac);
}

function timingSafeEqual(a, b) {
  const bufA = Uint8Array.from(atob(a), c => c.charCodeAt(0));
  const bufB = Uint8Array.from(atob(b), c => c.charCodeAt(0));
  if (bufA.length !== bufB.length) return false;
  return bufA.every((val, i) => val === bufB[i]);
}

function asymmetricSign(privateKeyPEM, message, algorithm) {
  const sig = new KJUR.crypto.Signature({ alg: mapAlgorithmToSignatureAlg(algorithm) });
  sig.init(privateKeyPEM);
  sig.updateString(message);
  const sigHex = sig.sign();
  return hextob64(sigHex);
}

function asymmetricVerify(publicKeyPEM, message, signatureB64, algorithm) {
  const sig = new KJUR.crypto.Signature({ alg: mapAlgorithmToSignatureAlg(algorithm) });
  sig.init(publicKeyPEM);
  sig.updateString(message);
  const sigHex = b64tohex(signatureB64);
  return sig.verify(sigHex);
}

function mapAlgorithmToSignatureAlg(algorithm) {
  switch (algorithm) {
    case 'RSA-PSS': return 'SHA256withRSAandMGF1';
    case 'ECDSA': return 'SHA256withECDSA';
    default: throw new Error('Unsupported asymmetric algorithm: ' + algorithm);
  }
}

// --- Ed25519 Handling with WebCrypto ---

async function ed25519Sign(privateKeyPEM, message) {
  const key = await importPrivateKey(privateKeyPEM, "Ed25519");
  const signature = await window.crypto.subtle.sign(
    { name: "Ed25519" },
    key,
    new TextEncoder().encode(message)
  );
  return arrayBufferToBase64(signature);
}

async function ed25519Verify(publicKeyPEM, message, signatureB64) {
  const key = await importPublicKey(publicKeyPEM, "Ed25519");
  const isValid = await window.crypto.subtle.verify(
    { name: "Ed25519" },
    key,
    base64ToArrayBuffer(signatureB64),
    new TextEncoder().encode(message)
  );
  return isValid;
}

async function importPrivateKey(pem, algName) {
  const keyData = pemToArrayBuffer(pem);
  return await window.crypto.subtle.importKey(
    "pkcs8",
    keyData,
    { name: algName },
    false,
    ["sign"]
  );
}

async function importPublicKey(pem, algName) {
  const keyData = pemToArrayBuffer(pem);
  return await window.crypto.subtle.importKey(
    "spki",
    keyData,
    { name: algName },
    false,
    ["verify"]
  );
}

function pemToArrayBuffer(pem) {
  const b64 = pem
    .replace(/-----.*?-----/g, '')
    .replace(/\s/g, '');
  const raw = atob(b64);
  const rawLength = raw.length;
  const array = new Uint8Array(rawLength);
  for (let i = 0; i < rawLength; i++) {
    array[i] = raw.charCodeAt(i);
  }
  return array.buffer;
}

function arrayBufferToBase64(buffer) {
  const binary = String.fromCharCode(...new Uint8Array(buffer));
  return btoa(binary);
}

function base64ToArrayBuffer(base64) {
  const binary = atob(base64);
  const array = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    array[i] = binary.charCodeAt(i);
  }
  return array.buffer;
}
