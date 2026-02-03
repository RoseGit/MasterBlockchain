// Manifest de la extensión - Se genera automáticamente en dist/manifest.json
interface ManifestV3 {
  manifest_version: 3;
  name: string;
  version: string;
  description: string;
  permissions: string[];
  host_permissions: string[];
  action: {
    default_popup: string;
    default_title: string;
    default_icon: {
      [key: string]: string;
    };
  };
  background: {
    service_worker: string;
    type: string;
  };
  icons: {
    [key: string]: string;
  };
  content_scripts: Array<{
    matches: string[];
    js: string[];
    run_at: string;
    all_frames: boolean;
  }>;
  web_accessible_resources: Array<{
    resources: string[];
    matches: string[];
  }>;
}

const manifest: ManifestV3 = {
  manifest_version: 3,
  name: 'CodeCrypto Wallet',
  version: '1.0.0',
  description: 'Wallet extension para Ethereum con soporte EIP-1193, EIP-712 y EIP-6963',
  permissions: [
    'storage',
    'activeTab',
    'tabs',
    'notifications'
  ],
  host_permissions: [
    'http://localhost:8545/*',
    'https://rpc.sepolia.org/*'
  ],
  action: {
    default_popup: 'index.html',
    default_title: 'CodeCrypto Wallet',
    default_icon: {
      '16': 'vite.svg',
      '48': 'vite.svg',
      '128': 'vite.svg'
    }
  },
  background: {
    service_worker: 'background.js',
    type: 'module'
  },
  icons: {
    '16': 'vite.svg',
    '48': 'vite.svg',
    '128': 'vite.svg'
  },
  content_scripts: [
    {
      matches: ['<all_urls>'],
      js: ['content-script.js'],
      run_at: 'document_start',
      all_frames: true
    }
  ],
  web_accessible_resources: [
    {
      resources: ['inject.js'],
      matches: ['<all_urls>']
    }
  ]
};

export default manifest;

