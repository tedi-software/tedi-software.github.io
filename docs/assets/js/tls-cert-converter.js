// This script is used to convert TLS certificates between different formats

document.addEventListener('DOMContentLoaded', function () {
const input = document.getElementById('certInput');
const output = document.getElementById('certOutput');

const toDERBtn = document.getElementById('convert-der');
const toB64Btn = document.getElementById('convert-base64');
const toPEMBtn = document.getElementById('convert-pem');
const pubKeyBtn = document.getElementById('extract-pubkey');
const resetBtn = document.getElementById('reset-btn');

if (toDERBtn) toDERBtn.addEventListener('click', () => convertCert('der'));
if (toB64Btn) toB64Btn.addEventListener('click', () => convertCert('base64'));
if (toPEMBtn) toPEMBtn.addEventListener('click', convertToPEM);
if (pubKeyBtn) pubKeyBtn.addEventListener('click', extractPublicKey);
if (resetBtn) resetBtn.addEventListener('click', () => {
    input.value = '';
    output.innerText = '';
});

function getSelectedFormat() {
    return document.querySelector('input[name="certFormat"]:checked')?.value || 'pem';
}

function parseCertificate() {
    const format = getSelectedFormat();
    const raw = input.value.trim();

    try {
    if (format === 'pem') {
        return forge.pki.certificateFromPem(raw);
    }

    let bytes;
    if (format === 'der') {
        bytes = forge.util.decode64(raw);
    } else if (format === 'hex') {
        bytes = forge.util.hexToBytes(raw.replace(/\s+/g, ''));
    }

    const asn1 = forge.asn1.fromDer(bytes);
    return forge.pki.certificateFromAsn1(asn1);
    } catch (e) {
    throw new Error('Could not parse certificate: ' + e.message);
    }
}

function convertCert(type) {
    output.innerText = '';
    try {
    const cert = parseCertificate();
    const asn1 = forge.pki.certificateToAsn1(cert);
    const derBytes = forge.asn1.toDer(asn1).getBytes();

    if (type === 'der') {
        const hex = forge.util.bytesToHex(derBytes);
        output.innerText = 'DER (hex):\n' + hex.match(/.{1,2}/g).join(' ');
    } else if (type === 'base64') {
        const b64 = forge.util.encode64(derBytes);
        output.innerText = 'Base64:\n' + b64.match(/.{1,64}/g).join('\n');
    }
    } catch (e) {
    output.innerText = '❌ Error: ' + e.message;
    }
}

function convertToPEM() {
    output.innerText = '';
    try {
    const cert = parseCertificate();
    const pem = forge.pki.certificateToPem(cert);
    output.innerText = pem;
    } catch (e) {
    output.innerText = '❌ Error: ' + e.message;
    }
}

function extractPublicKey() {
    output.innerText = '';
    try {
    const cert = parseCertificate();
    const publicKeyPem = forge.pki.publicKeyToPem(cert.publicKey);
    output.innerText = publicKeyPem;
    } catch (e) {
    output.innerText = '❌ Error: ' + e.message;
    }
}
});
  