import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

const BACKGROUND_PLAYBACK_RATE = 0.7;

const AuthLayout = ({ children, subtitle, title }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current)
      videoRef.current.playbackRate = BACKGROUND_PLAYBACK_RATE;
  }, []);

  return (
    <div className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <Link to="/" className="absolute left-4 top-4 md:left-8 md:top-8 z-10">
        <>
          <img src="/logo.svg" alt="Logo" width={62} height={62} />
          <span className="sr-only">Home</span>
        </>
      </Link>
      <div className="relative z-10 max-w-sm p-6 bg-white rounded-2xl shadow-md  flex w-full flex-col justify-center space-y-6 mx-auto sm:w-[380px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        </div>
        {children}
      </div>
      <div className="absolute inset-0 z-0">
        <video
          src="/auth-background.mp4"
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          ref={videoRef}
        />
        <div className="absolute inset-0 backdrop-blur-md bg-black/50"></div>
      </div>
    </div>
  );
};

export default AuthLayout;
