const https = require('https');

const WORKER_URL = 'https://coinbase.simotizi255.workers.dev'; 

function executeCloudflareWorker() {
    // Kuongeza options na User-Agent ili kuepuka kuzuiwa na Cloudflare (426 Upgrade Required)
    const options = {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) NodeJS-Runner'
        }
    };

    https.get(WORKER_URL, options, (res) => {
        let body = '';

        res.on('data', (chunk) => {
            body += chunk;
        });

        res.on('end', () => {
            const timestamp = new Date().toLocaleTimeString();
            if (res.statusCode === 200) {
                console.log(`[${timestamp}] Cloudflare Worker imekimbizwa kwa mafanikio.`);
            } else {
                console.error(`[${timestamp}] Hitilafu: HTTP Status ${res.statusCode} - Jibu: ${body}`);
            }
        });
    }).on('error', (error) => {
        console.error(`[${new Date().toLocaleTimeString()}] Ombi limeshindwa:`, error.message);
    });
}

console.log("Kuanzisha Cloudflare Worker Runner kwenye HostKB Cloud...");

// 1. Kimbiza mara moja wakati wa kuanza
executeCloudflareWorker();

// 2. Kimbiza kila baada ya sekunde 3 (kama ilivyo kwenye kodi yako ya chini)
setInterval(executeCloudflareWorker, 3000);
