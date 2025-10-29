export interface TranscriptionItem {
  id: number;
  text: string;
  timestamp: string;
  created_at: string;
}


export interface UpdateCheckResult {
  updateAvailable: boolean;
  version?: string;
  releaseDate?: string;
  files?: any[];
  releaseNotes?: string;
  message?: string;
}

export interface UpdateStatusResult {
  updateAvailable: boolean;
  updateDownloaded: boolean;
  isDevelopment: boolean;
}

export interface UpdateInfoResult {
  version?: string;
  releaseDate?: string;
  releaseNotes?: string | null;
  files?: any[];
}

export interface UpdateResult {
  success: boolean;
  message: string;
}

export interface AppVersionResult {
  version: string;
}


// Additional interface missing from preload.js
export interface SaveSettings {
  apiKey: string;
  hotkey: string;
}

declare global {
  interface Window {
    electronAPI: {
      // Basic window operations
      pasteText: (text: string) => Promise<void>;
      hideWindow: () => Promise<void>;
      showDictationPanel: () => Promise<void>;
      onToggleDictation: (callback: () => void) => void;

      // Database operations
      saveTranscription: (
        text: string
      ) => Promise<{ id: number; success: boolean }>;
      getTranscriptions: (limit?: number) => Promise<TranscriptionItem[]>;
      clearTranscriptions: () => Promise<{ cleared: number; success: boolean }>;
      deleteTranscription: (id: number) => Promise<{ success: boolean }>;

      // API key management
      getOpenAIKey: () => Promise<string>;
      saveOpenAIKey: (key: string) => Promise<{ success: boolean }>;
      createProductionEnvFile: (key: string) => Promise<void>;
      getAnthropicKey: () => Promise<string | null>;
      saveAnthropicKey: (key: string) => Promise<void>;

      // Clipboard operations
      readClipboard: () => Promise<string>;
      writeClipboard: (text: string) => Promise<{ success: boolean }>;
      pasteFromClipboard: () => Promise<{ success: boolean; error?: string }>;
      pasteFromClipboardWithFallback: () => Promise<{ success: boolean; error?: string }>;

      // Settings
      getSettings: () => Promise<any>;
      updateSettings: (settings: any) => Promise<void>;

      // Audio
      getAudioDevices: () => Promise<MediaDeviceInfo[]>;
      transcribeAudio: (audioData: ArrayBuffer) => Promise<{
        success: boolean;
        text?: string;
        error?: string;
      }>;
      
      // Anthropic reasoning
      processAnthropicReasoning: (text: string, modelId: string, agentName: string | null, config: any) => Promise<{ success: boolean; text?: string; error?: string }>;

      // Window control operations
      windowMinimize: () => Promise<void>;
      windowMaximize: () => Promise<void>;
      windowClose: () => Promise<void>;
      windowIsMaximized: () => Promise<boolean>;
      getPlatform: () => string;
      startWindowDrag: () => Promise<void>;
      stopWindowDrag: () => Promise<void>;
      setMainWindowInteractivity: (interactive: boolean) => Promise<void>;

      // App management
      cleanupApp: () => Promise<{ success: boolean; message: string }>;
      getTranscriptionHistory: () => Promise<any[]>;
      clearTranscriptionHistory: () => Promise<void>;

      // Update operations
      checkForUpdates: () => Promise<UpdateCheckResult>;
      downloadUpdate: () => Promise<UpdateResult>;
      installUpdate: () => Promise<UpdateResult>;
      getAppVersion: () => Promise<AppVersionResult>;
      getUpdateStatus: () => Promise<UpdateStatusResult>;
      getUpdateInfo: () => Promise<UpdateInfoResult | null>;

      // Update event listeners
      onUpdateAvailable: (callback: (event: any, info: any) => void) => void;
      onUpdateNotAvailable: (callback: (event: any, info: any) => void) => void;
      onUpdateDownloaded: (callback: (event: any, info: any) => void) => void;
      onUpdateDownloadProgress: (
        callback: (event: any, progressObj: any) => void
      ) => void;
      onUpdateError: (callback: (event: any, error: any) => void) => void;

      // Settings management (used by OnboardingFlow but not in preload.js)
      saveSettings?: (settings: SaveSettings) => Promise<void>;

      // External URL operations
      openExternal: (
        url: string
      ) => Promise<{ success: boolean; error?: string } | void>;

      // Event listener cleanup
      removeAllListeners: (channel: string) => void;

      // Hotkey management
      updateHotkey: (key: string) => Promise<{ success: boolean; message?: string }>;
      
      // Gemini API key management
      getGeminiKey: () => Promise<string | null>;
      saveGeminiKey: (key: string) => Promise<void>;
      
      // Groq API key management
      getGroqKey: () => Promise<string | null>;
      saveGroqKey: (key: string) => Promise<void>;
      
      // Debug logging
      logReasoning?: (stage: string, details: any) => Promise<void>;
    };
    
    api?: {
      sendDebugLog: (message: string) => void;
    };
  }
}
