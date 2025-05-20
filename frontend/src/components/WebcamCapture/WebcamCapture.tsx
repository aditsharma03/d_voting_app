import { useEffect, useRef, useState } from 'react';

type WebcamCaptureProps = {
  onCapture: (imageData: string) => void;
  facingMode?: 'user' | 'environment';
  imageQuality?: number;
};

const WebcamCapture = ({
  onCapture,
  facingMode = 'user',
  imageQuality = 0.8,
}: WebcamCaptureProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  
  const [isCameraOn, setIsCameraOn] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const startCamera = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Stop any existing stream
      if (streamRef.current) {
        stopCamera();
      }

      const constraints: MediaStreamConstraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode,
        },
        audio: false,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        // Handle video play promise
        await videoRef.current.play();
        setIsCameraOn(true);
      }
    } catch (err) {
      handleCameraError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current || !isCameraOn) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    
    if (!context) {
      setError('Could not get canvas context');
      return;
    }

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    // Get image data URL
    const imageDataUrl = canvas.toDataURL('image/jpeg', imageQuality);
    setCapturedImage(imageDataUrl);
    onCapture(imageDataUrl);
  };

  const handleCameraError = (err: unknown) => {
    let errorMessage = 'Could not access camera';
    
    if (err instanceof Error) {
      if (err.name === 'NotAllowedError') {
        errorMessage = 'Camera access was denied. Please allow camera permissions.';
      } else if (err.name === 'NotFoundError') {
        errorMessage = 'No camera device found.';
      } else if (err.name === 'NotReadableError') {
        errorMessage = 'Camera is already in use or not readable.';
      } else if (err.name === 'OverconstrainedError') {
        errorMessage = 'Camera constraints could not be satisfied.';
      }
    }
    
    setError(errorMessage);
    console.error('Camera error:', err);
    stopCamera();
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">Biometric Verification</h3>
      <p className="text-sm text-gray-500 mb-4">
        Please allow camera access and take a clear photo of your face
      </p>
      
      {error && (
        <div className="mb-4 p-2 bg-red-100 text-red-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <div className="relative bg-gray-200 rounded-lg overflow-hidden mb-4 aspect-video">
        {isLoading ? (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <div className="animate-pulse text-gray-500">Initializing camera...</div>
          </div>
        ) : isCameraOn ? (
          <video 
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
        ) : capturedImage ? (
          <img 
            src={capturedImage} 
            alt="Captured face" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-100">
            <span className="text-gray-400">Camera preview will appear here</span>
          </div>
        )}
      </div>
      
      <div className="flex gap-2">
        {!isCameraOn && !capturedImage ? (
          <button
            type="button"
            onClick={startCamera}
            disabled={isLoading}
            className={`flex-1 py-2 px-4 rounded-md text-sm ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {isLoading ? 'Starting...' : 'Start Camera'}
          </button>
        ) : isCameraOn ? (
          <>
            <button
              type="button"
              onClick={captureImage}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md text-sm"
            >
              Capture Photo
            </button>
            <button
              type="button"
              onClick={stopCamera}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-md text-sm"
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={retakePhoto}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm"
          >
            Retake Photo
          </button>
        )}
      </div>
      
      {/* Hidden canvas for capturing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default WebcamCapture;
