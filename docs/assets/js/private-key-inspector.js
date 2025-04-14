// This script is used to inspect and extract public keys from private keys.

document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('keyInput');
  const output = document.getElementById('keyOutput');

  const inspectBtn = document.getElementById('inspect-key');
  const pubKeyBtn = document.getElementById('extract-pubkey');
  const resetBtn = document.getElementById('reset-btn');
  const toPKCS8Btn = document.getElementById('convert-to-pkcs8');
  const toRSA1Btn = document.getElementById('convert-to-rsa');

  if (inspectBtn) inspectBtn.addEventListener('click', inspectPrivateKey);
  if (pubKeyBtn) pubKeyBtn.addEventListener('click', extractPublicKey);
  if (resetBtn) resetBtn.addEventListener('click', () => {
    input.value = '';
    output.innerText = '';
  });
  if (toPKCS8Btn) toPKCS8Btn.addEventListener('click', () => convertFormat('pkcs8'));
  if (toRSA1Btn) toRSA1Btn.addEventListener('click', () => convertFormat('rsa1'));

  function getOutputFormat() {
    return document.querySelector('input[name="keyOutputFormat"]:checked')?.value || 'pem';
  }

  function parsePrivateKey(raw) {
    try {
      const cleaned = raw.trim();

      if (cleaned.includes('EC PRIVATE KEY')) {
        throw new Error('EC keys are not supported. Please use an RSA key.');
      }

      if (cleaned.includes('PRIVATE KEY')) {
        const key = forge.pki.privateKeyFromPem(cleaned);
        if (!key || !key.n || !key.e) {
          throw new Error('Not a valid RSA private key.');
        }
        return key;
      }

      const isHex = /^[0-9a-f\s]+$/i.test(cleaned);
      const derBytes = isHex
        ? forge.util.hexToBytes(cleaned.replace(/\s+/g, ''))
        : forge.util.decode64(cleaned);

      const asn1 = forge.asn1.fromDer(derBytes);
      const key = forge.pki.privateKeyFromAsn1(asn1);
      if (!key || !key.n || !key.e) {
        throw new Error('Not a valid RSA private key.');
      }

      return key;
    } catch (e) {
      throw new Error('Unable to parse private key: ' + e.message);
    }
  }

  function inspectPrivateKey() {
    output.innerText = '';
    try {
      const key = parsePrivateKey(input.value.trim());

      const details = {
        type: 'RSA',
        bits: key.n.bitLength(),
        publicExponent: key.e.toString(10),
      };

      output.innerText = JSON.stringify(details, null, 2);
    } catch (err) {
      output.innerText = '❌ Error: ' + err.message;
    }
  }

  function extractPublicKey() {
    output.innerText = '';
    try {
      const privateKey = parsePrivateKey(input.value.trim());
  
      if (!privateKey || !privateKey.n || !privateKey.e) {
        throw new Error('Invalid RSA private key — cannot extract public key.');
      }
  
      const publicKey = forge.pki.setRsaPublicKey(privateKey.n, privateKey.e);
      const format = getOutputFormat();
      let result;
  
      if (format === 'pem') {
        result = forge.pki.publicKeyToPem(publicKey);
      } else {
        let asn1;
        try {
          asn1 = forge.pki.publicKeyToAsn1(publicKey);
        } catch (err) {
          throw new Error('Failed to convert public key to ASN.1: ' + err.message);
        }
  
        if (!asn1) {
          throw new Error('publicKeyToAsn1() returned undefined.');
        }
  
        const der = forge.asn1.toDer(asn1).getBytes();
  
        if (format === 'base64') {
          result = forge.util.encode64(der).match(/.{1,64}/g).join('\n');
        } else if (format === 'hex') {
          result = forge.util.bytesToHex(der).match(/.{1,2}/g).join(' ');
        } else {
          throw new Error('Unknown output format: ' + format);
        }
      }
  
      output.innerText = result;
    } catch (err) {
      output.innerText = '❌ Error: ' + err.message;
    }
  }
  

  function convertFormat(targetFormat) {
    output.innerText = '';
    try {
      const privateKey = parsePrivateKey(input.value.trim());

      if (!privateKey.n || !privateKey.e) {
        throw new Error('Invalid RSA private key structure.');
      }

      let result;

      if (targetFormat === 'pkcs8') {
        const pkcs8 = forge.pki.privateKeyToAsn1(privateKey);
        const wrapped = forge.pki.wrapRsaPrivateKey(pkcs8);
        result = forge.pki.privateKeyInfoToPem(wrapped);
      } else if (targetFormat === 'rsa1') {
        result = forge.pki.privateKeyToPem(privateKey);
      }

      output.innerText = result;
    } catch (err) {
      output.innerText = '❌ Error: ' + err.message;
    }
  }
});
