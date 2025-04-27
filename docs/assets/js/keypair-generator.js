const algorithmSelect = document.getElementById('algorithmSelect');
const rsaOptions = document.getElementById('rsaOptions');
const ecdsaOptions = document.getElementById('ecdsaOptions');
const generateKeypairBtn = document.getElementById('generateKeypairBtn');
const publicKeyOutput = document.getElementById('publicKeyOutput');
const privateKeyOutput = document.getElementById('privateKeyOutput');
const statusMessage = document.getElementById('statusMessage');

algorithmSelect.addEventListener('change', () => {
  rsaOptions.style.display = (algorithmSelect.value === 'RSA') ? 'block' : 'none';
  ecdsaOptions.style.display = (algorithmSelect.value === 'ECDSA') ? 'block' : 'none';
});

updateOptionsVisibility();

function updateOptionsVisibility() {
  const algorithm = algorithmSelect.value;
  rsaOptions.style.display = (algorithm === 'RSA') ? 'block' : 'none';
  ecdsaOptions.style.display = (algorithm === 'ECDSA') ? 'block' : 'none';
}

generateKeypairBtn.addEventListener('click', async () => {
  clearOutputs();
  statusMessage.textContent = "⏳ Generating keypair... this may take a few seconds...";

  try {
    const algorithm = algorithmSelect.value;
    let keypair;

    if (algorithm === 'RSA') {
      const size = parseInt(document.getElementById('rsaKeySize').value, 10);
      keypair = await generateRSAKeypair(size);
    } else if (algorithm === 'Ed25519') {
      keypair = await generateEd25519Keypair();
    } else if (algorithm === 'ECDSA') {
      const curve = document.getElementById('ecdsaCurve').value;
      keypair = await generateECDSAKeypair(curve);
    }

    publicKeyOutput.value = keypair.publicKeyPEM;
    privateKeyOutput.value = keypair.privateKeyPEM;
    statusMessage.textContent = "✅ Keypair generated successfully.";
  } catch (err) {
    statusMessage.textContent = `❌ Failed to generate keypair: ${err.message}`;
    console.error(err);
  }
});

function clearOutputs() {
  publicKeyOutput.value = '';
  privateKeyOutput.value = '';
  statusMessage.textContent = '';
}

async function generateRSAKeypair(keySize) {
  await new Promise(resolve => setTimeout(resolve, 100));
  const rsaKeypair = KEYUTIL.generateKeypair("RSA", keySize);
  return {
    publicKeyPEM: KEYUTIL.getPEM(rsaKeypair.pubKeyObj),
    privateKeyPEM: KEYUTIL.getPEM(rsaKeypair.prvKeyObj, "PKCS8PRV")
  };
}

async function generateEd25519Keypair() {
  const keyPair = await window.crypto.subtle.generateKey(
    { name: "Ed25519" },
    true,
    ["sign", "verify"]
  );
  return exportWebCryptoKeypair(keyPair);
}

async function generateECDSAKeypair(curve) {
  const keyPair = await window.crypto.subtle.generateKey(
    { name: "ECDSA", namedCurve: curve },
    true,
    ["sign", "verify"]
  );
  return exportWebCryptoKeypair(keyPair);
}

async function exportWebCryptoKeypair(keyPair) {
  const publicKey = await window.crypto.subtle.exportKey('spki', keyPair.publicKey);
  const privateKey = await window.crypto.subtle.exportKey('pkcs8', keyPair.privateKey);

  return {
    publicKeyPEM: formatPEM(publicKey, "PUBLIC"),
    privateKeyPEM: formatPEM(privateKey, "PRIVATE")
  };
}

function formatPEM(buffer, type) {
  const base64String = window.btoa(String.fromCharCode(...new Uint8Array(buffer)));
  const formatted = base64String.match(/.{1,64}/g).join('\n');
  return `-----BEGIN ${type} KEY-----\n${formatted}\n-----END ${type} KEY-----`;
}
