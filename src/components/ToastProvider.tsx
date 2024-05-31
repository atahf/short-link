"use client";
import { ReactNode } from "react";
import { Toaster } from "react-hot-toast";

interface ToastProviderProps {
    children: ReactNode;
}

const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />
            {children}
        </>
    );
}

export default ToastProvider;
