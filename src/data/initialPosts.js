export const initialPosts = [
    {
        id: 1,
        category: 'HARDWARE',
        updated_at: new Date().toISOString(), // Mock timestamp
        title: 'Quantum Chip Throughput Exceeds Theoretical Limits',
        content: 'Researchers at the Void Institute have successfully stabilized a 1000-qubit processor at room temperature, shattering previous computational barriers.\n\nThe implications for cryptographic security are catastrophic. Legacy encryption protocols, including the current banking standards, could be brute-forced in milliseconds.',
        image_url: null, // Or a placeholder URL if you have one
        bgStyle: 'linear-gradient(to top, #0a0a0a, #222)'
    },
    {
        id: 2,
        category: 'NETWORK',
        updated_at: new Date(Date.now() - 3600000).toISOString(),
        title: 'The Great Firewall of Sector 4 Has Fallen',
        content: 'Unauthorized data streams are flooding the local subnet. Authorities are scrambling to patch the zero-day exploit found in the legacy infrastructure.\n\nLocal net-runners claim responsibility, citing the "Freedom of Information Act 2029" as their mandate.',
        image_url: null,
        bgStyle: 'radial-gradient(circle, #333 0%, #000 70%)'
    },
    {
        id: 3,
        category: 'SECURITY',
        updated_at: new Date(Date.now() - 7200000).toISOString(),
        title: 'Biometric Data Leak Affects 30 Million Androids',
        content: 'A breach in the central registry has exposed sensitive memory cores. Recall protocols have been initiated for all affected units.\n\n"It is a minor glitch," claims CyberLife spokesperson, despite evidence of memory corruption in older models.',
        image_url: null,
        bgStyle: 'linear-gradient(135deg, #111 0%, #333 100%)'
    },
    {
        id: 'synthetic-horizon',
        category: 'SYSTEM',
        updated_at: new Date().toISOString(),
        title: 'Global System Reset Imminent',
        content: '## CRITICAL SYSTEM ALERT\n\nThe central core has initiated a mandatory reset sequence. All connected nodes must prepare for immediate temporary disconnection.\n\n### Impact Assessment\n\n*   **Infrastructure**: Power grids in Sector 7 may experience fluctuations.\n*   **Network**: Global data streams will be paused for approximately 420 seconds.\n*   **Protocol**: Maintain secure handshake protocols during reboot.\n\nTechnicians are advising all units to secure their local memory buffers. This is not a drill.',
        image_url: null,
        bgStyle: 'linear-gradient(to bottom, #000 0%, #001a1a 100%)'
    }
];
