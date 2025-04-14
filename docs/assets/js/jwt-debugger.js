
// JWT Debugger

document.addEventListener('DOMContentLoaded', function () {
    const jwtInput = document.getElementById('jwtInput');
    const headerInput = document.getElementById('jwtHeaderInput');
    const payloadInput = document.getElementById('jwtPayloadInput');
    const secretInput = document.getElementById('jwtSecretInput');
    const encodedOutput = document.getElementById('jwtEncoded');
    const encodingSelect = document.getElementById('secretEncoding');
    const verifyStatus = document.getElementById('jwtVerifyStatus');

    document.getElementById('decode-jwt')?.addEventListener('click', decodeJWT);
    document.getElementById('verify-jwt')?.addEventListener('click', verifyJWT);
    document.getElementById('encode-jwt')?.addEventListener('click', encodeJWT);

    function decodeJWT() {
        const jwt = jwtInput.value.trim();
        const parts = jwt.split('.');
        if (parts.length !== 3) {
            return showError('Invalid JWT format (expected 3 parts)');
        }

        try {
            const header = KJUR.jws.JWS.readSafeJSONString(b64urlDecode(parts[0]));
            const payload = KJUR.jws.JWS.readSafeJSONString(b64urlDecode(parts[1]));

            headerInput.value = JSON.stringify(header, null, 2);
            payloadInput.value = JSON.stringify(payload, null, 2);
            showStatus('', '✅ Decoded successfully (not verified)');
        } catch (err) {
            showError('Failed to decode JWT: ' + err.message);
        }
    }

    function verifyJWT() {
        try {
            const jwt = jwtInput.value.trim();
            const secret = secretInput.value.trim();
            const encoding = encodingSelect.value;
            if (!jwt || !secret) {
                return showError('JWT and secret are required.');
            }

            const keyObj = {};
            keyObj[encoding] = secret;

            const isValid = KJUR.jws.JWS.verify(jwt, keyObj, ['HS256']);

            if (isValid) {
                const [headerB64, payloadB64] = jwt.split('.');
                const header = KJUR.jws.JWS.readSafeJSONString(b64urlDecode(headerB64));
                const payload = KJUR.jws.JWS.readSafeJSONString(b64urlDecode(payloadB64));

                headerInput.value = JSON.stringify(header, null, 2);
                payloadInput.value = JSON.stringify(payload, null, 2);
                showStatus(true, '✅ Signature is valid');
            } else {
                showStatus(false, '❌ Signature is invalid');
            }
        } catch (err) {
            showError('Verification failed: ' + err.message);
        }
    }

    function encodeJWT() {
        try {
            const header = JSON.parse(headerInput.value.trim());
            const payload = JSON.parse(payloadInput.value.trim());
            const secret = secretInput.value.trim();
            const encoding = encodingSelect.value;

            const sHeader = JSON.stringify(header);
            const sPayload = JSON.stringify(payload);

            const keyObj = {};
            keyObj[encoding] = secret;

            const jwt = KJUR.jws.JWS.sign(header.alg || 'HS256', sHeader, sPayload, keyObj);

            jwtInput.value = jwt;
            showStatus('', '✅ JWT encoded successfully');
        } catch (err) {
            showError('Encoding failed: ' + err.message);
        }
    }

    function b64urlDecode(str) {
        str = str.replace(/-/g, '+').replace(/_/g, '/');
        while (str.length % 4 !== 0) str += '=';
        return atob(str);
    }

    function showError(msg) {
        verifyStatus.innerText = '❌ ' + msg;
        verifyStatus.className = 'text-danger font-weight-bold';
    }

    function showStatus(valid, msg) {
        verifyStatus.innerText = valid === true
            ? '✅ Signature is valid'
            : valid === false
                ? '❌ Signature is invalid'
                : msg || '';
        verifyStatus.className = valid === true
            ? 'text-success font-weight-bold'
            : 'text-danger font-weight-bold';
    }
});
