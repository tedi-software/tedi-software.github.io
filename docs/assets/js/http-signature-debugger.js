
// This script is for debugging HTTP signatures in a web application.
// It allows users to decode, verify, and generate HTTP signatures using RSA or HMAC algorithms.

document.addEventListener('DOMContentLoaded', function () {
  const methodInput = document.getElementById('httpMethod');
  const pathInput = document.getElementById('httpUrl');
  const bodyInput = document.getElementById('httpBody');
  const headersInput = document.getElementById('httpSigHeaders');
  const keyIdInput = document.getElementById('httpSigKeyId');
  const algSelect = document.getElementById('Algorithm');
  const secretInput = document.getElementById('httpSigSecret');
  const privKeyInput = document.getElementById('httpSigPrivateKey');
  const output = document.getElementById('httpSigOutput');
  const preview = document.getElementById('httpSigPreview');
  const status = document.getElementById('httpSigStatus');
  const dateInput = document.getElementById('httpDate');
  const digestOutput = document.getElementById('httpDigest');
  const hostInput = document.getElementById('httpHost');

  const sigInput = document.getElementById('httpSigInput');
  const pubKeyInput = document.getElementById('httpSigPublicKey');
  const addNewline = document.getElementById('digestAppendNewline')

  

  // Dynamic header add
  document.getElementById('addHeaderBtn')?.addEventListener('click', () => {
    const container = document.getElementById('customHeaderInputs');

    const row = document.createElement('div');
    row.className = 'mb-2 d-flex gap-2 align-items-center';

    const nameInput = document.createElement('input');
    nameInput.placeholder = 'Header Name';
    nameInput.className = 'form-control';

    const valueInput = document.createElement('input');
    valueInput.placeholder = 'Header Value';
    valueInput.className = 'form-control';

    const removeBtn = document.createElement('button');
    removeBtn.textContent = '❌';
    removeBtn.className = 'btn btn-sm btn-danger';
    removeBtn.addEventListener('click', () => row.remove());

    row.appendChild(nameInput);
    row.appendChild(valueInput);
    row.appendChild(removeBtn);
    container.appendChild(row);
  });

  // Date and Digest utilities
  document.getElementById('autoDateBtn')?.addEventListener('click', () => {
    dateInput.value = new Date().toUTCString();
  });

  document.getElementById('computeDigestBtn')?.addEventListener('click', () => {
    const add = addNewline?.checked;
    const body = add ? bodyInput.value + '\n' : bodyInput.value;
    digestOutput.value = computeDigest(body);
  });

  // Create signature
  document.getElementById('encode-http-sig')?.addEventListener('click', () => {
    try {
      const method = methodInput.value.trim().toLowerCase();
      const path = pathInput.value.trim();
      const keyId = keyIdInput.value.trim();
      const headers = headersInput.value.trim().split(/\s+/);
      const add = addNewline?.checked;
      const body = add ? bodyInput.value + '\n' : bodyInput.value;
      const alg = algSelect.value;

      const values = {
        '(request-target)': `${method} ${path}`
      };

      const hostVal = hostInput.value.trim();
      if (headers.includes('host') && hostVal) {
        values['host'] = hostVal;
      }

      const dateVal = dateInput.value.trim();
      if (headers.includes('date') && dateVal) {
        values['date'] = dateVal;
      }

      if (headers.includes('digest')) {
        const digest = computeDigest(body);
        if (digest) {
          values['digest'] = digest;
          if (digestOutput) digestOutput.value = digest; // preview
        }
      }

      const customPairs = Array.from(document.querySelectorAll('#customHeaderInputs div')).map(row => {
        const [nameInput, valueInput] = row.querySelectorAll('input');
        return {
          name: nameInput.value.trim().toLowerCase(),
          value: valueInput.value.trim()
        };
      });

      customPairs.forEach(({ name, value }) => {
        if (headers.includes(name)) {
          values[name] = value;
        }
      });

      if (headers.includes('digest')) {
        values['digest'] = computeDigest(body);
        digestOutput.value = values['digest']; // preview it
      }

      const stringToSign = buildStringToSign(headers, values);
      preview.innerText = stringToSign;

      let signature = '';

      if (alg === 'hmac-sha256') {
        const mac = new KJUR.crypto.Mac({ alg: 'HmacSHA256', pass: { utf8: secretInput.value.trim() } });
        mac.updateString(stringToSign);
        signature = hextob64(mac.doFinal());
      } else if (alg === 'rsa-sha256') {
        const sig = new KJUR.crypto.Signature({ alg: 'SHA256withRSA' });
        sig.init(privKeyInput.value.trim());
        sig.updateString(stringToSign);
        signature = hextob64(sig.sign());
      }

      const authHeader = `Signature keyId="${keyId}",algorithm="${alg}",headers="${headers.join(' ')}",signature="${signature}"`;
      output.value = authHeader;
      showStatus(true, '✅ Signature generated');
    } catch (err) {
      showStatus(false, '❌ Encoding failed: ' + err.message);
    }
  });

  // Decode header
  document.getElementById('decode-http-sig')?.addEventListener('click', () => {
    try {
      if( sigInput.value.trim() === "" ) { 
        throw new Error('Invalid signature header format');
      }
      const parts = parseSigHeader(sigInput.value.trim());

      headersInput.value = parts.headers || '';
      keyIdInput.value = parts.keyId || '';
      algSelect.value = parts.algorithm || 'hmac-sha256';
      showStatus('', '✅ Signature header decoded — now provide HTTP inputs to verify.');
    } catch (err) {
      showStatus(false, '❌ Decode failed: ' + err.message);
    }
  });

  // Verify signature
  document.getElementById('verify-http-sig')?.addEventListener('click', () => {
    try {
      const parts = parseSigHeader(sigInput.value.trim());
      const headers = parts.headers.split(/\s+/);
      const method = methodInput.value.trim().toLowerCase();
      const path = pathInput.value.trim();
      const add = addNewline?.checked;
      const body = add ? bodyInput.value + '\n' : bodyInput.value;
      const alg = parts.algorithm;
  
      const values = {
        '(request-target)': `${method} ${path}`
      };

      const hostVal = hostInput.value.trim();
      if (headers.includes('host') && hostVal) {
        values['host'] = hostVal;
      }

      const dateVal = dateInput.value.trim();
      if (headers.includes('date') && dateVal) {
        values['date'] = dateVal;
      }

      if (headers.includes('digest')) {
        const digest = computeDigest(body);
        if (digest) {
          values['digest'] = digest;
          if (digestOutput) digestOutput.value = digest; // preview
        }
      }
  
      const customPairs = Array.from(document.querySelectorAll('#customHeaderInputs div')).map(row => {
        const [nameInput, valueInput] = row.querySelectorAll('input');
        return {
          name: nameInput.value.trim().toLowerCase(),
          value: valueInput.value.trim()
        };
      });
  
      customPairs.forEach(({ name, value }) => {
        if (headers.includes(name)) {
          values[name] = value;
        }
      });
  
      if (headers.includes('digest')) {
        values['digest'] = computeDigest(body);
        if (digestOutput) digestOutput.value = values['digest'];
      }
  
      const stringToSign = buildStringToSign(headers, values);
      preview.innerText = stringToSign;
  
      const signatureHex = b64tohex(parts.signature);
      let isValid = false;
  
      if (alg === 'rsa-sha256') {
        const pubKey = pubKeyInput.value.trim();
        const sig = new KJUR.crypto.Signature({ alg: 'SHA256withRSA' });
        sig.init(pubKey);
        sig.updateString(stringToSign);
        isValid = sig.verify(signatureHex);
      } else if (alg === 'hmac-sha256') {
        const mac = new KJUR.crypto.Mac({ alg: 'HmacSHA256', pass: { utf8: secretInput.value.trim() } });
        mac.updateString(stringToSign);
        const expectedSigHex = mac.doFinal();
        isValid = expectedSigHex === signatureHex;
      } else {
        return showStatus(false, `Unsupported algorithm: ${alg}`);
      }
  
      showStatus(isValid, isValid ? '✅ Signature is valid' : '❌ Signature is invalid');
    } catch (err) {
      showStatus(false, 'Verification failed: ' + err.message);
    }
  });

  
  function computeDigest(body) {
    const hashHex = KJUR.crypto.Util.hashString(body, "sha256");
    const hashB64 = hextob64(hashHex);
    return "sha-256=" + hashB64;
  }

  function buildStringToSign(headers, values) {
    return headers.map(h => {
      const name = h.toLowerCase();
      if (!(name in values)) throw new Error(`Missing header: ${name}`);
      return `${name}: ${values[name]}`;
    }).join('\n');
  }

  function parseSigHeader(raw) {
    return raw.replace(/^Signature\s*/, '').split(',').reduce((acc, part) => {
      const [k, v] = part.trim().split('=');
      acc[k] = v.replace(/^"|"$/g, '');
      return acc;
    }, {});
  }

  function showStatus(valid, msg) {
    status.innerText = typeof valid === 'string' ? valid : msg;
    status.className = valid === true
      ? 'text-success font-weight-bold'
      : valid === false
        ? 'text-danger font-weight-bold'
        : 'text-muted';
  }
});
