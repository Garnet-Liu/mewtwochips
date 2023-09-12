"use client";

import { useCallback, useEffect, useRef } from "react";

export default function MediaDevicesPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const width = 400;    // 外面会对照片的宽度进行缩放
  const height = 560;     // 高度会基于输入的视频流进行计算
  const x = 0;
  const y = 0;

  useEffect(() => {
    console.log("useEffect", canvasRef, videoRef);
    initMedia().then(() => {
      console.log("initMedia");
    });
  }, []);

  const renderCanvas = useCallback((video: HTMLVideoElement, ctx: CanvasRenderingContext2D | null) => {
    const render = () => {
      window.requestAnimationFrame(render);
      ctx?.clearRect(x, y, width, height);
      ctx?.drawImage(video, x, y, width, height);  //绘制视频
    };
    return render;
  }, [height, width, x, y]);

  const initMedia = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const firstMediaStream = await navigator.mediaDevices.getUserMedia({
        video: true
      });
      firstMediaStream.getVideoTracks().forEach((track) => {
        console.log("track", track.id, track.kind);
        track.stop();
      });
      const mediaDeviceInfo = await navigator.mediaDevices.enumerateDevices();
      const videoInput = mediaDeviceInfo.filter((info) => {
        return info.kind === "videoinput";
      });
      console.log("videoInput", videoInput);
      const findVideo = videoInput.find((v) => v.label === "FaceTime高清摄像头（内建） (05ac:8514)");
      console.log("findVideo", findVideo);
      console.log("findVideo", findVideo?.deviceId);
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: { exact: videoInput[1]?.deviceId },
            aspectRatio: { exact: 9 / 16 },
            // width: width
          }
        });
        console.log("mediaStream", mediaStream);
        video.srcObject = mediaStream;

        video.onloadedmetadata = function (e) {
          video.play().then(() => {
            console.log("play...");

            const renderHandle = renderCanvas(video, canvas.getContext("2d"));

            renderHandle();
          });
        };
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="flex">
      <video width={width} height={height} ref={videoRef} playsInline>
        视频流目前不可用。
      </video>

      <canvas width={width} height={height} ref={canvasRef}></canvas>
    </div>
  );
}
