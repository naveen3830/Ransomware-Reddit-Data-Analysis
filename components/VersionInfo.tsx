/// <reference types="vite/client" />

declare const __APP_VERSION__: string;

export function VersionInfo() {
    return (
      <footer className="text-sm text-gray-500 text-center mt-8">
        <a
          href={`https://github.com/naveen3830/Ransomware-Reddit-Data-Analysis/releases/tag/v${__APP_VERSION__}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Version {__APP_VERSION__}
        </a>
      </footer>
    );
  }