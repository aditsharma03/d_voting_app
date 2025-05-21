import { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

function WebcamCapture({img, setImg}) {
  //const [img, setImg] = useState(null);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
  }, [webcamRef]);

  return (
    <div className="flex flex-col justify-center items-center">
      {img === null ? (
        <>
          <Webcam
            audio={false}
            mirrored={true}
            height={400}
            width={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <button type="button" onClick={capture} className="bg-green-300 rounded-md py-1 px-2 m-2">Capture photo</button>
        </>
      ) : (
        <>
          <img src={img} alt="screenshot" />
          <button type="button" onClick={() => setImg(null)} className="bg-green-300 rounded-md py-1 px-2 m-2">Retake</button>
        </>
      )}
    </div>
  );
}

export default WebcamCapture;
