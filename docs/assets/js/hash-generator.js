document.addEventListener('DOMContentLoaded', function () {
  const input = document.getElementById('hashInput');
  const button = document.getElementById('hashButton');
  const results = document.getElementById('hashResults');

  button.addEventListener('click', (e) => {
    e.preventDefault(); // stop any accidental form submit

    const text = input.value;
    if (!text) {
      results.innerHTML = '<tr><td colspan="3" class="text-center">Please enter text to hash.</td></tr>';
      return;
    }

    const encoding = document.querySelector('input[name="outputEncoding"]:checked')?.value || 'hex';

    const algorithms = [
      'md5',
      'sha1',
      'sha256',
      'sha384',
      'sha512',
    ];

    const algMap = {
      'md5': 'MD5',
      'sha1': 'SHA1',
      'sha256': 'SHA256',
      'sha384': 'SHA384',
      'sha512': 'SHA512',
    };

    const algBitLengths = {
      'md5': 128,
      'sha1': 160,
      'sha256': 256,
      'sha384': 384,
      'sha512': 512,
    };

    const output = algorithms.map(alg => {
      try {
        const algName = algMap[alg];
        if (!algName) {
          throw new Error('Unsupported algorithm mapping.');
        }

        const md = new KJUR.crypto.MessageDigest({ alg: algName });
        
        md.updateString(text);
        const hashHex = md.digest();
        return formatRow(algName, algBitLengths[alg], hashHex, encoding);
      } catch (err) {
        return `<tr><td>${alg.toUpperCase()}</td><td></td><td style="color: red;">Error: ${err.message}</td></tr>`;
      }
    });

    results.innerHTML = output.join('');
  });

  function formatRow(algorithm, bits, hex, encoding) {
    let outputValue = hex;
    if (encoding === 'base64') {
      outputValue = hextob64(hex);
    }
    return `<tr><td>${algorithm}</td><td>${bits}</td><td style="word-break: break-all;">${outputValue}</td></tr>`;
  }
});
