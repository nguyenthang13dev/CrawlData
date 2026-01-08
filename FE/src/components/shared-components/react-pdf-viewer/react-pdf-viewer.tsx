import * as React from 'react';
import {defaultLayoutPlugin} from '@react-pdf-viewer/default-layout';
import {LocalizationContext, LocalizationMap, SpecialZoomLevel, ThemeContext, Viewer} from '@react-pdf-viewer/core';
import {toolbarPlugin} from '@react-pdf-viewer/toolbar';

import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/toolbar/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import vi_VN from './vi_VN.json';

export const createDefaultLayoutPlugin = (options?: any) => {
    try {
        return defaultLayoutPlugin({
            sidebarTabs: (defaultTabs) => [
                defaultTabs[0], // Tab hình thu nhỏ
                defaultTabs[1], // Tab dấu trang
            ],
            toolbarPlugin: {
                searchPlugin: {
                    keyword: ['tìm kiếm', 'search'],
                },
            },
            ...options,
        });
    } catch (error) {
        console.error('Error creating default layout plugin:', error);
        return defaultLayoutPlugin();
    }
};


// Các phần khác giữ nguyên...
export const PDF_WORKER_URL = "/pdf.worker.min.js";

export const pdfModalStyles = {
    modal: {
        width: "90vw",
        height: "90vh",
    },
    bodyStyle: {
        height: 'calc(90vh - 55px)',
        padding: 0,
        display: 'flex',
        flexDirection: 'column' as const,
    },
    viewerContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column' as const,
        overflow: 'hidden',
        border: '1px solid #f0f0f0',
    },
};

export const createSafeFileUrl = (blob: Blob | null | undefined): string => {
    if (!blob) {
        console.warn('Blob is null or undefined');
        return '';
    }

    try {
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error('Error creating object URL:', error);
        return '';
    }
};

export const cleanupFileUrl = (url: string) => {
    if (url && url.startsWith('blob:')) {
        try {
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error revoking object URL:', error);
        }
    }
};

// Shared PDF Viewer component based on the example
export const SharedPdfViewer: React.FC<{
    fileUrl: string;
    theme?: 'light' | 'dark';
    containerStyle?: React.CSSProperties;
    pageNumber?: number; // Added pageNumber prop
}> = ({fileUrl, theme = 'light', containerStyle, pageNumber}) => {
    const defaultLayoutPluginInstance = createDefaultLayoutPlugin();

    const [currentTheme, setCurrentTheme] = React.useState<'light' | 'dark'>(theme);
    const [l10n, setL10n] = React.useState(vi_VN as any as LocalizationMap);
    const [error, setError] = React.useState<string | null>(null);

    const localizationContext = {l10n, setL10n};
    const themeContext = {
        currentTheme,
        setCurrentTheme: (theme: string) => setCurrentTheme(() => theme as 'light' | 'dark'),
    };

    // Monitor for PDF loading errors
    React.useEffect(() => {
        const handleGlobalError = (event: ErrorEvent) => {
            if (event.message.includes('WorkerMessageHandler') || event.message.includes('PDF')) {
                console.error('PDF Worker error:', event.error);
                setError('Lỗi khi tải PDF worker. Vui lòng thử lại.');
            }
        };

        window.addEventListener('error', handleGlobalError);
        return () => window.removeEventListener('error', handleGlobalError);
    }, []);

    if (error) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                padding: '20px',
                textAlign: 'center'
            }}>
                <div style={{color: '#ff4d4f', fontSize: '16px', marginBottom: '10px'}}>
                    ⚠️ Lỗi tải tệp
                </div>
                <div style={{color: '#666', fontSize: '14px'}}>{error}</div>
                <button 
                    onClick={() => setError(null)}
                    style={{
                        marginTop: '15px',
                        padding: '8px 16px',
                        backgroundColor: '#1890ff',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer'
                    }}
                >
                    Thử lại
                </button>
            </div>
        );
    }

    return (
        <ThemeContext.Provider value={themeContext}>
            <LocalizationContext.Provider value={localizationContext}>
                <div
                    className={`rpv-core__viewer rpv-core__viewer--${currentTheme}`}
                    style={{
                        border: '1px solid rgba(0, 0, 0, 0.3)',
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        ...containerStyle,
                    }}
                >
                    <Viewer
                        fileUrl={fileUrl}
                        plugins={[defaultLayoutPluginInstance]}
                        initialPage={pageNumber ? pageNumber - 1 : undefined} // Set initial page
                        defaultScale={SpecialZoomLevel.PageFit}
                    />
                </div>
            </LocalizationContext.Provider>
        </ThemeContext.Provider>
    );
};
