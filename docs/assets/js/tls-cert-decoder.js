// This script decodes a TLS certificate in PEM format and displays its details.

document.addEventListener('DOMContentLoaded', function () {
  const decodeBtn = document.getElementById('decode-btn');
  const input = document.getElementById('certInput');

  if (decodeBtn && input) {
    decodeBtn.addEventListener('click', decodeCert);
  }
});

function decodeCert() {
  const pem = document.getElementById('certInput').value.trim();
  try {
    const cert = forge.pki.certificateFromPem(pem);

    const subject = cert.subject.attributes.map(attr => `${attr.name}=${attr.value}`).join(', ');
    const issuer = cert.issuer.attributes.map(attr => `${attr.name}=${attr.value}`).join(', ');
    const validFrom = cert.validity.notBefore.toISOString();
    const validTo = cert.validity.notAfter.toISOString();
    const serial = cert.serialNumber;
    const version = cert.version + 1; // versions are 0-based in Forge
    const sigAlg = cert.siginfo.algorithmOid;

    // Public key details
    const publicKey = cert.publicKey;
    const publicKeyType = publicKey.n ? 'RSA' : 'Unknown';
    const publicKeyBits = publicKey.n ? publicKey.n.bitLength() : null;

    // Extensions
    const extensions = {};
    (cert.extensions || []).forEach(ext => {
      if (ext.name === 'subjectAltName') {
        extensions.subjectAltNames = ext.altNames.map(a => {
          if (a.type === 2) {
            return 'DNS: ' + a.value;
          } else if (a.type === 7) {
            return 'IP Address: ' + decodeIP(a.value);
          } else {
            return `Other [${a.type}]: ` + a.value;
          }
        });
      } else if (ext.name === 'keyUsage') {
        extensions.keyUsage = ext.digitalSignature ? ['digitalSignature'] : [];
        if (ext.keyEncipherment) extensions.keyUsage.push('keyEncipherment');
        if (ext.dataEncipherment) extensions.keyUsage.push('dataEncipherment');
        if (ext.keyAgreement) extensions.keyUsage.push('keyAgreement');
        if (ext.keyCertSign) extensions.keyUsage.push('keyCertSign');
        if (ext.cRLSign) extensions.keyUsage.push('cRLSign');
      } else if (ext.name === 'extKeyUsage') {
        extensions.extendedKeyUsage = Object.entries(ext)
          .filter(([k, v]) => v === true && k !== 'name')
          .map(([k]) => k);
      } else if (ext.name === 'basicConstraints') {
        extensions.basicConstraints = {
          cA: ext.cA,
          pathLenConstraint: ext.pathLenConstraint
        };
      }
    });

    // Thumbprints
    const derBytes = forge.asn1.toDer(forge.pki.certificateToAsn1(cert)).getBytes();
    const sha1 = forge.md.sha1.create().update(derBytes).digest().toHex().toUpperCase();
    const sha256 = forge.md.sha256.create().update(derBytes).digest().toHex().toUpperCase();

    const result = {
      Subject: subject,
      Issuer: issuer,
      SerialNumber: serial,
      Version: version,
      ValidFrom: validFrom,
      ValidTo: validTo,
      SignatureAlgorithmOID: sigAlg,
      PublicKeyAlgorithm: publicKeyType,
      PublicKeyBits: publicKeyBits,
      Extensions: extensions,
      Thumbprints: {
        SHA1: sha1.match(/.{1,2}/g).join(':'),
        SHA256: sha256.match(/.{1,2}/g).join(':')
      }
    };

    document.getElementById('certOutput').textContent = JSON.stringify(result, null, 2);
  } catch (e) {
    document.getElementById('certOutput').textContent = '❌ Error: ' + e.message;
  }
}

function decodeIP(bytes) {
  const isIPv6 = bytes.length === 16;
  if (isIPv6) {
    return bytes.split('').map((_, i) =>
      i % 2 === 0 ? bytes.charCodeAt(i).toString(16).padStart(2, '0') +
                   bytes.charCodeAt(i + 1).toString(16).padStart(2, '0') : ''
    ).filter(Boolean).join(':').replace(/(:0{1,3}){2,}/, '::');
  } else {
    return bytes.split('').map(b => b.charCodeAt(0)).join('.');
  }
}


// function clearCert() {
//   document.getElementById('certInput').value = '';
//   document.getElementById('certOutput').textContent = '';
// }
// function copyCert() {   
//   const output = document.getElementById('certOutput').textContent;
//   if (output) {
//     navigator.clipboard.writeText(output).then(() => {
//       alert('Copied to clipboard!');
//     }).catch(err => {
//       console.error('Error copying text: ', err);
//     });
//   } else {
//     alert('Nothing to copy!');
//   }
// }

// function downloadCert() {
//   const output = document.getElementById('certOutput').textContent;
//   if (output) {
//     const blob = new Blob([output], { type: 'text/plain' });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = 'decoded_cert.txt';
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url);
//   } else {
//     alert('Nothing to download!');
//   }
// }

// function toggleTheme() {
//   const body = document.body;
//   const currentTheme = body.getAttribute('data-theme');
//   const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
//   body.setAttribute('data-theme', newTheme);
//   localStorage.setItem('theme', newTheme);
// }